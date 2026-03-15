import inBrowser from './inBrowser'
import parseUrlParam from './parseUrlParam'

/**
 * Get a single query parameter (behind "#", from hash)
 *
 * @example
 * ```js
 * // From current page URL hash
 * // URL: https://example.com#/page?token=abc123
 * getQueryParam('token')
 * // 'abc123'
 *
 * // With custom URL
 * getQueryParam('key1', 'https://test.com?key1=100#/home?key1=200')
 * // '200' (gets value from hash, not search)
 *
 * // Missing parameter
 * getQueryParam('nonexistent')
 * // undefined
 *
 * // URL encoded values
 * getQueryParam('name', 'https://example.com#/page?name=John%20Doe')
 * // 'John Doe'
 * ```
 * @since 5.0.0
 * @param key - parameter name
 * @param url - URL string (optional, uses current location.href if not provided)
 * @returns - parameter value or undefined
 */
function getQueryParam(key: string): string | undefined
function getQueryParam(key: string, url: string): string | undefined
function getQueryParam(key: string, url?: string): string | undefined {
	if (!key) {
		console.info('key is required')

		return undefined
	} else if (!url) {
		if (!inBrowser) {
			console.info('url is required')

			return undefined
		}
		url = location.href
	}
	const [before, after] = url.split('#')

	url = after || before
	url = url.slice(url.lastIndexOf('?'))

	return parseUrlParam(url)[key] as string | undefined
}

export default getQueryParam
