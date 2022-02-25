/*!
 * js-cool v2.3.1
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
/**
 * 读取cookies
 *
 * @param name - cookie名称
 * @returns 返回cookie字符串
 */
function getCookie(name) {
    var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    arr = document.cookie.match(reg);
    if (arr) {
        return decodeURIComponent(arr[2]);
    }
    else {
        return null;
    }
}

export { getCookie as default };
