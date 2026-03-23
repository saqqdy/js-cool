/**
 * URL class and namespace for URL manipulation
 *
 * @module url
 * @since 6.0.0
 */

import {
	append,
	deleteParam,
	entries,
	getAll,
	getHash,
	getHost,
	getHostname,
	getOrigin,
	getPathname,
	getSearch,
	has,
	keys,
	parse,
	type ParseOptions,
	set,
	stringify,
	type StringifyOptions,
	URL_PATTERNS,
	type URLInput,
	type URLPatternName,
	VALUE_MAP,
	values,
} from './utils'
import { get as getParam } from './utils'

/**
 * URL class - chainable URL builder
 *
 * @example
 * ```ts
 * const u = new Url('https://example.com?id=123')
 * u.get('id') // '123'
 * u.set('page', 2).toString()
 * // 'https://example.com?id=123&page=2'
 * ```
 */
export class Url {
	private _url: string

	constructor(url?: string) {
		this._url = url ?? ''
	}

	// ============================================
	// URLSearchParams-like methods
	// ============================================

	/**
	 * Get parameter value
	 * @param name - Parameter name
	 * @returns Parameter value or null if not found
	 */
	get(name: string): string | null {
		return getParam(name, this._url)
	}

	/**
	 * Get all values for parameter
	 * @param name - Parameter name
	 * @returns Array of parameter values
	 */
	getAll(name: string): string[] {
		return getAll(name, this._url)
	}

	/**
	 * Check if parameter exists
	 * @param name - Parameter name
	 * @returns True if parameter exists
	 */
	has(name: string): boolean {
		return has(name, this._url)
	}

	/**
	 * Set parameter value (chainable)
	 * @param name - Parameter name
	 * @param value - Parameter value
	 * @returns this
	 */
	set(name: string, value: string | number | boolean): this {
		this._url = set(name, value, this._url)
		return this
	}

	/**
	 * Append parameter value (chainable)
	 * @param name - Parameter name
	 * @param value - Parameter value
	 * @returns this
	 */
	append(name: string, value: string | number | boolean): this {
		this._url = append(name, value, this._url)
		return this
	}

	/**
	 * Delete parameter (chainable)
	 * @param name - Parameter name
	 * @returns this
	 */
	delete(name: string): this {
		this._url = deleteParam(name, this._url)
		return this
	}

	/**
	 * Get all parameter names
	 * @returns Array of parameter names
	 */
	keys(): string[] {
		return keys(this._url)
	}

	/**
	 * Get all parameter values
	 * @returns Array of parameter values
	 */
	values(): string[] {
		return values(this._url)
	}

	/**
	 * Get all parameter entries
	 * @returns Array of [key, value] pairs
	 */
	entries(): [string, string][] {
		return entries(this._url)
	}

	// ============================================
	// URL property extraction (getter)
	// ============================================

	/**
	 * Get origin from URL
	 * @example 'https://example.com:8080'
	 */
	get origin(): string {
		return getOrigin(this._url)
	}

	/**
	 * Get host from URL (including port)
	 * @example 'example.com:8080'
	 */
	get host(): string {
		return getHost(this._url)
	}

	/**
	 * Get hostname from URL (without port)
	 * @example 'example.com'
	 */
	get hostname(): string {
		return getHostname(this._url)
	}

	/**
	 * Get pathname from URL
	 * @example '/api/v1/users'
	 */
	get pathname(): string {
		return getPathname(this._url)
	}

	/**
	 * Get search (query string) from URL
	 * @example '?key=value'
	 */
	get search(): string {
		return getSearch(this._url)
	}

	/**
	 * Get hash from URL
	 * @example '#section'
	 */
	get hash(): string {
		return getHash(this._url)
	}

	// ============================================
	// Path manipulation (chainable)
	// ============================================

	/**
	 * Set pathname (chainable)
	 * @param segments - Path segments to join
	 * @returns this
	 *
	 * @example
	 * ```ts
	 * new Url('https://api.example.com')
	 *   .path('users', '123')
	 *   .toString()
	 * // 'https://api.example.com/users/123'
	 * ```
	 */
	path(...segments: string[]): this {
		const origin = getOrigin(this._url)
		const search = getSearch(this._url)
		const hash = getHash(this._url)

		const normalizedSegments = segments.map(s => s.replace(/^\/|\/$/g, '')).filter(Boolean)
		const pathStr = normalizedSegments.length > 0 ? `/${normalizedSegments.join('/')}` : ''

		this._url = `${origin}${pathStr}${search}${hash}`
		return this
	}

	/**
	 * Set hash (chainable)
	 * @param hash - Hash value (without #)
	 * @returns this
	 */
	setHash(hash: string): this {
		const currentHash = getHash(this._url)
		if (currentHash) {
			this._url = this._url.replace(/#[^?]*/, `#${hash}`)
		} else {
			this._url = `${this._url}#${hash}`
		}
		return this
	}

	// ============================================
	// Parse & Stringify
	// ============================================

	/**
	 * Parse query string to object
	 * @param options - Parse options
	 * @returns Parsed object
	 */
	parse(options?: ParseOptions): Record<string, unknown> {
		return parse(getSearch(this._url), options)
	}

	/**
	 * Convert to string
	 * @returns URL string
	 */
	toString(): string {
		return this._url
	}

	/**
	 * Get params as object
	 * @returns Object with all parameters
	 */
	toParams(): Record<string, string> {
		return Object.fromEntries(this.entries())
	}
}

/**
 * URL namespace - factory method + static utilities
 *
 * @example
 * ```ts
 * // Factory method
 * url.from('https://example.com?id=123').get('id') // '123'
 *
 * // Static methods
 * url.parse('?a=1&b=2') // { a: '1', b: '2' }
 * url.stringify({ a: 1 }) // '?a=1'
 * url.getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
 * ```
 */
export const url = {
	/**
	 * Create Url instance from URL string
	 * @param urlStr - URL string
	 * @returns Url instance
	 *
	 * @example
	 * ```ts
	 * url.from('https://example.com?id=123').get('id') // '123'
	 * url.from('https://example.com').set('page', 2).toString()
	 * ```
	 */
	from: (urlStr?: string): Url => new Url(urlStr),

	// ============================================
	// Static utility methods
	// ============================================

	/** Parse query string to object */
	parse,

	/** Build query string from object */
	stringify,

	// URLSearchParams-like (static)
	get: getParam,
	getAll,
	has,
	set,
	append,
	delete: deleteParam,
	keys,
	values,
	entries,

	// URL property extraction (static)
	getOrigin,
	getHost,
	getHostname,
	getPathname,
	getSearch,
	getHash,

	// Constants
	PATTERNS: URL_PATTERNS,
	VALUE_MAP,
} as const

// Re-export types and utilities
export type { URLPatternName, URLInput, ParseOptions, StringifyOptions }
export {
	URL_PATTERNS,
	VALUE_MAP,
	parse,
	stringify,
	get,
	getAll,
	has,
	set,
	append,
	deleteParam,
	keys,
	values,
	entries,
	getOrigin,
	getHost,
	getHostname,
	getPathname,
	getSearch,
	getHash,
} from './utils'
