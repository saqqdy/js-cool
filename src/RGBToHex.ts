/**
 * Converts RGB component values to color codes.
 *
 * @example
 * ```js
 * // Basic usage
 * RGBToHex(255, 165, 1)
 * // 'ffa501'
 *
 * // Black
 * RGBToHex(0, 0, 0)
 * // '000000'
 *
 * // White
 * RGBToHex(255, 255, 255)
 * // 'ffffff'
 *
 * // Red
 * RGBToHex(255, 0, 0)
 * // 'ff0000'
 *
 * // Green
 * RGBToHex(0, 255, 0)
 * // '00ff00'
 *
 * // Blue
 * RGBToHex(0, 0, 255)
 * // '0000ff'
 * ```
 * @since 1.0.9
 * @param r - the 1st value of RGB (0-255)
 * @param g - RGB's 2nd value (0-255)
 * @param b - RGB's 3rd value (0-255)
 * @returns - hex value string (6 characters, no # prefix)
 */
const RGBToHex = (r: number, g: number, b: number): string =>
	((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')

export default RGBToHex
