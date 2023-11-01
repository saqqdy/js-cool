export interface SearchKeySet {
	childName: string
	keyName: string
	[prop: string]: any
}

/**
 * tree object depth lookup
 *
 * @since 5.0.0
 * @param tree - tree object
 * @param expression - required Query method
 * @param keySet - optional Default subclass name, query name
 * @param number - optional Number of lookups, if not passed, query all
 * @returns - the queried array
 */
function searchObject(tree: object | any[], expression: any, keySet: SearchKeySet, number = 0) {
	const retNode: any[] = []
	const isLimit = number > 0
	if (!keySet || typeof keySet !== 'object') {
		keySet = { childName: 'child', keyName: 'name' }
	}
	if (Object.prototype.toString.call(tree) === '[object Object]') tree = [tree]
	/**
	 * Recursive lookup
	 *
	 * @private
	 * @param tree - object
	 * @param expression - expression
	 * @returns Nodes
	 */
	function deepSearch(tree: any, expression: any) {
		for (let i = 0; i < tree.length; i++) {
			if (tree[i][keySet.childName] && tree[i][keySet.childName].length > 0) {
				deepSearch(tree[i][keySet.childName], expression)
			}
			let result = true
			if (typeof expression === 'object') {
				const keys = Object.keys(expression)
				for (const key of keys) {
					if (expression[key] !== tree[i][key]) {
						result = false
						break
					}
				}
			} else if (typeof expression === 'function') {
				result = expression.call(tree[i], tree[i])
			} else {
				result = tree[i][keySet.keyName] === expression
			}
			if (isLimit) {
				// Limit the number of queries
				if (number > 0) {
					if (result) {
						const treeNode = { ...tree[i] }
						delete treeNode[keySet.childName]
						retNode.push(treeNode)
						number--
					}
				} else {
					break
				}
			} else {
				if (result) {
					const treeNode = { ...tree[i] }
					delete treeNode[keySet.childName]
					retNode.push(treeNode)
				}
			}
		}
	}
	deepSearch(tree, expression)
	return retNode
}

export default searchObject
