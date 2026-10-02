import {useEffect, useState} from "react"

function Sessions() {
  const [consoles, setConsoles] = useState([])
  const [selectedConsole, setSelectedConsole] = useState(null)
  const [players, setPlayers] = useState("")
  const [activeSessions, setActiveSessions] = useState([])
  const [sessions, setSessions] = useState([])
  const [message, setMessage] = useState("")

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

  return (
    <div>
      <h1>Sesiones</h1>
      <p>Iniciar Sesion</p>
      <select
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
        type="text"
        placeholder="Cantidad de Jugadores"
        value={players}
        onChange={(e) => setPlayers(e.target.value)}
      />
      <button onClick={startSession}>
        Iniciar
      </button>
      
      {message && <p>{message}</p>}

      <h2>Sesiones Activas</h2>
      <div>
        {activeSessions.map(session => (
          <div key={session.id}>
            <p>Sesión: {session.id}</p>
            <p>Consola: {consoles.find(console => console.id === session.console_id)?.name}</p>
            <p>Jugadoes: {session.players_count}</p>
            <p>Inicio: {formatDate(session.start_time)}</p>

            <button onClick = {() => endSession(session.id)}>
              Finalizar Sesión
            </button>
          </div>
        ))}
      </div>

      <table>
        <caption>Sesiones finalizadas</caption>
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
          {sessions
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
  )
}

export default Sessions