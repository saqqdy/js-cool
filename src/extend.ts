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
		if (source.hasOwnProperty(key)) {
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
 * extend greedy
 *
 * @since 1.0.2
 * @param target - boolean | ExtendData
 * @param args - ArrayOneMore<ExtendData>
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
