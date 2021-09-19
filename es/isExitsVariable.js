'use strict';

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

module.exports = isExitsVariable;
