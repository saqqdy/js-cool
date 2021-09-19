/**
 * 截取小数点后几位，不足的不补0
 *
 * @param number - 要处理的数字，必填
 * @param n - 要保留的小数点位数，默认保留2位
 * @returns 返回新数字
 */
declare function fixNumber(number: string | number, n?: number): string | number;
export default fixNumber;
