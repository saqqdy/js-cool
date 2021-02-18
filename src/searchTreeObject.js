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
function searchTreeObject(tree, expression, keySet, number = null) {
	let retNode = [],
		isNum = typeof number === 'number'
	if (!keySet || typeof keySet !== 'object') {
		keySet = {}
	}
	keySet = { childName: 'child', keyName: 'name', ...keySet }
	/**
	 * @description 递归查找
	 * @param [Object, Array] tree 对象
	 * @param {String} expression 表达式
	 * @returns {Object} Nodes
	 */
	function deepSearch(tree, expression) {
		for (let i = 0; i < tree.length; i++) {
			if (tree[i][keySet.childName] && tree[i][keySet.childName].length > 0) {
				deepSearch(tree[i][keySet.childName], expression)
			}
			let result = true
			if (typeof expression === 'object') {
				let keys = Object.keys(expression),
					m = 0
				for (m in keys) {
					if (expression[keys[m]] !== tree[i][keys[m]]) {
						result = false
						break
					}
				}
			} else if (typeof expression === 'function') {
				result = expression.call(tree[i], tree[i])
			} else {
				result = tree[i][keySet.keyName] === expression
			}
			if (isNum) {
				// 限制查询个数
				if (number > 0) {
					if (result) {
						let treeNode = { ...tree[i] }
						delete treeNode[keySet.childName]
						retNode.push(treeNode)
						number--
					}
				} else {
					break
				}
			} else {
				if (result) {
					let treeNode = { ...tree[i] }
					delete treeNode[keySet.childName]
					retNode.push(treeNode)
				}
			}
		}
	}
	deepSearch(tree, expression)
	return retNode
}

export default searchTreeObject
