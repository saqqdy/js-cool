import type { AnyFunction } from '../typings/common';
/**
 * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
 *
 * @param fn - 需要调用的函数
 * @param delay - 延迟时间，单位毫秒
 * @param immediate - 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
 * @return 实际调用函数
 */
declare function throttle(fn: AnyFunction, delay: number, immediate: boolean, debounce: boolean): () => void;
export default throttle;
