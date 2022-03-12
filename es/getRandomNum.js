/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
/**
 * 获取随机整数
 *
 * @param min - 随机数的最小值
 * @param max - 随机数的最大值
 * @returns 返回数字
 */
function getRandomNum(min = 1, max = 10) {
    var Range = max - min;
    var Rand = Math.random();
    return min + Math.round(Rand * Range);
}

export { getRandomNum as default };
