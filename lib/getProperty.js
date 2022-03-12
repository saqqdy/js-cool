/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
'use strict';

require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.split.js');
require('core-js/modules/es.string.replace.js');
require('core-js/modules/es.parse-int.js');

/**
 * 根据路径字符串获取数组、对象属性值
 *
 * @example
 * ```js
 * const target = {
 *      a: 1,
 *      b: [{
 *          c: 2
 *      }]
 * }
 * getProperty(target, 'a') // 1
 * getProperty(target, 'b[0].c') // 2
 * getProperty(target, () => 'a') // 1
 * ```
 * @param target - 目标数组、对象
 * @param prop - 查询目标，可传function
 * @returns 返回对应的值
 */
function getProperty(target, prop) {
  if (!target) throw new Error('请传入target');
  if (prop instanceof Function) prop = prop();
  var arr = prop.split('.');

  var _loop_1 = function _loop_1(p) {
    var index = -1;
    p.replace(/\[(\d+)\]$/, function (str, num) {
      return index = parseInt(num), '';
    });
    if (p) target = target[p];
    if (index !== -1 && target) target = target[index];
  };

  for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
    var p = arr_1[_i];

    _loop_1(p);
  }

  return target;
}

module.exports = getProperty;
