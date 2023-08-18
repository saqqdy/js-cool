import isObject from './isObject'

/**
 * Determine if target is an window object
 *
 * @example
 * ```js
 * isWindow({}) // false
 * isWindow(window) // true
 * ```
 * @param target - any
 * @returns - target is Window
 */
function isWindow(target: any): target is Window {
	return target && isObject(target) && target === target.window
}

export default isWindow
