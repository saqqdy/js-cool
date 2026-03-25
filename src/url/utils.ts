/**
 * URL parsing and building utilities
 *
 * @module url/utils
 * @since 6.0.0
 */

import { validation } from '../patterns/validation'
import type { ParamScope } from '../URLParams'

export type { ParamScope } from '../URLParams'

/**
 * Value conversion map for query string parsing
 */
export const VALUE_MAP = {
	'-Infinity': -Infinity,
	false: false,
	Infinity,
	NaN: Number.NaN,
	null: null,
	true: true,
	undefined,
} as const

/**
 * Convert string value to appropriate type
 * @param value - String value to convert
 * @returns Converted value
 */
export function convertValue(value: string): unknown {
	if (value in VALUE_MAP) return VALUE_MAP[value as keyof typeof VALUE_MAP]
	if (validation.number.test(value)) return Number(value)
	return value
}

/**
 * URL parsing patterns
 */
export const URL_PATTERNS = {
	/** Matches key=value pairs in query string */
	queryParam: /([^?&=]+)=([^?&=]*)/g,
	/** Matches URL origin (protocol + host) */
	origin: /^(https?:\/\/[^/?#]+)/,
	/** Matches host from origin */
	host: /^https?:\/\/([^/]+)/,
	/** Matches port number */
	port: /:\d+$/,
	/** Matches valid URL */
	url: /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
	/** Matches query string with or without ? prefix */
	queryString: /\?([^#]*)/,
	/** Matches hash fragment */
	hash: /#([^?]*)/,
} as const

// ============================================
// Types
// ============================================

export interface ParseOptions {
	/** Convert special values (true/false/null/undefined/number) */
	covert?: boolean
}

export interface StringifyOptions {
	/** Convert null/undefined to empty string */
	covert?: boolean
	/** URI encode values */
	encode?: boolean
	/** Include ? prefix */
	withQuestionMark?: boolean
}

export type URLInput = string | URL

// ============================================
// Query String Parsing & Building
// ============================================

/**
 * Parse query string to object (like URLSearchParams constructor + conversion)
 *
 * @param str - Query string (with or without ? prefix)
 * @param options - Parse options
 * @returns Parsed object
 *
 * @example
 * ```js
 * parse('?key1=100&key2=true')
 * // { key1: '100', key2: 'true' }
 *
 * parse('key1=100&key2=true', { covert: true })
 * // { key1: 100, key2: true }
 * ```
 */
export function parse(
	str: string,
	options: ParseOptions | boolean = false
): Record<string, unknown> {
	if (!str) {
		return {}
	}

	const covert = typeof options === 'boolean' ? options : (options.covert ?? false)

	// Remove ? prefix if exists
	const searchStr = str.indexOf('?') === 0 ? str.slice(1) : str

	// Use native URLSearchParams if available
	if (typeof URLSearchParams !== 'undefined') {
		const params = new URLSearchParams(searchStr)
		const result: Record<string, unknown> = {}

		for (const [key, value] of params) {
			if (covert) {
				if (value in VALUE_MAP) {
					result[key] = VALUE_MAP[value as keyof typeof VALUE_MAP]
				} else if (validation.number.test(value)) {
					result[key] = Number(value)
				} else {
					result[key] = value
				}
			} else {
				result[key] = value
			}
		}

		return result
	}

	// Fallback: regex implementation
	const result: Record<string, unknown> = {}

	searchStr.replace(URL_PATTERNS.queryParam, (_, key: string, value: string) => {
		const decodedKey = decodeURIComponent(key)
		const decodedValue = decodeURIComponent(value)

		if (covert) {
			if (decodedValue in VALUE_MAP) {
				result[decodedKey] = VALUE_MAP[decodedValue as keyof typeof VALUE_MAP]
			} else if (validation.number.test(decodedValue)) {
				result[decodedKey] = Number(decodedValue)
			} else {
				result[decodedKey] = decodedValue
			}
		} else {
			result[decodedKey] = decodedValue
		}

		return ''
	})

	return result
}

/**
 * Build query string from object (like URLSearchParams.toString)
 *
 * @param params - Key-value object
 * @param options - Build options
 * @returns Query string
 *
 * @example
 * ```js
 * stringify({ key1: '100', key2: true })
 * // '?key1=100&key2=true'
 *
 * stringify({ key1: '测试' }, { encode: true })
 * // '?key1=%E6%B5%8B%E8%AF%95'
 *
 * stringify({ key1: '100' }, { withQuestionMark: false })
 * // 'key1=100'
 * ```
 */
export function stringify(params: Record<string, unknown>, options: StringifyOptions = {}): string {
	if (!params) {
		return ''
	}

	const { covert = false, encode = false, withQuestionMark = true } = options

	// Use native URLSearchParams if available
	if (typeof URLSearchParams !== 'undefined') {
		const searchParams = new URLSearchParams()

		for (const key in params) {
			if (Object.prototype.hasOwnProperty.call(params, key)) {
				const value = params[key]
				const strValue = covert ? String(value ?? '') : String(value)
				searchParams.set(key, encode ? decodeURIComponent(strValue) : strValue)
			}
		}

		const result = searchParams.toString()

		return withQuestionMark ? `?${result}` : result
	}

	// Fallback
	const pairs: string[] = []

	for (const key in params) {
		if (Object.prototype.hasOwnProperty.call(params, key)) {
			const value = params[key]
			const strValue = covert ? String(value ?? '') : String(value)
			pairs.push(`${key}=${encode ? encodeURIComponent(strValue) : strValue}`)
		}
	}

	const result = pairs.join('&')

	return withQuestionMark ? `?${result}` : result
}

// ============================================
// URLSearchParams-like Methods
// ============================================

/**
 * Extract search string from URL input
 */
function getSearchStr(url?: URLInput): string {
	if (!url) {
		if (typeof location === 'undefined') {
			return ''
		}
		return location.search
	}

	if (url instanceof URL) {
		return url.search
	}

	// Extract query string from URL string
	const searchMatch = url.match(URL_PATTERNS.queryString)
	return searchMatch ? `?${searchMatch[1]}` : ''
}

/**
 * Extract hash params string from URL input
 * @example
 * getHashParamStr('https://example.com#/path?a=1&b=2') // 'a=1&b=2'
 */
function getHashParamStr(url?: URLInput): string {
	if (!url) {
		if (typeof location === 'undefined') {
			return ''
		}
		return location.hash
	}

	if (url instanceof URL) {
		return url.hash
	}

	// Extract hash params: #/path?a=1&b=2 or #?a=1&b=2 or #a=1&b=2
	const hashMatch = url.match(/#(.*)$/)
	if (!hashMatch) return ''

	const hashContent = hashMatch[1]
	// Find ? in hash content
	const queryIdx = hashContent.indexOf('?')
	if (queryIdx === -1) return ''

	return hashContent.slice(queryIdx + 1)
}

/**
 * Get parameter string based on scope
 */
function getParamStrByScope(url: URLInput | undefined, scope: ParamScope): string {
	if (scope === 'search') {
		const search = getSearchStr(url)
		return search ? search.slice(1) : ''
	}

	if (scope === 'hash') {
		return getHashParamStr(url)
	}

	// scope === 'all': merge with hash priority
	const searchParams = new URLSearchParams(getSearchStr(url).slice(1))
	const hashParams = new URLSearchParams(getHashParamStr(url))

	// Hash overwrites search
	for (const [key, value] of hashParams) {
		searchParams.set(key, value)
	}

	return searchParams.toString()
}

/**
 * Get the first value associated with a given search parameter (like URLSearchParams.get)
 *
 * @param name - Parameter name
 * @param url - URL string, URL object, or undefined to use current location
 * @param scope - Parameter scope: 'search' | 'hash' | 'all' (default: 'search')
 * @returns Parameter value or null if not found
 *
 * @example
 * ```js
 * get('id', 'https://example.com?id=123') // '123'
 * get('id', 'https://example.com#/home?id=200', 'hash') // '200'
 * get('id', 'https://example.com?id=100#/home?id=200', 'all') // '200' (hash优先)
 * ```
 */
export function get(name: string, url?: URLInput, scope: ParamScope = 'search'): string | null {
	if (!name) return null

	const paramStr = getParamStrByScope(url, scope)
	if (!paramStr) return null

	if (typeof URLSearchParams !== 'undefined') {
		return new URLSearchParams(paramStr).get(name)
	}

	return (parse(paramStr)[name] as string) ?? null
}

/**
 * Get all values associated with a given search parameter (like URLSearchParams.getAll)
 *
 * @param name - Parameter name
 * @param url - URL string, URL object, or undefined to use current location
 * @param scope - Parameter scope: 'search' | 'hash' | 'all' (default: 'search')
 * @returns Array of parameter values
 *
 * @example
 * ```js
 * getAll('id', 'https://example.com?id=1&id=2&id=3')
 * // ['1', '2', '3']
 * ```
 */
export function getAll(name: string, url?: URLInput, scope: ParamScope = 'search'): string[] {
	if (!name) return []

	const paramStr = getParamStrByScope(url, scope)
	if (!paramStr) return []

	if (typeof URLSearchParams !== 'undefined') {
		return new URLSearchParams(paramStr).getAll(name)
	}

	// Fallback: only returns single value
	const value = parse(paramStr)[name]
	return value !== undefined ? [String(value)] : []
}

/**
 * Check if a parameter exists (like URLSearchParams.has)
 *
 * @param name - Parameter name
 * @param url - URL string, URL object, or undefined to use current location
 * @param scope - Parameter scope: 'search' | 'hash' | 'all' (default: 'search')
 * @returns True if parameter exists
 *
 * @example
 * ```js
 * has('token', 'https://example.com?token=abc') // true
 * has('id', 'https://example.com#/home?id=1', 'hash') // true
 * ```
 */
export function has(name: string, url?: URLInput, scope: ParamScope = 'search'): boolean {
	if (!name) return false

	const paramStr = getParamStrByScope(url, scope)
	if (!paramStr) return false

	if (typeof URLSearchParams !== 'undefined') {
		return new URLSearchParams(paramStr).has(name)
	}

	return name in parse(paramStr)
}

/**
 * Set a parameter value, replaces all existing values (like URLSearchParams.set)
 *
 * @param name - Parameter name
 * @param value - Parameter value
 * @param url - URL string or undefined to use current location
 * @returns New URL string with updated parameter
 *
 * @example
 * ```js
 * set('page', 2, 'https://example.com?page=1')
 * // 'https://example.com?page=2'
 * ```
 */
export function set(name: string, value: string | number | boolean, url?: string): string {
	if (!name) return url ?? ''

	let urlObj: URL,
		baseUrl = url

	if (!baseUrl) {
		if (typeof location === 'undefined') {
			return ''
		}
		baseUrl = location.href
	}

	try {
		if (baseUrl.indexOf('http://') === 0 || baseUrl.indexOf('https://') === 0) {
			urlObj = new URL(baseUrl)
		} else if (typeof location !== 'undefined') {
			urlObj = new URL(baseUrl, location.origin)
		} else {
			// Relative path without browser context
			const [pathPart, hashPart] = baseUrl.split('#')
			const [path, existingQuery] = pathPart.split('?')

			const params = new URLSearchParams(existingQuery ?? '')
			params.set(name, String(value))

			const hash = hashPart ? `#${hashPart}` : ''
			return `${path}?${params.toString()}${hash}`
		}

		urlObj.searchParams.set(name, String(value))
		return urlObj.toString()
	} catch {
		return baseUrl
	}
}

/**
 * Append a parameter value (like URLSearchParams.append)
 *
 * @param name - Parameter name
 * @param value - Parameter value
 * @param url - URL string or undefined to use current location
 * @returns New URL string with appended parameter
 *
 * @example
 * ```js
 * append('id', 2, 'https://example.com?id=1')
 * // 'https://example.com?id=1&id=2'
 * ```
 */
export function append(name: string, value: string | number | boolean, url?: string): string {
	if (!name) return url ?? ''

	let urlObj: URL,
		baseUrl = url

	if (!baseUrl) {
		if (typeof location === 'undefined') {
			return ''
		}
		baseUrl = location.href
	}

	try {
		if (baseUrl.indexOf('http://') === 0 || baseUrl.indexOf('https://') === 0) {
			urlObj = new URL(baseUrl)
		} else if (typeof location !== 'undefined') {
			urlObj = new URL(baseUrl, location.origin)
		} else {
			// Relative path without browser context
			const [pathPart, hashPart] = baseUrl.split('#')
			const [path, existingQuery] = pathPart.split('?')

			const params = new URLSearchParams(existingQuery ?? '')
			params.append(name, String(value))

			const hash = hashPart ? `#${hashPart}` : ''
			return `${path}?${params.toString()}${hash}`
		}

		urlObj.searchParams.append(name, String(value))
		return urlObj.toString()
	} catch {
		return baseUrl
	}
}

/**
 * Delete a parameter (like URLSearchParams.delete)
 *
 * @param name - Parameter name
 * @param url - URL string or undefined to use current location
 * @returns New URL string without the parameter
 *
 * @example
 * ```js
 * deleteParam('token', 'https://example.com?token=abc&id=1')
 * // 'https://example.com?id=1'
 * ```
 */
export function deleteParam(name: string, url?: string): string {
	if (!name) return url ?? ''

	let urlObj: URL,
		baseUrl = url

	if (!baseUrl) {
		if (typeof location === 'undefined') {
			return ''
		}
		baseUrl = location.href
	}

	try {
		if (baseUrl.indexOf('http://') === 0 || baseUrl.indexOf('https://') === 0) {
			urlObj = new URL(baseUrl)
		} else if (typeof location !== 'undefined') {
			urlObj = new URL(baseUrl, location.origin)
		} else {
			// Relative path without browser context
			const [pathPart, hashPart] = baseUrl.split('#')
			const [path, existingQuery] = pathPart.split('?')

			const params = new URLSearchParams(existingQuery ?? '')
			params.delete(name)

			const hash = hashPart ? `#${hashPart}` : ''
			const query = params.toString()
			return query ? `${path}?${query}${hash}` : `${path}${hash}`
		}

		urlObj.searchParams.delete(name)
		return urlObj.toString()
	} catch {
		return baseUrl
	}
}

/**
 * Get all parameter names (like URLSearchParams.keys)
 *
 * @param url - URL string, URL object, or undefined to use current location
 * @param scope - Parameter scope: 'search' | 'hash' | 'all' (default: 'search')
 * @returns Array of parameter names
 *
 * @example
 * ```js
 * keys('https://example.com?a=1&b=2')
 * // ['a', 'b']
 * keys('https://example.com?a=1#/home?b=2', 'hash')
 * // ['b']
 * ```
 */
export function keys(url?: URLInput, scope: ParamScope = 'search'): string[] {
	const paramStr = getParamStrByScope(url, scope)
	if (!paramStr) return []

	if (typeof URLSearchParams !== 'undefined') {
		return [...new URLSearchParams(paramStr).keys()]
	}

	return Object.keys(parse(paramStr))
}

/**
 * Get all parameter values (like URLSearchParams.values)
 *
 * @param url - URL string, URL object, or undefined to use current location
 * @param scope - Parameter scope: 'search' | 'hash' | 'all' (default: 'search')
 * @returns Array of parameter values
 *
 * @example
 * ```js
 * values('https://example.com?a=1&b=2&c=3')
 * // ['1', '2', '3']
 * ```
 */
export function values(url?: URLInput, scope: ParamScope = 'search'): string[] {
	const paramStr = getParamStrByScope(url, scope)
	if (!paramStr) return []

	if (typeof URLSearchParams !== 'undefined') {
		return [...new URLSearchParams(paramStr).values()]
	}

	// IE11 fallback: manually extract values
	const parsed = parse(paramStr)
	const result: string[] = []
	for (const key in parsed) {
		if (Object.prototype.hasOwnProperty.call(parsed, key)) {
			result.push(String(parsed[key]))
		}
	}
	return result
}

/**
 * Get all parameter entries (like URLSearchParams.entries)
 *
 * @param url - URL string, URL object, or undefined to use current location
 * @param scope - Parameter scope: 'search' | 'hash' | 'all' (default: 'search')
 * @returns Array of [key, value] pairs
 *
 * @example
 * ```js
 * entries('https://example.com?a=1&b=2')
 * // [['a', '1'], ['b', '2']]
 * ```
 */
export function entries(url?: URLInput, scope: ParamScope = 'search'): [string, string][] {
	const paramStr = getParamStrByScope(url, scope)
	if (!paramStr) return []

	if (typeof URLSearchParams !== 'undefined') {
		return [...new URLSearchParams(paramStr).entries()]
	}

	// IE11 fallback: manually extract entries
	const parsed = parse(paramStr)
	const result: [string, string][] = []
	for (const key in parsed) {
		if (Object.prototype.hasOwnProperty.call(parsed, key)) {
			result.push([key, String(parsed[key])])
		}
	}
	return result
}

// ============================================
// URL Property Extraction (like URL properties)
// ============================================

/**
 * Get origin from URL (like URL.origin)
 *
 * @param url - Full URL
 * @returns Origin string or empty string
 *
 * @example
 * ```js
 * getOrigin('https://example.com:8080/path')
 * // 'https://example.com:8080'
 * ```
 */
export function getOrigin(url: string): string {
	if (!url) return ''

	// Use native URL if available
	if (typeof URL !== 'undefined') {
		try {
			if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
				return new URL(url).origin
			}
		} catch {
			// Fall through to regex
		}
	}

	const match = url.match(URL_PATTERNS.origin)
	return match ? match[1] : ''
}

/**
 * Get host from URL, including port (like URL.host)
 *
 * @param url - Full URL
 * @returns Host string or empty string
 *
 * @example
 * ```js
 * getHost('https://example.com:8080/path')
 * // 'example.com:8080'
 * ```
 */
export function getHost(url: string): string {
	if (!url) return ''

	// Use native URL if available
	if (typeof URL !== 'undefined') {
		try {
			if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
				return new URL(url).host
			}
		} catch {
			// Fall through to regex
		}
	}

	const origin = getOrigin(url)
	if (!origin) return ''

	const match = origin.match(URL_PATTERNS.host)
	return match ? match[1] : ''
}

/**
 * Get hostname from URL, without port (like URL.hostname)
 *
 * @param url - Full URL
 * @returns Hostname string or empty string
 *
 * @example
 * ```js
 * getHostname('https://example.com:8080/path')
 * // 'example.com'
 * ```
 */
export function getHostname(url: string): string {
	if (!url) return ''

	// Use native URL if available
	if (typeof URL !== 'undefined') {
		try {
			if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
				return new URL(url).hostname
			}
		} catch {
			// Fall through to regex
		}
	}

	const host = getHost(url)
	return host ? host.replace(URL_PATTERNS.port, '') : ''
}

/**
 * Get pathname from URL (like URL.pathname)
 *
 * @param url - Full URL
 * @returns Pathname string
 *
 * @example
 * ```js
 * getPathname('https://example.com/api/v1/users?id=123')
 * // '/api/v1/users'
 * ```
 */
export function getPathname(url: string): string {
	if (!url) return ''

	// Use native URL if available
	if (typeof URL !== 'undefined') {
		try {
			if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
				return new URL(url).pathname
			}
			// Relative path
			if (typeof location !== 'undefined') {
				return new URL(url, location.origin).pathname
			}
		} catch {
			// Fall through to regex
		}
	}

	// Remove origin
	let pathPart = url.replace(URL_PATTERNS.origin, '')

	// Remove query and hash
	pathPart = pathPart.split('?')[0].split('#')[0]

	return pathPart || '/'
}

/**
 * Get search (query string) from URL, including ? (like URL.search)
 *
 * @param url - Full URL
 * @returns Search string with ? prefix, or empty string
 *
 * @example
 * ```js
 * getSearch('https://example.com/path?key=value#hash')
 * // '?key=value'
 * ```
 */
export function getSearch(url: string): string {
	if (!url) return ''

	// Use native URL if available
	if (typeof URL !== 'undefined') {
		try {
			if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
				return new URL(url).search
			}
		} catch {
			// Fall through to regex
		}
	}

	const match = url.match(URL_PATTERNS.queryString)
	return match ? `?${match[1]}` : ''
}

/**
 * Get hash from URL, including # (like URL.hash)
 *
 * @param url - Full URL
 * @returns Hash string with # prefix, or empty string
 *
 * @example
 * ```js
 * getHash('https://example.com/path#section')
 * // '#section'
 * ```
 */
export function getHash(url: string): string {
	if (!url) return ''

	// Use native URL if available
	if (typeof URL !== 'undefined') {
		try {
			if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
				return new URL(url).hash
			}
		} catch {
			// Fall through to regex
		}
	}

	const match = url.match(URL_PATTERNS.hash)
	return match ? `#${match[1]}` : ''
}

export type URLPatternName = keyof typeof URL_PATTERNS
