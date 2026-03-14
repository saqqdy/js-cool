export interface DirParamType {
	path?: string[]
	host?: string
}

/**
 * Get directory form URL parameters
 *
 * @example
 * ```js
 * // Basic usage
 * getDirParam('https://example.com/media/video/test.mp4')
 * // { host: 'https://example.com', path: ['media', 'video', 'test.mp4'] }
 *
 * // Current page URL (no argument)
 * // If current URL is 'https://example.com/app/user/profile'
 * getDirParam('')
 * // { host: 'example.com', path: ['app', 'user', 'profile'] }
 *
 * // With query string
 * getDirParam('https://example.com/api/v1/users?id=123')
 * // { host: 'https://example.com', path: ['api', 'v1', 'users?id=123'] }
 * ```
 * @deprecated It will be refactored and renamed getDirParams in the next major release.
 * @since 1.0.1
 * @param url - pass in the url address
 * @returns - parameter object with host and path
 */
function getDirParam(url: string): DirParamType {
	let urlStr =
		url !== '' && typeof url !== 'undefined'
			? url.replace(/^http[s]?:\/\/[^\/]+([\s\S]*)/, '$1')
			: location.pathname // Get the string after the domain name in the url:/post/0703/a1.html
	urlStr = urlStr.replace(/^\//, '')
	const dirParam: DirParamType = { path: [], host: '' }
	// Get the domain name, including http://
	if (url !== '' && typeof url !== 'undefined') {
		const match = url.match(/^http[s]?:\/\/[^\/]+/)
		if (match) dirParam.host = match[0]
	} else dirParam.host = location.host
	if (urlStr.includes('/')) {
		// dirParam = unescape(urlStr).split("/");
		dirParam.path = decodeURI(urlStr).split('/')
	}
	return dirParam // {"host":"http://192.168.2.243:7004","path":["media","video","chidaoyan.mp4"]}
}

export default getDirParam
