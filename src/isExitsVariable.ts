/**
 * 是否存在指定变量
 * 
 * @param variableName - 传入变量名称
 * @returns 返回true/false
 */
function isExitsVariable(variableName: string): boolean {
    try {
        if (typeof variableName === 'undefined') {
            return false
        } else {
            return true
        }
    } catch { }
    return false
}

export default isExitsVariable
