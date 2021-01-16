/**
 * 去除HTML标签保留空格、换行
 * @param {String} string 带html标签的字符串
 * @returns {String}
 */
const clearHtmlExpSN = string => {
  return string.replace(/<\/?[^\/?(br)][^><]*>/gi, '')
}

export default clearHtmlExpSN
