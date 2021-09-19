'use strict';

require('core-js/modules/es.object.get-prototype-of.js');
require('core-js/modules/es.array.for-each.js');
var isArray = require('./isArray.js');
var getType = require('./getType.js');

function isWindow(obj) {
  return obj !== null && obj === obj.window;
}

function isPlainObject(obj) {
  return getType(obj) === 'object' && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
} //对象扩展


var extend = function () {
  /**
   * @param target - 目标
   * @param source - 源
   * @param deep - 是否深拷贝
   */
  function extend(target, source, deep) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
          if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {};
          if (isArray(source[key]) && !isArray(target[key])) target[key] = [];
          extend(target[key], source[key], deep);
        } else if (source[key] !== undefined) target[key] = source[key];
      }
    }
  }

  return function (target) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    var deep = false;

    if (typeof target === 'boolean') {
      deep = target;
      target = args.shift();
    }

    args.forEach(function (arg) {
      extend(target, arg, deep);
    });
    return target;
  };
}();

module.exports = extend;
