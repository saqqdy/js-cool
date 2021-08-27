/**
 * @description 防抖节流
 * return {Object} class
*/
import type { AnyFunction } from "../typings/common";
declare function delay(): {
    map: any;
    register(id: string, fn: AnyFunction, time: number, boo: boolean): void;
    destroy(id: string): void;
};
export default delay;
