/**
 * Determines if a color is light based on its luminance.
 *
 * @example
 * ```ts
 * isLightColor('#ffffff')
 * // => true
 *
 * isLightColor('#000000')
 * // => false
 *
 * isLightColor('#ff0000')
 * // => true
 *
 * isLightColor('#808080')
 * // => true (gray is considered light)
 * ```
 *
 * @since 6.0.0
 * @param color - The color to check (hex or rgb)
 * @returns - Returns true if the color is light
 */
function isLightColor(color: string): boolean {
	let r: number, g: number, b: number

	// Parse hex color
	if (color.startsWith('#')) {
		let hex = color.slice(1)
		if (hex.length === 3) {
			hex = hex
				.split('')
				.map(c => c + c)
				.join('')
		}
		r = Number.parseInt(hex.slice(0, 2), 16)
		g = Number.parseInt(hex.slice(2, 4), 16)
		b = Number.parseInt(hex.slice(4, 6), 16)
	}
	// Parse rgb color
	else if (color.startsWith('rgb')) {
		const match = color.match(/\d+/g)
		if (!match || match.length < 3) {
			return true
		}
		r = Number.parseInt(match[0], 10)
		g = Number.parseInt(match[1], 10)
		b = Number.parseInt(match[2], 10)
	} else {
		return true
	}

	// Calculate relative luminance using sRGB values
	// Formula: L = 0.2126 * R + 0.7152 * G + 0.0722 * B
	// Where R, G, B are linear values (gamma corrected)
	const toLinear = (c: number): number => {
		c /= 255
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
	}

	const luminance = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)

	// Threshold of 0.179 is commonly used (W3C suggests 0.179)
	return luminance > 0.179
}

export default isLightColor
