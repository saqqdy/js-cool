import { describe, expect, it } from 'vitest'
import {
	getHash,
	getHost,
	getHostname,
	getOrigin,
	getPathname,
	getSearch,
	parse,
	stringify,
	Url,
} from '../src/url/index'

// ============================================
// Url Class Tests
// ============================================

describe('Url class', () => {
	describe('constructor', () => {
		it('should create instance with URL string', () => {
			const u = new Url('https://example.com?id=123')
			// URL constructor normalizes to include trailing slash for root
			expect(u.toString()).toBe('https://example.com/?id=123')
		})

		it('should create empty instance', () => {
			const u = new Url()
			// In happy-dom environment, location.href is available
			expect(u.toString()).toBeTruthy()
		})

		it('should work with URL object', () => {
			const urlObj = new URL('https://example.com?id=123')
			const u = new Url(urlObj)
			expect(u.get('id')).toBe('123')
		})
	})

	describe('URLSearchParams-like methods', () => {
		it('should get parameter value', () => {
			const u = new Url('https://example.com?id=123&name=John')
			expect(u.get('id')).toBe('123')
			expect(u.get('name')).toBe('John')
		})

		it('should return null for non-existent parameter', () => {
			const u = new Url('https://example.com?id=123')
			expect(u.get('missing')).toBeNull()
		})

		it('should get all values for parameter', () => {
			const u = new Url('https://example.com?id=1&id=2&id=3')
			expect(u.getAll('id')).toEqual(['1', '2', '3'])
		})

		it('should check if parameter exists', () => {
			const u = new Url('https://example.com?id=123')
			expect(u.has('id')).toBeTruthy()
			expect(u.has('missing')).toBeFalsy()
		})

		it('should set parameter (chainable)', () => {
			const u = new Url('https://example.com')
			const result = u.set('page', 2)
			expect(result).toBe(u) // chainable
			expect(u.toString()).toBe('https://example.com/?page=2')
		})

		it('should append parameter (chainable)', () => {
			const u = new Url('https://example.com?id=1')
			u.append('id', 2)
			expect(u.toString()).toBe('https://example.com/?id=1&id=2')
		})

		it('should delete parameter (chainable)', () => {
			const u = new Url('https://example.com?id=123&token=abc')
			u.delete('token')
			expect(u.toString()).toBe('https://example.com/?id=123')
		})

		it('should return keys, values, entries', () => {
			const u = new Url('https://example.com?a=1&b=2')
			expect(u.keys()).toEqual(['a', 'b'])
			expect(u.values()).toEqual(['1', '2'])
			expect(u.entries()).toEqual([
				['a', '1'],
				['b', '2'],
			])
		})
	})

	describe('URL property getters', () => {
		it('should return origin', () => {
			const u = new Url('https://example.com:8080/path?id=1')
			expect(u.origin).toBe('https://example.com:8080')
		})

		it('should return host (with port)', () => {
			const u = new Url('https://example.com:8080/path')
			expect(u.host).toBe('example.com:8080')
		})

		it('should return hostname (without port)', () => {
			const u = new Url('https://example.com:8080/path')
			expect(u.hostname).toBe('example.com')
		})

		it('should return pathname', () => {
			const u = new Url('https://example.com/api/users?id=1')
			expect(u.pathname).toBe('/api/users')
		})

		it('should return search', () => {
			const u = new Url('https://example.com?key=value#section')
			expect(u.search).toBe('?key=value')
		})

		it('should return hash', () => {
			const u = new Url('https://example.com?key=value#section')
			expect(u.hash).toBe('#section')
		})
	})

	describe('path manipulation', () => {
		it('should set path (chainable)', () => {
			const u = new Url('https://api.example.com')
			const result = u.path('users', '123')
			expect(result).toBe(u) // chainable
			expect(u.toString()).toBe('https://api.example.com/users/123')
		})

		it('should preserve search and hash when setting path', () => {
			const u = new Url('https://example.com/old?key=value#section')
			u.path('new', 'path')
			expect(u.toString()).toBe('https://example.com/new/path?key=value#section')
		})

		it('should handle path segments with slashes', () => {
			const u = new Url('https://example.com')
			u.path('/users/', '/123/')
			expect(u.toString()).toBe('https://example.com/users/123')
		})
	})

	describe('hash operations', () => {
		it('should get hash path', () => {
			const u = new Url('https://example.com#/path?a=1')
			expect(u.getHashPath()).toBe('/path')
		})

		it('should set hash path', () => {
			const u = new Url('https://example.com#/old?a=1')
			u.setHashPath('/new')
			expect(u.getHashPath()).toBe('/new')
		})
	})

	describe('toObject / toDetailObject', () => {
		it('should convert to object', () => {
			const u = new Url('https://example.com?a=1&b=2')
			expect(u.toObject()).toEqual({ a: '1', b: '2' })
		})

		it('should convert to detail object', () => {
			const u = new Url('https://example.com?a=1#/path?b=2')
			const detail = u.toDetailObject()
			expect(detail.search).toEqual({ a: '1' })
			expect(detail.hash).toEqual({ b: '2' })
			expect(detail.all).toEqual({ a: '1', b: '2' })
		})
	})

	describe('chaining', () => {
		it('should support method chaining', () => {
			const result = new Url('https://api.example.com')
				.path('users', '123')
				.set('fields', 'name')
				.setHashPath('section')
				.toString()

			expect(result).toBe('https://api.example.com/users/123?fields=name#section')
		})

		it('should support complex chaining', () => {
			const result = new Url('https://example.com?id=1&token=abc')
				.delete('token')
				.append('id', 'backup')
				.set('page', 2)
				.toString()

			expect(result).toBe('https://example.com/?id=1&id=backup&page=2')
		})
	})

	describe('hash parameters', () => {
		it('should get hash parameters', () => {
			const u = new Url('https://example.com?id=1#/path?token=abc')
			expect(u.get('id', 'search')).toBe('1')
			expect(u.get('token', 'hash')).toBe('abc')
			expect(u.get('id')).toBe('1') // hash doesn't have id, returns search
			expect(u.get('token')).toBe('abc') // hash has token, returns hash value
		})

		it('should set hash parameters', () => {
			const u = new Url('https://example.com')
			u.set('token', 'abc', 'hash')
			expect(u.toString()).toBe('https://example.com/#?token=abc')
		})

		it('should delete from specific scope', () => {
			const u = new Url('https://example.com?id=1#/path?id=2')
			u.delete('id', 'search')
			expect(u.get('id')).toBe('2') // only hash parameter remains
		})
	})
})

