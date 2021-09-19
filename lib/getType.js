'use strict';

require('core-js/modules/es.object.to-string.js');

/**
 * 获取目标类型
 *
 * @param target - 目标
 * @returns 类型
 */
function getType(target) {
  var type = {
    '[object Array]': 'array',
    '[object Boolean]': 'boolean',
    '[object Date]': 'date',
    '[object Function]': 'function',
    '[object Number]': 'number',
    '[object Object]': 'object',
    '[object RegExp]': 'regexp',
    '[object String]': 'string'
  };
  if (target === null) return target + '';
  return typeof target === 'object' || typeof target === 'function' ? type[Object.prototype.toString.call(target)] || 'object' : typeof target;
}

module.exports = getType;
