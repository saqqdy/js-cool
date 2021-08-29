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
