import React from 'react'

/**
 * Presentational card for a single product.
 * Show name, price (2 decimals), stock, description.
 * Include Edit and Delete buttons (call parent handlers).
 */
export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text mb-1"><strong>Price:</strong> ${Number(product.price).toFixed(2)}</p>
        <p className="card-text mb-1"><strong>Stock:</strong> {product.stock}</p>
        <p className="card-text text-muted">{product.description}</p>
      </div>
      <div className="card-footer d-flex justify-content-end">
        <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>onEdit(product.id)}>Edit</button>
        <button className="btn btn-sm btn-outline-danger" onClick={()=>onDelete(product.id)}>Delete</button>
      </div>
    </div>
  )
}
