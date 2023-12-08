import isArray from './isArray'
import isDate from './isDate'
import isRegExp from './isRegExp'

/**
 * deep clone (Buffer, Promise, Set, Map are not supported)
 *
 * @example
 * ```js
 * const source = { a: 100, reg: /\d+/g, arr: [1, 2] }
 * const res = clone(source)
 * // { a: 100, reg: /\d+/g, arr: [1, 2] }
 * ```
 * @since 5.15.0
 * @param parent - source object
 * @returns - new object
 */
function clone<T = any>(parent: T): T {
	// handle regexp
	const getRegExp = (reg: RegExp) => {
		let flags = ''
		if (reg.global) flags += 'g'
		if (reg.ignoreCase) flags += 'i'
		if (reg.multiline) flags += 'm'

		return flags
	}
	// Maintain two arrays of circular references
	const parents: any[] = []
	const children: any[] = []

	const _clone = <P = any>(parent: P): P => {
		if (parent === null || typeof parent !== 'object') return parent

		let child, proto

		if (isArray(parent)) {
			child = []
		} else if (isRegExp(parent)) {
			child = new RegExp(parent.source, getRegExp(parent))
			if (parent.lastIndex) child.lastIndex = parent.lastIndex
		} else if (isDate(parent)) {
			child = new Date(parent.getTime())
		} else {
			proto = Object.getPrototypeOf(parent)
			child = Object.create(proto)
		}

		// Handling circular references
		const index = parents.indexOf(parent)

		// If this object exists in the parent array, it has already been referenced, so return it directly.
		if (index !== -1) return children[index]

		parents.push(parent)
		children.push(child)

		for (const i in parent) {
			// recursive
			child[i] = _clone(parent[i])
		}

		return child
	}

	return _clone(parent)
}

export default clone
