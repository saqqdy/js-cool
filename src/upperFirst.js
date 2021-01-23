/**
 * upperFirst
 * 首字母大写
 * @param {String} string 需要转换的字符串
 * @returns {String} 返回转换后的字符串
 */
const upperFirst = string => {
	return string.slice(0, 1).toLocaleUpperCase() + string.slice(1)
}

export default upperFirst
