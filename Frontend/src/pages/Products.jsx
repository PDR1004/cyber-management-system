import { useEffect, useState } from "react"
import "./Products.css"

function Products() {

  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [purchasePrice, setPurchasePrice] = useState("")
  const [salePrice, setSalePrice] = useState("")
  const [stock, setStock] = useState("")
  const [category, setCategory] = useState("")

  const [editingProduct, setEditingProduct] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8000/products/")
      .then(response => response.json())
      .then(data => {
        setProducts(data)
      })
  }, [])

  const createProduct = (e) => {
  e.preventDefault()

  const newProduct = {
    name: name,
    purchase_price: Number(purchasePrice),
    sale_price: Number(salePrice),
    stock: Number(stock),
    category: category
  }

  fetch("http://localhost:8000/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newProduct)
  })
    .then(response =>{
      if (!response.ok) {
      throw new Error("No se pudo crear el producto")
      }
    return response.json()
    })
    .then(data => {
      setProducts([...products, data])

        //vaciado
        setName("")
        setPurchasePrice("")
        setSalePrice("")
        setStock("")
        setCategory("")
    })
    .catch(error => {
    console.error(error)
    })
  }

  const getProductById = (id) => {
  fetch(`http://localhost:8000/products/${id}`)
    .then(response => response.json())
    .then(data => {
      setSelectedProduct(data)
    })
  }

  const editProduct = (product) => {
    setEditingProduct(product)

    setName(product.name)
    setPurchasePrice(product.purchase_price)
    setSalePrice(product.sale_price)
    setStock(product.stock)
    setCategory(product.category)
  }

  const updateProduct = (e) => {
    e.preventDefault()

    const updatedProduct = {
      name: name,
      purchase_price: Number(purchasePrice),
      sale_price: Number(salePrice),
      stock: Number(stock),
      category: category
    }

    fetch(`http://localhost:8000/products/${editingProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProduct)
    })
      .then(response => response.json())
      .then(data => {
      setProducts(
        products.map(product =>
          product.id === data.id ? data : product
        )
      )

      setEditingProduct(null)

      setName("")
      setPurchasePrice("")
      setSalePrice("")
      setStock("")
      setCategory("")
    })
  }

  const handleSubmit = (e) => {
    if (editingProduct) {
      updateProduct(e)
    } else {
      createProduct(e)
    }
  }

  const deleteProduct = (id) => {
    fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("No se pudo eliminar el producto")
        }

        return response.json()
      })
      .then(data => {
        setProducts(
          products.filter(product => product.id !== id)
        )
      })
      .catch(error => {
        console.error(error)
      })
  }
  
  return (
    <div className="products-page">

      <div className="page-header">
        <div>
          <h1>Productos</h1>
          <p>Administrá los productos y el stock del cyber</p>
        </div>
      </div>

      <div className="product-form-card">
        <h2>
          {editingProduct ? "Editar producto" : "Nuevo producto"}
        </h2>

        <form onSubmit={handleSubmit} className="product-form">

          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Ej: Coca Cola"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Precio de compra</label>
            <input
              type="number"
              placeholder="Ej: 1000"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Precio de venta</label>
            <input
              type="number"
              placeholder="Ej: 1500"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              placeholder="Ej: 20"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Categoría</label>
            <input
              type="text"
              placeholder="Ej: Bebidas"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary">
            {editingProduct ? "Guardar cambios" : "Crear producto"}
          </button>
        </form>
      </div>

      <div className="products-card">

        <div className="section-header">
          <h2>Productos registrados</h2>
          <span>{products.length} productos</span>
        </div>

        <div className="products-list">

          {products.map(product => (
            <div className="product-row" key={product.id}>

              <div className="product-info">
                <div className="product-name">
                  {product.name}
                </div>

                <div className="product-category">
                  {product.category}
                </div>
              </div>

              <div className="product-stock">
                <span>Stock</span>
                <strong>{product.stock}</strong>
              </div>

              <div className="product-price">
                ${product.sale_price}
              </div>

              <div className="product-actions">

                <button
                  className="btn-view"
                  onClick={() => getProductById(product.id)}
                >
                  Ver
                </button>

                <button
                  className="btn-edit"
                  onClick={() => editProduct(product)}
                >
                  Editar
                </button>

                <button
                  className="btn-delete"
                  onClick={() => deleteProduct(product.id)}
                >
                  Eliminar
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>

      {selectedProduct && (
        <div className="product-detail-card">

          <div className="detail-header">
            <div>
              <h2>Detalle del producto</h2>
              <p>Información del producto seleccionado</p>
            </div>

            <button
              className="btn-close"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>
          </div>

          <div className="detail-grid">

            <div>
              <span>ID</span>
              <strong>{selectedProduct.id}</strong>
            </div>

            <div>
              <span>Nombre</span>
              <strong>{selectedProduct.name}</strong>
            </div>

            <div>
              <span>Precio de compra</span>
              <strong>${selectedProduct.purchase_price}</strong>
            </div>

            <div>
              <span>Precio de venta</span>
              <strong>${selectedProduct.sale_price}</strong>
            </div>

            <div>
              <span>Stock</span>
              <strong>{selectedProduct.stock}</strong>
            </div>

            <div>
              <span>Categoría</span>
              <strong>{selectedProduct.category}</strong>
            </div>

            <div>
              <span>Estado</span>
              <strong className={selectedProduct.active ? "status-active" : "status-inactive"}>
                {selectedProduct.active ? "Activo" : "Inactivo"}
              </strong>
            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default Products