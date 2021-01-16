/**
 * 是否存在指定变量
 * @param {String} variableName 传入变量名称
 * @returns {Boolean} 返回true/false
 */
function isExitsVariable(variableName) {
  try {
    if (typeof variableName === 'undefined') {
      return false
    } else {
      return true
    }
  } catch (e) {}
  return false
}

export default isExitsVariable
