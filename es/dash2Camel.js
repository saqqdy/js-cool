/*!
 * js-cool v2.3.0
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
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

export { dash2Camel as default };
