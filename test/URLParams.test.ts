import { describe, expect, it } from 'vitest'
import URLParams from '../src/URLParams'

describe('URLParams', () => {
	describe('constructor', () => {
		it('should parse URL with search and hash params', () => {
			const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
			expect(params.get('ss', 'search')).toBe('1')
			expect(params.get('bb', 'hash')).toBe('343')
		})

		it('should parse URL with only search params', () => {
			const params = new URLParams('https://example.com?a=1&b=2')
			expect(params.get('a', 'search')).toBe('1')
			expect(params.get('b', 'search')).toBe('2')
		})

		it('should parse URL with only hash params', () => {
			const params = new URLParams('https://example.com#/path?c=3&d=4')
			expect(params.get('c', 'hash')).toBe('3')
			expect(params.get('d', 'hash')).toBe('4')
		})

		it('should parse relative URL', () => {
			const params = new URLParams('/api/users?page=1#/detail?id=123')
			expect(params.get('page', 'search')).toBe('1')
			expect(params.get('id', 'hash')).toBe('123')
		})

		it('should handle empty URL', () => {
			const params = new URLParams()
			expect(params.keys()).toEqual([])
		})

		it('should accept URL instance', () => {
			const url = new URL('https://example.com?token=abc#/page?id=123')
			const params = new URLParams(url)
			expect(params.get('token', 'search')).toBe('abc')
			expect(params.get('id', 'hash')).toBe('123')
		})

		it('should handle URL with hash but no params', () => {
			const params = new URLParams('https://example.com#/path/to/page')
			expect(params.getHashPath()).toBe('/path/to/page')
			expect(params.toObject('hash')).toEqual({})
		})

		it('should handle URL with empty hash', () => {
			const params = new URLParams('https://example.com#')
			expect(params.getHashPath()).toBe('')
			expect(params.toObject('hash')).toEqual({})
		})
	})

	describe('get', () => {
		it('should return value from search params', () => {
			const params = new URLParams('https://example.com?token=abc#/page')
			expect(params.get('token', 'search')).toBe('abc')
		})

		it('should return value from hash params', () => {
			const params = new URLParams('https://example.com#/page?token=xyz')
			expect(params.get('token', 'hash')).toBe('xyz')
		})

		it('should return hash value with priority when scope is all', () => {
			const params = new URLParams('https://example.com?token=old#/page?token=new')
			expect(params.get('token')).toBe('new') // hash 优先
		})

		it('should return search value when not in hash', () => {
			const params = new URLParams('https://example.com?ss=1#/path?bb=343')
			expect(params.get('ss')).toBe('1')
		})

		it('should return null for missing param', () => {
			const params = new URLParams('https://example.com?a=1')
			expect(params.get('missing')).toBeNull()
		})
	})

	describe('getAll', () => {
		it('should return all values from search params', () => {
			const params = new URLParams('https://example.com?a=1&a=2&a=3')
			expect(params.getAll('a', 'search')).toEqual(['1', '2', '3'])
		})

		it('should return all values from hash params', () => {
			const params = new URLParams('https://example.com#/path?a=1&a=2')
			expect(params.getAll('a', 'hash')).toEqual(['1', '2'])
		})

		it('should return combined values when scope is all', () => {
			const params = new URLParams('https://example.com?a=1#/path?a=2')
			expect(params.getAll('a')).toEqual(['1', '2'])
		})

		it('should return empty array for missing param', () => {
			const params = new URLParams('https://example.com?a=1')
			expect(params.getAll('missing')).toEqual([])
		})
	})

	describe('has', () => {
		it('should return true for existing search param', () => {
			const params = new URLParams('https://example.com?a=1')
			expect(params.has('a', 'search')).toBeTruthy()
		})

		it('should return true for existing hash param', () => {
			const params = new URLParams('https://example.com#/path?b=2')
			expect(params.has('b', 'hash')).toBeTruthy()
		})

		it('should return true for existing param in any scope', () => {
			const params = new URLParams('https://example.com?a=1#/path?b=2')
			expect(params.has('a')).toBeTruthy()
			expect(params.has('b')).toBeTruthy()
		})

		it('should return false for missing param', () => {
			const params = new URLParams('https://example.com?a=1')
			expect(params.has('missing')).toBeFalsy()
		})
	})

	describe('keys/values/entries', () => {
		it('should return all keys', () => {
			const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
			expect(params.keys()).toEqual(expect.arrayContaining(['ss', 'bb']))
		})

		it('should return search keys only', () => {
			const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
			expect(params.keys('search')).toEqual(['ss'])
		})

		it('should return hash keys only', () => {
			const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
			expect(params.keys('hash')).toEqual(['bb'])
		})

		it('should return all values', () => {
			const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
			expect(params.values()).toEqual(expect.arrayContaining(['1', '343']))
		})

		it('should return search values only', () => {
			const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
			expect(params.values('search')).toEqual(['1'])
		})

		it('should return hash values only', () => {
			const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
			expect(params.values('hash')).toEqual(['343'])
		})

		it('should return all entries', () => {
			const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
			const entries = params.entries()
			expect(entries).toContainEqual(['ss', '1'])
			expect(entries).toContainEqual(['bb', '343'])
		})

		it('should return search entries only', () => {
			const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
			expect(params.entries('search')).toEqual([['ss', '1']])
		})

		it('should return hash entries only', () => {
			const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
			expect(params.entries('hash')).toEqual([['bb', '343']])
		})

		it('should deduplicate keys when returning all keys', () => {
			const params = new URLParams('https://example.com?a=1#/path?a=2')
			expect(params.keys()).toEqual(['a'])
		})
	})

	describe('set/append/delete', () => {
		it('should set search param', () => {
			const params = new URLParams('https://example.com')
			params.set('a', 1)
			expect(params.get('a', 'search')).toBe('1')
		})

		it('should set hash param', () => {
			const params = new URLParams('https://example.com')
			params.set('a', 1, 'hash')
			expect(params.get('a', 'hash')).toBe('1')
		})

		it('should set param with boolean value', () => {
			const params = new URLParams('https://example.com')
			params.set('active', true)
			expect(params.get('active', 'search')).toBe('true')
		})

		it('should set param with number value', () => {
			const params = new URLParams('https://example.com')
			params.set('count', 42)
			expect(params.get('count', 'search')).toBe('42')
		})

		it('should support chaining', () => {
			const params = new URLParams('https://example.com')
			params.set('a', 1).set('b', 2).set('c', 3, 'hash')
			expect(params.get('a', 'search')).toBe('1')
			expect(params.get('b', 'search')).toBe('2')
			expect(params.get('c', 'hash')).toBe('3')
		})

		it('should append param', () => {
			const params = new URLParams('https://example.com?a=1')
			params.append('a', 2)
			expect(params.getAll('a', 'search')).toEqual(['1', '2'])
		})

		it('should append param to hash', () => {
			const params = new URLParams('https://example.com#/path?a=1')
			params.append('a', 2, 'hash')
			expect(params.getAll('a', 'hash')).toEqual(['1', '2'])
		})

		it('should append support chaining', () => {
			const params = new URLParams('https://example.com')
			const result = params.append('a', 1)
			expect(result).toBe(params)
		})

		it('should delete param from search', () => {
			const params = new URLParams('https://example.com?a=1&b=2')
			params.delete('a')
			expect(params.has('a', 'search')).toBeFalsy()
			expect(params.has('b', 'search')).toBeTruthy()
		})

		it('should delete param from hash', () => {
			const params = new URLParams('https://example.com#/path?a=1&b=2')
			params.delete('a', 'hash')
			expect(params.has('a', 'hash')).toBeFalsy()
			expect(params.has('b', 'hash')).toBeTruthy()
		})

		it('should delete param from all scopes', () => {
			const params = new URLParams('https://example.com?a=1#/path?a=2')
			params.delete('a')
			expect(params.has('a')).toBeFalsy()
		})

		it('should delete support chaining', () => {
			const params = new URLParams('https://example.com?a=1')
			const result = params.delete('a')
			expect(result).toBe(params)
		})
	})

	describe('clear', () => {
		it('should clear all params', () => {
			const params = new URLParams('https://example.com?a=1#/path?b=2')
			params.clear()
			expect(params.keys()).toEqual([])
		})

		it('should clear search params only', () => {
			const params = new URLParams('https://example.com?a=1#/path?b=2')
			params.clear('search')
			expect(params.toObject('search')).toEqual({})
			expect(params.toObject('hash')).toEqual({ b: '2' })
		})

		it('should clear hash params only', () => {
			const params = new URLParams('https://example.com?a=1#/path?b=2')
			params.clear('hash')
			expect(params.toObject('search')).toEqual({ a: '1' })
			expect(params.toObject('hash')).toEqual({})
		})

		it('should support chaining', () => {
			const params = new URLParams('https://example.com?a=1')
			const result = params.clear()
			expect(result).toBe(params)
		})
	})

	describe('toObject/toDetailObject', () => {
		it('should convert to object', () => {
			const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
			expect(params.toObject()).toEqual({ ss: '1', bb: '343' })
		})

		it('should convert search params to object', () => {
			const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
			expect(params.toObject('search')).toEqual({ ss: '1' })
		})

		it('should convert hash params to object', () => {
			const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
			expect(params.toObject('hash')).toEqual({ bb: '343' })
		})

		it('should convert to detail object', () => {
			const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
			const detail = params.toDetailObject()
			expect(detail.search).toEqual({ ss: '1' })
			expect(detail.hash).toEqual({ bb: '343' })
			expect(detail.all).toEqual({ ss: '1', bb: '343' })
			expect(detail.source).toEqual({ ss: 'search', bb: 'hash' })
		})

		it('should track both source for duplicate keys', () => {
			const params = new URLParams('https://example.com?token=old#/path?token=new')
			const detail = params.toDetailObject()
			expect(detail.source.token).toBe('both')
			expect(detail.all.token).toBe('new') // hash 优先
		})
	})

	describe('toString/toURL', () => {
		it('should return search query string', () => {
			const params = new URLParams('https://example.com?a=1&b=2')
			expect(params.toString('search')).toBe('a=1&b=2')
		})

		it('should return hash query string', () => {
			const params = new URLParams('https://example.com#/path?a=1&b=2')
			expect(params.toString('hash')).toBe('a=1&b=2')
		})

		it('should default to search when calling toString', () => {
			const params = new URLParams('https://example.com?a=1')
			expect(params.toString()).toBe('a=1')
		})

		it('should build URL with modified params', () => {
			const params = new URLParams('https://example.com?a=1')
			params.set('b', 2)
			// URL API adds trailing slash for root path
			expect(params.toURL()).toBe('https://example.com/?a=1&b=2')
		})

		it('should build URL with hash params', () => {
			const params = new URLParams('https://example.com')
			params.set('a', 1, 'hash')
			// URL API adds trailing slash for root path
			expect(params.toURL()).toBe('https://example.com/#?a=1')
		})

		it('should preserve hash path', () => {
			const params = new URLParams('https://example.com#/path?a=1')
			params.set('b', 2, 'hash')
			expect(params.toURL()).toBe('https://example.com/#/path?a=1&b=2')
		})

		it('should build URL without base URL', () => {
			const params = new URLParams()
			params.set('a', 1)
			// In browser environment, uses location.origin (http://localhost:3000 in happy-dom)
			expect(params.toURL()).toContain('/?a=1')
		})

		it('should build URL with both search and hash params', () => {
			const params = new URLParams()
			params.set('search', 'param').set('hash', 'value', 'hash')
			// In browser environment, uses location.origin
			expect(params.toURL()).toContain('/?search=param#?hash=value')
		})
	})

	describe('getHashPath/setHashPath', () => {
		it('should get hash path', () => {
			const params = new URLParams('https://example.com#/path/to/page?a=1')
			expect(params.getHashPath()).toBe('/path/to/page')
		})

		it('should return empty string for hash without path', () => {
			const params = new URLParams('https://example.com#?a=1')
			expect(params.getHashPath()).toBe('')
		})

		it('should set hash path', () => {
			const params = new URLParams('https://example.com#?a=1')
			params.setHashPath('/new/path')
			expect(params.getHashPath()).toBe('/new/path')
			// URL API adds trailing slash for root path
			expect(params.toURL()).toBe('https://example.com/#/new/path?a=1')
		})

		it('should support chaining', () => {
			const params = new URLParams('https://example.com#?a=1')
			const result = params.setHashPath('/new')
			expect(result).toBe(params)
		})
	})

	describe('static methods', () => {
		it('should create from query string', () => {
			const params = URLParams.fromQueryString('a=1&b=2')
			expect(params.get('a', 'search')).toBe('1')
			expect(params.get('b', 'search')).toBe('2')
		})

		it('should create from query string with ?', () => {
			const params = URLParams.fromQueryString('?a=1&b=2')
			expect(params.get('a', 'search')).toBe('1')
		})
	})

	describe('URL encoded values', () => {
		it('should decode URL encoded keys and values', () => {
			const params = new URLParams(
				'https://example.com?name=John%20Doe#/page?email=test%40example.com'
			)
			expect(params.get('name', 'search')).toBe('John Doe')
			expect(params.get('email', 'hash')).toBe('test@example.com')
		})

		it('should encode values when building URL', () => {
			const params = new URLParams('https://example.com')
			params.set('name', 'John Doe')
			expect(params.toURL()).toBe('https://example.com/?name=John+Doe')
		})
	})

	describe('iteration', () => {
		it('should be iterable', () => {
			const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
			const result: [string, string][] = [...params]
			expect(result).toContainEqual(['ss', '1'])
			expect(result).toContainEqual(['bb', '343'])
		})

		it('should work with for...of', () => {
			const params = new URLParams('https://example.com?a=1&b=2')
			const keys: string[] = []
			for (const [key] of params) {
				keys.push(key)
			}
			expect(keys).toEqual(['a', 'b'])
		})
	})

	describe('edge cases', () => {
		it('should handle special characters in hash path', () => {
			const params = new URLParams(
				'https://example.com#/path-with-dashes/and_underscores?a=1'
			)
			expect(params.getHashPath()).toBe('/path-with-dashes/and_underscores')
		})

		it('should handle empty values', () => {
			const params = new URLParams('https://example.com?a=&b=value')
			expect(params.get('a')).toBe('')
			expect(params.get('b')).toBe('value')
		})

		it('should handle multiple question marks in hash', () => {
			const params = new URLParams('https://example.com#/path?a=1?b=2')
			// The second ? is treated as part of the value
			expect(params.get('a', 'hash')).toBe('1?b=2')
		})
	})
})
