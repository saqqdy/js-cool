'use strict';

/**
 * 删除localStorage
 * @param {String} name 名称
 */
function delLocal(name) {
  localStorage.removeItem(name);
}

module.exports = delLocal;
