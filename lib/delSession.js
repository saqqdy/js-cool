/*!
 * js-cool v2.1.2
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

/**
 * 删除sessionStorage
 *
 * @param name - 名称
 */
function delSession(name) {
  sessionStorage.removeItem(name);
}

module.exports = delSession;
