/**
 * 编码Utf8
 * @param {String} input 需要编码的字符串
 * @returns {String} 返回UTF-8编码
 */
const encodeUtf8 = string => {
  string = string.replace(/\r\n/g, '\n')
  var utftext = ''
  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n)
    if (c < 128) {
      utftext += String.fromCharCode(c)
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192)
      utftext += String.fromCharCode((c & 63) | 128)
    } else {
      utftext += String.fromCharCode((c >> 12) | 224)
      utftext += String.fromCharCode(((c >> 6) & 63) | 128)
      utftext += String.fromCharCode((c & 63) | 128)
    }
  }
  return utftext
}

export default encodeUtf8
