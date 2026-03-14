import getType from './getType'

/**
 * Determine if target is RegExp
 *
 * @example
 * ```js
 * // RegExp objects
 * isRegExp(/\d/)                 // true
 * isRegExp(/hello/gi)            // true
 * isRegExp(new RegExp('test'))   // true
 *
 * // Not RegExp
 * isRegExp('\\d')                // false
 * isRegExp({})                   // false
 * isRegExp(null)                 // false
 * isRegExp(undefined)            // false
 * ```
 * @since 5.15.0
 * @param target - any target
 * @returns - target is RegExp
 */
function isRegExp(target: any): target is RegExp {
	return target && getType(target) === 'regexp'
}

export default isRegExp
