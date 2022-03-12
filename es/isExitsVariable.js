/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
/**
 * 是否存在指定变量
 *
 * @param variableName - 传入变量名称
 * @returns 返回true/false
 */
function isExitsVariable(variableName) {
    try {
        if (typeof variableName === 'undefined') {
            return false;
        }
        else {
            return true;
        }
    }
    catch (_a) { }
    return false;
}

export { isExitsVariable as default };
