import getType from './getType'

/**
 * Determine if target is Date
 *
 * @example
 * ```js
 * // Date objects
 * const now = new Date()
 * isDate(now)
 * // true
 *
 * isDate(new Date('2020-01-01'))
 * // true
 *
 * // Not Date objects
 * isDate('2020-01-01')
 * // false
 *
 * isDate(1577836800000)
 * // false
 *
 * isDate(null)
 * // false
 * ```
 * @since 5.15.0
 * @param target - any target
 * @returns - true if target is Date
 */
function isDate(target: any): target is Date {
	return target && getType(target) === 'date'
}

export default isDate
