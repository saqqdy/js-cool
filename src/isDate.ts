import getType from './getType'

/**
 * Determine if target is Date
 *
 * @example
 * ```js
 * const now = new Date()
 *
 * isDate(now)
 * // true
 * ```
 * @since 5.15.0
 * @param target - any target
 * @returns - target is Date
 */
function isDate(target: any): target is Date {
	return target && getType(target) === 'date'
}

export default isDate
