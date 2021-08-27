'use strict';

require('core-js/modules/es.array.some.js');

var any = function any(arr, fn) {
  return arr.some(fn);
};

module.exports = any;
