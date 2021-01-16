/**
 * 去除换行
 * @param {String} string 带html标签的字符串
 * @returns {String}
 */
const clearBr = string => {
  return string
    .replace(/<\/br>/g, '')
    .replace(/<br>/g, '')
    .replace(/[\r\n]/g, '')
}

export default clearBr
