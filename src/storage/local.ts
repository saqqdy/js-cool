/**
 * localStorage API
 * @module storage/local
 */

import type { StorageAPI, StorageData, StorageOptions } from './types'
import { StorageQuotaError, StorageUnavailableError } from './errors'
import { createStorageData, isStorageAvailable, parseStorageData } from './utils'

/** localStorage 存储 API */
export const local: StorageAPI = {
	set<T = unknown>(name: string, value: T, options?: StorageOptions): void {
		if (!isStorageAvailable(localStorage)) {
			throw new StorageUnavailableError('localStorage is not available')
		}

		const data: StorageData<T> = createStorageData(value, options?.expires)

		try {
			localStorage.setItem(name, JSON.stringify(data))
		} catch (e) {
			if (
				e instanceof DOMException &&
				(e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
			) {
				throw new StorageQuotaError(`localStorage quota exceeded for key "${name}"`)
			}
			throw e
		}
	},

	get<T = unknown>(name: string): T | null {
		try {
			const data = localStorage.getItem(name)
			return parseStorageData<T>(data, () => {
				try {
					localStorage.removeItem(name)
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
			localStorage.removeItem(name)
		} catch {
			/* ignore */
		}
	},

	has(name: string): boolean {
		try {
			return localStorage.getItem(name) !== null
		} catch {
			return false
		}
	},

	keys(): string[] {
		try {
			return Object.keys(localStorage)
		} catch {
			return []
		}
	},

	clear(): void {
		try {
			localStorage.clear()
		} catch {
			/* ignore */
		}
	},

	get length(): number {
		try {
			return localStorage.length
		} catch {
			return 0
		}
	},
}
