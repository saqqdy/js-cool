/**
 * 是否存在指定函数
 * @param {String} funcName 传入函数名
 * @returns {Boolean} 返回true/false
 */
function isExitsFunction(funcName) {
  try {
    if (typeof eval(funcName) === 'function') {
      return true
    }
  } catch (e) {}
  return false
}

export default isExitsFunction
