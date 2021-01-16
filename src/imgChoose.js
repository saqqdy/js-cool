/**
 * 扩展图片自动适应多种分辨率@2x @3x
 * @param {String} imgurl 图片地址
 * @returns {String} 返回新地址
 */
const imgChoose = imgurl => {
  var width = window.innerWidth
  var imgPre = ''
  var urlReg = new RegExp('(.jpg|.png|.gif|.jpeg|.bmp)', 'i')
  var preReg = new RegExp('(@[2|3]x)', 'i') //匹配@2x @3x
  if (width >= 480) {
    imgPre = '@3x'
  } else if (width >= 320) {
    imgPre = '@2x'
  } else if (width >= 240) {
    imgPre = ''
  }
  return imgurl.replace(preReg, '').replace(urlReg, imgPre + '$1')
}

export default imgChoose
