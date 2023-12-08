import parseUrlParam from './parseUrlParam'
import inBrowser from './inBrowser'

/**
 * Get a single query parameter (behind "#")
 *
 * @example
 * ```js
 * getQueryParam('key1')
 * // key1 => xxx
 *
 * getQueryParam('key1', 'https://test.com?key1=100#/home?key1=200')
 * // key1 => 200
 * ```
 * @since 5.0.0
 * @param key - key name
 * @param url - pass in the url string
 * @returns - result
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
