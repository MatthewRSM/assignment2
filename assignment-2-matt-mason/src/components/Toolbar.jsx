import React from 'react'

/**
 * Toolbar with:
 * - Search input (filters by name as user types)
 * - Sort dropdown (name A–Z/Z–A, price low–high/high–low)
 * - Toggle button to show/hide the form
 *
 * Receive props for current values and onChange handlers.
 */
export default function Toolbar({ query, setQuery, sortKey, setSortKey, sortDir, setSortDir, showForm, setShowForm }) {
  return (
    <div className="d-flex flex-column flex-md-row gap-2 align-items-md-center mb-3">
      <div className="d-flex gap-2 w-100">
        <input className="form-control" placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="form-select w-auto" value={`${sortKey}:${sortDir}`} onChange={(e) => {
          const [key, dir] = e.target.value.split(':')
          setSortKey(key)
          setSortDir(dir)
        }}>
          <option value="name:asc">Name A–Z</option>
          <option value="name:desc">Name Z–A</option>
          <option value="price:asc">Price low–high</option>
          <option value="price:desc">Price high–low</option>
        </select>
      </div>

      <button className={`btn btn-outline-secondary w-100 w-md-auto`} onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Show Form'}
      </button>
    </div>
  )
}
