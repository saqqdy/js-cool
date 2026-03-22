/**
 * Lightens a color by a percentage.
 *
 * @example
 * ```ts
 * lighten('#ff0000', 20)
 * // => '#ff6666'
 *
 * lighten('#000000', 50)
 * // => '#808080'
 *
 * lighten('rgb(255, 0, 0)', 10)
 * // => '#ff3333'
 * ```
 *
 * @since 6.0.0
 * @param color - The color to lighten (hex or rgb)
 * @param percent - The percentage to lighten (0-100)
 * @returns - Returns the lightened color as hex
 */
function lighten(color: string, percent: number): string {
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

	// Lighten
	const amount = Math.round(2.55 * percent)
	r = Math.min(255, r + amount)
	g = Math.min(255, g + amount)
	b = Math.min(255, b + amount)

	return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`
}

export default lighten
