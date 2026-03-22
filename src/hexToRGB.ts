export interface RGBColor {
	b: number
	g: number
	r: number
}

/**
 * Converts hex color to RGB object.
 *
 * @example
 * ```ts
 * hexToRGB('#ff0000')
 * // => { r: 255, g: 0, b: 0 }
 *
 * hexToRGB('#f00')
 * // => { r: 255, g: 0, b: 0 }
 *
 * hexToRGB('ff0000')
 * // => { r: 255, g: 0, b: 0 }
 *
 * hexToRGB('#000000')
 * // => { r: 0, g: 0, b: 0 }
 * ```
 *
 * @since 6.0.0
 * @param hex - The hex color string
 * @returns - Returns the RGB object or null if invalid
 */
function hexToRGB(hex: string): RGBColor | null {
	if (typeof hex !== 'string') {
		return null
	}

	// Remove # if present
	hex = hex.replace(/^#/, '')

	// Handle shorthand hex (e.g., #f00 -> #ff0000)
	if (hex.length === 3) {
		hex = hex
			.split('')
			.map(c => c + c)
			.join('')
	}

	// Validate hex format
	if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
		return null
	}

	const r = Number.parseInt(hex.slice(0, 2), 16)
	const g = Number.parseInt(hex.slice(2, 4), 16)
	const b = Number.parseInt(hex.slice(4, 6), 16)

	return { b, g, r }
}

export default hexToRGB
