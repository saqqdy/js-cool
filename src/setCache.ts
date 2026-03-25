/**
 * Error thrown when localStorage quota is exceeded
 */
export class StorageQuotaError extends Error {
	constructor(message: string = 'localStorage quota exceeded') {
		super(message)
		this.name = 'StorageQuotaError'
	}
}

/**
 * Error thrown when localStorage is not available
 */
export class StorageUnavailableError extends Error {
	constructor(message: string = 'localStorage is not available') {
		super(message)
		this.name = 'StorageUnavailableError'
	}
}

export interface CacheData<T = unknown> {
	expires?: number
	value: T
}

/**
 * Check if localStorage is available
 */
function isStorageAvailable(): boolean {
	try {
		const testKey = '__storage_test__'
		localStorage.setItem(testKey, testKey)
		localStorage.removeItem(testKey)
		return true
	} catch {
		return false
	}
}

/**
 * Set cache to localStorage with optional expiration
 *
 * @example
 * ```ts
 * // Set boolean
 * setCache('boolean', true)
 *
 * // Set object with type inference
 * setCache('object', { name: 'saqqdy' })
 *
 * // Set number
 * setCache('number', 666)
 *
 * // Set with expiration (20 seconds)
 * setCache('temp', 'value', 20)
 *
 * // Set array
 * setCache('list', [1, 2, 3])
 *
 * // String expiration time
 * setCache('key', 'value', '30')
 *
 * // Typed usage with generic
 * interface UserData { id: string; name: string }
 * setCache<UserData>('user', { id: '1', name: 'John' })
 * ```
 * @since 1.0.2
 * @param name - cache key name
 * @param value - value to cache (any type, will be JSON serialized)
 * @param seconds - optional expiration time in seconds
 * @throws {StorageUnavailableError} if localStorage is not available
 * @throws {StorageQuotaError} if storage quota is exceeded
 */
function setCache<T = unknown>(name: string, value: T, seconds?: number | string): void {
	if (!isStorageAvailable()) {
		throw new StorageUnavailableError()
	}

	if (typeof seconds === 'string') seconds = Number.parseInt(seconds)

	const expires = seconds ? new Date().getTime() + seconds * 1000 : undefined

	const data: CacheData<T> = {
		expires,
		value,
	}

	try {
		localStorage.setItem(name, JSON.stringify(data))
	} catch (e) {
		if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
			throw new StorageQuotaError(`localStorage quota exceeded for key "${name}"`)
		}
		throw e
	}
}

export default setCache
