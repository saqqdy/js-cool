/**
 * setCookie写入cookie的方法
 *
 * @param name - cookie名称
 * @param value - 设置要存储的值，可以是对象或字符串
 * @param seconds - cookie有效时间默认1天
 * @param path - 路径，默认'/'
 * @param samesite - SameSite，默认true
 */
declare function setCookie(name: string, value: any, seconds?: number, path?: string, samesite?: boolean): void;
export default setCookie;
