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
