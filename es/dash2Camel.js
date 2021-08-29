'use strict';

/**
 * 将-间隔且全小写的Dash模式转成驼峰字符串
 *
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
function dash2Camel(string) {
    return string.replace(/[\-]{1,1}([a-z]{1,1})/g, function () {
        return arguments[1].toLocaleUpperCase();
    });
}

module.exports = dash2Camel;
