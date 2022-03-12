/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
//获取字符串长度，中文算2个字符
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
function getCHSLength(str) {
    return str.replace(/[^\x00-\xff]/g, '**').length;
}

export { getCHSLength as default };
