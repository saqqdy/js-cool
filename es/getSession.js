/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
/**
 * 读取sessionStorage
 *
 * @param name - 名称
 * @returns 返回sessionStorage
 */
function getSession(name) {
    var str = sessionStorage.getItem(name);
    var exp = new Date();
    if (str) {
        var obj = JSON.parse(str);
        if (!obj.hasOwnProperty('value') || !obj.hasOwnProperty('expires')) {
            return null;
        }
        else {
            if (!obj.expires || obj.expires > exp.getTime()) {
                return obj.value;
            }
            else {
                sessionStorage.removeItem(name);
                return null;
            }
        }
    }
    else {
        return null;
    }
}

export { getSession as default };
