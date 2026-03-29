/**
 * Storage utility functions
 * @module storage/utils
 */

import type { StorageData } from './types'

/**
 * 检查 Web Storage 是否可用
 * @param storage - localStorage 或 sessionStorage
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
 * 解析存储数据（处理过期逻辑）
 * @param data - 原始存储字符串
 * @param removeExpired - 过期时删除的回调
 */
export function parseStorageData<T>(data: string | null, removeExpired: () => void): T | null {
	if (!data) return null

	try {
		const obj: StorageData<T> = JSON.parse(data)

		// 检查是否为 StorageData 结构
		if (typeof obj === 'object' && obj !== null && ('value' in obj || 'expires' in obj)) {
			// 检查过期
			if (!obj.expires || obj.expires > Date.now()) {
				return obj.value
			}
			// 已过期，删除并返回 null
			removeExpired()
			return null
		}

		// 兼容旧格式（直接存储的 JSON）
		return obj as T
	} catch {
		// 非 JSON，返回原始字符串
		return data as unknown as T
	}
}

/**
 * 创建存储数据结构
 */
export function createStorageData<T>(value: T, expires?: number): StorageData<T> {
	return {
		value,
		expires: expires ? Date.now() + expires * 1000 : undefined,
	}
}
