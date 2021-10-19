/*!
 * js-cool v2.2.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 删除sessionStorage
 *
 * @param name - 名称
 */
function delSession(name) {
  sessionStorage.removeItem(name);
}

exports["default"] = delSession;
exports.delSession = delSession;
