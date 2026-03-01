import React from 'react'
import ProductCard from './ProductCard'

/**
 * - If no products, show "No products available."
 * - Otherwise map products to <ProductCard />
 * - Do not mutate props; sorting/filtering should happen in parent.
 */
export default function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <div className="alert alert-info">No products available.</div>
  }
  return (
    <div>
      <h2 className="h5 mb-3">Products</h2>
      <div className="row g-3">
        {products.map(p => (
          <div className="col-md-6 col-lg-4" key={p.id}>
            <ProductCard product={p} onEdit={onEdit} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  )
}
