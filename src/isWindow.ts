import isObject from './isObject'

/**
 * Determine if target is an window object
 *
 * @example
 * ```js
 * // Window object
 * isWindow(window)       // true
 *
 * // Not window
 * isWindow({})           // false
 * isWindow(document)     // false
 * isWindow(null)         // false
 * isWindow(undefined)    // false
 *
 * // Iframe window
 * const iframe = document.createElement('iframe')
 * document.body.appendChild(iframe)
 * isWindow(iframe.contentWindow) // true
 * ```
 * @since 5.0.0
 * @param target - any
 * @returns - target is Window
 */
function isWindow(target: any): target is Window {
	return target && isObject(target) && target === target.window
}

export default isWindow
