export interface WindowSizeObj {
	height: number
	width: number
}

/**
 * windowSize to get the window size
 *
 * @example
 * ```js
 * // Basic usage
 * windowSize()
 * // { width: 1280, height: 800 }
 *
 * // Responsive design
 * const { width, height } = windowSize()
 * if (width < 768) {
 *   console.log('Mobile view')
 * }
 *
 * // Use in resize handler
 * window.addEventListener('resize', () => {
 *   const { width, height } = windowSize()
 *   updateLayout(width, height)
 * })
 *
 * // Aspect ratio
 * const { width, height } = windowSize()
 * const ratio = width / height
 * ```
 * @since 1.0.1
 * @returns - object with width and height properties
 */
function windowSize(): WindowSizeObj {
	const s: WindowSizeObj = { height: 0, width: 0 }

	if (window.innerWidth) {
		s.width = window.innerWidth
		s.height = window.innerHeight
	} else if (document.body && document.body.clientWidth) {
		s.width = document.body.clientWidth
		s.height = document.body.clientHeight
	}
	// Get the window size by going inside the Document to detect the body
	if (document.documentElement && document.documentElement.clientWidth) {
		s.width = document.documentElement.clientWidth
		s.height = document.documentElement.clientHeight
	}

	return s
}

export default windowSize
