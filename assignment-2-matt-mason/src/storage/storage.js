export const STORAGE_KEY = 'a2_products'

/**
 * Return an array of products from localStorage.
 * Safely parse JSON with try/catch.
 * Return [] if missing or malformed.
 */
export function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return JSON.parse(raw) || []
  } catch (error) {
    return [];
  }
}

/**
 * Persist the full list of products to localStorage.
 * Use JSON.stringify with try/catch.
 * If write fails (quota), surface an error to the caller.
 */
export function writeAll(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch (error) {
    throw error
  }
}

/**
 * Clear all persisted products.
 */
export function resetAll() {
  localStorage.removeItem(STORAGE_KEY)
}
