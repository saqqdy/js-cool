'use strict';

require('core-js/modules/es.array.for-each.js');
require('core-js/modules/web.dom-collections.for-each.js');
require('core-js/modules/es.array.concat.js');
require('core-js/modules/es.array.sort.js');

/**
 * @description 返回下一个zIndex值
 * @param {number} min 可选，最小值
 * @param {number} max 可选，最大值
 * @returns {Number} 数字
 */
function nextIndex(min, max) {
  if (min === void 0) {
    min = 5000;
  }

  if (max === void 0) {
    max = 10000;
  }

  var doms = [min];
  [].concat(document.querySelectorAll('body > *')).forEach(function (e) {
    var n = +window.getComputedStyle(e).zIndex || 0;
    n > min && n < max && doms.push(n);
  });
  doms.sort(function (a, b) {
    return b - a;
  });
  return doms[0] + 1;
}

module.exports = nextIndex;
