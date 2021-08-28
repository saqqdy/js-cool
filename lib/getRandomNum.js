'use strict';

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

module.exports = getRandomNum;
