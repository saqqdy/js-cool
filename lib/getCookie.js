/**
 * 读取cookies
 * @param {String} name cookie名称
 * @returns {String} 返回cookie字符串
 */
function getCookie(name) {
  var arr = void 0
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) {
    var obj = JSON.parse(decodeURIComponent(arr[2]))
    if (!obj.hasOwnProperty('value') || !obj.hasOwnProperty('expires')) {
      return null
    } else {
      return obj.value
    }
  } else {
    return null
  }
}

export default getCookie
