'use strict';

/**
 * 去除HTML标签所有属性
 *
 * @param string - 传入字符串
 * @returns newString
 */
function clearAttr(string) {
    return string.replace(/<([a-zA-Z1-7]+)\s*[^><]*>/g, '<$1>');
}

module.exports = clearAttr;
