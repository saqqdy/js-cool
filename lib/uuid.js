'use strict';

require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');
require('core-js/modules/es.date.to-string.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.regexp.to-string.js');
require('core-js/modules/es.array.iterator.js');
require('core-js/modules/es.array-buffer.slice.js');
require('core-js/modules/es.typed-array.uint8-array.js');
require('core-js/modules/es.typed-array.copy-within.js');
require('core-js/modules/es.typed-array.every.js');
require('core-js/modules/es.typed-array.fill.js');
require('core-js/modules/es.typed-array.filter.js');
require('core-js/modules/es.typed-array.find.js');
require('core-js/modules/es.typed-array.find-index.js');
require('core-js/modules/es.typed-array.for-each.js');
require('core-js/modules/es.typed-array.includes.js');
require('core-js/modules/es.typed-array.index-of.js');
require('core-js/modules/es.typed-array.iterator.js');
require('core-js/modules/es.typed-array.join.js');
require('core-js/modules/es.typed-array.last-index-of.js');
require('core-js/modules/es.typed-array.map.js');
require('core-js/modules/es.typed-array.reduce.js');
require('core-js/modules/es.typed-array.reduce-right.js');
require('core-js/modules/es.typed-array.reverse.js');
require('core-js/modules/es.typed-array.set.js');
require('core-js/modules/es.typed-array.slice.js');
require('core-js/modules/es.typed-array.some.js');
require('core-js/modules/es.typed-array.sort.js');
require('core-js/modules/es.typed-array.subarray.js');
require('core-js/modules/es.typed-array.to-locale-string.js');
require('core-js/modules/es.typed-array.to-string.js');

/**
 * 浏览器端生成uuid，采用v4方法
 *
 * @example
 * ```js
 * uuid(); // '4222fcfe-5721-4632-bede-6043885be57d'
 * ```
 * @returns uuid
 */
// @ts-ignore
var uuid = function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
};

module.exports = uuid;
