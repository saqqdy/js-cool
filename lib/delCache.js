/*!
 * js-cool v2.3.1
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2022 saqqdy 
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
