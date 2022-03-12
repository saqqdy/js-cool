/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
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
