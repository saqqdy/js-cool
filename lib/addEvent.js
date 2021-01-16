/**
 * addEvent()事件委托，支持多次委托
 * 
 * @param {Object} element js dom对象
 * @param {String} type 事件类型。不需要加on
 * @param {Function} handler 回调方法
 */
const addEvent = (element, type, handler) => {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false)
  } else {
    //为每一个事件处理函数分派一个唯一的ID
    if (!handler.$$guid) handler.$$guid = addEvent.guid++
    //为元素的事件类型创建一个哈希表
    if (!element.events) element.events = {}
    //为每一个"元素/事件"对创建一个事件处理程序的哈希表
    var handlers = element.events[type]
    if (!handlers) {
      handlers = element.events[type] = {}
      //存储存在的事件处理函数(如果有)
      if (element['on' + type]) {
        handlers[0] = element['on' + type]
      }
    }
    //将事件处理函数存入哈希表
    handlers[handler.$$guid] = handler
    //指派一个全局的事件处理函数来做所有的工作
    element['on' + type] = handleEvent
  }
}
// a counter used to create unique IDs
addEvent.guid = 1

/**
 * handleEvent()执行事件
 *
 * @param {String} event 事件类型
 * @returns {Boolean}
 */
function handleEvent(event) {
  var returnValue = true
  //抓获事件对象(IE使用全局事件对象)
  event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event)
  //取得事件处理函数的哈希表的引用
  var handlers = this.events[event.type]
  //执行每一个处理函数
  for (var i in handlers) {
    this.$$handleEvent = handlers[i]
    if (this.$$handleEvent(event) === false) {
      returnValue = false
    }
  }
  return returnValue
}

/**
 * 为IE的事件对象添加一些“缺失的”函数
 * @param {String} event 事件类型
 * @returns {Object} 返回补齐了缺失方法的的event
 */
function fixEvent(event) {
  //添加标准的W3C方法
  event.preventDefault = fixEvent.preventDefault
  event.stopPropagation = fixEvent.stopPropagation
  return event
}
fixEvent.preventDefault = function() {
  this.returnValue = false
}
fixEvent.stopPropagation = function() {
  this.cancelBubble = true
}

export default addEvent
