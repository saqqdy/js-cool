import isObject from './isObject'

/**
 * Determine if target is an window object
 *
 * @param target - any
 */
function isWindow(target: any): target is Window {
	return target && isObject(target) && target === target.window
}

export default isWindow
