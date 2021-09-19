'use strict';

/**
 * 去除HTML标签及标签里面的文字
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearHtmlTag(string) {
    return string.replace(/<[^>]+>/g, '');
}

module.exports = clearHtmlTag;
