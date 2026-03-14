/**
 * Determine if dark color mode
 *
 * @example
 * ```js
 * // Basic usage
 * if (isDarkMode()) {
 *   console.log('Dark mode enabled')
 *   document.body.classList.add('dark-theme')
 * }
 *
 * // Apply different styles
 * const theme = isDarkMode() ? darkTheme : lightTheme
 *
 * // Listen for changes
 * window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
 *   console.log('Dark mode:', isDarkMode())
 * })
 *
 * // Conditional rendering
 * const icon = isDarkMode() ? 'moon' : 'sun'
 * ```
 * @since 5.5.0
 * @returns - true if dark mode is enabled
 */
function isDarkMode(): boolean {
	return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default isDarkMode
