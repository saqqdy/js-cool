/**
 * setCookie写入cookie的方法
 * @param {String} name cookie名称
 * @param {String} value 设置要存储的值，可以是对象或字符串
 * @param {Number} seconds cookie有效时间默认1天
 * @param {String} path 路径，默认'/'
 * @param {Boolean} samesite SameSite，默认true
 */
function setCookie(name, value, seconds = 86400, path = '/', samesite = true) {
    var exp = new Date()
    exp.setTime(exp.getTime() + seconds * 1000)
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp.toGMTString() + ';path=' + path + (samesite && location.protocol === 'https:' ? ';SameSite=None;Secure' : '')
}

export default setCookie
