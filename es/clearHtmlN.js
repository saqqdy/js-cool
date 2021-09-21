/*!
 * js-cool v2.1.2
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

/**
 * 去除HTML标签及换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearHtmlN(string) {
    return string.replace(/<\/?.+?>|[\r\n]/g, '');
}

module.exports = clearHtmlN;
