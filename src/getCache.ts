import type { CacheData } from './setCache'

export type { CacheData }

/**
 * Get the cache from localStorage with type inference
 *
 * @example
 * ```ts
 * // Basic usage
 * setCache('key', 'value')
 * getCache<string>('key') // 'value'
 *
 * // With type annotation
 * interface User { id: string; name: string }
 * setCache<User>('user', { id: '1', name: 'John' })
 * const user = getCache<User>('user') // User | null
 *
 * // With expiration
 * setCache('temp', 'value', 10) // expires in 10 seconds
 * getCache<string>('temp') // 'value' (within 10s) or null (after 10s)
 *
 * // Non-existent key returns null
 * getCache('nonexistent') // null
 * ```
 *
 * @since 1.0.2
 * @template T - The expected type of the cached value
 * @param name - Cache key name
 * @returns Cached value or null if not found/expired/unavailable
 */
function getCache<T = unknown>(name: string): T | null {
	// Try to get data from localStorage
	let data: string | null
	try {
		data = localStorage.getItem(name)
	} catch {
		// localStorage not available (e.g., private browsing, SSR)
		return null
	}

	if (!data) return null

	// Try to parse as JSON
	try {
		const obj: CacheData<T> = JSON.parse(data)

		// Check if it's a CacheData structure (set by setCache)
		if (typeof obj === 'object' && obj !== null && ('value' in obj || 'expires' in obj)) {
			// Check expiration
			if (!obj.expires || obj.expires > Date.now()) {
				return obj.value
			}
			// Expired - remove and return null
			try {
				localStorage.removeItem(name)
			} catch {
				// Ignore removal errors
			}
			return null
		}

		// Legacy data (raw JSON without CacheData wrapper)
		return obj as T
	} catch {
		// Not valid JSON - return raw string
		return data as unknown as T
	}
}

export default getCache
