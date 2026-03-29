/**
 * Storage module - Unified storage API
 *
 * @module storage
 * @since 6.0.0
 *
 * @example
 * ```ts
 * import { storage } from 'js-cool'
 *
 * // localStorage
 * storage.local.set('user', { id: 1, name: 'John' })
 * storage.local.set('token', 'abc', { expires: 3600 })
 * const user = storage.local.get<{ id: number; name: string }>('user')
 * storage.local.has('token')  // true
 * storage.local.delete('token')
 *
 * // sessionStorage
 * storage.session.set('temp', 'value', { expires: 60 })
 * storage.session.get('temp')
 * storage.session.clear()
 *
 * // Cookie
 * storage.cookie.set('session', 'xyz', { expires: 86400, sameSite: 'Strict' })
 * storage.cookie.get('session')
 * storage.cookie.getAll()
 * storage.cookie.delete('session')
 * ```
 */

import type { StorageNamespace } from './types'
import { cookie } from './cookie'
import { local } from './local'
import { session } from './session'

export { local } from './local'
export { session } from './session'
export { cookie } from './cookie'
export { StorageQuotaError, StorageUnavailableError } from './errors'
export type {
	CookieAPI,
	CookieDeleteOptions,
	CookieOptions,
	StorageAPI,
	StorageNamespace,
	StorageOptions,
} from './types'

/**
 * 统一存储命名空间
 */
export const storage: StorageNamespace = {
	local,
	session,
	cookie,
}

export default storage
