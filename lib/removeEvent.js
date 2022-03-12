/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
'use strict';

/**
 * removeEvent移除由addEvent创建的事件委托
 *
 * @param element - js dom对象
 * @param type - 事件类型。不需要加on
 * @param handler - 回调方法
 */
function removeEvent(element, type, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else {
    //从哈希表中删除事件处理函数
    if (element.events && element.events[type]) {
      delete element.events[type][handler.$$guid];
    }
  }
}

module.exports = removeEvent;
