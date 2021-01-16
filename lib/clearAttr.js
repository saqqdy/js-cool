/**
 * 去除HTML标签所有属性
 * @param {String} string 传入字符串
 * @returns {String}
 */
const clearAttr = string => {
  return string.replace(/<([a-zA-Z1-7]+)\s*[^><]*>/g, '<$1>')
}

export default clearAttr
