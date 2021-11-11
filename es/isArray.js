/*!
 * js-cool v2.3.0
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
/**
 * 判断是否数组
 *
 * @param arr -
 */
function isArray(arr) {
    return Object.prototype.toString.call(arr).indexOf('Array') !== -1;
}

export { isArray as default };
