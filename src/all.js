/**
 * @description 如果所提供的谓词函数对一个集合中的所有元素都返回true，则返回true，否则返回false。
 * @example all([4, 2, 3], x => x > 1); // true
 * @example all([1, 2, 3]); // true
 * @param {Array} arr 目标数组
 * @param {Function} fn 判断方法
 * @returns {Boolean} 返回判断结果
 */
const all = (arr, fn = Boolean) => arr.every(fn)

export default all
