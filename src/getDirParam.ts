export interface DirParamType {
	path?: string[]
	host?: string
}

/**
 * Get directory form URL parameters
 *
 * @deprecated It will be refactored and renamed getDirParams in the next major release.
 * @param url - pass in the url address
 * @returns return parameter object
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
