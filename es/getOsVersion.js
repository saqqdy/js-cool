/*!
 * js-cool v2.3.0
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
import getAppVersion from './getAppVersion.js';

/**
 * 获取手机系统版本
 *
 * @example
 * ```
 * getAppVersion('iPhone') // '13.2.3'
 * getAppVersion('iPhone', true) // 'iPhone/13.2.3'
 * ```
 * @param osName - 系统类型字符串Android、iPod、iWatch或iPhone
 * @param withosstr - 是否需要带上名称
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */
function getOsVersion(osName, withosstr, userAgent) {
    userAgent = userAgent || navigator.appVersion;
    var d = ['iPhone', 'iPad', 'iPod', 'iWatch', 'Mac', 'iMac', 'iOS'], name = osName, index = d.indexOf(osName);
    if (index > -1 && userAgent.indexOf('like Mac OS X') > -1) {
        name = 'OS';
    }
    var reg = eval('/' + name + '\\s[\\d\\_]+/ig');
    // var isApp = userAgent.includes(name)
    var ver = (userAgent.match(reg) + '')
        .replace(/\s/gi, '/')
        .replace(/_/gi, '.');
    if (index > -1) {
        ver = ver.replace(/OS\//gi, osName + '/');
    }
    return getAppVersion(osName, withosstr, ver);
}

export { getOsVersion as default };
