import isArray from './isArray'
/**
 * @description: 数据清洗方法
 * @param {object} data 要清洗的对象，必传
 * @param [Object, Array] map 需要的数据队列，可传数组或者对象
 * @param map
 * @param nullFix
 * @param map
 * @param nullFix
 * @param [Object, Array, String, Number, Boolean] nullFix 选填，没有对应属性时返回的值，默认不返回该属性
 * @returns {object} 返回清洗后的对象
 */
function cleanData(data, map, nullFix) {
	let result = {}
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
		for (let key in map) {
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
