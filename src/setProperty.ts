/**
 * Set array, object property values based on path strings
 *
 * @example
 * ```js
 * const target = {
 *      a: 1,
 *      b: [{
 *          c: 2
 *      }]
 * }
 *
 * setProperty(target, 'a') // 1
 *
 * setProperty(target, 'b[0].c') // 2
 *
 * setProperty(target, () => 'a') // 1
 * ```
 * @since 2.7.0
 * @param target - target array, object
 * @param prop - set target, can pass function, 'a' | 'a[1].c'
 * @returns - the corresponding value
 */
function setProperty(target: any, prop: string | { (): string }, value: any): any {
	if (!target) throw new Error('target is required')
	if (!prop) throw new Error('prop is required')
	if (prop instanceof Function) prop = prop()
	const arr = prop.split('.')
	let _target = target

	arr.forEach((p, i) => {
		let index = -1
		// p = p.replace(/\[(\d+)\]$/, (str, num) => ((index = parseInt(num)), ''))
		p = p.replace(/\[(\d+)\]$/, (str, num) => {
			index = parseInt(num)
			return ''
		})
		if (i !== arr.length - 1) {
			if (p) {
				_target[p] ??= {}
				_target = _target[p]
			}
			if (index !== -1 && _target) {
				_target[index] ??= []
				_target = _target[index]
			}
		} else {
			if (index !== -1) {
				if (p) {
					_target[p] ??= []
					_target = _target[p]
				}
				_target[index] = value
			} else if (p) {
				_target[p] = value
			}
		}
	})
	return target
}

export default setProperty
