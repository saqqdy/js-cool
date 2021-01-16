/**
 * removeEvent移除由addEvent创建的事件委托
 * @param {Object} element js dom对象
 * @param {String} type 事件类型。不需要加on
 * @param {Function} handler 回调方法
 */
const removeEvent = (element, type, handler) => {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false)
  } else {
    //从哈希表中删除事件处理函数
    if (element.events && element.events[type]) {
      delete element.events[type][handler.$$guid]
    }
  }
}

export default removeEvent
