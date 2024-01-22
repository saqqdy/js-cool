import randomNumber from './randomNumber'

/**
 * Generate random hexadecimal colors
 *
 * @example
 * ```js
 * randomColor()
 * // #bf444b
 *
 * randomColor(200)
 * // #d6e9d7
 *
 * randomColor(200, 255)
 * // #d3f9e4
 *
 * randomColor([0, 0, 0], [255, 255, 255])
 * // #d6e9d7
 * ```
 * @since 5.5.0
 * @param min - the minimum value of the random numbers, eg: [10, 10, 10]
 * @param max - the maximum value of the random number, eg: [255, 255, 255]
 * @returns - result
 */
function randomColor(
	min?: number | [number, number, number],
	max?: number | [number, number, number]
): string {
	if (!max && !min && min !== 0)
		return `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`

	let min1, min2, min3, max1, max2, max3

	if (!min) min1 = min2 = min3 = 0
	else if (typeof min === 'number') min1 = min2 = min3 = min
	else [min1, min2, min3] = min

	if (!max) max1 = max2 = max3 = 255
	else if (typeof max === 'number') max1 = max2 = max3 = max
	else [max1, max2, max3] = max

	return `#${randomNumber(min1, max1).toString(16).padStart(2, '0')}${randomNumber(min2, max2).toString(16).padStart(2, '0')}${randomNumber(min3, max3).toString(16).padStart(2, '0')}`
}

export default randomColor
