/**
 * URL module - URL parsing and building utilities
 *
 * @module url
 * @since 6.0.0
 */

// 类
// 函数（静态方法别名，支持直接导入）
import { Url } from './Url'

export { Url, type ParamScope, type ParseOptions, type StringifyOptions } from './Url'
export { default } from './Url'

export const parse = Url.parse
export const stringify = Url.stringify
export const getOrigin = Url.getOrigin
export const getHost = Url.getHost
export const getHostname = Url.getHostname
export const getPathname = Url.getPathname
export const getSearch = Url.getSearch
export const getHash = Url.getHash
