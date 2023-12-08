/**
 * Generate random hexadecimal colors
 *
 * @since 5.5.0
 * @returns - result
 */
function randomColor(): string {
	return `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`
}

export default randomColor
