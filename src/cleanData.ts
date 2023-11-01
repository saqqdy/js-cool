import type { AnyObject } from './types'
import isArray from './isArray'

/**
 * Data cleaning methods
 *
 * @since 1.0.2
 * @param data - the object to be cleaned, must be passed
 * @param map - the data queue to be cleaned, can be passed as array or object
 * @param map -
 * @param nullFix -
 * @param map -
 * @param nullFix -
 * @param nullFix - optional, the value returned if there is no corresponding property, the default does not return the property
 * @returns - the cleaned object
 */
function cleanData(data: any, map: any[] | AnyObject, nullFix?: any) {
	const result: any = {}
	if (!data) return
	if (!map) return data
	if (isArray(map)) {
		map.forEach(key => {
			if (data.hasOwnProperty(key)) {
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
				if (data.hasOwnProperty(map[key])) {
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
