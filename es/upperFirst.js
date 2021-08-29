'use strict';

/**
 * 首字母大写
 *
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
function upperFirst(string) {
    return string.slice(0, 1).toLocaleUpperCase() + string.slice(1);
}

module.exports = upperFirst;
