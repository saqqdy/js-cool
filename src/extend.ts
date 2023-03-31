import type { ArrayOneMore } from '../typings/common'
import isArray from './isArray'

export type ExtendArrayData = unknown[]

export type ExtendObjectData = Record<string, unknown>

export type ExtendData = ExtendArrayData | ExtendObjectData

function isWindow(obj: any) {
	return obj !== null && obj === obj.window
}

function isPlainObject(obj: any) {
	return (
		Object.prototype.toString.call(obj) === '[object Object]' &&
		!isWindow(obj) &&
		Object.getPrototypeOf(obj) === Object.prototype
	)
}

// function extend(target: ExtendArrayData, source: ExtendArrayData): ExtendArrayData
// function extend(target: ExtendObjectData, source: ExtendObjectData): ExtendObjectData
// function extend(deep: boolean, target: ExtendArrayData, source: ExtendArrayData): ExtendArrayData
// function extend(deep: boolean, target: ExtendObjectData, source: ExtendObjectData): ExtendObjectData
// // function extend(target: boolean | ExtendData, ...args: ArrayOneMore<ExtendData>): ExtendData
// function extend(target: boolean | ExtendData, ...args: ArrayOneMore<ExtendData>): ExtendData {
// 	let deep = false
// 	if (typeof target === 'boolean') {
// 		deep = target
// 		target = args.shift() as ExtendData
// 	}
// 	console.log(100, deep, target, args)
// 	args.forEach(source => {
// 		for (const key in source)
// 			if (source.hasOwnProperty(key)) {
// 				if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
// 					if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {}
// 					if (isArray(source[key]) && !isArray(target[key])) target[key] = []
// 					extend(deep, target[key], source[key])
// 				} else if (source[key] !== undefined) target[key] = source[key]
// 			}
// 		// extend(deep, target, source)
// 	})
// 	return target
// }

// console.log(extend(true, {}, { a: 11 }, { b: 22 }))

// 对象扩展
const extend = (function () {
	/**
	 * @param target - 目标
	 * @param source - 源
	 * @param deep - 是否深拷贝
	 */
	function extend(target: any, source: any, deep: boolean) {
		for (const key in source)
			if (source.hasOwnProperty(key)) {
				if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
					if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {}
					if (isArray(source[key]) && !isArray(target[key])) target[key] = []
					extend(target[key], source[key], deep)
				} else if (source[key] !== undefined) target[key] = source[key]
			}
	}
	return function <T = any[] | object>(target: boolean | T, ...args: ArrayOneMore<any>) {
		let deep = false
		if (typeof target === 'boolean') {
			deep = target
			target = args.shift() as T
		}
		args.forEach(function (arg) {
			extend(target, arg, deep)
		})
		return target
	}
})()

export default extend
