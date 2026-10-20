import { useEffect, useState } from "react"
import "./Sales.css"

function Sales() {

  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState("")
  const [saleItems, setSaleItems] = useState([])
  const [message, setMessage] = useState("")
  const [sales, setSales] = useState([])
  const [selectedSale, setSelectedSale] = useState(null)
  const [salesFilter, setSalesFilter] = useState("today")
  const [selectedDate, setSelectedDate] = useState("")
  

  useEffect(() => {
    fetch("http://localhost:8000/products/")
      .then(response => response.json())
      .then(data => {
        setProducts(data)
      })
    
    fetch("http://localhost:8000/sales/")
      .then(response => response.json())
      .then(data => {
        setSales(data)
      })
  }, [])

  const addProduct = () => {
    if (!selectedProduct || !quantity) {
      return
    }

    const product = products.find(
      product => product.id === Number(selectedProduct)
    )

    if (!product) {
      return
    }

    const existingItem = saleItems.find (
      item => item.product_id === product.id
    )

    if (existingItem) {
      if (product.stock < (Number(quantity) + existingItem.quantity)) {
        return
      }
      else {
      setSaleItems(
        saleItems.map (item => {
          if (item.product_id === existingItem.product_id) {
            return {...item,
              quantity: existingItem.quantity + Number(quantity),
              subtotal: (existingItem.quantity + Number(quantity)) * product.sale_price
            }
          }
          return item
        })
      )}

    } else {
        if (product.stock < Number(quantity)) {
          return
        }

      const newItem = {
        product_id: product.id,
        name: product.name,
        quantity: Number(quantity),
        unit_price: product.sale_price,
        subtotal: Number(quantity) * product.sale_price
      }

      setSaleItems([...saleItems, newItem])

      setSelectedProduct("")
      setQuantity("")
    }
  }

  const deleteItem = (id) => {
    setSaleItems(
      saleItems.filter(item => item.product_id !== id)
    )
  }

  const createSale = () => {
    if (saleItems.length === 0) {
      return
    }

    const saleData = {
      products: saleItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity
      }))
    }

  fetch("http://localhost:8000/sales/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(saleData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo crear la venta")
      }
      return response.json()
    })
    .then(data => {
      console.log("Venta creada:", data)

      setSales([...sales, data])

      setMessage("Venta creada exitosamente")
      setSaleItems([])
      setTimeout(() => {
        setMessage("")
      }, 3000)
    })
    .catch(error => {
      console.error(error)
      setMessage("No se pudo crear la venta")

      setTimeout(() => {
        setMessage("")
      }, 3000)
    })
  }

  const getSaleById = (id) => {
  fetch(`http://localhost:8000/sales/${id}`)
    .then(response => response.json())
    .then(data => {
      setSelectedSale(data)
    })
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString("es-AR", {
      dateStyle: "short",
      timeStyle: "short"
    })
  }

  const getDateKey = (date) => {
    const parsedDate = new Date(date)

    const year = parsedDate.getFullYear()
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
    const day = String(parsedDate.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  }

  const today = getDateKey(new Date())

  const filteredSales = sales
    .filter(sale => {
      if (salesFilter === "today") {
        return getDateKey(sale.sale_date) === today
      }

      if (salesFilter === "date") {
        return selectedDate !== "" &&
          getDateKey(sale.sale_date) === selectedDate
      }

      return true
    })
    .sort(
      (a, b) => new Date(b.sale_date) - new Date(a.sale_date)
    )
  
  const totalSales = filteredSales.length

  const totalRevenue = filteredSales.reduce(
    (total,sale) => total + Number(sale.total),
    0
  )

  return (
    <div className = "sales-page">
      <div className = "page-header">
        <h1>Ventas</h1>
        <p>Creá y Administrá las ventas del Cyber</p>
      </div>

      {message && <p>{message}</p>}

      <div className = "sale-form">
        <select
          className = "sales-select"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">
            Seleccionar producto
          </option>

          {products.map(product => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
            </option>
          ))}
        </select>
        <input
          className = "sales-input"
          type="number"
          min="1"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button 
          className = "btn-primary" 
          onClick={addProduct}
        >
          Agregar
        </button>
      </div>

      <div className = "items-card">
        <div className = "section-header">
          <h2>Detalle de la venta</h2>
          <span>{saleItems.length} lineas</span>
        </div>

        <div className = "items-list">
          {saleItems.map(item => (
            <div className = "item-row" key={item.product_id}>
              <div className = "item-name">
                {item.name}
              </div>

              <div className = "item-quantity">
                Cantidad: {item.quantity}
              </div>

              <div className = "item-price">
                Precio: ${item.subtotal}
              </div>

              <div className="item-actions">
                <button className = "btn-delete" onClick={() => deleteItem(item.product_id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <p>
          Total: $ 
          {saleItems.reduce(
            (total, item) => total + item.subtotal,
            0
          )} 
        </p>
        <button
          className = "btn-finish-sale"
          onClick={createSale}
        >
          Finalizar Venta
        </button>
      </div> 

      <div className="sales-filters">
        <label htmlFor="sales-filter">
          Mostrar ventas:
        </label>

        <select
          id="sales-filter"
          value={salesFilter}
          onChange={(e) => setSalesFilter(e.target.value)}
        >
          <option value="today">Ventas de hoy</option>
          <option value="all">Todas las ventas</option>
          <option value="date">Elegir una fecha</option>
        </select>

        {salesFilter === "date" && (
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        )}
      </div> 
      <div className="sales-summary">
        <div className="summary-card">
          <span className="summary-label">Cantidad de ventas</span>
          <strong className="summary-value">{totalSales}</strong>
        </div>

        <div className="summary-card">
          <span className="summary-label">Total recaudado</span>
          <strong className="summary-value">
            {totalRevenue.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              maximumFractionDigits: 2
            })}
          </strong>
        </div>
      </div>

      <table className = "sales-table">
        <caption> Ventas </caption>
        <thead>
          <tr>
            <th>Venta</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales
          .map(sale => (
          <tr key={sale.id}>
            <td>{sale.id}</td>
            <td>{formatDate(sale.sale_date)}</td>
            <td>${sale.total}</td>
            <td>
              <button className = "btn-view" onClick={() => getSaleById(sale.id)}>
                Ver Detalle
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>

      {selectedSale && (
        <div className = "sale-detail-card">
          <h2>Detalle de venta #{selectedSale.id}</h2>

          <p>
            Fecha: {formatDate(selectedSale.sale_date)}
          </p>

          <table className = "sale-detail-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {selectedSale.details.map(detail => (
                <tr key={detail.id}>
                  <td>{detail.product.name}</td>
                  <td>{detail.quantity}</td>
                  <td>{detail.unit_price}</td>
                  <td>{detail.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <strong>Total: {selectedSale.total}</strong>
          </p>
        </div>
      )}
    </div>
  )}
export default Sales