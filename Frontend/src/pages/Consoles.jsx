import {useEffect, useState} from "react"


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
      return response.json
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
    <div>
      <h1>Consolas</h1>

      <form onSubmit={editingConsole ? updateConsole : createConsole}>
        <input
          type="text"
          placeholder="Nombre Consola"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">
          {editingConsole ? "Guardar Cambios" : "Crear Consola"}
        </button>
      </form>

      <div>
        {consoles.map(console => (
          <div key = {console.id}>
            <p> Nombre: {console.name}</p>
            <p> Estado: {console.status}</p>

            <button onClick={() => editConsole(console)}>
              Editar
            </button>

            <button onClick={() => deleteConsole(console.id)}>
              Eliminar
            </button>
          </div>
        )
        )}
      </div>

    </div>
  )
}

export default Consoles