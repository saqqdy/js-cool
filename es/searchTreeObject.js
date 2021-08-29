'use strict';

/**
 * tree对象深度查找
 *
 * @param tree - 树形对象
 * @param expression - 必填 查询方式
 * @param keySet - 选填 默认的子类名称、查询name
 * @param number - 选填 查找个数，不传则查询全部
 * @returns 返回查询到的数组
 */
function searchTreeObject(tree, expression, keySet, number = 0) {
    let retNode = [], isLimit = number > 0;
    if (!keySet || typeof keySet !== 'object') {
        keySet = { childName: 'child', keyName: 'name' };
    }
    if (Object.prototype.toString.call(tree) === '[object Object]')
        tree = [tree];
    /**
     * 递归查找
     *
     * @private
     * @param tree - 对象
     * @param expression - 表达式
     * @returns Nodes
     */
    function deepSearch(tree, expression) {
        for (let i = 0; i < tree.length; i++) {
            if (tree[i][keySet.childName] && tree[i][keySet.childName].length > 0) {
                deepSearch(tree[i][keySet.childName], expression);
            }
            let result = true;
            if (typeof expression === 'object') {
                let keys = Object.keys(expression);
                for (let key of keys) {
                    if (expression[key] !== tree[i][key]) {
                        result = false;
                        break;
                    }
                }
            }
            else if (typeof expression === 'function') {
                result = expression.call(tree[i], tree[i]);
            }
            else {
                result = tree[i][keySet.keyName] === expression;
            }
            if (isLimit) {
                // 限制查询个数
                if (number > 0) {
                    if (result) {
                        let treeNode = Object.assign({}, tree[i]);
                        delete treeNode[keySet.childName];
                        retNode.push(treeNode);
                        number--;
                    }
                }
                else {
                    break;
                }
            }
            else {
                if (result) {
                    let treeNode = Object.assign({}, tree[i]);
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