// ============================================
// Static Methods Tests
// ============================================

describe('Url static methods', () => {
	describe('parse', () => {
		it('should parse query string', () => {
			expect(Url.parse('?a=1&b=2')).toEqual({ a: '1', b: '2' })
		})

		it('should convert values with convert option', () => {
			const result = Url.parse('?a=1&b=true&c=null', { convert: true })
			expect(result).toEqual({ a: 1, b: true, c: null })
		})

		it('should return empty object for empty string', () => {
			expect(Url.parse('')).toEqual({})
		})
	})

	describe('stringify', () => {
		it('should stringify object', () => {
			expect(Url.stringify({ a: 1, b: 2 })).toBe('?a=1&b=2')
		})

		it('should return empty string for null/undefined', () => {
			expect(Url.stringify(null as any)).toBe('')
			expect(Url.stringify(undefined as any)).toBe('')
		})

		it('should support withQuestionMark option', () => {
			expect(Url.stringify({ a: 1 }, { withQuestionMark: false })).toBe('a=1')
		})
	})

	describe('getOrigin', () => {
		it('should extract origin', () => {
			expect(Url.getOrigin('https://example.com:8080/path')).toBe('https://example.com:8080')
		})

		it('should return empty string for relative URL', () => {
			expect(Url.getOrigin('/relative/path')).toBe('')
		})
	})

	describe('getHost', () => {
		it('should extract host', () => {
			expect(Url.getHost('https://example.com:8080/path')).toBe('example.com:8080')
		})
	})

	describe('getHostname', () => {
		it('should extract hostname', () => {
			expect(Url.getHostname('https://example.com:8080/path')).toBe('example.com')
		})
	})

	describe('getPathname', () => {
		it('should extract pathname', () => {
			expect(Url.getPathname('https://example.com/api/users?id=1')).toBe('/api/users')
		})
	})

	describe('getSearch', () => {
		it('should extract search', () => {
			expect(Url.getSearch('https://example.com?key=value')).toBe('?key=value')
			expect(Url.getSearch('https://example.com')).toBe('')
		})
	})

	describe('getHash', () => {
		it('should extract hash', () => {
			expect(Url.getHash('https://example.com/path#section')).toBe('#section')
			expect(Url.getHash('https://example.com')).toBe('')
		})
	})

	describe('current', () => {
		it('should return Url instance or null depending on environment', () => {
			// In happy-dom environment, location is available
			const result = Url.current()
			expect(result === null || result instanceof Url).toBeTruthy()
		})
	})

	describe('fromQueryString', () => {
		it('should create Url from query string', () => {
			const u = Url.fromQueryString('a=1&b=2')
			expect(u.toObject()).toEqual({ a: '1', b: '2' })
		})
	})
})

// ============================================
// Standalone Function Tests
// ============================================

describe('standalone functions', () => {
	describe('parse', () => {
		it('should work as Url.parse alias', () => {
			expect(parse('?a=1&b=2')).toEqual({ a: '1', b: '2' })
		})
	})

	describe('stringify', () => {
		it('should work as Url.stringify alias', () => {
			expect(stringify({ a: 1, b: 2 })).toBe('?a=1&b=2')
		})
	})

	describe('getOrigin', () => {
		it('should work as Url.getOrigin alias', () => {
			expect(getOrigin('https://example.com:8080/path')).toBe('https://example.com:8080')
		})
	})

	describe('getHost', () => {
		it('should work as Url.getHost alias', () => {
			expect(getHost('https://example.com:8080/path')).toBe('example.com:8080')
		})
	})

	describe('getHostname', () => {
		it('should work as Url.getHostname alias', () => {
			expect(getHostname('https://example.com:8080/path')).toBe('example.com')
		})
	})

	describe('getPathname', () => {
		it('should work as Url.getPathname alias', () => {
			expect(getPathname('https://example.com/api/users?id=1')).toBe('/api/users')
		})
	})

	describe('getSearch', () => {
		it('should work as Url.getSearch alias', () => {
			expect(getSearch('https://example.com?key=value')).toBe('?key=value')
		})
	})

	describe('getHash', () => {
		it('should work as Url.getHash alias', () => {
			expect(getHash('https://example.com/path#section')).toBe('#section')
		})
	})
})

// ============================================
// Iterator Tests
// ============================================

describe('Url iterator', () => {
	it('should be iterable', () => {
		const u = new Url('https://example.com?a=1&b=2')
		const entries = [...u]
		expect(entries).toEqual([
			['a', '1'],
			['b', '2'],
		])
	})
})
