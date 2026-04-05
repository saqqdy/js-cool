import { hasOwn } from '../_compat'
import inBrowser from '../inBrowser'

export type ParamScope = 'search' | 'hash' | 'all'

export interface ParseOptions {
	/** Whether to convert special values (true/false/null/numbers) */
	convert?: boolean
}

export interface StringifyOptions {
	convert?: boolean
	encode?: boolean
	withQuestionMark?: boolean
}

/** Value conversion map */
const VALUE_MAP: Record<string, unknown> = {
	'-Infinity': -Infinity,
	false: false,
	Infinity,
	NaN: Number.NaN,
	null: null,
	true: true,
	undefined,
}

/** Convert string value to appropriate type */
function convertValue(value: string): unknown {
	if (value in VALUE_MAP) return VALUE_MAP[value]
	if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value)
	return value
}

/**
 * URL handler - chainable building + parameter management
 *
 * @description
 * Enhanced URLSearchParams that solves the issue of native URL not being able to parse hash parameters.
 * Supports parameter operations in both search and hash scopes, with hash parameters having higher priority.
 *
 * @example
 * ```ts
 * // Basic usage
 * const u = new Url('https://a.cn/?id=1#/path?token=abc')
 * u.get('id')              // '1' (search)
 * u.get('token')           // 'abc' (hash priority)
 * u.get('id', 'search')    // '1'
 * u.get('id', 'hash')      // null
 *
 * // Chainable modification
 * u.set('page', 2)
 *   .path('users', '123')
 *   .toString()
 *
 * // URL property access
 * u.origin    // 'https://a.cn'
 * u.pathname  // '/'
 * u.host      // 'a.cn'
 *
 * // Hash path operations
 * u.getHashPath()           // '/path'
 * u.setHashPath('/detail')
 *
 * // Detailed info
 * u.toObject()              // { id: '1', token: 'abc' }
 * u.toDetailObject()        // Distinguish parameter sources
 * ```
 *
 * @since 6.0.0
 */
export class Url {
	private _search: URLSearchParams
	private _hash: URLSearchParams
	private _url: URL | null
	private _hashPath: string

	constructor(url?: string | URL) {
		if (!url && inBrowser) url = location.href

		if (url instanceof URL) {
			this._url = url
		} else if (typeof url === 'string') {
			this._url = this._parse(url)
		} else {
			this._url = null
		}

		this._search = this._url?.searchParams ?? new URLSearchParams()
		const { path, params } = this._parseHash(this._url?.hash ?? '')
		this._hash = params
		this._hashPath = path
	}

	// ============ URL Properties ============

	/** Get origin */
	get origin(): string {
		return this._url?.origin ?? ''
	}

	/** Get host (with port) */
	get host(): string {
		return this._url?.host ?? ''
	}

	/** Get hostname (without port) */
	get hostname(): string {
		return this._url?.hostname ?? ''
	}

	/** Get pathname */
	get pathname(): string {
		return this._url?.pathname ?? '/'
	}

	/** Get search (with ?) */
	get search(): string {
		return this._search.toString() ? `?${this._search}` : ''
	}

	/** Get hash (with #) */
	get hash(): string {
		return this._buildHash()
	}

	// ============ Parameter Reading ============

	/**
	 * Get parameter value
	 * @param name - Parameter name
	 * @param scope - Scope, default 'all' (hash priority)
	 */
	get(name: string, scope?: ParamScope): string | null {
		if (scope === 'search') return this._search.get(name)
		if (scope === 'hash') return this._hash.get(name)
		return this._hash.get(name) ?? this._search.get(name)
	}

	/**
	 * Get all values for a parameter name
	 */
	getAll(name: string, scope?: ParamScope): string[] {
		if (scope === 'search') return this._search.getAll(name)
		if (scope === 'hash') return this._hash.getAll(name)
		return [...this._search.getAll(name), ...this._hash.getAll(name)]
	}

	/**
	 * Check if parameter exists
	 */
	has(name: string, scope?: ParamScope): boolean {
		if (scope === 'search') return this._search.has(name)
		if (scope === 'hash') return this._hash.has(name)
		return this._search.has(name) || this._hash.has(name)
	}

