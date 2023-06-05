/**
 * Get URL parameters
 *
 * @param url - pass in url parameters
 * @returns returns a list of parameters
 */
function getUrlParam(url: string): object {
	url =
		url !== '' && typeof url !== 'undefined'
			? url.substr(url.indexOf('?')).split('#')[0]
			: location.search // Get the string in the url after the "?" string after the character
	const search = url.substring(url.lastIndexOf('?') + 1)
	const obj: any = {}
	const reg = /([^?&=]+)=([^?&=]*)/g
	search.replace(reg, function (rs, $1, $2) {
		const name = decodeURIComponent($1)
		const val = String(decodeURIComponent($2))
		obj[name] = val
		return rs
	})
	return obj
}

export default getUrlParam
