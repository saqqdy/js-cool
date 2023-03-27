import _eval from './_eval'

/**
 * 是否存在指定函数
 *
 * @param funcName - 传入函数名
 * @returns 返回true/false
 */
function isExitsFunction(funcName: string): boolean {
	return typeof _eval(funcName) === 'function'
}

export default isExitsFunction
