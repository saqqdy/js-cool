/**
 * js截取字符串，中英文都能用
 * @private
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 */
/**
 * 截取字符串，中文算2个字节
 *
 * @param str - 要截取的字符串
 * @param len -
 * @param hasDot -
 * @returns 返回截取后的字符串
 */
declare function cutCHSString(str: string, len?: number, hasDot?: boolean): string;
export default cutCHSString;
