import React from 'react'

/**
 * Dismissing banner for success/error states.
 * Props: { type: 'success' | 'danger', text: string }
 * Auto-dismiss handled by parent via setTimeout.
 */
export default function Message({ type, text }) {
  return <div className={`alert alert-${type}`}>{text}</div>
}
