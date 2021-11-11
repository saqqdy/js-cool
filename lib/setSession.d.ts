/**
 * 写sessionStorage
 *
 * @param name - 名称
 * @param value - 设置要存储的值，可以是对象或字符串
 * @param seconds - 有效时间
 */
declare function setSession(name: string, value: any, seconds: number): void;
export default setSession;
