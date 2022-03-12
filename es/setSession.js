/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
/**
 * 写sessionStorage
 *
 * @param name - 名称
 * @param value - 设置要存储的值，可以是对象或字符串
 * @param seconds - 有效时间
 */
function setSession(name, value, seconds) {
    var e = new Date();
    var expires = seconds ? e.getTime() + seconds * 1000 : '';
    var obj = {};
    obj.value = value;
    obj.expires = expires;
    sessionStorage.setItem(name, JSON.stringify(obj));
}

export { setSession as default };
