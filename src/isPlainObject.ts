import isWindow from './isWindow'

export type Primitive = bigint | boolean | null | number | string | symbol | undefined

// export type PlainObject = Record<string, Primitive>

export type JSONValue = Primitive | PlainObject | JSONArray

export interface PlainObject {
	[key: string]: JSONValue
}

export type JSONArray = Array<JSONValue>

/**
 * Determine if target is an plain object
 *
 * @example
 * ```js
 * // Plain objects
 * isPlainObject({})              // true
 * isPlainObject({ a: 1 })        // true
 * isPlainObject(Object.create({})) // true
 *
 * // Not plain objects
 * isPlainObject(window)          // false
 * isPlainObject([])              // false
 * isPlainObject(new Date())      // false
 * isPlainObject(null)            // false
 * isPlainObject(() => {})        // false
 *
 * // Class instances
 * class MyClass {}
 * isPlainObject(new MyClass())   // false
 * ```
 * @since 5.0.0
 * @param target - any target
 * @returns - target is plain Object
 */
function isPlainObject(target: unknown): target is PlainObject {
	return (
		Object.prototype.toString.call(target) === '[object Object]' &&
		!isWindow(target) &&
		Object.getPrototypeOf(target) === Object.prototype
	)
}

export default isPlainObject
