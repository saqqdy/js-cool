'use strict';

require('core-js/modules/es.date.to-string.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.regexp.to-string.js');
require('core-js/modules/es.string.pad-start.js');

/**
 * @description 将RGB组件的值转换为颜色代码。
 * @example RGBToHex(255, 165, 1); // 'ffa501'
 * @param {Number} r RGB第1个值
 * @param {Number} g RGB第2个值
 * @param {Number} b RGB第3个值
 * @returns {String} hex值
 */
var RGBToHex = function RGBToHex(r, g, b) {
  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
};

module.exports = RGBToHex;
