/**
 * 获取随机字符串带特殊符号
 * @param {Number} len 需要获取随机字符串的长度
 * @returns {String} 随机串
 */
const getRandomStrWidthSpecialChar = (len = 32) => {
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678~!@#$^&*_+=-.' //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  var maxPos = chars.length
  var str = ''
  for (var i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str
}

export default getRandomStrWidthSpecialChar
