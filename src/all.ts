/**
 * 如果所提供的谓词函数对一个集合中的所有元素都返回true，则返回true，否则返回false。
 *
 * @example all([4, 2, 3], x => x > 1); // true
 * @example all([1, 2, 3]); // true
 * @param arr - 目标数组
 * @param fn - 判断方法
 * @returns 返回判断结果
 */
import type { AnyFunction } from '../typings/common'

const all = (arr: any[], fn: AnyFunction) => arr.every(fn)

export default all
