'use strict';

require('core-js/modules/es.object.assign.js');
require('core-js/modules/es.object.keys.js');

/**
 * @description tree对象深度查找
 *
 * @param {string} tree 树形对象
 * @param [String, Object, Function] expression 必填 查询方式
 * @param expression
 * @param {object} keySet 选填 默认的子类名称、查询name
 * @param {number} number 选填 查找个数，不传则查询全部
 * @returns {Array} 返回查询到的数组
 */
function searchTreeObject(tree, expression, keySet, number) {
  if (number === void 0) {
    number = null;
  }

  var retNode = [],
      isNum = typeof number === 'number';

  if (!keySet || typeof keySet !== 'object') {
    keySet = {};
  }

  keySet = Object.assign({
    childName: 'child',
    keyName: 'name'
  }, keySet);
  /**
   * @description 递归查找
   * @private
   * @param [Object, Array] tree 对象
   * @param {String} expression 表达式
   * @returns {Object} Nodes
   */

  function deepSearch(tree, expression) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i][keySet.childName] && tree[i][keySet.childName].length > 0) {
        deepSearch(tree[i][keySet.childName], expression);
      }

      var result = true;

      if (typeof expression === 'object') {
        var keys = Object.keys(expression),
            m = 0;

        for (m in keys) {
          if (expression[keys[m]] !== tree[i][keys[m]]) {
            result = false;
            break;
          }
        }
      } else if (typeof expression === 'function') {
        result = expression.call(tree[i], tree[i]);
      } else {
        result = tree[i][keySet.keyName] === expression;
      }

      if (isNum) {
        // 限制查询个数
        if (number > 0) {
          if (result) {
            var treeNode = Object.assign({}, tree[i]);
            delete treeNode[keySet.childName];
            retNode.push(treeNode);
            number--;
          }
        } else {
          break;
        }
      } else {
        if (result) {
          var _treeNode = Object.assign({}, tree[i]);

          delete _treeNode[keySet.childName];
          retNode.push(_treeNode);
        }
      }
    }
  }

  deepSearch(tree, expression);
  return retNode;
}

module.exports = searchTreeObject;
