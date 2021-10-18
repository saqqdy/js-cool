/*!
 * js-cool v2.2.2
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 扩展图片自动适应多种分辨率`@2x @3x`
 *
 * @param imgurl - 图片地址
 * @returns 返回新地址
 */
function imgChoose(imgurl) {
    var width = window.innerWidth;
    var imgPre = '';
    var urlReg = new RegExp('(.jpg|.png|.gif|.jpeg|.bmp)', 'i');
    var preReg = new RegExp('(@[2|3]x)', 'i'); //匹配@2x @3x
    if (width >= 480) {
        imgPre = '@3x';
    }
    else if (width >= 320) {
        imgPre = '@2x';
    }
    else if (width >= 240) {
        imgPre = '';
    }
    return imgurl.replace(preReg, '').replace(urlReg, imgPre + '$1');
}

exports["default"] = imgChoose;
exports.imgChoose = imgChoose;
