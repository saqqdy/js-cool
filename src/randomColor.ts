import { padStart } from './_compat'
import randomNumber from './randomNumber'

export interface RandomColorOptions {
	/**
	 * Minimum RGB values [r, g, b]
	 */
	min?: number | [number, number, number]
	/**
	 * Maximum RGB values [r, g, b]
	 */
	max?: number | [number, number, number]
	/**
	 * Include alpha channel (returns 8-digit hex #RRGGBBAA)
	 */
	alpha?: boolean | number
}

/**
 * Generate random hexadecimal colors
 *
 * @example
 * ```js
 * // Random color
 * randomColor()
 * // #bf444b
 *
 * // With minimum brightness
 * randomColor(200)
 * // #d6e9d7
 *
 * // With brightness range
 * randomColor(200, 255)
 * // #d3f9e4
 *
 * // With RGB range arrays
 * randomColor([0, 0, 0], [255, 255, 255])
 * // #d6e9d7
 *
 * // With alpha channel (random)
 * randomColor({ alpha: true })
 * // #bf444b8a
 *
 * // With specific alpha (0-255)
 * randomColor({ alpha: 128 })
 * // #bf444b80
 * ```
 * @since 5.5.0
 * @param minOrOptions - the minimum value or options object
 * @param max - the maximum value of the random number
 * @returns - hex color string
 */
function randomColor(minOrOptions?: number | [number, number, number] | RandomColorOptions, max?: number | [number, number, number]): string {
	// Handle options object
	if (typeof minOrOptions === 'object' && !Array.isArray(minOrOptions)) {
		return randomColorWithOptions(minOrOptions)
	}

	// Handle positional arguments
	const min = minOrOptions as number | [number, number, number] | undefined
	const alpha = false

	return generateHexColor(min, max, alpha)
}

function randomColorWithOptions(options: RandomColorOptions): string {
	const { min, max, alpha = false } = options
	return generateHexColor(min, max, alpha)
}

function generateHexColor(
	min?: number | [number, number, number],
	max?: number | [number, number, number],
	alpha?: boolean | number
): string {
	let min1: number, min2: number, min3: number, max1: number, max2: number, max3: number

	if (!max && !min && min !== 0) {
		// Fast path: fully random color
		const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')
		return formatWithAlpha(`#${hex}`, alpha)
	}

	if (!min) min1 = min2 = min3 = 0
	else if (typeof min === 'number') min1 = min2 = min3 = min
	else [min1, min2, min3] = min

	if (!max) max1 = max2 = max3 = 255
	else if (typeof max === 'number') max1 = max2 = max3 = max
	else [max1, max2, max3] = max

	const r = padStart(randomNumber(min1, max1).toString(16), 2, '0')
	const g = padStart(randomNumber(min2, max2).toString(16), 2, '0')
	const b = padStart(randomNumber(min3, max3).toString(16), 2, '0')

	return formatWithAlpha(`#${r}${g}${b}`, alpha)
}

function formatWithAlpha(hex: string, alpha?: boolean | number): string {
	if (alpha === false || alpha === undefined) return hex

	let alphaHex: string
	if (alpha === true) {
		// Random alpha
		alphaHex = Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
	} else {
		// Specific alpha value (0-255)
		const a = Math.max(0, Math.min(255, Math.round(alpha)))
		alphaHex = a.toString(16).padStart(2, '0')
	}

	return hex + alphaHex
}

export default randomColor
