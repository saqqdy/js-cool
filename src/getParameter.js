/**
 * 获取单个URL参数
 * @param {String} name 参数名称
 * @returns 返回参数值
 */
function getParameter(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

export default getParameter
