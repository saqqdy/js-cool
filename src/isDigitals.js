/**
 * 是否为由数字组成的字符串
 * @param {String} str 待检测的字符串
 * @returns {Boolean} 返回true/false
 */
const isDigitals = str => {
  return /^[0-9]*$/.test(str)
}

export default isDigitals
