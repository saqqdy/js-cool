/*!
 * js-cool v2.2.2
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.string.pad-start.js');
require('core-js/modules/es.date.to-string.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.regexp.to-string.js');

/**
 * 将RGB组件的值转换为颜色代码。
 *
 * @example RGBToHex(255, 165, 1); // 'ffa501'
 * @param r - RGB第1个值
 * @param g - RGB第2个值
 * @param b - RGB第3个值
 * @returns hex值
 */
var RGBToHex = function RGBToHex(r, g, b) {
  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
};

exports.RGBToHex = RGBToHex;
exports["default"] = RGBToHex;
