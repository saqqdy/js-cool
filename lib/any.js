'use strict';

require('./node_modules/core-js/modules/es.array.some.js');

var any = function any(arr, fn) {
  return arr.some(fn);
};

module.exports = any;
