/**
 * Get array, object property values based on path string
 *
 * @example
 * ```js
 * const target = {
 *      a: 1,
 *      b: [{
 *          c: 2
 *          d: NaN
 *      }]
 * }
 * getProperty(target, 'a') // 1
 * getProperty(target, 'd', 100) // 100
 * getProperty(target, 'b[0].c') // 2
 * getProperty(target, 'b[0].d', 100) // 100
 * getProperty(target, () => 'a') // 1
 * ```
 * @since 2.2.4
 * @param target - target array, object
 * @param prop - query target, can pass function
 * @param defaultValue - default value
 * @returns result
 */
function getProperty<T extends Record<string, any>>(
	target: T,
	prop: string | { (): string },
	defaultValue?: any
): any
function getProperty<T extends Array<any>>(
	target: T,
	prop: string | { (): string },
	defaultValue?: any
): any
function getProperty(target: any, prop: string | { (): string }, defaultValue?: any): any {
	if (!target) throw new Error('target is required')
	if (!prop) return target
	if (prop instanceof Function) prop = prop()
	const arr = prop.split('.')
	for (let p of arr) {
		let index = -1
		// eslint-disable-next-line no-sequences
		p = p.replace(/\[(\d+)\]$/, (str, num) => ((index = parseInt(num)), ''))
		if (p) target = target?.[p]
		if (index !== -1 && target) target = target?.[index]
	}
	if (defaultValue === undefined) return target
	// undefined | null | NaN => defaultValue
	// eslint-disable-next-line eqeqeq
	return target || target == false ? target : defaultValue
}

export default getProperty
