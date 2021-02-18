/**
 * 读取cookies
 * @param {String} name cookie名称
 * @returns {String} 返回cookie字符串
 */
function getCookie(name) {
    var arr,
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    arr = document.cookie.match(reg)
    if (arr) {
        return decodeURIComponent(arr[2])
    } else {
        return null
    }
}

export default getCookie
