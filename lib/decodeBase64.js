import decodeUtf8 from "./decodeUtf8";
const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

/**
 * base64解码
 * @param {String} input 需要解码的字符串
 * @returns {String} 解码后的字符串
 */
const decodeBase64 = input => {
  var output = ''
  var chr1, chr2, chr3
  var enc1, enc2, enc3, enc4
  var i = 0
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
  while (i < input.length) {
    enc1 = _keyStr.indexOf(input.charAt(i++))
    enc2 = _keyStr.indexOf(input.charAt(i++))
    enc3 = _keyStr.indexOf(input.charAt(i++))
    enc4 = _keyStr.indexOf(input.charAt(i++))
    chr1 = (enc1 << 2) | (enc2 >> 4)
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
    chr3 = ((enc3 & 3) << 6) | enc4
    output = output + String.fromCharCode(chr1)
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2)
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3)
    }
  }
  output = decodeUtf8(output)
  return output
}

export default decodeBase64
