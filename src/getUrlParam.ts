/**
 * 获取URL参数
 *
 * @param url - 传入url参数
 * @returns 返回参数列表
 */
function getUrlParam(url: string): object {
	url =
		url !== '' && typeof url !== 'undefined'
			? url.substr(url.indexOf('?')).split('#')[0]
			: location.search // 获取url中"?"符后的字串
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
