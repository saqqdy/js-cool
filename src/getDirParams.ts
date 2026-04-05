// URL parsing regex patterns
const URL_PATTERNS = {
	origin: /^(https?:\/\/[^/?#]+)/,
	host: /^https?:\/\/([^/]+)/,
	port: /:\d+$/,
} as const

export interface DirParamsResult {
	/** Full origin, e.g., 'https://example.com' */
	origin: string
	/** Hostname + port, e.g., 'example.com:8080' */
	host: string
	/** Hostname (without port), e.g., 'example.com' */
	hostname: string
	/** Full path, e.g., '/api/v1/users' */
	pathname: string
	/** Path segments array, e.g., ['api', 'v1', 'users'] */
	segments: string[]
	/** Query string (without ?), e.g., 'id=123' */
	query: string
	/** Hash value (without #), e.g., 'section' */
	hash: string
}

/**
 * Parse URL using regex fallback (IE11 compatible)
 */
function parseWithRegex(url: string): DirParamsResult {
	const result: DirParamsResult = {
		origin: '',
		host: '',
		hostname: '',
		pathname: '',
		segments: [],
		query: '',
		hash: '',
	}

	if (!url) return result

	// Parse origin and host
	const originMatch = url.match(URL_PATTERNS.origin)
	if (originMatch) {
		result.origin = originMatch[1]
		// Extract host (remove protocol)
		const hostMatch = originMatch[1].match(URL_PATTERNS.host)
		if (hostMatch) {
			result.host = hostMatch[1]
			// Extract hostname (remove port)
			result.hostname = hostMatch[1].replace(URL_PATTERNS.port, '')
		}
	}

	// Extract path part (remove origin)
	let pathPart = originMatch ? url.slice(originMatch[1].length) : url

	// Handle relative paths (no origin case)
	if (!originMatch && pathPart.indexOf('/') !== 0) {
		pathPart = `/${pathPart}`
	}

	// Separate hash
	const hashIndex = pathPart.indexOf('#')
	if (hashIndex > -1) {
		result.hash = pathPart.slice(hashIndex + 1)
		pathPart = pathPart.slice(0, hashIndex)
	}

	// Separate query
	const queryIndex = pathPart.indexOf('?')
	if (queryIndex > -1) {
		result.query = pathPart.slice(queryIndex + 1)
		pathPart = pathPart.slice(0, queryIndex)
	}

	result.pathname = pathPart || '/'
	result.segments = pathPart.split('/').filter(Boolean)

	return result
}

/**
 * Parse URL path information
 *
 * @description Get URL components, supports full URLs and relative paths.
 * Modern browsers use native URL API, IE11 falls back to regex implementation.
 *
 * @param url - URL string, defaults to current page URL (browser environment)
 * @returns URL parsing result object
 *
 * @example
 * ```js
 * // Full URL
 * getDirParams('https://example.com:8080/api/v1/users?id=123#section')
 * // {
 * //   origin: 'https://example.com:8080',
 * //   host: 'example.com:8080',
 * //   hostname: 'example.com',
 * //   pathname: '/api/v1/users',
 * //   segments: ['api', 'v1', 'users'],
 * //   query: 'id=123',
 * //   hash: 'section'
 * // }
 *
 * // Relative path
 * getDirParams('/app/user/profile')
 * // {
 * //   origin: '',
 * //   host: '',
 * //   hostname: '',
 * //   pathname: '/app/user/profile',
 * //   segments: ['app', 'user', 'profile'],
 * //   query: '',
 * //   hash: ''
 * // }
 *
 * // Current page URL (browser environment)
 * getDirParams()
 * // Returns current page parsing result
 * ```
 *
 * @since 6.0.0
 */
function getDirParams(url?: string): DirParamsResult {
	// Use current page URL when no argument
	if (typeof url === 'undefined' || url === '') {
		if (typeof location === 'undefined') {
			return {
				origin: '',
				host: '',
				hostname: '',
				pathname: '',
				segments: [],
				query: '',
				hash: '',
			}
		}
		url = location.href
	}

	// Prefer native URL API (modern browsers)
	if (typeof URL !== 'undefined') {
		try {
			// Handle relative paths
			let urlObj: URL
			if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
				urlObj = new URL(url)
			} else {
				// Relative paths need current origin
				if (typeof location !== 'undefined') {
					urlObj = new URL(url, location.origin)
				} else {
					// Node.js environment: fall back to regex for relative paths
					return parseWithRegex(url)
				}
			}

			return {
				origin: urlObj.origin,
				host: urlObj.host,
				hostname: urlObj.hostname,
				pathname: urlObj.pathname || '/',
				segments: urlObj.pathname.split('/').filter(Boolean),
				query: urlObj.search.slice(1),
				hash: urlObj.hash.slice(1),
			}
		} catch {
			// URL parsing failed, use fallback
			return parseWithRegex(url)
		}
	}

	// Fallback: IE11 and environments without URL support
	return parseWithRegex(url)
}

export default getDirParams
