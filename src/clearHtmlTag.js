/**
 * 去除HTML标签及标签里面的文字
 * @param {String} string 带html标签的字符串
 * @returns {String}
 */
const clearHtmlTag = string => {
  return string.replace(/<[^>]+>/g, '')
}

export default clearHtmlTag
