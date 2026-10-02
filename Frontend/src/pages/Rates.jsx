import {useEffect, useState} from "react"


function Rates() {

  const [rates, setRates] = useState([])
  const [players, setPlayers] = useState("")
  const [price, setPrice] = useState("")
  const [editingRate, setEditingRate] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8000/rates/")
      .then(response => response.json())
      .then(data => {
        setRates(data)
      })
  }, [])

const createRate = (e) => {
  e.preventDefault()

  const newRate = {
    players_count: Number(players),
    price_per_hour: Number(price)
  }

  fetch("http://localhost:8000/rates/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newRate)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo crear la tarifa")
      }

      return response.json()
    })
    .then(data => {
      setRates([...rates, data])

      setPlayers("")
      setPrice("")
    })
    .catch(error => {
      console.error(error)
    })
  }

  const editRate = (rate) => {
    setEditingRate(rate)

    setPlayers(rate.players_count)
    setPrice(rate.price_per_hour)
  }

  const updateRate = (e) => {
    e.preventDefault()

    const updatedRate = {
      players_count: Number(players),
      price_per_hour: Number(price)
    }

    fetch(`http://localhost:8000/rates/${editingRate.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedRate)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo actualizar la tarifa")
      }
      return response.json()
    })
    .then(data => {
    setRates(
      rates.map(rate =>
        rate.id === data.id ? data : rate
      )
    )
    setEditingRate(null)
    setPlayers("")
    setPrice("")
    })
  }

  const deleteRate = (id) => {
    fetch(`http://localhost:8000/rates/${id}`, {
      method: "DELETE"
    })
      .then (response => {
        if (!response.ok){
          throw new Error ("No se pudo eliminar la tarifa")
        }
        return response.json
      })
      .then(data => {
        setRates(
          rates.filter(rate => rate.id !== id)
        )
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div>
      <h1>Tarifas</h1>

      <form onSubmit={editingRate ? updateRate : createRate}>
        <input
          type="text"
          placeholder="Cantidad de Jugadores"
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
        />

        <input
          type="text"
          placeholder="Precio por Hora"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">
          {editingRate ? "Guardar Cambios" : "Crear Tarifa"}
        </button>
      </form>

      <div>
        {rates.map(rate =>(
          <div key={rate.id}>
            <p>
              Jugadores: {rate.players_count} 
            </p>
            <p>
              Precio por Hora: ${rate.price_per_hour}
            </p>

            <button onClick={() => editRate(rate)}>
              Editar
            </button>

            <button onClick={() => deleteRate(rate.id)}>
              Eliminar
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Rates