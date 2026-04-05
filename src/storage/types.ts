/**
 * Storage module types
 * @module storage/types
 */

/** Storage data structure (internal use) */
export interface StorageData<T = unknown> {
	expires?: number
	value: T
}

/** Storage options (localStorage / sessionStorage) */
export interface StorageOptions {
	/** Expiration time in seconds */
	expires?: number
}

/** Cookie options */
export interface CookieOptions {
	/** Expiration time in seconds, default 86400 (1 day) */
	expires?: number
	/** Path, default '/' */
	path?: string
	/** Domain */
	domain?: string
	/** Secure only (HTTPS only) */
	secure?: boolean
	/** SameSite policy */
	sameSite?: 'Strict' | 'Lax' | 'None'
}

/** Cookie delete options */
export interface CookieDeleteOptions {
	path?: string
	domain?: string
}

/** Generic Storage API */
export interface StorageAPI {
	/**
	 * Set storage value
	 * @param name - Key name
	 * @param value - Value (any type, auto JSON serialized)
	 * @param options - Options (expires: expiration seconds)
	 */
	set: <T = unknown>(name: string, value: T, options?: StorageOptions) => void

	/**
	 * Get storage value
	 * @param name - Key name
	 * @returns Value or null (not exists/expired/storage unavailable)
	 */
	get: <T = unknown>(name: string) => T | null

	/**
	 * Delete storage value
	 * @param name - Key name
	 */
	delete: (name: string) => void

	/**
	 * Check if key exists
	 * @param name - Key name
	 */
	has: (name: string) => boolean

	/**
	 * Get all key names
	 */
	keys: () => string[]

	/**
	 * Clear all storage
	 */
	clear: () => void

	/**
	 * Get storage item count
	 */
	readonly length: number
}

/** Cookie Storage API */
export interface CookieAPI {
	/**
	 * Set Cookie
	 * @param name - Key name
	 * @param value - Value (string | number | boolean)
	 * @param options - Options
	 */
	set: (name: string, value: string | number | boolean, options?: CookieOptions) => void

	/**
	 * Get single Cookie
	 * @param name - Key name
	 * @returns Value or null
	 */
	get: (name: string) => string | null

	/**
	 * Get all Cookies
	 * @returns Key-value object
	 */
	getAll: () => Record<string, string>

	/**
	 * Delete Cookie
	 * @param name - Key name
	 * @param options - Options (path/domain must match the ones used when setting)
	 */
	delete: (name: string, options?: CookieDeleteOptions) => void

	/**
	 * Check if Cookie exists
	 * @param name - Key name
	 */
	has: (name: string) => boolean

	/**
	 * Clear all Cookies
	 */
	clear: () => void
}

/** Storage namespace */
export interface StorageNamespace {
	/** localStorage storage */
	readonly local: StorageAPI
	/** sessionStorage storage */
	readonly session: StorageAPI
	/** Cookie storage */
	readonly cookie: CookieAPI
}
