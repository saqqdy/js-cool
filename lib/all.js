'use strict';

require('./node_modules/core-js/modules/es.array.every.js');

var all = function all(arr, fn) {
  return arr.every(fn);
};

module.exports = all;
