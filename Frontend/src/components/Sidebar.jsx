
import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Gamepad2,
  Clock,
  DollarSign
} from "lucide-react"

import "./Sidebar.css"

function Sidebar() {
  const links = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/products", label: "Productos", icon: Package },
    { to: "/sales", label: "Ventas", icon: ShoppingCart },
    { to: "/consoles", label: "Consolas", icon: Gamepad2 },
    { to: "/sessions", label: "Sesiones", icon: Clock },
    { to: "/rates", label: "Tarifas", icon: DollarSign }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Gamepad2 size={24} />
        </div>
        <div>
          <h2>CYBER</h2>
          <span>Management</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="sidebar-heading">MENÚ PRINCIPAL</span>

        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <Icon size={20} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span>Cyber Management</span>
        <span>Panel de administración</span>
      </div>
    </aside>
  )
}

export default Sidebar