import getType from './getType'

/**
 * Determine if target is an object
 *
 * @example
 * ```js
 * isObject({}) // true
 * ```
 * @param target - any target
 * @returns - target is Object
 */
function isObject(target: any): target is Object {
	return target && getType(target) === 'object'
}

export default isObject
