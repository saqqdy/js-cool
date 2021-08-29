'use strict';

/**
 * 日期格式化插件
 *
 * @example 使用方式
 * ```js
 * formatTime(new Date(), "yyyy-MM-dd")
 * ```
 * @param time - 时间对象或者字符串
 * @param fmt - 格式化风格
 * @returns 返回字符串
 */
function formatTime(time, fmt = 'yyyy-MM-dd') {
    if (typeof time === 'string') {
        time = new Date(time);
    }
    var o = {
        'M+': time.getMonth() + 1,
        'd+': time.getDate(),
        'h+': time.getHours(),
        'm+': time.getMinutes(),
        's+': time.getSeconds(),
        'q+': Math.floor((time.getMonth() + 3) / 3),
        S: time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, ('' + time.getFullYear()).substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
    return fmt;
}

module.exports = formatTime;
