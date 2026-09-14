import { NavLink } from "react-router-dom"
import "./Sidebar.css"

function Sidebar() {
  return (
    <aside className = "Sidebar">
        
      <div className="sidebar-logo">
        <h2>CYBER</h2>
        <span>Management</span>
      </div>

      <nav className = "sidebar-nav">

        <NavLink 
          to ="/"
          end 
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Productos
        </NavLink>

        <NavLink
          to="/sales"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Ventas
        </NavLink>

        <NavLink
          to="/consoles"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Consolas
        </NavLink>

        <NavLink
          to="/sessions"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Sesiones
        </NavLink>

        <NavLink
          to="/rates"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Tarifas
        </NavLink>

      </nav>

    </aside>
  )
}

export default Sidebar