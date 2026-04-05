/**
 * String utilities collection
 *
 * @example
 * ```ts
 * import { camel2Dash, kebabCase, truncate, upperFirst } from 'js-cool/string'
 *
 * // Convert camelCase to dash-case
 * camel2Dash('helloWorld') // 'hello-world'
 *
 * // Convert to kebab-case
 * kebabCase('Hello World') // 'hello-world'
 *
 * // Truncate string
 * truncate('Hello World', { length: 5 }) // 'He...'
 *
 * // Upper first letter
 * upperFirst('hello') // 'Hello'
 *
 * // Unified case conversion
 * changeCase('fooBar', 'kebab') // 'foo-bar'
 *
 * // Count occurrences
 * count('hello hello', 'hello') // 2
 *
 * // Reverse string
 * reverse('hello') // 'olleh'
 * ```
 *
 * @module string
 * @since 6.0.0
 */

export { default as camel2Dash } from '../camel2Dash'
export { default as capitalize } from '../capitalize'
export { default as changeCase, type CaseType } from '../changeCase'
export { default as clearAttr } from '../clearAttr'
export { default as clearHtml } from '../clearHtml'
export { default as constantCase } from '../constantCase'
export { default as count, type CountOptions } from '../count'
export { default as cutCHSString } from '../cutCHSString'
export { default as dash2Camel } from '../dash2Camel'
export { default as dotCase } from '../dotCase'
export { default as getCHSLength } from '../getCHSLength'
export { default as kebabCase } from '../kebabCase'
export { default as lowerFirst } from '../lowerFirst'
export { default as pascalCase } from '../pascalCase'
export { default as reverse } from '../reverse'
export { default as snakeCase } from '../snakeCase'
export { default as swapCase } from '../swapCase'
export { default as template, type DataResolver, type TemplateOptions, type TemplateSettings } from '../template'
export { default as titleCase } from '../titleCase'
export { default as truncate, type TruncateOptions } from '../truncate'
export { default as upperFirst } from '../upperFirst'
export { default as words } from '../words'
