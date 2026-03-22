/**
 * Darkens a color by a percentage.
 *
 * @example
 * ```ts
 * darken('#ff0000', 20)
 * // => '#cc0000'
 *
 * darken('#ffffff', 50)
 * // => '#808080'
 *
 * darken('rgb(255, 0, 0)', 10)
 * // => '#cc0000'
 * ```
 *
 * @since 6.0.0
 * @param color - The color to darken (hex or rgb)
 * @param percent - The percentage to darken (0-100)
 * @returns - Returns the darkened color as hex
 */
function darken(color: string, percent: number): string {
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
			return color
		}
		r = Number.parseInt(match[0], 10)
		g = Number.parseInt(match[1], 10)
		b = Number.parseInt(match[2], 10)
	} else {
		return color
	}

	// Darken
	const amount = Math.round(2.55 * percent)
	r = Math.max(0, r - amount)
	g = Math.max(0, g - amount)
	b = Math.max(0, b - amount)

	return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`
}

export default darken
