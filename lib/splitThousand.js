'use strict';

require('core-js/modules/es.date.to-string.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.regexp.to-string.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.split.js');
require('core-js/modules/es.string.replace.js');

/**
 * 数字千分位分割
 *
 * @param value - 数字
 * @returns 分割后的字符串
 */
function splitThousand(val) {
  if (!val) return val === 0 || val === '0' ? 0 : '';
  val = val.toString();
  if (val.split('.').length == 1) return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  return val.split('.')[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$&,') + '.' + val.split('.')[1];
}

module.exports = splitThousand;
