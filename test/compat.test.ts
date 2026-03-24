import { describe, expect, it } from 'vitest'
import {
	arrayIncludes,
	strIncludes,
	strStartsWith,
	strEndsWith,
	padStart,
	padEnd,
	isNumberNaN,
	isNumberFinite,
	isNumberInteger,
	isSafeInteger,
	objectAssign,
	objectValues,
	objectEntries,
	objectFromEntries,
	getGlobalObject,
	arrayUnique,
	isIterableCompat,
	createFile,
} from '../src/_compat'

describe('arrayIncludes', () => {
	it('should return true when item exists', () => {
		expect(arrayIncludes([1, 2, 3], 2)).toBe(true)
		expect(arrayIncludes(['a', 'b', 'c'], 'b')).toBe(true)
	})

	it('should return false when item does not exist', () => {
		expect(arrayIncludes([1, 2, 3], 4)).toBe(false)
		expect(arrayIncludes(['a', 'b'], 'c')).toBe(false)
	})

	it('should handle empty array', () => {
		expect(arrayIncludes([], 1)).toBe(false)
	})
})

describe('strIncludes', () => {
	it('should return true when substring exists', () => {
		expect(strIncludes('hello world', 'world')).toBe(true)
		expect(strIncludes('hello world', 'o w')).toBe(true)
	})

	it('should return false when substring does not exist', () => {
		expect(strIncludes('hello world', 'xyz')).toBe(false)
	})

	it('should handle empty strings', () => {
		expect(strIncludes('', 'a')).toBe(false)
		expect(strIncludes('hello', '')).toBe(true)
	})
})

describe('strStartsWith', () => {
	it('should return true when string starts with prefix', () => {
		expect(strStartsWith('hello world', 'hello')).toBe(true)
		expect(strStartsWith('https://example.com', 'https://')).toBe(true)
	})

	it('should return false when string does not start with prefix', () => {
		expect(strStartsWith('hello world', 'world')).toBe(false)
		expect(strStartsWith('http://example.com', 'https://')).toBe(false)
	})

	it('should handle empty prefix', () => {
		expect(strStartsWith('hello', '')).toBe(true)
	})
})

describe('strEndsWith', () => {
	it('should return true when string ends with suffix', () => {
		expect(strEndsWith('hello world', 'world')).toBe(true)
		expect(strEndsWith('file.txt', '.txt')).toBe(true)
	})

	it('should return false when string does not end with suffix', () => {
		expect(strEndsWith('hello world', 'hello')).toBe(false)
		expect(strEndsWith('file.md', '.txt')).toBe(false)
	})

	it('should handle empty suffix', () => {
		expect(strEndsWith('hello', '')).toBe(true)
	})
})

describe('padStart', () => {
	it('should pad string from start', () => {
		expect(padStart('5', 3, '0')).toBe('005')
		expect(padStart('abc', 6, 'x')).toBe('xxxabc')
	})

	it('should not pad if string is already long enough', () => {
		expect(padStart('hello', 3)).toBe('hello')
		expect(padStart('hello', 5)).toBe('hello')
	})

	it('should use space as default fill character', () => {
		expect(padStart('hi', 4)).toBe('  hi')
	})

	it('should handle multi-character fill string', () => {
		expect(padStart('1', 5, 'ab')).toBe('abab1')
	})
})

describe('padEnd', () => {
	it('should pad string from end', () => {
		expect(padEnd('5', 3, '0')).toBe('500')
		expect(padEnd('abc', 6, 'x')).toBe('abcxxx')
	})

	it('should not pad if string is already long enough', () => {
		expect(padEnd('hello', 3)).toBe('hello')
		expect(padEnd('hello', 5)).toBe('hello')
	})

	it('should use space as default fill character', () => {
		expect(padEnd('hi', 4)).toBe('hi  ')
	})
})

describe('isNumberNaN', () => {
	it('should return true for NaN', () => {
		expect(isNumberNaN(NaN)).toBe(true)
		expect(isNumberNaN(Number.NaN)).toBe(true)
		expect(isNumberNaN(0 / 0)).toBe(true)
	})

	it('should return false for non-NaN values', () => {
		expect(isNumberNaN(0)).toBe(false)
		expect(isNumberNaN(Infinity)).toBe(false)
		expect(isNumberNaN(-Infinity)).toBe(false)
		expect(isNumberNaN('NaN')).toBe(false)
		expect(isNumberNaN(null)).toBe(false)
		expect(isNumberNaN(undefined)).toBe(false)
	})
})

describe('isNumberFinite', () => {
	it('should return true for finite numbers', () => {
		expect(isNumberFinite(0)).toBe(true)
		expect(isNumberFinite(123)).toBe(true)
		expect(isNumberFinite(-456)).toBe(true)
		expect(isNumberFinite(3.14)).toBe(true)
	})

	it('should return false for non-finite values', () => {
		expect(isNumberFinite(Infinity)).toBe(false)
		expect(isNumberFinite(-Infinity)).toBe(false)
		expect(isNumberFinite(NaN)).toBe(false)
		expect(isNumberFinite('123')).toBe(false)
		expect(isNumberFinite(null)).toBe(false)
	})
})

