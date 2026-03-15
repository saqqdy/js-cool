import type { ArrayOneMore } from './types'
import isArray from './isArray'
import isPlainObject from './isPlainObject'

export type ExtendArrayData = any[]

export type ExtendObjectData = Record<string, any>

export type ExtendData = ExtendArrayData | ExtendObjectData

/**
 * Extend the main function
 *
 * @param target - target
 * @param source - source
 * @param deep - whether deep copy
 */
function extendObject(target: ExtendObjectData, source: ExtendObjectData, deep: boolean): void
function extendObject(target: ExtendArrayData, source: ExtendArrayData, deep: boolean): void
function extendObject(target: ExtendData, source: ExtendData, deep: boolean): void {
	let key: keyof typeof source

	for (key in source)
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			if (deep && (isPlainObject(source[key]) || isArray(source[key] as ExtendArrayData))) {
				if (isPlainObject(source[key]) && !isPlainObject(target[key]))
					target[key] = {} as ExtendObjectData
				if (isArray(source[key]) && !isArray(target[key]))
					target[key] = [] as ExtendArrayData
				extendObject(target[key] as ExtendData, source[key], deep)
			} else if (source[key] !== undefined) target[key] = source[key]
		}
}

/**
 * deep copy & merge objects
 *
 * @example
 * ```js
 * // Shallow merge
 * extend({ a: 1 }, { b: 2 })
 * // { a: 1, b: 2 }
 *
 * // Deep merge
 * extend(true, { a: { x: 1 } }, { a: { y: 2 } })
 * // { a: { x: 1, y: 2 } }
 *
 * // Merge multiple objects
 * extend({}, { a: 1 }, { b: 2 }, { c: 3 })
 * // { a: 1, b: 2, c: 3 }
 *
 * // Merge arrays
 * extend([1, 2], [3, 4])
 * // [3, 4, 3, 4]
 *
 * // Clone object
 * const original = { a: 1, b: { c: 2 } }
 * const clone = extend(true, {}, original)
 * ```
 * @since 1.0.2
 * @param target - boolean | ExtendData - if true, perform deep merge
 * @param args - ArrayOneMore<ExtendData> - objects to merge
 * @returns - merged object
 */
function extend(target: ExtendObjectData, ...args: ArrayOneMore<ExtendObjectData>): ExtendObjectData
function extend(target: boolean, ...args: ArrayOneMore<ExtendObjectData>): ExtendObjectData
function extend(target: ExtendArrayData, ...args: ArrayOneMore<ExtendArrayData>): ExtendArrayData
function extend(target: boolean, ...args: ArrayOneMore<ExtendArrayData>): ExtendArrayData
function extend(target: boolean | ExtendData, ...args: ArrayOneMore<ExtendData>): ExtendData {
	let deep = false

	if (typeof target === 'boolean') {
		deep = target
		target = args.shift()!
	}
	args.forEach(arg => {
		extendObject(target as ExtendData, arg, deep)
	})

	return target
}

export default extend
