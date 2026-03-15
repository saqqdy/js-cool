import inBrowser from './inBrowser'
import parseUrlParam from './parseUrlParam'

/**
 * Get a single URL parameter (from the "location.search", before "#")
 *
 * @example
 * ```js
 * // From current page URL search
 * // URL: https://example.com?token=abc123#/page
 * getUrlParam('token')
 * // 'abc123'
 *
 * // With custom URL
 * getUrlParam('key1', 'https://test.com?key1=100#/home?key1=200')
 * // '100' (gets value from search, not hash)
 *
 * // Missing parameter
 * getUrlParam('nonexistent')
 * // undefined
 *
 * // URL encoded values
 * getUrlParam('name', 'https://example.com?name=John%20Doe#/page')
 * // 'John Doe'
 * ```
 * @since 5.0.0
 * @param key - parameter name
 * @param url - URL string (optional, uses current location.search if not provided)
 * @returns - parameter value or undefined
 */
function getUrlParam(key: string): string | undefined
function getUrlParam(key: string, url: string): string | undefined
function getUrlParam(key: string, url?: string): string | undefined {
	if (!key) {
		console.info('key is required')

		return undefined
	} else if (!url) {
		if (!inBrowser) {
			console.info('url is required')

			return undefined
		}
		url = location.search
	} else {
		url = url.slice(url.indexOf('?')).split('#')[0]
	}

	return parseUrlParam(url)[key] as string | undefined
}

export default getUrlParam
