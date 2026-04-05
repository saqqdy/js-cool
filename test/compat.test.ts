import { describe, expect, it, vi } from 'vitest'
import {
	arrayFrom,
	arrayIncludes,
	arrayUnique,
	createFile,
	getGlobalObject,
	hasOwn,
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
	repeatString,
	strEndsWith,
	strIncludes,
	strStartsWith,
} from '../src/_compat'

describe('arrayFrom', () => {
	it('should convert array-like to array', () => {
		expect(arrayFrom({ length: 3, 0: 'a', 1: 'b', 2: 'c' })).toEqual(['a', 'b', 'c'])
	})

	it('should convert string to array', () => {
		expect(arrayFrom('hello')).toEqual(['h', 'e', 'l', 'l', 'o'])
	})

	it('should work with map function', () => {
		expect(arrayFrom([1, 2, 3], x => x * 2)).toEqual([2, 4, 6])
	})

	it('should work with map function and thisArg', () => {
		const ctx = { multiplier: 10 }
		const result = arrayFrom(
			[1, 2, 3],
			function (this: typeof ctx, x) {
				return x * this.multiplier
			},
			ctx
		)
		expect(result).toEqual([10, 20, 30])
	})

	it('should handle empty array-like', () => {
		expect(arrayFrom({ length: 0 })).toEqual([])
	})

	it('should convert Set to array', () => {
		expect(arrayFrom(new Set([1, 2, 3]))).toEqual([1, 2, 3])
	})

	it('should convert Map keys to array', () => {
		const map = new Map([
			['a', 1],
			['b', 2],
		])
		expect(arrayFrom(map.keys())).toEqual(['a', 'b'])
	})
})

