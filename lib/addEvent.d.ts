import type { AnyObject, AnyFunction } from '../typings/common';
/**
 * addEvent()事件委托，支持多次委托
 *
 * @param element - js dom对象
 * @param type - 事件类型。不需要加on
 * @param handler - 回调方法
 */
declare const addEvent: {
    (element: AnyObject, type: string, handler: AnyFunction): void;
    guid: number;
};
export default addEvent;
