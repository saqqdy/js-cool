'use strict';

require('core-js/modules/es.regexp.constructor.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.regexp.to-string.js');
require('core-js/modules/es.string.replace.js');

/**
 * 扩展图片自动适应多种分辨率small original
 *
 * @param imgurl - 图片url
 * @param size - 图片规格
 * @returns 返回新地址
 */
function imgAdapt(imgurl, size) {
  if (!imgurl) {
    return false;
  }

  var imgPre = '';
  var urlReg = new RegExp('(.jpg|.png|.gif|.jpeg|.bmp|.webx)$', 'i'); // var preReg = new RegExp('([.small|.original].jpg|.png|.gif|.jpeg|.bmp|.webx)$', 'i') // 匹配.small.jpg .original.jpg

  switch (size) {
    case 's':
      imgPre = '.small';
      return imgurl.replace(urlReg, '$1' + imgPre + '$1');

    case 'm':
      imgPre = '';
      return imgurl.replace(urlReg, '$1' + imgPre);

    case 'l':
      imgPre = '.original';
      return imgurl.replace(urlReg, '$1' + imgPre + '$1');

    default:
      return imgurl;
  } //	return this.replace(preReg,"").replace(urlReg,"$1" + imgPre + "$1");
  //return this.replace(urlReg,"$1" + imgPre + "$1");

}

module.exports = imgAdapt;
