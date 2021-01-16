/**
 * 去除HTML标签及换行
 * @param {String} string 带html标签的字符串
 * @returns {String}
 */
const clearHtmlN = string => {
  return string.replace(/<\/?.+?>|[\r\n]/g, '')
}

export default clearHtmlN
