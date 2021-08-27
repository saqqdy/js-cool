'use strict';

require('./node_modules/core-js/modules/es.array.for-each.js');
require('./node_modules/core-js/modules/web.dom-collections.for-each.js');
var isArray = require('./isArray.js');

function cleanData(data, map, nullFix) {
  var result = {};
  if (!data) return;
  if (!map) return data;

  if (isArray(map)) {
    map.forEach(function (key) {
      if (data.hasOwnProperty(key)) {
        result[key] = data[key];
      } else if (typeof nullFix !== 'undefined') {
        result[key] = nullFix;
      }
    });
  } else if (typeof map === 'object') {
    for (var key in map) {
      if (typeof map[key] === 'function') {
        result[key] = map[key](data);
      } else {
        if (!map[key]) map[key] = key;

        if (data.hasOwnProperty(map[key])) {
          result[key] = data[map[key]];
        } else if (typeof nullFix !== 'undefined') {
          result[key] = nullFix;
        }
      }
    }
  }

  return result;
}

module.exports = cleanData;
