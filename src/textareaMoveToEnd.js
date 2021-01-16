/**
 * textarea或input对象将光标定位到文字尾部
 * @param  {Object} obj dom对象
 */
function textareaMoveToEnd(obj) {
  obj.focus()
  var len = obj.value.length
  if (document.selection) {
    var sel = obj.createTextRange()
    sel.moveStart('character', len)
    sel.collapse()
    sel.select()
  } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
    obj.selectionStart = obj.selectionEnd = len
  }
}

export default textareaMoveToEnd
