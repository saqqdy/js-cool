'use strict';

require('core-js/modules/es.regexp.constructor.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.regexp.to-string.js');
require('core-js/modules/es.parse-float.js');
require('core-js/modules/es.string.replace.js');

/**
 * 截取小数点后几位，不足的不补0
 *
 * @param number - 要处理的数字，必填
 * @param n - 要保留的小数点位数，默认保留2位
 * @returns 返回新数字
 */
function fixNumber(number, n) {
  if (n === void 0) {
    n = 2;
  }

  var reg = new RegExp('^(.*\\..{' + n + '}).*$');
  number = '' + number;

  if (!/^(\-|\+)?\d+(\.\d+)?$/.test(number)) {
    console.warn('请传入数字');
    return number;
  }

  return parseFloat(number.replace(reg, '$1'));
}

module.exports = fixNumber;
