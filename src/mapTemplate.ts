/**
 * Replacing specific data in a template string, support `${xxxx}` `{{xxxx}}` and `{xxxx}`
 *
 * @example
 * ```ts
 * const tmp = "My name is ${name}, I'm ${age} years old."
 * mapTemplate(tmp, {
 *     name: 'saqqdy',
 *     age: 18
 * })
 * // My name is saqqdy, I'm 18 years old.
 *
 * mapTemplate(tmp, key => ({ name: 'saqqdy', age: 28 }[key]))
 * // My name is saqqdy, I'm 28 years old.
 *
 * const tmp = "My name is {{name}}, I'm {{age}} years old."
 * mapTemplate(tmp, {
 *     name: 'saqqdy',
 *     age: 18
 * })
 * // My name is saqqdy, I'm 18 years old.
 * ```
 * @since 5.9.0
 * @param tmp - Template string
 * @param data - Template data of map function
 * @returns - result
 */
function mapTemplate(
	tmp: string,
	data: ((value: string) => unknown) | Record<string, unknown>
): string {
	if (!tmp || !data) throw new Error('"tmp" & "data" is required')
	const regexp = tmp.match(/\$\{(\w+)\}/g) ? /\$\{(\w+)\}/g : /\{?\{(\w+)\}\}?/g

	return (
		'' +
		tmp.replace(regexp, (string: string, replaceValue: string) => {
			if (typeof data === 'function') return '' + data(replaceValue)
			for (const key in data) {
				if (replaceValue === key) return '' + data[key]
			}
			return string
		})
	)
}

export default mapTemplate
