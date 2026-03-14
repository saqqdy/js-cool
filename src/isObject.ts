import getType from './getType'

/**
 * Determine if target is an object
 *
 * @example
 * ```js
 * // Objects
 * isObject({})              // true
 * isObject({ a: 1 })        // true
 * isObject(new Object())    // true
 *
 * // Not objects
 * isObject([])              // false
 * isObject(null)            // false
 * isObject(window)          // false
 * isObject(() => {})        // false
 * isObject('string')        // false
 * isObject(123)             // false
 * ```
 * @since 5.0.0
 * @param target - any target
 * @returns - target is Object
 */
function isObject(target: any): target is Object {
	return target && getType(target) === 'object'
}

export default isObject
