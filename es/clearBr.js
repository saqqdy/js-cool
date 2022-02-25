/*!
 * js-cool v2.3.1
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
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

export { clearBr as default };
