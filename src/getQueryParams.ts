import inBrowser from './inBrowser'
import parseUrlParam from './parseUrlParam'

/**
 * Get all URL parameters (behind "#", from hash)
 *
 * @example
 * ```js
 * // From URL string
 * getQueryParams('https://test.com?key1=100#/home?key1=200')
 * // { key1: '200' }
 *
 * // With type conversion
 * getQueryParams('https://test.com#/page?id=100&active=true', true)
 * // { id: 100, active: true }
 *
 * // From current page (no arguments)
 * // URL: https://example.com#/page?token=abc&userId=123
 * getQueryParams()
 * // { token: 'abc', userId: '123' }
 *
 * // With conversion from current page
 * getQueryParams(true)
 * // { token: 'abc', userId: 123 }
 * ```
 * @since 5.0.0
 * @param url - URL string or boolean for type conversion
 * @param covert - Converts specific strings to corresponding values
 * @returns - object with all parameters
 */
function getQueryParams(url: string): Record<string, string>
function getQueryParams(url: boolean): Record<string, unknown>
function getQueryParams(url: string, covert: boolean): Record<string, unknown>
function getQueryParams(
	url?: string | boolean,
	covert?: boolean
): Record<string, string | unknown> | null {
	if (!url || typeof url === 'boolean') {
		if (!inBrowser) {
			console.info('url is required')

			return null
		}
		typeof url === 'boolean' && (covert = url)
		url = location.href
	}
	const [before, after] = url.split('#')

	url = after || before
	url = url.slice(url.lastIndexOf('?'))

	return parseUrlParam(url, covert)
}

export default getQueryParams