describe('repeatString', () => {
	it('should repeat string n times', () => {
		expect(repeatString('ab', 3)).toBe('ababab')
		expect(repeatString('x', 5)).toBe('xxxxx')
	})

	it('should return empty string for n = 0', () => {
		expect(repeatString('a', 0)).toBe('')
	})

	it('should throw for negative n', () => {
		expect(() => repeatString('a', -1)).toThrow(RangeError)
	})

	it('should return original string for n = 1', () => {
		expect(repeatString('hello', 1)).toBe('hello')
	})

	it('should handle empty string', () => {
		expect(repeatString('', 5)).toBe('')
	})

	it('should handle large n', () => {
		expect(repeatString('x', 100)).toBe('x'.repeat(100))
	})
})

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

	it('should handle NaN', () => {
		expect(arrayIncludes([NaN], NaN)).toBeTruthy()
	})

	it('should handle undefined', () => {
		expect(arrayIncludes([undefined], undefined)).toBeTruthy()
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

	it('should be case sensitive', () => {
		expect(strIncludes('Hello', 'hello')).toBeFalsy()
		expect(strIncludes('Hello', 'Hello')).toBeTruthy()
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

	it('should handle empty string', () => {
		expect(strStartsWith('', '')).toBeTruthy()
		expect(strStartsWith('', 'a')).toBeFalsy()
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

	it('should handle empty string', () => {
		expect(strEndsWith('', '')).toBeTruthy()
		expect(strEndsWith('', 'a')).toBeFalsy()
	})

	it('should handle suffix longer than string', () => {
		expect(strEndsWith('a', 'abc')).toBeFalsy()
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

	it('should handle empty string', () => {
		expect(padStart('', 3, 'x')).toBe('xxx')
	})

	it('should handle fill string longer than needed', () => {
		expect(padStart('a', 3, 'xyz')).toBe('xya')
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

	it('should handle multi-character fill string', () => {
		expect(padEnd('1', 5, 'ab')).toBe('1abab')
	})

	it('should handle empty string', () => {
		expect(padEnd('', 3, 'x')).toBe('xxx')
	})

	it('should handle fill string longer than needed', () => {
		expect(padEnd('a', 3, 'xyz')).toBe('axy')
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
		expect(isNumberNaN({})).toBeFalsy()
		expect(isNumberNaN([])).toBeFalsy()
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
		expect(isNumberFinite(undefined)).toBeFalsy()
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
		expect(isNumberInteger(null)).toBeFalsy()
		expect(isNumberInteger(undefined)).toBeFalsy()
	})

	it('should return true for large integers', () => {
		expect(isNumberInteger(Number.MAX_SAFE_INTEGER)).toBeTruthy()
		expect(isNumberInteger(Number.MIN_SAFE_INTEGER)).toBeTruthy()
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

	it('should return false for non-numbers', () => {
		expect(isSafeInteger('123')).toBeFalsy()
		expect(isSafeInteger(null)).toBeFalsy()
		expect(isSafeInteger(undefined)).toBeFalsy()
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

	it('should handle null/undefined sources', () => {
		const result = objectAssign({ a: 1 }, null as any, undefined as any, { b: 2 })
		expect(result).toEqual({ a: 1, b: 2 })
	})

	it('should handle multiple sources', () => {
		const result = objectAssign({}, { a: 1 }, { b: 2 }, { c: 3 })
		expect(result).toEqual({ a: 1, b: 2, c: 3 })
	})

	it('should modify target in place', () => {
		const target = { a: 1 }
		const result = objectAssign(target, { b: 2 })
		expect(result).toBe(target)
		expect(target).toEqual({ a: 1, b: 2 })
	})
})

describe('objectValues', () => {
	it('should return values of object', () => {
		expect(objectValues({ a: 1, b: 2, c: 3 })).toEqual([1, 2, 3])
	})

	it('should handle empty object', () => {
		expect(objectValues({})).toEqual([])
	})

	it('should handle object with various value types', () => {
		const obj = { a: 1, b: 'string', c: true, d: null }
		expect(objectValues(obj)).toEqual([1, 'string', true, null])
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

	it('should handle object with various value types', () => {
		const entries = objectEntries({ a: 1, b: 'string' })
		expect(entries).toEqual([
			['a', 1],
			['b', 'string'],
		])
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

	it('should handle Map entries', () => {
		const map = new Map([
			['a', 1],
			['b', 2],
		])
		expect(objectFromEntries(map)).toEqual({ a: 1, b: 2 })
	})

	it('should override duplicate keys', () => {
		const result = objectFromEntries([
			['a', 1],
			['a', 2],
		])
		expect(result).toEqual({ a: 2 })
	})
})

describe('hasOwn', () => {
	it('should return true for own properties', () => {
		expect(hasOwn({ a: 1 }, 'a')).toBeTruthy()
		expect(hasOwn({ hasOwnProperty: true }, 'hasOwnProperty')).toBeTruthy()
	})

	it('should return false for inherited properties', () => {
		const obj = Object.create({ inherited: true })
		obj.own = true
		expect(hasOwn(obj, 'inherited')).toBeFalsy()
		expect(hasOwn(obj, 'own')).toBeTruthy()
	})

	it('should return false for non-existent properties', () => {
		expect(hasOwn({}, 'a')).toBeFalsy()
	})

	it('should handle symbol properties', () => {
		const sym = Symbol('test')
		const obj = { [sym]: true }
		expect(hasOwn(obj, sym)).toBeTruthy()
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

	it('should handle different types', () => {
		expect(arrayUnique([1, '1', 1])).toEqual([1, '1'])
		expect(arrayUnique([null, undefined, null])).toEqual([null, undefined])
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

	it('should return false for booleans', () => {
		expect(isIterableCompat(true)).toBeFalsy()
		expect(isIterableCompat(false)).toBeFalsy()
	})

	it('should return true for Set', () => {
		expect(isIterableCompat(new Set())).toBeTruthy()
	})

	it('should return true for Map', () => {
		expect(isIterableCompat(new Map())).toBeTruthy()
	})
})

describe('createFile', () => {
	const fileAvailable = typeof File !== 'undefined'

	it.skipIf(!fileAvailable)('should create File in modern browsers', () => {
		const file = createFile(['hello'], 'test.txt', { type: 'text/plain' })
		expect(file.name).toBe('test.txt')
		expect(file.type).toBe('text/plain')
	})

	it.skipIf(!fileAvailable)('should handle empty parts', () => {
		const file = createFile([], 'empty.txt', { type: 'text/plain' })
		expect(file.name).toBe('empty.txt')
	})

	it.skipIf(!fileAvailable)('should handle Blob parts', () => {
		const blob = new Blob(['blob content'], { type: 'text/plain' })
		const file = createFile([blob], 'from-blob.txt', { type: 'text/plain' })
		expect(file.name).toBe('from-blob.txt')
	})

	it.skipIf(!fileAvailable)('should handle ArrayBuffer parts', () => {
		const buffer = new TextEncoder().encode('hello').buffer
		const file = createFile([buffer], 'from-buffer.txt', { type: 'text/plain' })
		expect(file.name).toBe('from-buffer.txt')
	})
})
