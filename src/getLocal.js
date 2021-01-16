/**
 * 读取localStorage
 * @param {String} name 名称
 * @returns {String} 返回localStorage
 */
function getLocal(name) {
  var str = localStorage.getItem(name)
  var exp = new Date()
  if (str) {
    var obj = JSON.parse(str)
    if (!obj.hasOwnProperty('value') || !obj.hasOwnProperty('expires')) {
      return null
    } else {
      if (!obj.expires || obj.expires > exp.getTime()) {
        return obj.value
      } else {
        localStorage.removeItem(name)
        return null
      }
    }
  } else {
    return null
  }
}

export default getLocal