/**
 * Safely get a global value by path
 *
 * A secure alternative to `new Function('return ' + path)()` that:
 * - Only accesses existing properties (no code execution)
 * - Works with Content Security Policy (CSP)
 * - Has better performance
 *
 * @since 6.0.0
 * @example
 * ```js
 * // Get global functions
 * getGlobal('JSON.parse')  // ƒ parse()
 * getGlobal('Number')      // ƒ Number()
 * getGlobal('console.log') // ƒ log()
 *
 * // Get nested properties
 * getGlobal('document.body') // <body> element (browser)
 *
 * // Non-existent path
 * getGlobal('nonExistent')   // undefined
 * getGlobal('a.b.c')         // undefined
 * ```
 *
 * @param path - Dot-separated path to the global value
 * @returns The value at the path, or undefined if not found
 */
function getGlobal<T = unknown>(path: string): T | undefined {
	// Get the global object (works in browser, Node.js, and other environments)
	const globalObj =
		typeof globalThis !== 'undefined'
			? globalThis
			: typeof window !== 'undefined'
				? window
				: typeof globalThis !== 'undefined'
					? globalThis
					: {}

	// Split path and traverse
	const parts = path.split('.')
	let result: unknown = globalObj

	for (const part of parts) {
		if (result == null) {
			return undefined
		}
		// Allow both objects and functions (e.g., Array.isArray)
		if (typeof result !== 'object' && typeof result !== 'function') {
			return undefined
		}
		result = (result as Record<string, unknown>)[part]
	}

	return result as T | undefined
}

export default getGlobal
