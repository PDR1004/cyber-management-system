import { useEffect, useState } from "react"

function Sales() {

  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState("")
  const [saleItems, setSaleItems] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("http://localhost:8000/products/")
      .then(response => response.json())
      .then(data => {
        setProducts(data)
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

  return (
    <div>
      <h1>Ventas</h1>

      {message && <p>{message}</p>}

      <select
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
        type="number"
        min="1"
        placeholder="Cantidad"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button onClick={addProduct}>
        Agregar
      </button>

      <div>
        <h2>Detalle de la venta</h2>
        {saleItems.map(item => (
          <div key={item.product_id}>
            <p>
              {item.name} - Cantidad: {item.quantity} - Precio: ${item.subtotal}
            </p>

            <button onClick={() => deleteItem(item.product_id)}>
              Eliminar
            </button>

          </div>
        ))}
        <p>
          Total: $ 
          {saleItems.reduce(
            (total, item) => total + item.subtotal,
            0
          )} 
        </p>
        <button onClick={createSale}>
          Finalizar Venta
        </button>
      </div>  
    </div>
)}

export default Sales