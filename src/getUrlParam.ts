import parseUrlParam from './parseUrlParam'
import inBrowser from './inBrowser'

/**
 * Get a single URL parameter (from the "location.search", before "#")
 *
 * @example
 * ```js
 * getQueryParam('key1'); // key1 => xxx
 * getQueryParam('key1', 'https://test.com?key1=100#/home?key1=200'); // key1 => 100
 * ```
 * @param key - key name
 * @param url - pass in the url string
 * @returns returns result
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
