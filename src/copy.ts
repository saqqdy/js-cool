import inBrowser from './inBrowser'

/**
 * copy to clipboard
 *
 * @since 5.0.0
 * @param value - any target
 * @returns - target is Object
 */
function copy(value: any) {
	if (!inBrowser) return
	const textarea = document.createElement('textarea')
	textarea.style.position = 'absolute'
	textarea.style.opacity = '0'
	textarea.innerText = value
	document.body.appendChild(textarea)
	textarea.select()
	const status = document.execCommand('copy')
	document.body.removeChild(textarea)
	return status
}

export default copy
