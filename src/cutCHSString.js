/**
 * js截取字符串，中英文都能用
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 */
// function cutStrLen(str, len) {
//   var str_length = 0
//   //var a = 0;
//   var str_len = str.length
//   var str_cut = new String()
//   for (var i = 0; i < str_len; i++) {
//     a = str.charAt(i)
//     str_length++
//     if (escape(a).length > 4) {
//       //中文字符的长度经编码之后大于4
//       str_length++
//     }
//     str_cut = str_cut.concat(a)
//     if (str_length >= len) {
//       str_cut = str_cut.concat('...')
//       return str_cut
//     }
//   }
//   //如果给定字符串小于指定长度，则返回源字符串；
//   if (str_length < len) {
//     return str
//   }
// }

/**
 * 截取字符串，中文算2个字节
 * @param {String} str 要截取的字符串
 * @param {Number} len
 * @param {Boolean} hasDot
 * @returns {String} 返回截取后的字符串
 */
function cutCHSString(str, len = str.length, hasDot = false) {
  if (str == '' || !str) {
    return ''
  } else {
    var newLength = 0
    var newStr = ''
    var chineseRegex = /[^\x00-\xff]/g
    var singleChar = ''
    var strLength = str.replace(chineseRegex, '**').length
    for (var i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString()
      if (singleChar.match(chineseRegex) != null) {
        newLength += 2
      } else {
        newLength++
      }
      if (newLength > len) {
        break
      }
      newStr += singleChar
    }

    if (hasDot && strLength > len) {
      newStr += '...'
    }
    return newStr
  }
}

export default cutCHSString
