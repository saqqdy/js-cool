/**
 * setCookie写入cookie的方法
 * @param {String} name cookie名称
 * @param {*} value 设置要存储的值，可以是对象或字符串
 * @param {Number} seconds cookie有效时间
 */
function setCookie(name, value, seconds) {
  var e = new Date()
  var expires = ''
  if (seconds !== '' && typeof seconds !== 'undefined') {
    seconds = seconds * 1000
    expires = e.getTime() + seconds
  } else {
    seconds = 2592000000 //没有设定时间的默认30天
  }
  var obj = encodeURIComponent(JSON.stringify({ value, expires }))
  e.setTime(e.getTime() + seconds)
  document.cookie = name + '=' + obj + ';expires=' + e.toGMTString() + ';path=/'
}

export default setCookie
