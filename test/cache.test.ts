/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import delCache from '../src/delCache'
import getCache from '../src/getCache'
import setCache, { StorageQuotaError, StorageUnavailableError } from '../src/setCache'

describe('setCache & getCache & delCache', () => {
	beforeEach(() => {
		localStorage.clear()
	})

	describe('basic functionality', () => {
		it('should set and get cache', () => {
			setCache('key1', 'value1')
			expect(getCache('key1')).toBe('value1')
		})

		it('should set and get object cache', () => {
			setCache('key1', { a: 1 })
			expect(getCache('key1')).toEqual({ a: 1 })
		})

		it('should set cache with expiration', () => {
			setCache('key1', 'value1', 1)
			expect(getCache('key1')).toBe('value1')
		})

		it('should return null for non-existent key', () => {
			expect(getCache('non-existent')).toBeNull()
		})

		it('should delete cache', () => {
			setCache('key1', 'value1')
			delCache('key1')
			expect(getCache('key1')).toBeNull()
		})

		it('should handle null value', () => {
			setCache('key1', null)
			expect(getCache('key1')).toBeNull()
		})

		it('should handle number value', () => {
			setCache('key1', 100)
			expect(getCache('key1')).toBe(100)
		})

		it('should handle array value', () => {
			setCache('key1', [1, 2, 3])
			expect(getCache<number[]>('key1')).toEqual([1, 2, 3])
		})

		it('should handle string seconds', () => {
			setCache('key1', 'value1', '100')
			expect(getCache('key1')).toBe('value1')
		})

		it('should handle invalid JSON in storage', () => {
			localStorage.setItem('invalid', 'not json')
			expect(getCache('invalid')).toBe('not json')
		})
	})

	describe('generic type support', () => {
		it('should support generic type for getCache', () => {
			interface User {
				name: string
				age: number
			}
			const user: User = { name: 'John', age: 30 }
			setCache<User>('user', user)
			const result = getCache<User>('user')
			expect(result).toEqual(user)
		})
	})

	describe('error classes', () => {
		it('should have correct name for StorageQuotaError', () => {
			const error = new StorageQuotaError()
			expect(error.name).toBe('StorageQuotaError')
			expect(error.message).toBe('localStorage quota exceeded')
		})

		it('should have correct name for StorageUnavailableError', () => {
			const error = new StorageUnavailableError()
			expect(error.name).toBe('StorageUnavailableError')
			expect(error.message).toBe('localStorage is not available')
		})

		it('should accept custom message', () => {
			const error = new StorageQuotaError('custom message')
			expect(error.message).toBe('custom message')
		})
	})

	describe('error handling', () => {
		it('should handle localStorage unavailable on getCache', () => {
			const originalGetItem = localStorage.getItem
			Object.defineProperty(localStorage, 'getItem', {
				value: vi.fn(() => {
					throw new Error('localStorage not available')
				}),
				writable: true,
				configurable: true,
			})

			expect(getCache('key')).toBeNull()

			Object.defineProperty(localStorage, 'getItem', {
				value: originalGetItem,
				writable: true,
				configurable: true,
			})
		})
	})

	describe('expiration', () => {
		it('should return null and remove expired cache', () => {
			// Set expired cache manually
			const expiredData = {
				expires: Date.now() - 1000, // 1 second ago
				value: 'expired',
			}
			localStorage.setItem('expired', JSON.stringify(expiredData))

			expect(getCache('expired')).toBeNull()
			expect(localStorage.getItem('expired')).toBeNull()
		})

		it('should return value for non-expired cache', () => {
			// Set cache with future expiration
			const futureData = {
				expires: Date.now() + 10000, // 10 seconds from now
				value: 'valid',
			}
			localStorage.setItem('valid', JSON.stringify(futureData))

			expect(getCache('valid')).toBe('valid')
		})

		it('should handle cache without expiration', () => {
			const data = {
				value: 'no-expiry',
			}
			localStorage.setItem('no-expiry', JSON.stringify(data))

			expect(getCache('no-expiry')).toBe('no-expiry')
		})
	})
})
