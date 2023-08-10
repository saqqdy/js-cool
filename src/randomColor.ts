/**
 * Generate random hexadecimal colors
 *
 * @returns - result
 */
function randomColor(): string {
	return `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`
}

export default randomColor
