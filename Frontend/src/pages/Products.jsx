import { useEffect, useState } from "react"

function Products() {

  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [purchasePrice, setPurchasePrice] = useState("")
  const [salePrice, setSalePrice] = useState("")
  const [stock, setStock] = useState("")
  const [category, setCategory] = useState("")

  const [editingProduct, setEditingProduct] = useState(null)

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
      console.log(data)
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
    <div>
      <h1>Productos</h1>
        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Precio de compra"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Precio de venta"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <input
            type="text"
            placeholder="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button type="submit">
            {editingProduct ? "Guardar cambios" : "Crear producto"}
          </button>

        </form>

      {products.map(product => (
        <div key={product.id}>
          <p>
            {product.name} - ${product.sale_price}
          </p>

          <button onClick={() => getProductById(product.id)}>
            Ver
          </button>

          <button onClick={() => editProduct(product)}>
            Editar
          </button>

          <button onClick={() => deleteProduct(product.id)}>
            Eliminar
          </button>

        </div>
      ))}

    </div>
  )
}

export default Products