'use strict';

require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.object.keys.js');
var tslib_es6 = require('./node_modules/tslib/tslib.es6.js');

/**
 * tree对象深度查找
 *
 * @param tree - 树形对象
 * @param expression - 必填 查询方式
 * @param keySet - 选填 默认的子类名称、查询name
 * @param number - 选填 查找个数，不传则查询全部
 * @returns 返回查询到的数组
 */

function searchTreeObject(tree, expression, keySet, number) {
  if (number === void 0) {
    number = 0;
  }

  var retNode = [],
      isLimit = number > 0;

  if (!keySet || typeof keySet !== 'object') {
    keySet = {
      childName: 'child',
      keyName: 'name'
    };
  }

  if (Object.prototype.toString.call(tree) === '[object Object]') tree = [tree];
  /**
   * 递归查找
   *
   * @private
   * @param tree - 对象
   * @param expression - 表达式
   * @returns Nodes
   */

  function deepSearch(tree, expression) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i][keySet.childName] && tree[i][keySet.childName].length > 0) {
        deepSearch(tree[i][keySet.childName], expression);
      }

      var result = true;

      if (typeof expression === 'object') {
        var keys = Object.keys(expression);

        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
          var key = keys_1[_i];

          if (expression[key] !== tree[i][key]) {
            result = false;
            break;
          }
        }
      } else if (typeof expression === 'function') {
        result = expression.call(tree[i], tree[i]);
      } else {
        result = tree[i][keySet.keyName] === expression;
      }

      if (isLimit) {
        // 限制查询个数
        if (number > 0) {
          if (result) {
            var treeNode = tslib_es6.__assign({}, tree[i]);

            delete treeNode[keySet.childName];
            retNode.push(treeNode);
            number--;
          }
        } else {
          break;
        }
      } else {
        if (result) {
          var treeNode = tslib_es6.__assign({}, tree[i]);

          delete treeNode[keySet.childName];
          retNode.push(treeNode);
        }
      }
    }
  }

  deepSearch(tree, expression);
  return retNode;
}

module.exports = searchTreeObject;
