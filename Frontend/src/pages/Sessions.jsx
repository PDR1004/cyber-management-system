import {useEffect, useState} from "react"
import "./Sessions.css"

function Sessions() {
  const [consoles, setConsoles] = useState([])
  const [selectedConsole, setSelectedConsole] = useState(null)
  const [players, setPlayers] = useState("")
  const [activeSessions, setActiveSessions] = useState([])
  const [sessions, setSessions] = useState([])
  const [message, setMessage] = useState("")
  const [sessionFilter, setSessionFilter] = useState("today")
  const [selectedSessionDate, setSelectedSessionDate] = useState("")

  useEffect(() => {
    fetch("http://localhost:8000/consoles/")
      .then(response => response.json())
      .then(data => {
        setConsoles(data)
      })

    fetch("http://localhost:8000/sessions/active/")
      .then(response => response.json())
      .then(data => {
        setActiveSessions(data)
      })

    fetch("http://localhost:8000/sessions/")
      .then(response => response.json())
      .then(data => {
        setSessions(data)
      })
  }, [])

  const startSession = () => {
    const newSession = {
      console_id: Number(selectedConsole),
      players_count: Number(players)
    }

    fetch("http://localhost:8000/sessions/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSession)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo iniciar la sesión")
      } 

      return response.json()
    })
    .then(data => {
      console.log("Sesión inciada: ", data)

      setActiveSessions([...activeSessions, data])

      setConsoles(
        consoles.map(console =>
          console.id === data.console_id
            ? { ...console, status: "Ocupada" }
            : console
        )
      )

      setSelectedConsole("")
      setPlayers("")
    })
    .catch(error => {
      console.error(error)
    })
  }

  const endSession = (sessionId) => {
    fetch(`http://localhost:8000/sessions/${sessionId}/end`, {
      method: "POST"
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo finalizar la sesión")
      }
      return response.json()
    })
    .then(data => {
      console.log("Sesión finalizada:", data)
      setMessage(`Sesión Finalizada. Total: $${data.total_price}`)

      setActiveSessions(
        activeSessions.filter(session => session.id !== data.id)
      )

      setConsoles(
        consoles.map(console =>
          console.id === data.console_id
            ? { ...console, status: "Disponible" }
            : console
        ))
      setSessions([...sessions, data])
    })
    .catch(error => {
      console.error(error)
    })
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString("es-AR", {
      dateStyle: "short",
      timeStyle: "short"
    })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS"
    }).format(price)
  }

  const getDateKey = (date) => {
    const parsedDate = new Date(date)

    const year = parsedDate.getFullYear()
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
    const day = String(parsedDate.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  }

  const today = getDateKey(new Date())

  const filteredSessions = sessions
    .filter(session => {
      //Descartar sesiones activas
      if (session.active !== false) {
        return false
      }
      // Aplicar filtros de fecha para las sesiones finalizadas
      if (sessionFilter === "today") {
        return getDateKey(session.start_time) === today
      }

      if (sessionFilter === "date") {
        return selectedSessionDate !== "" &&
          getDateKey(session.start_time) === selectedSessionDate
      }
      return true
    })
    .sort(
      (a, b) => new Date(b.start_time) - new Date(a.start_time)
    )

return (
  <div className="sessions-page">
    <div className="sessions-header">
      <h1>Sesiones</h1>
      <p>Administrá las sesiones de las consolas del cyber</p>
    </div>

    <div className="session-form-card">
      <div className="section-header">
        <h2>Iniciar sesión</h2>
      </div>
      <select
        className="session-select"
        value={selectedConsole}
        onChange={(e) => setSelectedConsole(e.target.value)}
      >
        <option value="">
          Seleccionar Consola
        </option>
        {consoles
          .filter(console => console.status === "Disponible")
          .map(console => (
            <option
              key={console.id}
              value={console.id}
            >
              {console.name}
            </option>
          ))}
      </select>
      <input
        className="session-input"
        type="number"
        min="1"
        max="2"
        placeholder="Cantidad de jugadores"
        value={players}
        onChange={(e) => setPlayers(e.target.value)}
      />
      <button className="btn-primary" onClick={startSession}>
        Iniciar sesión
      </button>
    </div>
    
    {message && (
      <div className="session-message">
        {message}
      </div>
    )}

    <div className="active-sessions-card">
      <div className="section-header">
        <h2>Sesiones activas</h2>
        <span>{activeSessions.length} activas</span>
      </div>

      <div className="active-sessions-list">
        {activeSessions.map(session => (
          <div className="active-session-row" key={session.id}>
            <div className="active-session-info">
              <h3>Sesión #{session.id}</h3>

              <p>
                Consola:{" "}
                {consoles.find(
                  console => console.id === session.console_id
                )?.name}
              </p>

              <p>Jugadores: {session.players_count}</p>

              <p>Inicio: {formatDate(session.start_time)}</p>
            </div>

            <div className="active-session-actions">
              <span className="session-status-badge">
                En curso
              </span>

              <button
                className="btn-finish-session"
                onClick={() => endSession(session.id)}
              >
                Finalizar sesión
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeSessions.length === 0 && (
        <p className="empty-sessions">
          No hay sesiones activas en este momento.
        </p>
      )}
    </div>

    <div className="sales-filters">
      <label htmlFor="sales-filter">
        Mostrar Sesiones:
      </label>

      <select
        id="sales-filter"
        value={sessionFilter}
        onChange={(e) => setSessionFilter(e.target.value)}
      >
        <option value="today">Sesiones de hoy</option>
        <option value="all">Todas las sesiones</option>
        <option value="date">Elegir una fecha</option>
      </select>

      {sessionFilter === "date" && (
        <input
          type="date"
          value={selectedSessionDate}
          onChange={(e) => setSelectedSessionDate(e.target.value)}
        />
      )}
    </div> 

    <div className="finished-sessions-card">
      <div className="section-header">
        <h2>Historial de sesiones</h2>
        <span>
          {filteredSessions.length} finalizadas
        </span>
      </div>

      <table className="sessions-table">
        <thead>
          <tr>
            <th>Sesión</th>
            <th>Consola</th>
            <th>Jugadores</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredSessions
          .filter(session => session.active === false)
          .map(session => (
          <tr key={session.id}>
            <td>{session.id}</td>
            <td>{consoles.find(console => console.id === session.console_id)?.name}</td>
            <td>{session.players_count}</td>
            <td>{formatDate(session.start_time)}</td>
            <td>{formatDate(session.end_time)}</td>
            <td>{formatPrice(session.total_price)}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Sessions