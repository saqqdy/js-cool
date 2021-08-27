/**
 * removeEvent移除由addEvent创建的事件委托
 * @param element - js dom对象
 * @param type - 事件类型。不需要加on
 * @param handler - 回调方法
 */
import type { AnyElement, AnyFunction } from '../typings/common';
export interface CustomAnyFunction extends AnyFunction {
    $$guid: number;
}
declare function removeEvent(element: AnyElement, type: string, handler: CustomAnyFunction): void;
export default removeEvent;
