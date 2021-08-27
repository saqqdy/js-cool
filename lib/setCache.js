'use strict';

require('core-js/modules/es.date.to-string.js');

function setCache(name, value, seconds) {
  var e = new Date(),
      expires = seconds ? e.getTime() + seconds * 1000 : '',
      o = {};
  o.value = value;
  o.expires = expires;
  localStorage.setItem(name, JSON.stringify(o));
}

module.exports = setCache;
