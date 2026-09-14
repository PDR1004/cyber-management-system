import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./Layout"

import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Sales from "./pages/Sales"
import Consoles from "./pages/Consoles"
import Sessions from "./pages/Sessions"
import Rates from "./pages/Rates"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>

          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/consoles" element={<Consoles />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/rates" element={<Rates />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

