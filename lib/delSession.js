/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
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
