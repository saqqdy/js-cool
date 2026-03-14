import inBrowser from './inBrowser'

/**
 * copy to clipboard
 *
 * @example
 * ```js
 * // Copy text
 * copy('Hello World')
 * // true (copied successfully)
 *
 * // Copy number
 * copy(12345)
 * // true
 *
 * // Copy JSON string
 * copy(JSON.stringify({ name: 'John' }))
 * // true
 *
 * // Use in button click
 * document.getElementById('copyBtn').addEventListener('click', () => {
 *   const success = copy(document.getElementById('content').innerText)
 *   if (success) alert('Copied!')
 * })
 * ```
 * @since 5.0.0
 * @param value - any target to copy
 * @returns - true if copy succeeded, false/undefined otherwise
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
