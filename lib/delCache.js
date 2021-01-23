'use strict';

/**
 * 删除localStorage
 * @param {String} name 名称
 */
function delCache(name) {
  localStorage.removeItem(name);
}

module.exports = delCache;
