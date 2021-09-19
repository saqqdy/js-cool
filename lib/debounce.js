'use strict';

var throttle = require('./throttle.js');

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
 *
 * @param fn - 要调用的函数
 * @param delay - 空闲时间
 * @param immediate - 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
 * @return 实际调用函数
 */

function debounce(fn, delay, immediate) {
  return throttle(fn, delay, immediate, true);
}

module.exports = debounce;
