'use strict';

var throttle = require('./throttle.js');

var debounce = function debounce(fn, delay, immediate) {
  return throttle(fn, delay, immediate, true);
};

module.exports = debounce;