describe('isNumberInteger', () => {
	it('should return true for integers', () => {
		expect(isNumberInteger(0)).toBe(true)
		expect(isNumberInteger(123)).toBe(true)
		expect(isNumberInteger(-456)).toBe(true)
	})

	it('should return false for non-integers', () => {
		expect(isNumberInteger(3.14)).toBe(false)
		expect(isNumberInteger(NaN)).toBe(false)
		expect(isNumberInteger(Infinity)).toBe(false)
		expect(isNumberInteger('123')).toBe(false)
	})
})

describe('isSafeInteger', () => {
	it('should return true for safe integers', () => {
		expect(isSafeInteger(0)).toBe(true)
		expect(isSafeInteger(123)).toBe(true)
		expect(isSafeInteger(Number.MAX_SAFE_INTEGER)).toBe(true)
		expect(isSafeInteger(Number.MIN_SAFE_INTEGER)).toBe(true)
	})

	it('should return false for unsafe integers', () => {
		expect(isSafeInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(false)
		expect(isSafeInteger(Number.MIN_SAFE_INTEGER - 1)).toBe(false)
		expect(isSafeInteger(3.14)).toBe(false)
		expect(isSafeInteger(NaN)).toBe(false)
		expect(isSafeInteger(Infinity)).toBe(false)
	})
})

describe('objectAssign', () => {
	it('should merge objects', () => {
		const result = objectAssign({}, { a: 1 }, { b: 2 })
		expect(result).toEqual({ a: 1, b: 2 })
	})

	it('should override properties', () => {
		const result = objectAssign({ a: 1 }, { a: 2 })
		expect(result).toEqual({ a: 2 })
	})

	it('should throw for null target', () => {
		expect(() => objectAssign(null as any, {})).toThrow()
		expect(() => objectAssign(undefined as any, {})).toThrow()
	})

	it('should handle empty sources', () => {
		const result = objectAssign({ a: 1 })
		expect(result).toEqual({ a: 1 })
	})
})

describe('objectValues', () => {
	it('should return values of object', () => {
		expect(objectValues({ a: 1, b: 2, c: 3 })).toEqual([1, 2, 3])
	})

	it('should handle empty object', () => {
		expect(objectValues({})).toEqual([])
	})
})

describe('objectEntries', () => {
	it('should return entries of object', () => {
		expect(objectEntries({ a: 1, b: 2 })).toEqual([
			['a', 1],
			['b', 2],
		])
	})

	it('should handle empty object', () => {
		expect(objectEntries({})).toEqual([])
	})
})

describe('objectFromEntries', () => {
	it('should create object from entries', () => {
		const result = objectFromEntries([
			['a', 1],
			['b', 2],
		])
		expect(result).toEqual({ a: 1, b: 2 })
	})

	it('should handle empty entries', () => {
		expect(objectFromEntries([])).toEqual({})
	})
})

describe('getGlobalObject', () => {
	it('should return an object', () => {
		const globalObj = getGlobalObject()
		expect(typeof globalObj).toBe('object')
		expect(globalObj).not.toBeNull()
	})
})

describe('arrayUnique', () => {
	it('should remove duplicates', () => {
		expect(arrayUnique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
		expect(arrayUnique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
	})

	it('should handle empty array', () => {
		expect(arrayUnique([])).toEqual([])
	})

	it('should preserve order', () => {
		expect(arrayUnique([3, 1, 2, 1, 3])).toEqual([3, 1, 2])
	})
})

describe('isIterableCompat', () => {
	it('should return true for arrays', () => {
		expect(isIterableCompat([1, 2, 3])).toBe(true)
		expect(isIterableCompat([])).toBe(true)
	})

	it('should return true for strings', () => {
		expect(isIterableCompat('hello')).toBe(true)
		expect(isIterableCompat('')).toBe(true)
	})

	it('should return false for null and undefined', () => {
		expect(isIterableCompat(null)).toBe(false)
		expect(isIterableCompat(undefined)).toBe(false)
	})

	it('should return false for plain objects', () => {
		expect(isIterableCompat({})).toBe(false)
		expect(isIterableCompat({ a: 1 })).toBe(false)
	})

	it('should return false for numbers', () => {
		expect(isIterableCompat(123)).toBe(false)
		expect(isIterableCompat(NaN)).toBe(false)
	})
})

describe('createFile', () => {
	it('should create File in modern browsers', () => {
		// Skip if File is not available (older environments)
		if (typeof File !== 'undefined') {
			const file = createFile(['hello'], 'test.txt', { type: 'text/plain' })
			expect(file.name).toBe('test.txt')
		}
	})

	it('should handle empty parts', () => {
		if (typeof File !== 'undefined') {
			const file = createFile([], 'empty.txt', { type: 'text/plain' })
			expect(file.name).toBe('empty.txt')
		}
	})
})
