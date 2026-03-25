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
 * ```
 *
 * @module string
 * @since 6.0.0
 */

export { default as camel2Dash } from '../camel2Dash'
export { default as clearAttr } from '../clearAttr'
export { default as clearHtml } from '../clearHtml'
export { default as cutCHSString } from '../cutCHSString'
export { default as dash2Camel } from '../dash2Camel'
export { default as getCHSLength } from '../getCHSLength'
export { default as kebabCase } from '../kebabCase'
export { default as mapTemplate } from '../mapTemplate'
export { default as snakeCase } from '../snakeCase'
export { default as truncate, type TruncateOptions } from '../truncate'
export { default as upperFirst } from '../upperFirst'
