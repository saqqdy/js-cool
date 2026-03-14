import parseUrlParam from './parseUrlParam'
import inBrowser from './inBrowser'

/**
 * Get all URL parameters (from the "location.search", before "#")
 *
 * @example
 * ```js
 * // From URL string
 * getUrlParams('https://test.com?key1=100#/home?key1=200')
 * // { key1: '100' }
 *
 * // With type conversion
 * getUrlParams('https://test.com?id=100&active=true#/page', true)
 * // { id: 100, active: true }
 *
 * // From current page (no arguments)
 * // URL: https://example.com?token=abc&userId=123#/page
 * getUrlParams()
 * // { token: 'abc', userId: '123' }
 *
 * // With conversion from current page
 * getUrlParams(true)
 * // { token: 'abc', userId: 123 }
 * ```
 * @since 5.0.0
 * @param url - URL string or boolean for type conversion
 * @param covert - Converts specific strings to corresponding values
 * @returns - object with all parameters
 */
function getUrlParams(url: string): Record<string, string>
function getUrlParams(url: boolean): Record<string, unknown>
function getUrlParams(url: string, covert: boolean): Record<string, unknown>
function getUrlParams(
	url?: string | boolean,
	covert?: boolean
): Record<string, string | unknown> | null {
	if (!url || typeof url === 'boolean') {
		if (!inBrowser) {
			console.info('url is required')
			return null
		}
		typeof url === 'boolean' && (covert = url)
		url = location.search
	} else {
		url = url.slice(url.indexOf('?')).split('#')[0]
	}
	return parseUrlParam(url, covert)
}

export default getUrlParams
