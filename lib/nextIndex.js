/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
'use strict';

require('core-js/modules/es.array.for-each.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.array.sort.js');

/**
 * 返回下一个zIndex值
 *
 * @param min - 可选，最小值
 * @param max - 可选，最大值
 * @returns 数字
 */
function nextIndex(min, max) {
  if (min === void 0) {
    min = 5000;
  }

  if (max === void 0) {
    max = 10000;
  }

  var doms = [min];
  Array.prototype.forEach.call(document.querySelectorAll('body > *'), function (e) {
    var n = +window.getComputedStyle(e).zIndex || 0;
    n > min && n < max && doms.push(n);
  });
  doms.sort(function (a, b) {
    return b - a;
  });
  return doms[0] + 1;
}

module.exports = nextIndex;