	/**
	 * Get all parameter names
	 */
	keys(scope?: ParamScope): string[] {
		if (scope === 'search') return [...this._search.keys()]
		if (scope === 'hash') return [...this._hash.keys()]
		return [...new Set([...this._search.keys(), ...this._hash.keys()])]
	}

	/**
	 * Get all parameter values
	 */
	values(scope?: ParamScope): string[] {
		return this.keys(scope)
			.map(k => this.get(k))
			.filter((v): v is string => v !== null)
	}

	/**
	 * Get all key-value pairs
	 */
	entries(scope?: ParamScope): [string, string][] {
		return this.keys(scope).map(k => [k, this.get(k)!] as [string, string])
	}

	// ============ Parameter Writing (Chainable) ============

	/**
	 * Set parameter (overwrite)
	 * @param name - Parameter name
	 * @param value - Parameter value
	 * @param scope - Default 'search'
	 */
	set(name: string, value: string | number | boolean, scope?: 'search' | 'hash'): this {
		const params = scope === 'hash' ? this._hash : this._search
		params.set(name, String(value))
		return this
	}

	/**
	 * Append parameter
	 */
	append(name: string, value: string | number | boolean, scope?: 'search' | 'hash'): this {
		const params = scope === 'hash' ? this._hash : this._search
		params.append(name, String(value))
		return this
	}

	/**
	 * Delete parameter
	 */
	delete(name: string, scope?: ParamScope): this {
		if (scope === 'all' || !scope) {
			this._search.delete(name)
			this._hash.delete(name)
		} else {
			const params = scope === 'hash' ? this._hash : this._search
			params.delete(name)
		}
		return this
	}

	/**
	 * Clear all parameters
	 */
	clear(scope?: ParamScope): this {
		if (scope === 'hash') {
			this._hash = new URLSearchParams()
		} else if (scope === 'search') {
			this._search = new URLSearchParams()
		} else {
			this._search = new URLSearchParams()
			this._hash = new URLSearchParams()
		}
		return this
	}

	// ============ Path Operations ============

	/**
	 * Set pathname
	 * @example
	 * ```ts
	 * new Url('https://api.example.com')
	 *   .path('users', '123')
	 *   .toString()
	 * // 'https://api.example.com/users/123'
	 * ```
	 */
	path(...segments: string[]): this {
		if (!this._url) return this
		const normalized = segments.map(s => s.replace(/^\/|\/$/g, '')).filter(Boolean)
		this._url.pathname = normalized.length > 0 ? `/${normalized.join('/')}` : '/'
		return this
	}

	/**
	 * Get hash path (part after # and before ?)
	 */
	getHashPath(): string {
		return this._hashPath
	}

	/**
	 * Set hash path
	 */
	setHashPath(path: string): this {
		this._hashPath = path
		return this
	}

	// ============ Output ============

	/**
	 * Convert to object
	 */
	toObject(scope?: ParamScope): Record<string, string> {
		return Object.fromEntries(this.entries(scope))
	}

	/**
	 * Convert to detailed object (distinguish sources)
	 */
	toDetailObject(): {
		search: Record<string, string>
		hash: Record<string, string>
		all: Record<string, string>
		source: Record<string, 'search' | 'hash' | 'both'>
	} {
		const search = this.toObject('search')
		const hash = this.toObject('hash')
		const source: Record<string, 'search' | 'hash' | 'both'> = {}

		for (const k of Object.keys(search)) source[k] = 'search'
		for (const k of Object.keys(hash)) {
			source[k] = k in source ? 'both' : 'hash'
		}

		return { search, hash, all: this.toObject(), source }
	}

	/**
	 * Convert to string
	 */
	toString(): string {
		return this.toURL()
	}

	/**
	 * Build complete URL
	 */
	toURL(): string {
		const base = this._url ? this._url.origin + this._url.pathname : '/'
		const search = this._search.toString()
		const hashParams = this._hash.toString()

		let hash = ''
		if (this._hashPath || hashParams) {
			hash = '#'
			if (this._hashPath) hash += this._hashPath
			if (hashParams) hash += `?${hashParams}`
		}

		return `${base}${search ? `?${search}` : ''}${hash}`
	}

	// ============ Iterator ============

