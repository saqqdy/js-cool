import getGlobal from './getGlobal'

/**
 * Check if a function exists in the global scope
 *
 * @example
 * ```js
 * // Check global function
 * isFunctionExists('console.log') // true
 *
 * // Check non-existent function
 * isFunctionExists('test') // false
 *
 * // Check built-in functions
 * isFunctionExists('Array.isArray') // true
 * isFunctionExists('JSON.parse') // true
 *
 * // Check nested function
 * isFunctionExists('document.querySelector') // true
 * ```
 * @since 6.0.0
 * @param name - incoming function name
 * @returns - true if function exists
 */
function isFunctionExists(name: string): boolean {
	return typeof getGlobal(name) === 'function'
}

export default isFunctionExists
