/**
 * 格式化时间成：刚刚、几分钟前
 *
 * @param time - 时间对象或者字符串
 * @param fmt - 格式化风格
 * @returns 返回字符串
 */
declare function formatTimeStr(time: string | number, fmt: string): string;
export default formatTimeStr;
