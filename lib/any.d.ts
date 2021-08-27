/**
 * @description 如果所提供的谓词函数对一个集合中的至少一个元素返回true，则返回true，否则返回false。
 * @example any([0, 1, 2, 0], x => x >= 2); // true
 * @example any([0, 0, 1, 0]); // true
 * @param arr - 目标数组
 * @param fn - 判断方法
 * @returns 返回判断结果
 */
import type { AnyFunction } from '../typings/common';
declare const any: (arr: any[], fn: AnyFunction) => boolean;
export default any;
