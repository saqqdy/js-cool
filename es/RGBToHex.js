/*!
 * js-cool v2.3.1
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
/**
 * 将RGB组件的值转换为颜色代码。
 *
 * @example RGBToHex(255, 165, 1); // 'ffa501'
 * @param r - RGB第1个值
 * @param g - RGB第2个值
 * @param b - RGB第3个值
 * @returns hex值
 */
const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

export { RGBToHex as default };
