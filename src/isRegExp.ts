import getType from './getType'

/**
 * Determine if target is RegExp
 *
 * @example
 * ```js
 * isRegExp(/\d/) // true
 * ```
 * @since 5.15.0
 * @param target - any target
 * @returns - target is RegExp
 */
function isRegExp(target: any): target is RegExp {
	return target && getType(target) === 'regexp'
}

export default isRegExp
