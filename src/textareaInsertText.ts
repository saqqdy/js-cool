/**
 * textarea或input对象在指定的光标位置插入文字
 *
 * @param node -  dom对象
 * @param data - 要插入的文字
 */
function textareaInsertText(node: HTMLTextAreaElement, data: string) {
	if ((document as any).selection) {
		// IE
		const sel = (document as any).selection.createRange()
		sel.text = data
	} else if (typeof node.selectionStart === 'number' && typeof node.selectionEnd === 'number') {
		const startPos = node.selectionStart
		const endPos = node.selectionEnd
		const tmpStr = node.value
		let curPos = startPos
		node.value = tmpStr.substring(0, startPos) + data + tmpStr.substring(endPos, tmpStr.length)
		curPos += data.length
		setTimeout(function () {
			node.selectionStart = node.selectionEnd = curPos
		}, 0)
	} else {
		node.value += data
	}
}

export default textareaInsertText
