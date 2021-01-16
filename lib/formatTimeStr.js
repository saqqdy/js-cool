import formatTime from './formatTime'

/**
 * 格式化时间成：刚刚、几分钟前
 * @param {Date/String} time 时间对象或者字符串
 * @param {String} fmt 格式化风格
 * @returns {String} 返回字符串
 */
function formatTimeStr(time = parseInt(time, 10), fmt) {
  var now = new Date().getTime()
  var format = fmt != '' && fmt != null ? fmt : 'MM-dd'
  var old = time
  if (!old || old < 1) {
    return
  }
  var t = now - old
  var newTimeStr = ''
  if (t < 60 * 2) {
    newTimeStr = '刚刚'
  } else if (t < 60 * 60) {
    newTimeStr = parseInt(t / 60) + '\u5206\u949F\u524D'
  } else if (t < 60 * 60 * 24) {
    newTimeStr = parseInt(t / (60 * 60)) + '\u5C0F\u65F6\u524D'
  } else if (t < 60 * 60 * 24 * 30) {
    newTimeStr = parseInt(t / (60 * 60 * 24)) + '\u5929\u524D'
  } else {
    newTimeStr = formatTime(new Date(old), format)
  }
  return newTimeStr
}

export default formatTimeStr
