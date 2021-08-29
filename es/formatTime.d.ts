/**
 * 日期格式化插件
 *
 * @example 使用方式
 * ```js
 * formatTime(new Date(), "yyyy-MM-dd")
 * ```
 * @param time - 时间对象或者字符串
 * @param fmt - 格式化风格
 * @returns 返回字符串
 */
declare function formatTime(time: Date | string, fmt?: string): string;
export default formatTime;
