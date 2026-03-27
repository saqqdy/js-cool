/**
 * sessionStorage API
 * @module storage/session
 */

import { StorageQuotaError, StorageUnavailableError } from './errors'
import type { StorageAPI, StorageData, StorageOptions } from './types'
import { createStorageData, isStorageAvailable, parseStorageData } from './utils'

/** sessionStorage 存储 API */
export const session: StorageAPI = {
	set<T = unknown>(name: string, value: T, options?: StorageOptions): void {
		if (!isStorageAvailable(sessionStorage)) {
			throw new StorageUnavailableError('sessionStorage is not available')
		}

		const data: StorageData<T> = createStorageData(value, options?.expires)

		try {
			sessionStorage.setItem(name, JSON.stringify(data))
		} catch (e) {
			if (
				e instanceof DOMException &&
				(e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
			) {
				throw new StorageQuotaError(`sessionStorage quota exceeded for key "${name}"`)
			}
			throw e
		}
	},

	get<T = unknown>(name: string): T | null {
		try {
			const data = sessionStorage.getItem(name)
			return parseStorageData<T>(data, () => {
				try {
					sessionStorage.removeItem(name)
				} catch {
					/* ignore */
				}
			})
		} catch {
			return null
		}
	},

	delete(name: string): void {
		try {
			sessionStorage.removeItem(name)
		} catch {
			/* ignore */
		}
	},

	has(name: string): boolean {
		try {
			return sessionStorage.getItem(name) !== null
		} catch {
			return false
		}
	},

	keys(): string[] {
		try {
			return Object.keys(sessionStorage)
		} catch {
			return []
		}
	},

	clear(): void {
		try {
			sessionStorage.clear()
		} catch {
			/* ignore */
		}
	},

	get length(): number {
		try {
			return sessionStorage.length
		} catch {
			return 0
		}
	},
}
