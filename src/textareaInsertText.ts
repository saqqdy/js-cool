/**
 * textarea or input object inserts text at the specified cursor position
 *
 * @param node - dom object
 * @param data - the text to be inserted
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
