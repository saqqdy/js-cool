/**
 * Splits string into an array of its words.
 *
 * @example
 * ```js
 * words('fred, barney, & pebbles')
 * // ['fred', 'barney', 'pebbles']
 *
 * words('camelCaseHTML')
 * // ['camel', 'Case', 'HTML']
 *
 * words('camelCaseHTML', /[A-Z]{2,}/g)
 * // ['HTML']
 *
 * words('hello world', /\w+/g)
 * // ['hello', 'world']
 *
 * words('')
 * // []
 * ```
 * @since 6.0.0
 * @param string - The string to split
 * @param pattern - The pattern to match words (optional)
 * @returns - Array of words
 */
function words(string: string, pattern?: RegExp | string): string[] {
	if (!string || typeof string !== 'string') return []

	// 如果提供了自定义模式
	if (pattern !== undefined) {
		const regex = typeof pattern === 'string' ? new RegExp(pattern, 'g') : pattern
		const matches = string.match(regex)
		return matches ?? []
	}

	// 默认分词：匹配单词边界
	// 支持 camelCase、PascalCase、snake_case、kebab-case、空格分隔等
	const result: string[] = []

	// 使用正则匹配所有单词
	// 匹配模式：
	// 1. 连续大写字母后跟小写字母（如 HTMLParser -> HTML, Parser）
	// 2. 大写字母后跟小写字母序列（如 CamelCase -> Camel, Case）
	// 3. 小写字母序列
	// 4. 数字序列
	const wordPattern = /[A-Z]{2,}(?=[A-Z][a-z]|\b)|[A-Z]?[a-z]+|[A-Z]+|\d+/g

	let match: RegExpExecArray | null = wordPattern.exec(string)
	while (match !== null) {
		if (match[0]) {
			result.push(match[0])
		}
		match = wordPattern.exec(string)
	}

	return result
}

export default words
