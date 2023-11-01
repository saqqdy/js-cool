import contains from './contains'
import intersect from './intersect'
import union from './union'

/**
 * Find the complement of multiple arrays
 *
 * @example
 * ```js
 * complement([1, 2], [2, '33'], [2]) // [1, '33']
 * ```
 * @since 2.2.1
 * @param args - arguments
 * @returns array
 */
function complement<T = unknown>(...args: T[][]): T[] {
	const intersectArray = intersect(...args) // Intersection set
	const unionArray = union(...args) // Complementary set
	return unionArray.filter(item => !contains(intersectArray, item))
}

export default complement
