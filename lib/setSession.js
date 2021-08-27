'use strict';

require('core-js/modules/es.date.to-string.js');

function setSession(name, value, seconds) {
  var e = new Date();
  var expires = seconds ? e.getTime() + seconds * 1000 : '';
  var obj = {};
  obj.value = value;
  obj.expires = expires;
  sessionStorage.setItem(name, JSON.stringify(obj));
}

module.exports = setSession;
