'use strict';

require('core-js/modules/es.date.to-string.js');

/**
 * setCache
 * @description 获取缓存，存入的如果是Object，取出的也是Object，不需要再转换
 * @param name {String} 缓存名称
 * @param value [String, Boolean, Number, Object] 缓存数据，可以直接传入Object
 * @param seconds {Number} 缓存时间（秒）
 * @returns value 返回数据，存的如果是对象，取出的也是对象
 */
function setCache(name, value, seconds) {
  var e = new Date(),
      expires = seconds ? e.getTime() + seconds * 1000 : '',
      o = {};
  o.value = value;
  o.expires = expires;
  o = JSON.stringify(o);
  localStorage.setItem(name, o);
}

module.exports = setCache;
