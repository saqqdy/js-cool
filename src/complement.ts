import contains from './contains'
import intersect from './intersect'
import union from './union'

/**
 * Find the complement of multiple arrays (elements that appear in only one array)
 *
 * @example
 * ```js
 * // Basic usage
 * complement([1, 2], [2, '33'], [2])
 * // [1, '33']
 *
 * // With strings
 * complement(['a', 'b'], ['b', 'c'], ['c', 'd'])
 * // ['a', 'd']
 *
 * // With numbers
 * complement([1, 2, 3], [2, 3, 4], [3, 4, 5])
 * // [1, 5]
 *
 * // Single array returns itself
 * complement([1, 2, 3])
 * // [1, 2, 3]
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
