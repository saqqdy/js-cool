/*!
 * js-cool v2.2.1
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.regexp.exec.js');

/**
 * 文件后缀名
 *
 * @example
 * ```js
 * getFileType('http://www.saqqdy.com/test.jpg'); // .jpg;
 * ```
 * @example
 * ```js
 * getFileType('http://www.saqqdy.com/test.JPEG'); // .jpeg;
 * ```
 * @param url - 文件名
 * @returns 返回文件后缀
 */
function getFileType(url) {
  if (typeof url != 'string' || url == '') {
    return '';
  }

  var type = /\.[^\.]+$/.exec(url); // [".docx", index: 31, input: "http://192.168.2.243:7005/doc/2.docx"]

  return type ? type[0].toLowerCase() : '';
}

exports["default"] = getFileType;
exports.getFileType = getFileType;
