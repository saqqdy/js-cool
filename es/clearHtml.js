'use strict';

/**
 * 去除HTML标签
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearHtml(string) {
    return string.replace(/<\/?.+?>/g, '').replace(/[\r\n]/g, '');
}

module.exports = clearHtml;
