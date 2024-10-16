import inBrowser from './inBrowser'

/**
 * Detect if the client is a 360 browser
 *
 * @example
 * ```js
 * // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36 QIHU 360EE'
 * // true
 *
 * // 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36'
 * // true
 * ```
 * @since 5.22.0
 * @param userAgent - ua, allowed to be undefined, default takes navigator.userAgent
 * @returns - result
 */
function isNumberBrowser(userAgent?: string): boolean {
	if (!userAgent && !inBrowser) return false
	userAgent = userAgent || navigator.userAgent

	return (
		isNumberBrowserByUserAgent(userAgent) ||
		isNumberBrowserByDll('np-mswmp.dll') ||
		isNumberBrowserByMimeTypes('type', 'application/vnd.chromium.remoting-viewer')
	)
}

/**
 * Detect if the client is a 360 browser by userAgent
 *
 * @since 5.22.0
 * @param userAgent - ua, allowed to be undefined, default takes navigator.userAgent
 * @returns - result
 */
function isNumberBrowserByUserAgent(userAgent?: string): boolean {
	userAgent = userAgent || navigator.userAgent
	const ua = userAgent.toLowerCase()
	if (ua.includes('360se') || ua.includes('360ee')) return true
	else if (userAgent.includes('Safari') && ua.includes('wow64')) return true
	return false
}

/**
 * Detect if the client is a 360 browser by check dll file
 *
 * @since 5.22.0
 * @param filename - file name
 * @returns - result
 */
function isNumberBrowserByDll(filename: string) {
	if (navigator.userAgent.includes('Safari')) {
		for (const key in navigator.plugins) {
			if (navigator.plugins[key].filename === filename) return true
		}
	}
	return false
}

/**
 * Detect if the client is a 360 browser by check mimeTypes
 *
 * @since 5.22.0
 * @param option - mime option
 * @param value - mime value
 * @returns - result
 */
function isNumberBrowserByMimeTypes(option: string, value: string) {
	const mimeTypes: any = navigator.mimeTypes
	for (const mt in mimeTypes) {
		if (mimeTypes[mt][option] === value) return true
	}
	return false
}

export default isNumberBrowser
