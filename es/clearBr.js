'use strict';

/**
 * 去除换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearBr(string) {
    return string
        .replace(/<\/br>/g, '')
        .replace(/<br>/g, '')
        .replace(/[\r\n]/g, '');
}

module.exports = clearBr;
