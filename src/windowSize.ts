export interface WindowSizeObj {
	width: number
	height: number
}

/**
 * windowSize to get the window size
 *
 * @example
 * ```js
 * windowSize() // { width: 1280, height: 800 }
 * ```
 * @returns - the width and height
 */
function windowSize(): WindowSizeObj {
	const s: WindowSizeObj = { width: 0, height: 0 }
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
