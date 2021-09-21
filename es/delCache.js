/*!
 * js-cool v2.1.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

/**
 * 删除localStorage
 *
 * @param name - 名称
 */
function delCache(name) {
    localStorage.removeItem(name);
}

module.exports = delCache;
