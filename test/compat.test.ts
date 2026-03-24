import { describe, expect, it } from 'vitest'
import {
	arrayIncludes,
	arrayUnique,
	createFile,
	getGlobalObject,
	isIterableCompat,
	isNumberFinite,
	isNumberInteger,
	isNumberNaN,
	isSafeInteger,
	objectAssign,
	objectEntries,
	objectFromEntries,
	objectValues,
	padEnd,
	padStart,
	strEndsWith,
	strIncludes,
	strStartsWith,
} from '../src/_compat'

describe('arrayIncludes', () => {
	it('should return true when item exists', () => {
		expect(arrayIncludes([1, 2, 3], 2)).toBeTruthy()
		expect(arrayIncludes(['a', 'b', 'c'], 'b')).toBeTruthy()
	})

	it('should return false when item does not exist', () => {
		expect(arrayIncludes([1, 2, 3], 4)).toBeFalsy()
		expect(arrayIncludes(['a', 'b'], 'c')).toBeFalsy()
	})

	it('should handle empty array', () => {
		expect(arrayIncludes([], 1)).toBeFalsy()
	})
})

describe('strIncludes', () => {
	it('should return true when substring exists', () => {
		expect(strIncludes('hello world', 'world')).toBeTruthy()
		expect(strIncludes('hello world', 'o w')).toBeTruthy()
	})

	it('should return false when substring does not exist', () => {
		expect(strIncludes('hello world', 'xyz')).toBeFalsy()
	})

	it('should handle empty strings', () => {
		expect(strIncludes('', 'a')).toBeFalsy()
		expect(strIncludes('hello', '')).toBeTruthy()
	})
})

describe('strStartsWith', () => {
	it('should return true when string starts with prefix', () => {
		expect(strStartsWith('hello world', 'hello')).toBeTruthy()
		expect(strStartsWith('https://example.com', 'https://')).toBeTruthy()
	})

	it('should return false when string does not start with prefix', () => {
		expect(strStartsWith('hello world', 'world')).toBeFalsy()
		expect(strStartsWith('http://example.com', 'https://')).toBeFalsy()
	})

	it('should handle empty prefix', () => {
		expect(strStartsWith('hello', '')).toBeTruthy()
	})
})

describe('strEndsWith', () => {
	it('should return true when string ends with suffix', () => {
		expect(strEndsWith('hello world', 'world')).toBeTruthy()
		expect(strEndsWith('file.txt', '.txt')).toBeTruthy()
	})

	it('should return false when string does not end with suffix', () => {
		expect(strEndsWith('hello world', 'hello')).toBeFalsy()
		expect(strEndsWith('file.md', '.txt')).toBeFalsy()
	})

	it('should handle empty suffix', () => {
		expect(strEndsWith('hello', '')).toBeTruthy()
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
		expect(isNumberNaN(NaN)).toBeTruthy()
		expect(isNumberNaN(Number.NaN)).toBeTruthy()
		expect(isNumberNaN(0 / 0)).toBeTruthy()
	})

	it('should return false for non-NaN values', () => {
		expect(isNumberNaN(0)).toBeFalsy()
		expect(isNumberNaN(Infinity)).toBeFalsy()
		expect(isNumberNaN(-Infinity)).toBeFalsy()
		expect(isNumberNaN('NaN')).toBeFalsy()
		expect(isNumberNaN(null)).toBeFalsy()
		expect(isNumberNaN(undefined)).toBeFalsy()
	})
})

describe('isNumberFinite', () => {
	it('should return true for finite numbers', () => {
		expect(isNumberFinite(0)).toBeTruthy()
		expect(isNumberFinite(123)).toBeTruthy()
		expect(isNumberFinite(-456)).toBeTruthy()
		expect(isNumberFinite(3.14)).toBeTruthy()
	})

	it('should return false for non-finite values', () => {
		expect(isNumberFinite(Infinity)).toBeFalsy()
		expect(isNumberFinite(-Infinity)).toBeFalsy()
		expect(isNumberFinite(NaN)).toBeFalsy()
		expect(isNumberFinite('123')).toBeFalsy()
		expect(isNumberFinite(null)).toBeFalsy()
	})
})

describe('isNumberInteger', () => {
	it('should return true for integers', () => {
		expect(isNumberInteger(0)).toBeTruthy()
		expect(isNumberInteger(123)).toBeTruthy()
		expect(isNumberInteger(-456)).toBeTruthy()
	})

	it('should return false for non-integers', () => {
		expect(isNumberInteger(3.14)).toBeFalsy()
		expect(isNumberInteger(NaN)).toBeFalsy()
		expect(isNumberInteger(Infinity)).toBeFalsy()
		expect(isNumberInteger('123')).toBeFalsy()
	})
})

describe('isSafeInteger', () => {
	it('should return true for safe integers', () => {
		expect(isSafeInteger(0)).toBeTruthy()
		expect(isSafeInteger(123)).toBeTruthy()
		expect(isSafeInteger(Number.MAX_SAFE_INTEGER)).toBeTruthy()
		expect(isSafeInteger(Number.MIN_SAFE_INTEGER)).toBeTruthy()
	})

	it('should return false for unsafe integers', () => {
		expect(isSafeInteger(Number.MAX_SAFE_INTEGER + 1)).toBeFalsy()
		expect(isSafeInteger(Number.MIN_SAFE_INTEGER - 1)).toBeFalsy()
		expect(isSafeInteger(3.14)).toBeFalsy()
		expect(isSafeInteger(NaN)).toBeFalsy()
		expect(isSafeInteger(Infinity)).toBeFalsy()
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
		expect(isIterableCompat([1, 2, 3])).toBeTruthy()
		expect(isIterableCompat([])).toBeTruthy()
	})

	it('should return true for strings', () => {
		expect(isIterableCompat('hello')).toBeTruthy()
		expect(isIterableCompat('')).toBeTruthy()
	})

	it('should return false for null and undefined', () => {
		expect(isIterableCompat(null)).toBeFalsy()
		expect(isIterableCompat(undefined)).toBeFalsy()
	})

	it('should return false for plain objects', () => {
		expect(isIterableCompat({})).toBeFalsy()
		expect(isIterableCompat({ a: 1 })).toBeFalsy()
	})

	it('should return false for numbers', () => {
		expect(isIterableCompat(123)).toBeFalsy()
		expect(isIterableCompat(NaN)).toBeFalsy()
	})
})

describe('createFile', () => {
	const fileAvailable = typeof File !== 'undefined'

	it.skipIf(!fileAvailable)('should create File in modern browsers', () => {
		const file = createFile(['hello'], 'test.txt', { type: 'text/plain' })
		expect(file.name).toBe('test.txt')
	})

	it.skipIf(!fileAvailable)('should handle empty parts', () => {
		const file = createFile([], 'empty.txt', { type: 'text/plain' })
		expect(file.name).toBe('empty.txt')
	})
})
