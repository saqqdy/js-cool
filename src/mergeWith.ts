import { hasOwn } from './_compat'
import isPlainObject from './isPlainObject'

/**
 * Merge strategy function type for mergeWith
 */
export type MergeStrategy = (
	objValue: unknown,
	srcValue: unknown,
	key: string | number,
	object: Record<string, unknown> | unknown[],
	source: Record<string, unknown> | unknown[],
) => unknown

/**
 * This method is like extend except that it accepts a strategy function which is invoked
 * to produce the merged values of the destination and source properties.
 *
 * If the strategy function returns undefined, merging is handled by the method instead.
 *
 * @example
 * ```js
 * // Custom array merge (concat instead of replace)
 * mergeWith(
 *   { a: [1, 2] },
 *   { a: [3, 4] },
 *   (objValue, srcValue) => {
 *     if (Array.isArray(objValue)) {
 *       return objValue.concat(srcValue)
 *     }
 *   }
 * )
 * // { a: [1, 2, 3, 4] }
 *
 * // Custom merge with function
 * mergeWith(
 *   { a: 1, b: 2 },
 *   { a: 3, c: 4 },
 *   (objValue, srcValue, key) => {
 *     if (key === 'a') return objValue + srcValue
 *   }
 * )
 * // { a: 4, b: 2, c: 4 }
 *
 * // Merge multiple objects
 * mergeWith(
 *   { a: 1 },
 *   { b: 2 },
 *   { c: 3 },
 *   (objValue, srcValue) => srcValue ?? objValue
 * )
 * // { a: 1, b: 2, c: 3 }
 *
 * // Skip certain properties
 * mergeWith(
 *   { a: 1, b: 2 },
 *   { a: 10, b: 20, c: 30 },
 *   (objValue, srcValue, key) => {
 *     if (key === 'b') return objValue // keep original
 *   }
 * )
 * // { a: 10, b: 2, c: 30 }
 * ```
 *
 * @since 6.0.0
 * @param object - The destination object
 * @param sources - The source objects and strategy function (last function argument)
 * @returns - The merged object
 */
function mergeWith<T extends Record<string, unknown>>(
	object: T,
	...sources: [...sources: Record<string, unknown>[], strategy: MergeStrategy]
): T
function mergeWith<T extends Record<string, unknown>>(
	object: T,
	source: Record<string, unknown>,
	strategy: MergeStrategy,
): T
function mergeWith<T extends Record<string, unknown>>(
	object: T,
	...args: (Record<string, unknown> | MergeStrategy)[]
): T {
	if (!object || typeof object !== 'object') {
		return object
	}

	// Extract strategy function (last function argument)
	let strategy: MergeStrategy | undefined
	const sources: Record<string, unknown>[] = []

	for (let i = args.length - 1; i >= 0; i--) {
		const arg = args[i]
		if (typeof arg === 'function') {
			strategy = arg
		} else if (arg && typeof arg === 'object') {
			sources.unshift(arg as Record<string, unknown>)
		}
	}

	// If no strategy function, fall back to regular merge
	if (!strategy) {
		return object
	}

	// Process each source
	for (const source of sources) {
		if (!source || typeof source !== 'object') continue

		for (const key in source) {
			if (hasOwn(source, key)) {
				const objValue = (object as Record<string, unknown>)[key]
				const srcValue = source[key]

				// Call strategy
				const result = strategy(objValue, srcValue, key, object, source)

				if (result !== undefined) {
					// Use strategy result
					;(object as Record<string, unknown>)[key] = result
				} else if (isPlainObject(srcValue) && isPlainObject(objValue)) {
					// Recursively merge nested objects
					;(object as Record<string, unknown>)[key] = mergeWith(
						{ ...objValue } as Record<string, unknown>,
						srcValue,
						strategy,
					)
				} else if (srcValue !== undefined) {
					// Use source value
					;(object as Record<string, unknown>)[key] = srcValue
				}
			}
		}
	}

	return object
}

export default mergeWith
