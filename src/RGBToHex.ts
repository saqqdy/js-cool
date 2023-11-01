/**
 * Converts RGB component values to color codes.
 *
 * @example
 * ```js
 * RGBToHex(255, 165, 1)
 * // 'ffa501'
 * ```
 * @since 1.0.9
 * @param r - the 1st value of RGB
 * @param g - RGB's 2nd value
 * @param b - RGB's 3rd value
 * @returns - hex value
 */
const RGBToHex = (r: number, g: number, b: number): string =>
	((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')

export default RGBToHex
