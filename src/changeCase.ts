import constantCase from './constantCase'
import dash2Camel from './dash2Camel'
import dotCase from './dotCase'
import kebabCase from './kebabCase'
import lowerFirst from './lowerFirst'
import pascalCase from './pascalCase'
import snakeCase from './snakeCase'
import swapCase from './swapCase'
import titleCase from './titleCase'
import upperFirst from './upperFirst'

/**
 * Case types supported by changeCase
 */
export type CaseType =
	| 'camel'
	| 'constant'
	| 'dot'
	| 'kebab'
	| 'lower'
	| 'lowerFirst'
	| 'pascal'
	| 'snake'
	| 'swap'
	| 'title'
	| 'upper'
	| 'upperFirst'

/**
 * Converts string to the specified case type.
 *
 * @description
 * A unified API for all case conversion functions.
 *
 * @example
 * ```ts
 * changeCase('fooBar', 'kebab')
 * // => 'foo-bar'
 *
 * changeCase('foo-bar', 'camel')
 * // => 'fooBar'
 *
 * changeCase('foo_bar', 'pascal')
 * // => 'FooBar'
 *
 * changeCase('fooBar', 'snake')
 * // => 'foo_bar'
 *
 * changeCase('fooBar', 'constant')
 * // => 'FOO_BAR'
 *
 * changeCase('fooBar', 'dot')
 * // => 'foo.bar'
 *
 * changeCase('foo bar', 'title')
 * // => 'Foo Bar'
 *
 * changeCase('Hello', 'swap')
 * // => 'hELLO'
 *
 * changeCase('hello', 'upper')
 * // => 'HELLO'
 *
 * changeCase('HELLO', 'lower')
 * // => 'hello'
 *
 * changeCase('hello', 'upperFirst')
 * // => 'Hello'
 *
 * changeCase('Hello', 'lowerFirst')
 * // => 'hello'
 * ```
 *
 * @since 6.0.0
 * @param str - The string to convert
 * @param caseType - The target case type
 * @returns - Returns the converted string
 */
function changeCase(str: string, caseType: CaseType): string {
	switch (caseType) {
		case 'camel':
			return dash2Camel(kebabCase(str))
		case 'constant':
			return constantCase(str)
		case 'dot':
			return dotCase(str)
		case 'kebab':
			return kebabCase(str)
		case 'lower':
			return str.toLowerCase()
		case 'lowerFirst':
			return lowerFirst(str)
		case 'pascal':
			return pascalCase(str)
		case 'snake':
			return snakeCase(str)
		case 'swap':
			return swapCase(str)
		case 'title':
			return titleCase(str)
		case 'upper':
			return str.toUpperCase()
		case 'upperFirst':
			return upperFirst(str)
		default:
			return str
	}
}

export default changeCase
