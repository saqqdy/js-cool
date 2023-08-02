import parseUrlParam from './parseUrlParam'
import inBrowser from './inBrowser'

/**
 * Get all URL parameters (from the "location.search", before "#")
 *
 * @example
 * ```js
 * getUrlParams('https://test.com?key1=100#/home?key1=200'); // \{"key1":"100"\}
 * getUrlParams('https://test.com?key1=100#/home?key1=200', true); // \{"key1":100\}
 * getUrlParams(true); // \{"key1":100\}
 * ```
 * @param url - pass in the url string
 * @param covert - Converts a specific string to a corresponding value (Scientific notation, binary, octal and hexadecimal types of data are not converted, like: 0b111, 0o13, 0xFF, 1e3, -1e-2)
 * @returns returns result
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
