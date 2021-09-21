/*!
 * js-cool v2.1.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

/**
 * 获取缓存，存入的如果是Object，取出的也是Object，不需要再转换
 *
 * @param name - 缓存名称
 * @returns 返回数据，存的如果是对象，取出的也是对象
 */
function getCache(name) {
    let str = localStorage.getItem(name), exp = new Date(), o;
    if (str) {
        try {
            o = JSON.parse(str);
        }
        catch (err) {
            o = str;
        }
        if (typeof o !== 'object')
            return o;
        if (!o.value)
            return null;
        if (!o.expires || o.expires > exp.getTime()) {
            return o.value;
        }
        localStorage.removeItem(name);
        return null;
    }
    return null;
}

module.exports = getCache;
