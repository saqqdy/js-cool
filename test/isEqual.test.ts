import { describe, expect, it } from 'vitest'
import isEqual from '../src/isEqual'

describe('isEqual', () => {
	describe('primitives', () => {
		it('should return true for equal numbers', () => {
			expect(isEqual(1, 1)).toBeTruthy()
			expect(isEqual(0, 0)).toBeTruthy()
		})

		it('should return true for equal strings', () => {
			expect(isEqual('a', 'a')).toBeTruthy()
			expect(isEqual('hello world', 'hello world')).toBeTruthy()
		})

		it('should return true for equal booleans', () => {
			expect(isEqual(true, true)).toBeTruthy()
			expect(isEqual(false, false)).toBeTruthy()
		})

		it('should return true for NaN', () => {
			expect(isEqual(Number.NaN, Number.NaN)).toBeTruthy()
		})

		it('should distinguish between +0 and -0', () => {
			expect(isEqual(0, -0)).toBeFalsy()
			expect(isEqual(+0, -0)).toBeFalsy()
		})

		it('should return false for different types', () => {
			expect(isEqual(1, '1')).toBeFalsy()
			expect(isEqual(0, false)).toBeFalsy()
			expect(isEqual('', false)).toBeFalsy()
		})
	})

	describe('null and undefined', () => {
		it('should return true for null', () => {
			expect(isEqual(null, null)).toBeTruthy()
		})

		it('should return true for undefined', () => {
			expect(isEqual(undefined, undefined)).toBeTruthy()
		})

		it('should return false for null vs undefined', () => {
			expect(isEqual(null, undefined)).toBeFalsy()
		})
	})

	describe('objects', () => {
		it('should return true for equal objects', () => {
			expect(isEqual({ a: 22, b: {} }, { a: 22, b: {} })).toBeTruthy()
		})

		it('should return true for nested objects', () => {
			expect(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBeTruthy()
		})

		it('should return false for different objects', () => {
			expect(isEqual({ a: 1 }, { a: 2 })).toBeFalsy()
			expect(isEqual({ a: 1 }, { b: 1 })).toBeFalsy()
		})

		it('should handle objects with different property order', () => {
			expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBeTruthy()
		})
	})

	describe('arrays', () => {
		it('should return true for equal arrays', () => {
			expect(isEqual([1, 2], [1, 2])).toBeTruthy()
		})

		it('should return false for arrays with different order', () => {
			expect(isEqual([1, 2], [2, 1])).toBeFalsy()
		})

		it('should handle nested arrays', () => {
			expect(isEqual([[1, 2], [3]], [[1, 2], [3]])).toBeTruthy()
		})

		it('should return false for different length arrays', () => {
			expect(isEqual([1, 2], [1, 2, 3])).toBeFalsy()
		})
	})

	describe('Date objects', () => {
		it('should return true for equal dates', () => {
			const date1 = new Date('2024-01-01')
			const date2 = new Date('2024-01-01')
			expect(isEqual(date1, date2)).toBeTruthy()
		})

		it('should return false for different dates', () => {
			const date1 = new Date('2024-01-01')
			const date2 = new Date('2024-01-02')
			expect(isEqual(date1, date2)).toBeFalsy()
		})
	})

	describe('RegExp objects', () => {
		it('should return true for equal regexps', () => {
			expect(isEqual(/test/gi, /test/gi)).toBeTruthy()
		})

		it('should return false for different regexps', () => {
			expect(isEqual(/test/g, /test/i)).toBeFalsy()
		})
	})

	describe('circular references', () => {
		it('should handle circular references', () => {
			const obj1: any = { a: 1 }
			obj1.self = obj1
			const obj2: any = { a: 1 }
			obj2.self = obj2

			expect(isEqual(obj1, obj2)).toBeTruthy()
		})
	})

	describe('special cases', () => {
		it('should handle String objects', () => {
			// eslint-disable-next-line unicorn/new-for-builtins, no-new-wrappers
			const str1 = new String('test')
			// eslint-disable-next-line unicorn/new-for-builtins, no-new-wrappers
			const str2 = new String('test')
			expect(isEqual(str1, str2)).toBeTruthy()
			expect(isEqual(str1, 'test')).toBeTruthy()
		})

		it('should handle Number objects', () => {
			// eslint-disable-next-line unicorn/new-for-builtins, no-new-wrappers
			const num1 = new Number(42)
			// eslint-disable-next-line unicorn/new-for-builtins, no-new-wrappers
			const num2 = new Number(42)
			expect(isEqual(num1, num2)).toBeTruthy()
			expect(isEqual(num1, 42)).toBeTruthy()
		})

		it('should handle Boolean objects', () => {
			// eslint-disable-next-line unicorn/new-for-builtins, no-new-wrappers
			const bool1 = new Boolean(true)
			// eslint-disable-next-line unicorn/new-for-builtins, no-new-wrappers
			const bool2 = new Boolean(true)
			expect(isEqual(bool1, bool2)).toBeTruthy()
			expect(isEqual(bool1, true)).toBeTruthy()
		})
	})
})
