/**
 * 去除HTML标签及空格、换行
 * @param {String} string 带html标签的字符串
 * @returns {String}
 */
const clearHtmlNS = string => {
  return string.replace(/<\/?.+?>|[\r\n\s]|(\ )/g, '')
}

export default clearHtmlNS
