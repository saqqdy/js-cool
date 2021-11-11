import getCookie from './getCookie'

/**
 * 删除cookie
 *
 * @param name - cookie名称
 */
function delCookie(name: string) {
    var e = new Date()
    e.setTime(e.getTime() - 1)
    var cval = getCookie(name)
    if (cval !== null) {
        document.cookie =
            name + '=' + cval + ';expires=' + e.toUTCString() + ';path=/'
    }
}

export default delCookie
