import {useEffect, useState} from "react"
import "./Consoles.css"


function Consoles() {
  const [consoles, setConsoles] = useState([])
  const [name, setName] = useState("")
  const [status, setStatus] = useState("")
  const [editingConsole, setEditingConsole] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8000/consoles/")
      .then(response => response.json())
      .then(data => {
        setConsoles(data)
      })
  }, [])

  const createConsole = (e) => {
    e.preventDefault()

    const newConsole = {name: name}

    fetch("http://localhost:8000/consoles/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newConsole)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("No se pudo crear la consola")
        }

        return response.json()
      })
      .then(data => {
        setConsoles([...consoles, data])

        setName("")
      })
      .catch(error => {
      console.error(error)
    })
  }

  const editConsole = (console) => {
    setEditingConsole(console)
    setName(console.name)
    setStatus(console.status)
  }

  const updateConsole = (e) => {
    e.preventDefault()

    const updatedConsole = {
      name: name,
      status: status
    }
  
    fetch(`http://localhost:8000/consoles/${editingConsole.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedConsole)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("No se pudo actualizar la consola")
        }
        return response.json()
      })
      .then(data => {
      setConsoles(
        consoles.map(console =>
          console.id === data.id ? data : console
      ))
      setEditingConsole(null)
      setName("")
      setStatus("")
      }) 
  }

  const deleteConsole = (id) => {
    fetch(`http://localhost:8000/consoles/${id}`, {
      method: "DELETE"
    })
    .then(response => {
      if (!response.ok){
        throw new Error ("No se pudo eliminar la consola")
      }
      return response.json()
    })
    .then(data => {
      setConsoles(
        consoles.filter(console => console.id !== id)
      )
    })
    .catch(error => {
      console.error(error)
    })
  }

  return (
    <div className = "consoles-page">
      <div className = "consoles-header">
        <h1>Consolas</h1>
      </div>

      <div className = "console-form-card">
        <form onSubmit={editingConsole ? updateConsole : createConsole} className = "console-form">
          <input
            type="text"
            placeholder="Nombre Consola"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className = "btn-primary">
            {editingConsole ? "Guardar Cambios" : "Crear Consola"}
          </button>
        </form>
      </div>

      <div className = "consoles-card">
        <div className="section-header">
          <h2>Consolas registradas</h2>
          <span>{consoles.length} consolas</span>
        </div>

        <div className = "consoles-list">
        {consoles.map(console => (
          <div className = "console-row" key = {console.id}>
            <div className = "console-name">
              <p> {console.name}</p>
            </div>
            <div className="console-status">
              <span
                className={`status-badge status-${console.status.toLowerCase()}`}
              >
                {console.status}
              </span>
            </div>

            <div className = "console-actions">
              <button className = "btn-edit" onClick={() => editConsole(console)}>
                Editar
              </button>

              <button className = "btn-delete" onClick={() => deleteConsole(console.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>

    </div>
  )
}

export default Consoles