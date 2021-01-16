/**
 * 阻止冒泡
 * @param {Object} e dom的event对象
 * @returns {Boolean}
 */
function stopBubble(e) {
  if (e && e.preventDefault) {
    // Firefox
    e.stopPropagation() //e.preventDefault();
  } else {
    // IE
    e.cancelBubble = true //e.returnValue = false;
  }
  return false
}

export default stopBubble
