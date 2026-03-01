import React, { useEffect, useMemo, useState } from 'react'
import Toolbar from './components/Toolbar'
import Message from './components/Message'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'

/**
 * Shell-only app. Students must implement:
 * - localStorage read/write with try/catch (see storage.js)
 * - create, edit, delete flows
 * - search & sort (in memory)
 * - confirmation banners that auto-dismiss
 */

export default function App() {
  // Products
  const [products, setProducts] = useState([])

  // UI
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null) // null=create; string=edit

  // Toolbar
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState('name') // 'name' | 'price'
  const [sortDir, setSortDir] = useState('asc') // 'asc' | 'desc'

  // Banners
  const [banner, setBanner] = useState(null) // { type, text } | null

  // Derived list (students implement filter/sort)
  const visible = useMemo(() => {
    let result = [...products]
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      result = result.filter(p => p.name.toLowerCase().includes(q))
    }
    result.sort((a, b) => {
      let cmp = 0
      if (sortKey === 'name') cmp = a.name.localeCompare(b.name)
      else if (sortKey === 'price') cmp = a.price - b.price
      return sortDir === 'asc' ? cmp : -cmp
    })
    return result
  }, [products, query, sortKey, sortDir])

  // Auto-dismiss banner (students implement)
  useEffect(() => {
    if (banner) setTimeout(() => setBanner(null), 2000)
  }, [banner])

  function handleSave(product) {
    if (editingId) {
      // update
      setProducts(products.map(p => p.id === editingId ? { ...p, ...product } : p))
      setBanner({ type: 'success', text: 'Product updated.' })
    } else {
      // create
      const newProduct = { ...product, id: Date.now().toString() }
      setProducts([...products, newProduct])
      setBanner({ type: 'success', text: 'Product created.' })
    }
    setEditingId(null)
    setShowForm(false)
  }

  function handleDelete(id) {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
      setBanner({ type: 'success', text: 'Product deleted.' })
    }
  }

  function handleResetStorage() {
    if (confirm('Resetting storage will clear all products. Are you sure?')) {
      setProducts([])
      setBanner({ type: 'success', text: 'Storage reset.' })
    }
  }

  function startEdit(id) {
    setEditingId(id)
    setShowForm(true) 
  }

  function startCreate() {
    setEditingId(null)
    setShowForm(true)
  }

  return (
    <div className="container py-3">
      <header className="mb-3 d-flex justify-content-between align-items-center">
        <h1 className="h3 m-0">Product Manager</h1>

        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={handleResetStorage}
        >
          Reset Storage
        </button>
      </header>

      <Toolbar
        query={query}
        setQuery={setQuery}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortDir={sortDir}
        setSortDir={setSortDir}
        showForm={showForm}
        setShowForm={setShowForm}
      />

      {banner && <Message type={banner.type} text={banner.text} />}

      {showForm ? (
        <div className="mb-3">
          <ProductForm
            initialValues={editingId ? products.find(p => p.id === editingId) : undefined}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : (
        <div className="mb-3">
          <button className="btn btn-primary" onClick={startCreate}>
            Add Product
          </button>
        </div>
      )}

      <ProductList
        products={visible} onEdit={startEdit} onDelete={handleDelete}
      />
    </div>
  )
}
