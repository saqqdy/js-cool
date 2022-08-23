/**
 * textarea或input对象将光标定位到文字尾部
 *
 * @param obj - dom对象
 */
function textareaMoveToEnd(obj: HTMLTextAreaElement) {
	obj.focus()
	var len = obj.value.length
	if ((document as any).selection) {
		var sel = (obj as any).createTextRange()
		sel.moveStart('character', len)
		sel.collapse()
		sel.select()
	} else if (
		typeof obj.selectionStart == 'number' &&
		typeof obj.selectionEnd == 'number'
	) {
		obj.selectionStart = obj.selectionEnd = len
	}
}

export default textareaMoveToEnd
