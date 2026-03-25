/**
 * Storage utilities collection (localStorage, sessionStorage, cookie)
 *
 * @example
 * ```ts
 * import { setCache, getCache, setSession, getSession, setCookie, getCookie } from 'js-cool/storage'
 *
 * // localStorage with expiration
 * setCache('key', 'value', 60) // expires in 60 seconds
 * getCache('key') // 'value' (within 60s) or null (after 60s)
 *
 * // sessionStorage
 * setSession('key', { data: 123 })
 * getSession('key') // { data: 123 }
 *
 * // Cookie
 * setCookie('key', 'value', { days: 7 })
 * getCookie('key') // 'value'
 * ```
 *
 * @module storage
 * @since 6.0.0
 */

export { default as delCache } from '../delCache'
export { default as delCookie } from '../delCookie'
export { default as delSession } from '../delSession'
export { default as getCache, type CacheData } from '../getCache'
export { default as getCookie } from '../getCookie'
export { default as getCookies } from '../getCookies'
export { default as getSession } from '../getSession'
export {
	default as setCache,
	StorageQuotaError,
	StorageUnavailableError,
} from '../setCache'
export { default as setCookie } from '../setCookie'
export { default as setSession } from '../setSession'
