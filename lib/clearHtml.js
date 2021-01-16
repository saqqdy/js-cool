/**
 * 去除HTML标签
 * @param {String} string 带html标签的字符串
 * @returns {String}
 */
const clearHtml = string => {
  return string.replace(/<\/?.+?>/g, '').replace(/[\r\n]/g, '')
}

export default clearHtml
