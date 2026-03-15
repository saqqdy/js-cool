import type { AnyObject } from './types'
import isArray from './isArray'

/**
 * Data cleaning methods
 *
 * @example
 * ```js
 * // Using array map - extract specific keys
 * const data = { name: 'John', age: 30, password: '123456', email: 'john@example.com' }
 * cleanData(data, ['name', 'email'])
 * // { name: 'John', email: 'john@example.com' }
 *
 * // Using object map - rename keys
 * cleanData(data, { userName: 'name', userEmail: 'email' })
 * // { userName: 'John', userEmail: 'john@example.com' }
 *
 * // Using function in map
 * cleanData(data, { fullName: (obj) => obj.name + ' Doe' })
 * // { fullName: 'John Doe' }
 *
 * // With nullFix - provide default values for missing keys
 * cleanData(data, ['name', 'phone'], 'N/A')
 * // { name: 'John', phone: 'N/A' }
 * ```
 * @since 1.0.2
 * @param data - the object to be cleaned, must be passed
 * @param map - the data queue to be cleaned, can be passed as array or object
 * @param nullFix - optional, the value returned if there is no corresponding property, the default does not return the property
 * @returns - the cleaned object
 */
function cleanData(data: any, map: any[] | AnyObject, nullFix?: any): any {
	const result: any = {}

	if (!data) return
	if (!map) return data
	if (isArray(map)) {
		map.forEach(key => {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				result[key] = data[key]
			} else if (typeof nullFix !== 'undefined') {
				result[key] = nullFix
			}
		})
	} else if (typeof map === 'object') {
		for (const key in map) {
			if (typeof map[key] === 'function') {
				result[key] = map[key](data)
			} else {
				if (!map[key]) map[key] = key
				if (Object.prototype.hasOwnProperty.call(data, map[key])) {
					result[key] = data[map[key]]
				} else if (typeof nullFix !== 'undefined') {
					result[key] = nullFix
				}
			}
		}
	}

	return result
}

export default cleanData
