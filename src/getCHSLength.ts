// 获取字符串长度，中文算2个字符
// var getStrLen = function getStrLen(str) {
//   var realLength = 0
//   var len = str.length
//   var charCode = -1
//   for (var i = 0; i < len; i++) {
//     charCode = str.charCodeAt(i)
//     if (charCode >= 0 && charCode <= 128) {
//       realLength += 1
//     } else {
//       realLength += 2
//     }
//   }
//   return realLength
// }

/**
 * 获取文本长度，中文算2个字节
 *
 * @param str - 字符串
 * @returns 返回长度
 */
function getCHSLength(str: string): number {
	// eslint-disable-next-line no-control-regex
	return str.replace(/[^\x00-\xFF]/g, '**').length
}

export default getCHSLength
