'use strict';

/**
 * @description 阻止冒泡
 * @example
 * @param e - dom的event对象
 * @returns
 */
function stopBubble(e) {
  if (e && e.stopPropagation) {
    // Firefox
    e.stopPropagation(); // e.preventDefault();
  } else {
    // IE
    e.cancelBubble = true; // e.returnValue = false;
  }

  return false;
}

module.exports = stopBubble;
