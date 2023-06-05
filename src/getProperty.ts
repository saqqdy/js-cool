/**
 * Get array, object property values based on path string
 *
 * @example
 * ```js
 * const target = {
 *      a: 1,
 *      b: [{
 *          c: 2
 *      }]
 * }
 * getProperty(target, 'a') // 1
 * getProperty(target, 'b[0].c') // 2
 * getProperty(target, () => 'a') // 1
 * ```
 * @param target - target array, object
 * @param prop - query target, can pass function
 * @returns result
 */
function getProperty(target: any, prop: string | { (): string }): any {
	if (!target) throw new Error('target is required')
	if (!prop) return target
	if (prop instanceof Function) prop = prop()
	const arr = prop.split('.')
	for (let p of arr) {
		let index = -1
		// eslint-disable-next-line no-sequences
		p = p.replace(/\[(\d+)\]$/, (str, num) => ((index = parseInt(num)), ''))
		if (p) target = target[p]
		if (index !== -1 && target) target = target[index]
	}
	return target
}

export default getProperty
