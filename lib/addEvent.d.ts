/**
 * addEvent()事件委托，支持多次委托
 * @param element - js dom对象
 * @param type - 事件类型。不需要加on
 * @param handler - 回调方法
 */
import type { AnyElement, AnyFunction } from '../typings/common';
export interface CustomEvent extends Event {
    returnValue: boolean;
    cancelBubble: boolean;
}
export interface CustomAnyFunction extends AnyFunction {
    $$guid: number;
}
declare const addEvent: {
    (element: AnyElement, type: string, handler: CustomAnyFunction): void;
    guid: number;
};
export default addEvent;
