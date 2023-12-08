import parseUrlParam from './parseUrlParam'
import inBrowser from './inBrowser'

/**
 * Get all URL parameters (behind "#")
 *
 * @example
 * ```js
 * getQueryParams('https://test.com?key1=100#/home?key1=200')
 * // \{"key1":"200"\}
 *
 * getQueryParams('https://test.com?key1=100#/home?key1=200', true)
 * // \{"key1":200\}
 *
 * getQueryParams(true)
 * // \{"key1":200\}
 * ```
 * @since 5.0.0
 * @param url - pass in the url string
 * @param covert - Converts a specific string to a corresponding value (Scientific notation, binary, octal and hexadecimal types of data are not converted, like: 0b111, 0o13, 0xFF, 1e3, -1e-2)
 * @returns - result
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
