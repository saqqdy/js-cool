/**
 * Storage error types
 * @module storage/errors
 */

/**
 * Storage quota exceeded error
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
 * Storage unavailable error
 *
 * Thrown when localStorage/sessionStorage is not available
 * (e.g., private mode, SSR environment, storage disabled)
 */
export class StorageUnavailableError extends Error {
	constructor(message: string = 'Storage is not available') {
		super(message)
		this.name = 'StorageUnavailableError'
	}
}
