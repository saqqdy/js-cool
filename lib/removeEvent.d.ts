import type { AnyObject, AnyFunction } from '../typings/common';
/**
 * removeEvent移除由addEvent创建的事件委托
 *
 * @param element - js dom对象
 * @param type - 事件类型。不需要加on
 * @param handler - 回调方法
 */
declare function removeEvent(element: AnyObject, type: string, handler: AnyFunction): void;
export default removeEvent;
