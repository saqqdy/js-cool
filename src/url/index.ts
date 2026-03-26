/**
 * URL class and namespace for URL manipulation
 *
 * @module url
 * @since 6.0.0
 */

import URLParams, { type ParamScope } from '../URLParams'
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

// Re-export ParamScope type
export type { ParamScope }

/**
 * URL class - chainable URL builder with full hash parameter support
 *
 * @example
 * ```ts
 * const u = new Url('https://example.com?id=123')
 * u.get('id') // '123'
 * u.set('page', 2).toString()
 * // 'https://example.com?id=123&page=2'
 *
 * // Hash parameter support (v6.0.0+)
 * const u2 = new Url('https://example.com?token=old#/page?token=new')
 * u2.get('token', 'search') // 'old'
 * u2.get('token', 'hash')   // 'new'
 * u2.get('token', 'all')    // 'new' (hash priority)
 * ```
 */
export class Url {
	private _params: URLParams
	private _url: string

	constructor(url?: string) {
		this._url = url ?? ''
		this._params = new URLParams(this._url)
	}

	// ============================================
	// URLSearchParams-like methods (支持 scope)
	// ============================================

	/**
	 * Get parameter value
	 * @param name - Parameter name
	 * @param scope - 'search' | 'hash' | 'all' (default: 'search')
	 * @returns Parameter value or null if not found
	 */
	get(name: string, scope: ParamScope = 'search'): string | null {
		return this._params.get(name, scope)
	}

	/**
	 * Get all values for parameter
	 * @param name - Parameter name
	 * @param scope - 'search' | 'hash' | 'all' (default: 'search')
	 * @returns Array of parameter values
	 */
	getAll(name: string, scope: ParamScope = 'search'): string[] {
		return this._params.getAll(name, scope)
	}

	/**
	 * Check if parameter exists
	 * @param name - Parameter name
	 * @param scope - 'search' | 'hash' | 'all' (default: 'search')
	 * @returns True if parameter exists
	 */
	has(name: string, scope: ParamScope = 'search'): boolean {
		return this._params.has(name, scope)
	}

	/**
	 * Set parameter value (chainable)
	 * @param name - Parameter name
	 * @param value - Parameter value
	 * @param scope - 'search' | 'hash' (default: 'search')
	 * @returns this
	 */
	set(name: string, value: string | number | boolean, scope: 'search' | 'hash' = 'search'): this {
		this._params.set(name, value, scope)
		this._url = this._params.toURL()
		return this
	}

	/**
	 * Append parameter value (chainable)
	 * @param name - Parameter name
	 * @param value - Parameter value
	 * @param scope - 'search' | 'hash' (default: 'search')
	 * @returns this
	 */
	append(
		name: string,
		value: string | number | boolean,
		scope: 'search' | 'hash' = 'search'
	): this {
		this._params.append(name, value, scope)
		this._url = this._params.toURL()
		return this
	}

	/**
	 * Delete parameter (chainable)
	 * @param name - Parameter name
	 * @param scope - 'search' | 'hash' | 'all' (default: 'all')
	 * @returns this
	 */
	delete(name: string, scope: ParamScope = 'all'): this {
		this._params.delete(name, scope)
		this._url = this._params.toURL()
		return this
	}

	/**
	 * Get all parameter names
	 * @param scope - 'search' | 'hash' | 'all' (default: 'search')
	 * @returns Array of parameter names
	 */
	keys(scope: ParamScope = 'search'): string[] {
		return this._params.keys(scope)
	}

	/**
	 * Get all parameter values
	 * @param scope - 'search' | 'hash' | 'all' (default: 'search')
	 * @returns Array of parameter values
	 */
	values(scope: ParamScope = 'search'): string[] {
		return this._params.values(scope)
	}

	/**
	 * Get all parameter entries
	 * @param scope - 'search' | 'hash' | 'all' (default: 'search')
	 * @returns Array of [key, value] pairs
	 */
	entries(scope: ParamScope = 'search'): [string, string][] {
		return this._params.entries(scope)
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
	// Hash path operations (new in v6.0.0)
	// ============================================

	/**
	 * Get hash path (e.g., '/path/to/page' from '#/path/to/page?a=1')
	 */
	getHashPath(): string {
		return this._params.getHashPath()
	}

	/**
	 * Set hash path (chainable)
	 */
	setHashPath(path: string): this {
		this._params.setHashPath(path)
		this._url = this._params.toURL()
		return this
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
		this._params = new URLParams(this._url)
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
		this._params = new URLParams(this._url)
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
	 * @param scope - 'search' | 'hash' | 'all' (default: 'search')
	 * @returns Object with all parameters
	 */
	toParams(scope: ParamScope = 'search'): Record<string, string> {
		return this._params.toObject(scope)
	}

	/**
	 * Get detailed parameter info with source tracking
	 */
	toDetailObject(): {
		search: Record<string, string>
		hash: Record<string, string>
		all: Record<string, string>
		source: Record<string, 'search' | 'hash' | 'both'>
	} {
		return this._params.toDetailObject()
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
 *
 * // Hash parameter support (v6.0.0+)
 * url.get('id', 'https://example.com?id=100#/home?id=200', 'hash') // '200'
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
	convertValue,
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
