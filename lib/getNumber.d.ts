/**
 * 获取字符串中的数字
 *
 * @example
 * ```js
 * getNumber('Chrome123.33'); // '123.33';
 * getNumber('234test.88'); // '234.88';
 * ```
 * @param string - 传入带数字的字符串
 * @returns 返回纯数字字符串
 */
declare function getNumber(string: string): string;
export default getNumber;
