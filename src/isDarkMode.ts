/**
 * Determine if dark color mode
 *
 * @example
 * ```js
 * isDarkMode() // true
 * ```
 * @since 5.5.0
 * @returns - result
 */
function isDarkMode(): boolean {
	return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default isDarkMode
