export interface HSLColor {
	h: number
	l: number
	s: number
}

/**
 * Converts RGB to HSL.
 *
 * @example
 * ```ts
 * rgbToHSL(255, 0, 0)
 * // => { h: 0, s: 100, l: 50 }
 *
 * rgbToHSL(0, 255, 0)
 * // => { h: 120, s: 100, l: 50 }
 *
 * rgbToHSL(0, 0, 255)
 * // => { h: 240, s: 100, l: 50 }
 *
 * rgbToHSL(128, 128, 128)
 * // => { h: 0, s: 0, l: 50 }
 * ```
 *
 * @since 5.24.0
 * @param r - Red (0-255)
 * @param g - Green (0-255)
 * @param b - Blue (0-255)
 * @returns - Returns the HSL object
 */
function rgbToHSL(r: number, g: number, b: number): HSLColor {
	r /= 255
	g /= 255
	b /= 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	let h = 0,
	 s = 0
	const l = (max + min) / 2

	if (max !== min) {
		const d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

		switch (max) {
			case r:
				h = ((g - b) / d + (g < b ? 6 : 0)) / 6
				break
			case g:
				h = ((b - r) / d + 2) / 6
				break
			case b:
				h = ((r - g) / d + 4) / 6
				break
		}
	}

	return {
		h: Math.round(h * 360),
		l: Math.round(l * 100),
		s: Math.round(s * 100)
	}
}

export default rgbToHSL
