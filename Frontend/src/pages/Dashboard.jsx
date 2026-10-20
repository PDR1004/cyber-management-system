import { useEffect, useState } from "react"
import "./Dashboard.css"


function Dashboard() {
  const [period, setPeriod] = useState("today")
  const [sales, setSales] = useState([])
  const [sessions, setSessions] = useState([])
  const [consoles, setConsoles] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/sales/")
      .then(response => response.json())
      .then(data => {
        setSales(data)
      })
      .catch(error => {
        console.error("Error al cargar las ventas:", error)
      })
    
    fetch("http://localhost:8000/sessions/")
      .then(response => response.json())
      .then(data => {
        setSessions(data)
      })
      .catch(error => {
        console.error("Error al cargar las sesiones:", error)
      })
    
    fetch("http://localhost:8000/consoles/")
      .then(response => response.json())
      .then(data => {
        setConsoles(data)
      })
      .catch(error => {
        console.error("Error al cargar las consolas:", error)
      })
  }, [])

  const getDateKey = (date) => {
    const parsedDate = new Date(date)
    const year = parsedDate.getFullYear()
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
    const day = String(parsedDate.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  }

  const today = getDateKey(new Date())

  const filteredSales = sales.filter(sale => {
    const saleDate = getDateKey(sale.sale_date)
    if (period === "today") {
      return saleDate === today
    }

    if (period === "last7days") {
      const date = new Date(sale.sale_date)
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 6)
      startDate.setHours(0, 0, 0, 0)

      return date >= startDate && date <= new Date()
    }

    if (period === "month") {
      const date = new Date(sale.sale_date)
      const now = new Date()

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      )
    }
    return true
    })

  const productRevenue = filteredSales.reduce(
    (total, sale) => total + Number(sale.total || 0),
    0
  )

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS"
    }).format(price)
  
  const filteredSessions = sessions.filter(session => {
    const sessionDate = getDateKey(session.start_time)
    if (period === "today") {
      return sessionDate === today
    }
    if (period === "last7days") {
      const date = new Date(session.start_time)
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 6)
      startDate.setHours(0, 0, 0, 0)

      return date >= startDate && date <= new Date()
    }

    if (period === "month") {
      const date = new Date(session.start_time)
      const now = new Date()

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      )
    }
    return true
  })

  const sessionRevenue = filteredSessions.reduce(
    (total, session) => total + Number(session.total_price || 0),
    0
  )

  const occupiedConsoles = consoles.filter(
    console => console.status === "Ocupada"
  ).length

  const totalConsoles = consoles.filter(
    console => console.status !== "Inactivo"
  ).length

  
  // Generar los últimos 7 días, incluyendo hoy
  const last7Days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - (6 - index))

    return {
      date,
      key: getDateKey(date),
      label: date.toLocaleDateString("es-AR", {
        weekday: "short"
      }),
      products: 0,
      sessions: 0
    }
  })

  // Acumular los ingresos por ventas de productos
  filteredSales.forEach(sale => {
    const saleDate = getDateKey(sale.sale_date)
    const day = last7Days.find(item => item.key === saleDate)

    if (day) {
      day.products += Number(sale.total || 0)
    }
  })

  // Acumular los ingresos de sesiones finalizadas
  sessions
    .filter(session => session.active === false)
    .forEach(session => {
      const sessionDate = getDateKey(session.start_time)
      const day = last7Days.find(item => item.key === sessionDate)

      if (day) {
        day.sessions += Number(session.total_price || 0)
      }
    })

  // Valor máximo para escalar las barras
  const maxDailyRevenue = Math.max(
    1,
    ...last7Days.map(day => day.products + day.sessions)
  )


  return (
    <div className = "dashboard-page">
      <div className = "dashboard-header">
        <h1>Dashboard</h1>
        <p>Bienvenido al sistema de gestión del Cyber.</p>
      </div>

      <div className="dashboard-period">
        <label htmlFor="dashboard-period-select">
          Período de consulta
        </label>
        <select
          id="dashboard-period-select"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="today">Hoy</option>
          <option value="last7days">Últimos 7 días</option>
          <option value="month">Este mes</option>
        </select>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <h3>Ingresos totales</h3>
          <p className="dashboard-stat-value">
            {formatPrice(productRevenue + sessionRevenue)}
          </p>
          <span>Según el período seleccionado</span>
        </div>

        <div className="dashboard-stat-card">
          <h3>Ventas de productos</h3>
          <p className="dashboard-stat-value">
            {formatPrice(productRevenue)}
          </p>
          <span>Según el período seleccionado</span>
        </div>

        <div className="dashboard-stat-card">
          <h3>Ingresos por sesiones de PS</h3>
          <p className="dashboard-stat-value">
            {formatPrice(sessionRevenue)}
          </p>
          <span>Según el período seleccionado</span>
        </div>

        <div className="dashboard-stat-card">
          <h3>Consolas ocupadas actualmente</h3>
          <p className="dashboard-stat-value">
            {occupiedConsoles} / {totalConsoles}
          </p>
          <span>Ocupación actual</span>
        </div>
      </div>
      
      <div className="dashboard-chart-card">
        <div className="dashboard-chart-header">
          <div>
            <h2>Ingresos por día</h2>
            <p>Últimos 7 días</p>
          </div>
        </div>

        <div className="dashboard-chart-legend">
          <span>
            <i className="legend-products"></i>
            Productos
          </span>

          <span>
            <i className="legend-sessions"></i>
            Sesiones
          </span>
        </div>

        <div className="dashboard-chart">
          {last7Days.map(day => (
            <div className="dashboard-chart-day" key={day.key}>
              <div className="dashboard-chart-bars">
                <div
                  className="dashboard-bar dashboard-bar-products"
                  style={{
                    height: `${(day.products / maxDailyRevenue) * 100}%`
                  }}
                  title={`Productos: ${formatPrice(day.products)}`}
                />

                <div
                  className="dashboard-bar dashboard-bar-sessions"
                  style={{
                    height: `${(day.sessions / maxDailyRevenue) * 100}%`
                  }}
                  title={`Sesiones: ${formatPrice(day.sessions)}`}
                />
              </div>

              <span className="dashboard-chart-label">
                {day.label}
              </span>

              <span className="dashboard-chart-date">
                {day.date.getDate()}
              </span>
            </div>
          ))}
        </div>
      </div>

    
    </div>
  )
}

export default Dashboard