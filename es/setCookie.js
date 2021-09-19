'use strict';

/**
 * setCookie写入cookie的方法
 *
 * @param name - cookie名称
 * @param value - 设置要存储的值，可以是对象或字符串
 * @param seconds - cookie有效时间默认1天
 * @param path - 路径，默认'/'
 * @param samesite - SameSite，默认true
 */
function setCookie(name, value, seconds = 86400, path = '/', samesite = true) {
    var exp = new Date();
    exp.setTime(exp.getTime() + seconds * 1000);
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp.toUTCString() + ';path=' + path + (samesite && location.protocol === 'https:' ? ';SameSite=None;Secure' : '');
}

module.exports = setCookie;
