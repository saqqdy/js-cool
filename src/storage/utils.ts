/**
 * Storage utility functions
 * @module storage/utils
 */

import type { StorageData } from './types'

/**
 * Check if Web Storage is available
 * @param storage - localStorage or sessionStorage
 */
export function isStorageAvailable(storage: Storage): boolean {
	try {
		const testKey = '__storage_test__'
		storage.setItem(testKey, testKey)
		storage.removeItem(testKey)
		return true
	} catch {
		return false
	}
}

/**
 * Parse stored data (handles expiration logic)
 * @param data - Raw stored string
 * @param removeExpired - Callback to remove expired data
 */
export function parseStorageData<T>(data: string | null, removeExpired: () => void): T | null {
	if (!data) return null

	try {
		const obj: StorageData<T> = JSON.parse(data)

		// Check if it's a StorageData structure
		if (typeof obj === 'object' && obj !== null && ('value' in obj || 'expires' in obj)) {
			// Check expiration
			if (!obj.expires || obj.expires > Date.now()) {
				return obj.value
			}
			// Expired, remove and return null
			removeExpired()
			return null
		}

		// Compatible with old format (directly stored JSON)
		return obj as T
	} catch {
		// Not JSON, return raw string
		return data as unknown as T
	}
}

/**
 * Create storage data structure
 */
export function createStorageData<T>(value: T, expires?: number): StorageData<T> {
	return {
		value,
		expires: expires ? Date.now() + expires * 1000 : undefined,
	}
}
