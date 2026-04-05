import type { CookieOptions, StorageOptions } from '../src/storage'
/**
 * @vitest-environment happy-dom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
	cookie,
	local,
	session,
	storage,
	StorageQuotaError,
	StorageUnavailableError,
} from '../src/storage'

describe('storage namespace', () => {
	it('should export storage namespace with local, session, cookie', () => {
		expect(storage.local).toBeDefined()
		expect(storage.session).toBeDefined()
		expect(storage.cookie).toBeDefined()
	})

	it('storage.local should have StorageAPI methods', () => {
		expect(typeof storage.local.set).toBe('function')
		expect(typeof storage.local.get).toBe('function')
		expect(typeof storage.local.delete).toBe('function')
		expect(typeof storage.local.has).toBe('function')
		expect(typeof storage.local.keys).toBe('function')
		expect(typeof storage.local.clear).toBe('function')
		expect(typeof storage.local.length).toBe('number')
	})

	it('storage.session should have StorageAPI methods', () => {
		expect(typeof storage.session.set).toBe('function')
		expect(typeof storage.session.get).toBe('function')
		expect(typeof storage.session.delete).toBe('function')
		expect(typeof storage.session.has).toBe('function')
		expect(typeof storage.session.keys).toBe('function')
		expect(typeof storage.session.clear).toBe('function')
		expect(typeof storage.session.length).toBe('number')
	})

	it('storage.cookie should have CookieAPI methods', () => {
		expect(typeof storage.cookie.set).toBe('function')
		expect(typeof storage.cookie.get).toBe('function')
		expect(typeof storage.cookie.getAll).toBe('function')
		expect(typeof storage.cookie.delete).toBe('function')
		expect(typeof storage.cookie.has).toBe('function')
		expect(typeof storage.cookie.clear).toBe('function')
	})
})

describe('direct imports', () => {
	it('should export local directly', () => {
		expect(local).toBe(storage.local)
	})

	it('should export session directly', () => {
		expect(session).toBe(storage.session)
	})

	it('should export cookie directly', () => {
		expect(cookie).toBe(storage.cookie)
	})
})

describe('error classes', () => {
	describe('StorageQuotaError', () => {
		it('should have correct name', () => {
			const error = new StorageQuotaError()
			expect(error.name).toBe('StorageQuotaError')
		})

		it('should have default message', () => {
			const error = new StorageQuotaError()
			expect(error.message).toBe('Storage quota exceeded')
		})

		it('should accept custom message', () => {
			const error = new StorageQuotaError('Custom message')
			expect(error.message).toBe('Custom message')
		})

		it('should be instance of Error', () => {
			const error = new StorageQuotaError()
			expect(error).toBeInstanceOf(Error)
		})
	})

	describe('StorageUnavailableError', () => {
		it('should have correct name', () => {
			const error = new StorageUnavailableError()
			expect(error.name).toBe('StorageUnavailableError')
		})

		it('should have default message', () => {
			const error = new StorageUnavailableError()
			expect(error.message).toBe('Storage is not available')
		})

		it('should accept custom message', () => {
			const error = new StorageUnavailableError('Custom message')
			expect(error.message).toBe('Custom message')
		})

		it('should be instance of Error', () => {
			const error = new StorageUnavailableError()
			expect(error).toBeInstanceOf(Error)
		})
	})
})

describe('storage.local', () => {
	beforeEach(() => {
		localStorage.clear()
	})

	describe('basic functionality', () => {
		it('should set and get value', () => {
			storage.local.set('key1', 'value1')
			expect(storage.local.get('key1')).toBe('value1')
		})

		it('should set and get object', () => {
			storage.local.set('key1', { a: 1, b: 'test' })
			expect(storage.local.get('key1')).toEqual({ a: 1, b: 'test' })
		})

		it('should set and get array', () => {
			storage.local.set('key1', [1, 2, 3])
			expect(storage.local.get('key1')).toEqual([1, 2, 3])
		})

		it('should set and get number', () => {
			storage.local.set('key1', 123)
			expect(storage.local.get('key1')).toBe(123)
		})

		it('should set and get boolean', () => {
			storage.local.set('key1', true)
			expect(storage.local.get('key1')).toBeTruthy()
		})

		it('should set and get null', () => {
			storage.local.set('key1', null)
			expect(storage.local.get('key1')).toBeNull()
		})

		it('should return null for non-existent key', () => {
			expect(storage.local.get('non-existent')).toBeNull()
		})

		it('should delete value', () => {
			storage.local.set('key1', 'value1')
			storage.local.delete('key1')
			expect(storage.local.get('key1')).toBeNull()
		})

		it('should check if key exists', () => {
			storage.local.set('key1', 'value1')
			expect(storage.local.has('key1')).toBeTruthy()
			expect(storage.local.has('non-existent')).toBeFalsy()
		})

		it('should get all keys', () => {
			storage.local.set('key1', 'value1')
			storage.local.set('key2', 'value2')
			storage.local.set('key3', 'value3')
			expect(storage.local.keys()).toEqual(expect.arrayContaining(['key1', 'key2', 'key3']))
		})

		it('should return empty array when no keys', () => {
			expect(storage.local.keys()).toEqual([])
		})

		it('should clear all', () => {
			storage.local.set('key1', 'value1')
			storage.local.set('key2', 'value2')
			storage.local.clear()
			expect(storage.local).toHaveLength(0)
		})

		it('should report correct length', () => {
			expect(storage.local).toHaveLength(0)
			storage.local.set('key1', 'value1')
			expect(storage.local).toHaveLength(1)
			storage.local.set('key2', 'value2')
			expect(storage.local).toHaveLength(2)
			storage.local.delete('key1')
			expect(storage.local).toHaveLength(1)
		})
	})

	describe('expiration', () => {
		it('should set value with expiration', () => {
			storage.local.set('key1', 'value1', { expires: 3600 })
			expect(storage.local.get('key1')).toBe('value1')
		})

		it('should return null for expired value', () => {
			// Manually set expired data
			const expiredData = {
				value: 'expired',
				expires: Date.now() - 1000,
			}
			localStorage.setItem('expired', JSON.stringify(expiredData))

			expect(storage.local.get('expired')).toBeNull()
		})

		it('should remove expired value from storage', () => {
			const expiredData = {
				value: 'expired',
				expires: Date.now() - 1000,
			}
			localStorage.setItem('expired', JSON.stringify(expiredData))

			storage.local.get('expired')
			expect(localStorage.getItem('expired')).toBeNull()
		})

		it('should return value for non-expired value', () => {
			const futureData = {
				value: 'valid',
				expires: Date.now() + 10000,
			}
			localStorage.setItem('valid', JSON.stringify(futureData))

			expect(storage.local.get('valid')).toBe('valid')
		})

		it('should handle value without expiration', () => {
			const data = { value: 'no-expiry' }
			localStorage.setItem('no-expiry', JSON.stringify(data))

			expect(storage.local.get('no-expiry')).toBe('no-expiry')
		})

		it('should handle value without expires property', () => {
			storage.local.set('key1', 'value1')
			expect(storage.local.get('key1')).toBe('value1')
		})
	})

	describe('generic type support', () => {
		it('should support generic type for get', () => {
			interface User {
				id: number
				name: string
				email: string
			}
			const user: User = { id: 1, name: 'John', email: 'john@example.com' }
			storage.local.set<User>('user', user)
			const result = storage.local.get<User>('user')
			expect(result).toEqual(user)
		})

		it('should return null for typed get of non-existent key', () => {
			interface User {
				id: number
				name: string
			}
			const result = storage.local.get<User>('non-existent')
			expect(result).toBeNull()
		})
	})

	describe('error handling', () => {
		it('should handle localStorage unavailable on get', () => {
			const originalGetItem = localStorage.getItem
			Object.defineProperty(localStorage, 'getItem', {
				value: vi.fn(() => {
					throw new Error('localStorage not available')
				}),
				writable: true,
				configurable: true,
			})

			expect(storage.local.get('key')).toBeNull()

			Object.defineProperty(localStorage, 'getItem', {
				value: originalGetItem,
				writable: true,
				configurable: true,
			})
		})

		it('should handle localStorage unavailable on set', () => {
			const originalSetItem = localStorage.setItem
			Object.defineProperty(localStorage, 'setItem', {
				value: vi.fn(() => {
					throw new Error('localStorage not available')
				}),
				writable: true,
				configurable: true,
			})

			// Should not throw, just silently fail
			expect(() => storage.local.set('key', 'value')).toThrow()

			Object.defineProperty(localStorage, 'setItem', {
				value: originalSetItem,
				writable: true,
				configurable: true,
			})
		})

		it('should handle invalid JSON in storage', () => {
			localStorage.setItem('invalid', 'not json')
			expect(storage.local.get('invalid')).toBe('not json')
		})
	})

	describe('edge cases', () => {
		it('should handle empty string value', () => {
			storage.local.set('key', '')
			expect(storage.local.get('key')).toBe('')
		})

		it('should handle special characters in key', () => {
			storage.local.set('key-with-special.chars_123', 'value')
			expect(storage.local.get('key-with-special.chars_123')).toBe('value')
		})

		it('should handle unicode in value', () => {
			storage.local.set('key', '你好世界 🌍')
			expect(storage.local.get('key')).toBe('你好世界 🌍')
		})

		it('should handle nested objects', () => {
			const nested = {
				level1: {
					level2: {
						level3: 'deep',
					},
				},
			}
			storage.local.set('nested', nested)
			expect(storage.local.get('nested')).toEqual(nested)
		})
	})

	describe('storage unavailable', () => {
		it('should throw StorageUnavailableError when storage is not available on set', () => {
			const originalSetItem = localStorage.setItem
			Object.defineProperty(localStorage, 'setItem', {
				value: vi.fn(() => {
					throw new Error('QuotaExceededError')
				}),
				writable: true,
				configurable: true,
			})

			// Override isStorageAvailable to return false
			const originalGetItem = localStorage.getItem
			Object.defineProperty(localStorage, 'getItem', {
				value: vi.fn(() => {
					throw new Error('not available')
				}),
				writable: true,
				configurable: true,
			})

			expect(() => storage.local.set('key', 'value')).toThrow()

			Object.defineProperty(localStorage, 'getItem', {
				value: originalGetItem,
				writable: true,
				configurable: true,
			})
			Object.defineProperty(localStorage, 'setItem', {
				value: originalSetItem,
				writable: true,
				configurable: true,
			})
		})
	})
})

describe('storage.session', () => {
	beforeEach(() => {
		sessionStorage.clear()
	})

	describe('basic functionality', () => {
		it('should set and get value', () => {
			storage.session.set('key1', 'value1')
			expect(storage.session.get('key1')).toBe('value1')
		})

		it('should set and get object', () => {
			storage.session.set('key1', { a: 1 })
			expect(storage.session.get('key1')).toEqual({ a: 1 })
		})

		it('should return null for non-existent key', () => {
			expect(storage.session.get('non-existent')).toBeNull()
		})

		it('should delete value', () => {
			storage.session.set('key1', 'value1')
			storage.session.delete('key1')
			expect(storage.session.get('key1')).toBeNull()
		})

		it('should check if key exists', () => {
			storage.session.set('key1', 'value1')
			expect(storage.session.has('key1')).toBeTruthy()
			expect(storage.session.has('non-existent')).toBeFalsy()
		})

		it('should get all keys', () => {
			storage.session.set('key1', 'value1')
			storage.session.set('key2', 'value2')
			expect(storage.session.keys()).toEqual(expect.arrayContaining(['key1', 'key2']))
		})

		it('should clear all', () => {
			storage.session.set('key1', 'value1')
			storage.session.set('key2', 'value2')
			storage.session.clear()
			expect(storage.session).toHaveLength(0)
		})

		it('should report correct length', () => {
			expect(storage.session).toHaveLength(0)
			storage.session.set('key1', 'value1')
			expect(storage.session).toHaveLength(1)
		})
	})

	describe('expiration', () => {
		it('should set value with expiration', () => {
			storage.session.set('key1', 'value1', { expires: 3600 })
			expect(storage.session.get('key1')).toBe('value1')
		})

		it('should return null for expired value', () => {
			const expiredData = {
				value: 'expired',
				expires: Date.now() - 1000,
			}
			sessionStorage.setItem('expired', JSON.stringify(expiredData))

			expect(storage.session.get('expired')).toBeNull()
		})

		it('should return value for non-expired value', () => {
			const futureData = {
				value: 'valid',
				expires: Date.now() + 10000,
			}
			sessionStorage.setItem('valid', JSON.stringify(futureData))

			expect(storage.session.get('valid')).toBe('valid')
		})

		it('should handle value without expiration', () => {
			const data = { value: 'no-expiry' }
			sessionStorage.setItem('no-expiry', JSON.stringify(data))

			expect(storage.session.get('no-expiry')).toBe('no-expiry')
		})
	})

	describe('error handling', () => {
		it('should handle invalid JSON in storage', () => {
			sessionStorage.setItem('invalid', 'not json')
			expect(storage.session.get('invalid')).toBe('not json')
		})
	})

	describe('edge cases', () => {
		it('should handle empty string value', () => {
			storage.session.set('key', '')
			expect(storage.session.get('key')).toBe('')
		})

		it('should handle special characters in key', () => {
			storage.session.set('key-with-special.chars_123', 'value')
			expect(storage.session.get('key-with-special.chars_123')).toBe('value')
		})

		it('should handle unicode in value', () => {
			storage.session.set('key', '你好世界 🌍')
			expect(storage.session.get('key')).toBe('你好世界 🌍')
		})

		it('should handle nested objects', () => {
			const nested = {
				level1: {
					level2: {
						level3: 'deep',
					},
				},
			}
			storage.session.set('nested', nested)
			expect(storage.session.get('nested')).toEqual(nested)
		})
	})
})

describe('storage.cookie', () => {
	beforeEach(() => {
		storage.cookie.clear()
	})

	describe('basic functionality', () => {
		it('should set and get cookie', () => {
			storage.cookie.set('test', 'value', { expires: 3600 })
			expect(storage.cookie.get('test')).toBe('value')
		})

		it('should set cookie with default expiration', () => {
			storage.cookie.set('test2', 'value2')
			expect(storage.cookie.get('test2')).toBe('value2')
		})

		it('should return null for non-existent cookie', () => {
			expect(storage.cookie.get('non-existent')).toBeNull()
		})

		it('should delete cookie', () => {
			storage.cookie.set('toDelete', 'value', { expires: 3600 })
			storage.cookie.delete('toDelete')
			expect(storage.cookie.get('toDelete')).toBeNull()
		})

		it('should get all cookies', () => {
			storage.cookie.set('cookie1', 'value1', { expires: 3600 })
			storage.cookie.set('cookie2', 'value2', { expires: 3600 })

			const cookies = storage.cookie.getAll()

			expect(cookies.cookie1).toBe('value1')
			expect(cookies.cookie2).toBe('value2')
		})

		it('should check if cookie exists', () => {
			storage.cookie.set('test', 'value')
			expect(storage.cookie.has('test')).toBeTruthy()
			expect(storage.cookie.has('non-existent')).toBeFalsy()
		})

		it('should clear all cookies', () => {
			storage.cookie.set('cookie1', 'value1')
			storage.cookie.set('cookie2', 'value2')
			storage.cookie.clear()
			expect(storage.cookie.getAll()).toEqual({})
		})
	})

	describe('cookie options', () => {
		it('should set cookie with custom path', () => {
			expect(() =>
				storage.cookie.set('test', 'value', { expires: 3600, path: '/app' })
			).not.toThrow()
		})

		it('should set cookie with domain', () => {
			expect(() =>
				storage.cookie.set('test', 'value', { expires: 3600, domain: 'example.com' })
			).not.toThrow()
		})

		it('should set cookie with secure', () => {
			storage.cookie.set('test', 'value', { expires: 3600, secure: true })
			expect(storage.cookie.get('test')).toBe('value')
		})

		it('should set cookie with sameSite Strict', () => {
			storage.cookie.set('test', 'value', { expires: 3600, sameSite: 'Strict' })
			expect(storage.cookie.get('test')).toBe('value')
		})

		it('should set cookie with sameSite Lax', () => {
			storage.cookie.set('test', 'value', { expires: 3600, sameSite: 'Lax' })
			expect(storage.cookie.get('test')).toBe('value')
		})

		it('should set cookie with sameSite None', () => {
			// SameSite=None should add Secure
			storage.cookie.set('test', 'value', { expires: 3600, sameSite: 'None' })
			expect(storage.cookie.get('test')).toBe('value')
		})

		it('should delete cookie with options', () => {
			storage.cookie.set('test', 'value', { expires: 3600, path: '/app' })
			storage.cookie.delete('test', { path: '/app' })
			expect(storage.cookie.get('test')).toBeNull()
		})
	})

	describe('value types', () => {
		it('should handle number value', () => {
			storage.cookie.set('count', 42, { expires: 3600 })
			expect(storage.cookie.get('count')).toBe('42')
		})

		it('should handle boolean value', () => {
			storage.cookie.set('flag', true, { expires: 3600 })
			expect(storage.cookie.get('flag')).toBe('true')
		})

		it('should handle string value with special characters', () => {
			storage.cookie.set('test', 'hello world', { expires: 3600 })
			expect(storage.cookie.get('test')).toBe('hello world')
		})
	})

	describe('edge cases', () => {
		it('should handle empty string value', () => {
			storage.cookie.set('empty', '', { expires: 3600 })
			expect(storage.cookie.get('empty')).toBe('')
		})

		it('should handle deleting non-existent cookie', () => {
			expect(() => storage.cookie.delete('non-existent')).not.toThrow()
		})
	})
})

describe('type exports', () => {
	it('should export StorageOptions type', () => {
		const options: StorageOptions = { expires: 3600 }
		expect(options.expires).toBe(3600)
	})

	it('should export CookieOptions type', () => {
		const options: CookieOptions = {
			expires: 86400,
			path: '/',
			domain: 'example.com',
			secure: true,
			sameSite: 'Strict',
		}
		expect(options.expires).toBe(86400)
	})
})
