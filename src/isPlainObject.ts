import isWindow from './isWindow'

export type Primitive = bigint | boolean | null | number | string | symbol | undefined

// export type PlainObject = Record<string, Primitive>

export type JSONValue = Primitive | PlainObject | JSONArray

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface PlainObject {
	[key: string]: JSONValue
}

export interface JSONArray extends Array<JSONValue> {}

/**
 * Determine if target is an plain object
 *
 * @example
 * ```js
 * isPlainObject({}) // true
 * isPlainObject(window) // false
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
