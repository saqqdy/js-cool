/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
/**
 * 获取随机字符串带特殊符号
 *
 * @param len - 需要获取随机字符串的长度
 * @returns 随机串
 */
function getRandomStrWidthSpecialChar(len = 32) {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678~!@#$^&*_+=-.'; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    var maxPos = chars.length;
    var str = '';
    for (var i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
}

export { getRandomStrWidthSpecialChar as default };