	[Symbol.iterator](): Iterator<[string, string]> {
		const entries = this.entries()
		let i = 0
		return {
			next: () => {
				if (i < entries.length) {
					return { value: entries[i++], done: false }
				}
				return { value: undefined, done: true } as IteratorReturnResult<undefined>
			},
		}
	}

	// ============ Static Methods (Utility Functions) ============

	/**
	 * Parse query string to object
	 *
	 * @example
	 * ```ts
	 * Url.parse('?a=1&b=true')
	 * // { a: '1', b: 'true' }
	 *
	 * Url.parse('?a=1&b=true', { convert: true })
	 * // { a: 1, b: true }
	 * ```
	 */
	static parse(str: string, options?: ParseOptions | boolean): Record<string, unknown> {
		if (!str) return {}
		const convert = typeof options === 'boolean' ? options : (options?.convert ?? false)
		const result: Record<string, unknown> = {}
		for (const [k, v] of new URLSearchParams(str.replace(/^\?/, ''))) {
			result[k] = convert ? convertValue(v) : v
		}
		return result
	}

	/**
	 * Stringify object to query string
	 *
	 * @example
	 * ```ts
	 * Url.stringify({ a: 1, b: true })
	 * // '?a=1&b=true'
	 * ```
	 */
	static stringify(params: Record<string, unknown>, options?: StringifyOptions): string {
		if (!params) return ''
		const { convert = false, encode = false, withQuestionMark = true } = options ?? {}
		const sp = new URLSearchParams()
		for (const k in params) {
			if (hasOwn(params, k)) {
				const v = convert ? String(params[k] ?? '') : String(params[k])
				sp.set(k, encode ? decodeURIComponent(v) : v)
			}
		}
		const s = sp.toString()
		return withQuestionMark ? `?${s}` : s
	}

	/**
	 * Get URL origin
	 */
	static getOrigin(url: string): string {
		try {
			return new URL(url).origin
		} catch {
			return url.match(/^https?:\/\/[^/?#]+/)?.[0] ?? ''
		}
	}

	/**
	 * Get URL host (with port)
	 */
	static getHost(url: string): string {
		try {
			return new URL(url).host
		} catch {
			return ''
		}
	}

	/**
	 * Get URL hostname (without port)
	 */
	static getHostname(url: string): string {
		try {
			return new URL(url).hostname
		} catch {
			return ''
		}
	}

	/**
	 * Get URL pathname
	 */
	static getPathname(url: string): string {
		try {
			return new URL(url).pathname
		} catch {
			return '/'
		}
	}

	/**
	 * Get URL search (with ?)
	 */
	static getSearch(url: string): string {
		try {
			return new URL(url).search
		} catch {
			return ''
		}
	}

	/**
	 * Get URL hash (with #)
	 */
	static getHash(url: string): string {
		try {
			return new URL(url).hash
		} catch {
			return ''
		}
	}

	/**
	 * Create from current page URL
	 */
	static current(): Url | null {
		return inBrowser ? new Url(location.href) : null
	}

	/**
	 * Create from query string
	 */
	static fromQueryString(queryString: string): Url {
		const search = queryString.startsWith('?') ? queryString : `?${queryString}`
		return new Url(`http://localhost${search}`)
	}

	// ============ Private Methods ============

	private _parse(url: string): URL | null {
		try {
			if (url.startsWith('http://') || url.startsWith('https://')) {
				return new URL(url)
			}
			if (inBrowser) {
				return new URL(url, location.origin)
			}
			return new URL(`http://localhost${url.startsWith('/') ? '' : '/'}${url}`)
		} catch {
			return null
		}
	}

	private _parseHash(hash: string): { path: string; params: URLSearchParams } {
		if (!hash || hash === '#') {
			return { path: '', params: new URLSearchParams() }
		}
		const content = hash.slice(1)
		const idx = content.indexOf('?')
		if (idx === -1) {
			return { path: content, params: new URLSearchParams() }
		}
		return {
			path: content.slice(0, idx),
			params: new URLSearchParams(content.slice(idx + 1)),
		}
	}

	private _buildHash(): string {
		if (!this._hashPath && !this._hash.toString()) return ''
		let result = '#'
		if (this._hashPath) result += this._hashPath
		if (this._hash.toString()) result += `?${this._hash}`
		return result
	}
}

export default Url
