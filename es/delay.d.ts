import type { AnyFunction } from '../typings/common';
/**
 * 防抖节流
 *
 * @returns class
 */
export declare function delay(): {
    map: any;
    register(id: string, fn: AnyFunction, time: number, boo: boolean): void;
    destroy(id: string): void;
};
export default delay;
