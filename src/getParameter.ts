/**
 * 获取单个URL参数
 *
 * @param name - 参数名称
 * @returns 返回参数值
 */
function getParameter(name: string): string | null {
	const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
	const r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2])
	return null
}

export default getParameter
