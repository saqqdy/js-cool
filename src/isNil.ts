/**
 * Checks if value is null or undefined.
 *
 * @example
 * ```ts
 * isNil(null)
 * // => true
 *
 * isNil(undefined)
 * // => true
 *
 * isNil('')
 * // => false
 *
 * isNil(0)
 * // => false
 *
 * isNil(false)
 * // => false
 *
 * isNil([])
 * // => false
 *
 * isNil({})
 * // => false
 * ```
 *
 * @since 5.24.0
 * @param value - The value to check
 * @returns - Returns true if value is null or undefined, else false
 */
function isNil(value: unknown): value is null | undefined {
	return value === null || value === undefined
}

export default isNil
