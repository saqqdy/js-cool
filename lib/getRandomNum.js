/*!
 * js-cool v2.2.2
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 获取随机整数
 *
 * @param min - 随机数的最小值
 * @param max - 随机数的最大值
 * @returns 返回数字
 */
function getRandomNum(min, max) {
  if (min === void 0) {
    min = 1;
  }

  if (max === void 0) {
    max = 10;
  }

  var Range = max - min;
  var Rand = Math.random();
  return min + Math.round(Rand * Range);
}

exports["default"] = getRandomNum;
exports.getRandomNum = getRandomNum;
