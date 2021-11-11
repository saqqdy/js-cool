/**
 * 根据路径字符串获取数组、对象属性值
 *
 * @example
 * ```js
 * const target = {
 *      a: 1,
 *      b: [{
 *          c: 2
 *      }]
 * }
 * getProperty(target, 'a') // 1
 * getProperty(target, 'b[0].c') // 2
 * getProperty(target, () => 'a') // 1
 * ```
 * @param target - 目标数组、对象
 * @param prop - 查询目标，可传function
 * @returns 返回对应的值
 */
declare function getProperty(target: any, prop: string | {
    (): string;
}): any;
export default getProperty;
