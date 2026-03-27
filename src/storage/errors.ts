/**
 * Storage error types
 * @module storage/errors
 */

/**
 * 存储配额超出错误
 *
 * @example
 * ```ts
 * try {
 *   storage.local.set('key', largeData)
 * } catch (e) {
 *   if (e instanceof StorageQuotaError) {
 *     console.error('Storage quota exceeded')
 *   }
 * }
 * ```
 */
export class StorageQuotaError extends Error {
	constructor(message: string = 'Storage quota exceeded') {
		super(message)
		this.name = 'StorageQuotaError'
	}
}

/**
 * 存储不可用错误
 *
 * 当 localStorage/sessionStorage 不可用时抛出
 * （如：隐私模式、SSR 环境、存储被禁用）
 */
export class StorageUnavailableError extends Error {
	constructor(message: string = 'Storage is not available') {
		super(message)
		this.name = 'StorageUnavailableError'
	}
}
