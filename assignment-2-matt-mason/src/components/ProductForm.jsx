import React, { useState, useEffect } from 'react'

const EMPTY = { name: '', price: '', stock: '', description: '' }

/**
 * Controlled form with inline validation.
 * Fields: name, price, stock, description.
 * - Show errors under inputs (on blur and on submit).
 * - On valid submit, call onSave(product). Parent decides create vs edit.
 * - Support Edit mode: parent provides initial values and a cancel action.
 */
export default function ProductForm({ initialValues = EMPTY, onSave, onCancel}) {
  
  const [model, setModel] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setModel(initialValues)
    setErrors({})
  }, [initialValues])
  
  function validate() {
    const e = {}
    if (!model.name.trim()) e.name = 'Name is required.'
    const price = Number(model.price)
    if (Number.isNaN(price) || price < 0 || !/^\d+(?:\.\d{1,2})?$/.test(String(model.price))) e.price = 'Price must be a number with up to 2 decimal places (e.g., 12.34)'
    if (!model.stock.toString().trim()) e.stock = 'Stock is required.'
    else {
      const stock = Number(model.stock)
      if (!Number.isInteger(stock) || stock < 0) e.stock = 'Stock must be a non-negative integer.'
    }
    if (!model.description.trim()) e.description = 'Description is required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    // console.log('Submitting:', model)
    if (!validate()) return
    onSave({
      name: model.name.trim(),
      price: Number(model.price),
      stock: Number(model.stock),
      description: model.description.trim(),
    })
    setModel(EMPTY)
  }

  return (
    <form className="row g-3" onSubmit={handleSubmit} noValidate>
      <div className="col-md-6">
        <label className="form-label">Product Name</label>
        <input className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={model.name} onChange={(e) => setModel({...model, name: e.target.value})} onBlur={validate} />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="col-md-3">
        <label className="form-label">Price</label>
        <input className={`form-control ${errors.price ? 'is-invalid' : ''}`} value={model.price} onChange={(e) => setModel({...model, price: e.target.value})} onBlur={validate} />
        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        <div className="form-text">Format: 12.34</div>
      </div>

      <div className="col-md-3">
        <label className="form-label">Stock</label>
        <input className={`form-control ${errors.stock ? 'is-invalid' : ''}`} value={model.stock} onChange={(e) => setModel({...model, stock: e.target.value})} onBlur={validate} />
        {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
      </div>

      <div className="col-12">
        <label className="form-label">Description</label>
        <textarea className={`form-control ${errors.description ? 'is-invalid' : ''}`} value={model.description} onChange={(e) => setModel({...model, description: e.target.value})} onBlur={validate} rows="3"></textarea>
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>

      <div className="col-12 d-flex gap-2">
        <button className="btn btn-primary" type="submit">
          Save
        </button>

        {onCancel && (
          <button className="btn btn-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
