/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
import getCookie from './getCookie.js';

/**
 * 删除cookie
 *
 * @param name - cookie名称
 */
function delCookie(name) {
    var e = new Date();
    e.setTime(e.getTime() - 1);
    var cval = getCookie(name);
    if (cval !== null) {
        document.cookie =
            name + '=' + cval + ';expires=' + e.toUTCString() + ';path=/';
    }
}

export { delCookie as default };
