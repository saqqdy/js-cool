'use strict';

require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');

/**
 * 获取字符串中的数字
 *
 * @param string - 传入带数字的字符串
 * @returns 返回纯数字字符串
 */
function getNumber(string) {
  return string.replace(/[^0-9.]/gi, '');
}

module.exports = getNumber;
