import type { AnyObject } from '../typings/common';
/**
 * 数据清洗方法
 *
 * @param data - 要清洗的对象，必传
 * @param  map - 需要的数据队列，可传数组或者对象
 * @param map -
 * @param nullFix -
 * @param map -
 * @param nullFix -
 * @param nullFix - 选填，没有对应属性时返回的值，默认不返回该属性
 * @returns 返回清洗后的对象
 */
declare function cleanData(data: any, map: any[] | AnyObject, nullFix?: any): any;
export default cleanData;
