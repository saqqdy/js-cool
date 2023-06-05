/**
 * Remove all attributes of HTML tags
 *
 * @param string - pass in the string
 * @returns newString
 */
function clearAttr(string: string) {
	return string.replace(/<([a-zA-Z1-7]+)\s*[^><]*>/g, '<$1>')
}

export default clearAttr
