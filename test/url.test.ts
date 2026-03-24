import { describe, expect, it } from 'vitest'
import {
	append,
	deleteParam,
	entries,
	get,
	getAll,
	getHash,
	getHost,
	getHostname,
	getOrigin,
	getPathname,
	getSearch,
	has,
	keys,
	parse,
	set,
	stringify,
	url,
	Url,
	URL_PATTERNS,
	VALUE_MAP,
	values,
} from '../src/url/index'
import {
	parseQueryString,
	stringifyQueryString,
	getQueryParamValue,
	getAllQueryParamValues,
	hasQueryParam,
	setQueryParam,
	appendQueryParam,
	deleteParam as deleteQueryParam,
	getQueryParamKeys,
	getQueryParamValues,
	getQueryParamEntries,
	getOrigin as getURLOrigin,
	getHost as getURLHost,
	getHostname as getURLHostname,
	getPathname as getURLPathname,
	getSearch as getURLSearch,
	getHash as getURLHash,
} from '../src/index'

describe('URL patterns', () => {
	it('should have url patterns', () => {
		expect(URL_PATTERNS).toBeDefined()
		expect(VALUE_MAP).toBeDefined()
	})

	it('should have URLSearchParams-like methods', () => {
		expect(typeof get).toBe('function')
		expect(typeof getAll).toBe('function')
		expect(typeof has).toBe('function')
		expect(typeof set).toBe('function')
		expect(typeof append).toBe('function')
		expect(typeof deleteParam).toBe('function')
		expect(typeof keys).toBe('function')
		expect(typeof values).toBe('function')
		expect(typeof entries).toBe('function')
	})

	it('should have URL property extraction methods', () => {
		expect(typeof getOrigin).toBe('function')
		expect(typeof getHost).toBe('function')
		expect(typeof getHostname).toBe('function')
		expect(typeof getPathname).toBe('function')
		expect(typeof getSearch).toBe('function')
		expect(typeof getHash).toBe('function')
	})

	it('should have parse and stringify methods', () => {
		expect(typeof parse).toBe('function')
		expect(typeof stringify).toBe('function')
	})
})

describe('URL patterns - get', () => {
	it('should get parameter value', () => {
		expect(get('id', 'https://example.com?id=123')).toBe('123')
		expect(get('name', 'https://example.com?name=John')).toBe('John')
	})

	it('should return null for non-existent parameter', () => {
		expect(get('missing', 'https://example.com?id=123')).toBeNull()
	})

	it('should return null for empty key', () => {
		expect(get('', 'https://example.com?id=123')).toBeNull()
	})

	it('should decode URI encoded values', () => {
		expect(get('name', 'https://example.com?name=John%20Doe')).toBe('John Doe')
	})
})

describe('URL patterns - getAll', () => {
	it('should get all values for parameter', () => {
		expect(getAll('id', 'https://example.com?id=1&id=2&id=3')).toEqual(['1', '2', '3'])
	})

	it('should return empty array for non-existent parameter', () => {
		expect(getAll('missing', 'https://example.com?id=123')).toEqual([])
	})
})

describe('URL patterns - has', () => {
	it('should return true if parameter exists', () => {
		expect(has('id', 'https://example.com?id=123')).toBeTruthy()
	})

	it('should return false if parameter does not exist', () => {
		expect(has('missing', 'https://example.com?id=123')).toBeFalsy()
	})
})

describe('URL patterns - set', () => {
	it('should set parameter value', () => {
		expect(set('page', 2, 'https://example.com')).toBe('https://example.com/?page=2')
	})

	it('should replace existing parameter', () => {
		expect(set('id', 2, 'https://example.com?id=1')).toBe('https://example.com/?id=2')
	})
})

describe('URL patterns - append', () => {
	it('should append parameter value', () => {
		expect(append('id', 2, 'https://example.com?id=1')).toBe('https://example.com/?id=1&id=2')
	})
})

describe('URL patterns - delete', () => {
	it('should delete parameter', () => {
		expect(deleteParam('token', 'https://example.com?token=abc&id=1')).toBe(
			'https://example.com/?id=1'
		)
	})
})

describe('URL patterns - keys/values/entries', () => {
	it('should return all parameter names', () => {
		expect(keys('https://example.com?a=1&b=2')).toEqual(['a', 'b'])
	})

	it('should return all parameter values', () => {
		expect(values('https://example.com?a=1&b=2')).toEqual(['1', '2'])
	})

	it('should return all parameter entries', () => {
		expect(entries('https://example.com?a=1&b=2')).toEqual([
			['a', '1'],
			['b', '2'],
		])
	})
})

describe('URL patterns - URL property extraction', () => {
	it('should extract origin', () => {
		expect(getOrigin('https://example.com:8080/path')).toBe('https://example.com:8080')
		expect(getOrigin('/relative/path')).toBe('')
	})

	it('should extract host', () => {
		expect(getHost('https://example.com:8080/path')).toBe('example.com:8080')
	})

	it('should extract hostname', () => {
		expect(getHostname('https://example.com:8080/path')).toBe('example.com')
	})

	it('should extract pathname', () => {
		expect(getPathname('https://example.com/api/users?id=1')).toBe('/api/users')
	})

	it('should extract search', () => {
		expect(getSearch('https://example.com?key=value')).toBe('?key=value')
		expect(getSearch('https://example.com')).toBe('')
	})

	it('should extract hash', () => {
		expect(getHash('https://example.com/path#section')).toBe('#section')
		expect(getHash('https://example.com')).toBe('')
	})
})

describe('URL patterns - parse', () => {
	it('should parse query string', () => {
		expect(parse('?a=1&b=2')).toEqual({ a: '1', b: '2' })
	})

	it('should convert values with covert option', () => {
		const result = parse('?a=1&b=true&c=null', { covert: true })
		expect(result).toEqual({ a: 1, b: true, c: null })
	})

	it('should return empty object for empty string', () => {
		expect(parse('')).toEqual({})
	})
})

describe('URL patterns - stringify', () => {
	it('should stringify object', () => {
		expect(stringify({ a: 1, b: 2 })).toBe('?a=1&b=2')
	})

	it('should return empty string for null/undefined', () => {
		expect(stringify(null as any)).toBe('')
		expect(stringify(undefined as any)).toBe('')
	})

	it('should support withoutQuestionMark option', () => {
		expect(stringify({ a: 1 }, { withQuestionMark: false })).toBe('a=1')
	})
})

describe('URL_PATTERNS constant', () => {
	it('should have queryParam pattern', () => {
		expect(URL_PATTERNS.queryParam).toBeInstanceOf(RegExp)
	})

	it('should have origin pattern', () => {
		expect(URL_PATTERNS.origin).toBeInstanceOf(RegExp)
	})

	it('should have host pattern', () => {
		expect(URL_PATTERNS.host).toBeInstanceOf(RegExp)
	})

	it('should have url pattern', () => {
		expect(URL_PATTERNS.url).toBeInstanceOf(RegExp)
	})
})

// ============================================
// Url Class Tests
// ============================================

describe('Url class', () => {
	describe('constructor', () => {
		it('should create instance with URL string', () => {
			const u = new Url('https://example.com?id=123')
			expect(u.toString()).toBe('https://example.com?id=123')
		})

		it('should create empty instance', () => {
			const u = new Url()
			expect(u.toString()).toBe('')
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

		it('should set hash (chainable)', () => {
			const u = new Url('https://example.com')
			const result = u.setHash('section')
			expect(result).toBe(u) // chainable
			expect(u.toString()).toBe('https://example.com#section')
		})

		it('should replace existing hash', () => {
			const u = new Url('https://example.com#old')
			u.setHash('new')
			expect(u.toString()).toBe('https://example.com#new')
		})
	})

	describe('parse & stringify', () => {
		it('should parse query string', () => {
			const u = new Url('https://example.com?a=1&b=true')
			expect(u.parse()).toEqual({ a: '1', b: 'true' })
		})

		it('should parse with covert option', () => {
			const u = new Url('https://example.com?a=1&b=true')
			expect(u.parse({ covert: true })).toEqual({ a: 1, b: true })
		})

		it('should convert to params object', () => {
			const u = new Url('https://example.com?a=1&b=2')
			expect(u.toParams()).toEqual({ a: '1', b: '2' })
		})
	})

	describe('chaining', () => {
		it('should support method chaining', () => {
			const result = new Url('https://api.example.com')
				.path('users', '123')
				.set('fields', 'name')
				.setHash('section')
				.toString()

			expect(result).toBe('https://api.example.com/users/123?fields=name#section')
		})

		it('should support complex chaining', () => {
			const result = new Url('https://example.com?id=1&token=abc')
				.delete('token')
				.append('id', 'backup')
				.set('page', 2)
				.toString()

			// append adds at the end, set modifies/adds parameters
			expect(result).toBe('https://example.com/?id=1&id=backup&page=2')
		})
	})
})

// ============================================
// url Namespace Tests
// ============================================

describe('url namespace', () => {
	describe('url.from factory', () => {
		it('should create Url instance', () => {
			const u = url.from('https://example.com?id=123')
			expect(u).toBeInstanceOf(Url)
			expect(u.get('id')).toBe('123')
		})

		it('should support chaining from factory', () => {
			const result = url.from('https://example.com').set('page', 1).set('size', 10).toString()

			expect(result).toBe('https://example.com/?page=1&size=10')
		})
	})

	describe('static methods', () => {
		it('should have parse method', () => {
			expect(url.parse('?a=1&b=2')).toEqual({ a: '1', b: '2' })
		})

		it('should have stringify method', () => {
			expect(url.stringify({ a: 1, b: 2 })).toBe('?a=1&b=2')
		})

		it('should have get method', () => {
			expect(url.get('id', 'https://example.com?id=123')).toBe('123')
		})

		it('should have getAll method', () => {
			expect(url.getAll('id', 'https://example.com?id=1&id=2')).toEqual(['1', '2'])
		})

		it('should have has method', () => {
			expect(url.has('id', 'https://example.com?id=123')).toBeTruthy()
		})

		it('should have set method', () => {
			expect(url.set('page', 2, 'https://example.com')).toBe('https://example.com/?page=2')
		})

		it('should have append method', () => {
			expect(url.append('id', 2, 'https://example.com?id=1')).toBe(
				'https://example.com/?id=1&id=2'
			)
		})

		it('should have delete method', () => {
			expect(url.delete('token', 'https://example.com?token=abc&id=1')).toBe(
				'https://example.com/?id=1'
			)
		})

		it('should have keys method', () => {
			expect(url.keys('https://example.com?a=1&b=2')).toEqual(['a', 'b'])
		})

		it('should have values method', () => {
			expect(url.values('https://example.com?a=1&b=2')).toEqual(['1', '2'])
		})

		it('should have entries method', () => {
			expect(url.entries('https://example.com?a=1&b=2')).toEqual([
				['a', '1'],
				['b', '2'],
			])
		})

		it('should have URL property extraction methods', () => {
			expect(url.getOrigin('https://example.com:8080/path')).toBe('https://example.com:8080')
			expect(url.getHost('https://example.com:8080/path')).toBe('example.com:8080')
			expect(url.getHostname('https://example.com:8080/path')).toBe('example.com')
			expect(url.getPathname('https://example.com/api/users')).toBe('/api/users')
			expect(url.getSearch('https://example.com?key=value')).toBe('?key=value')
			expect(url.getHash('https://example.com#section')).toBe('#section')
		})
	})

	describe('constants', () => {
		it('should have PATTERNS constant', () => {
			expect(url.PATTERNS).toBe(URL_PATTERNS)
		})

		it('should have VALUE_MAP constant', () => {
			expect(url.VALUE_MAP).toBe(VALUE_MAP)
		})
	})
})

// ============================================
// Alias Export Tests
// ============================================

describe('URL alias exports', () => {
	describe('parseQueryString / stringifyQueryString', () => {
		it('should work as parse/stringify aliases', () => {
			expect(parseQueryString('?a=1&b=2')).toEqual({ a: '1', b: '2' })
			expect(parseQueryString('?a=1&b=true', { covert: true })).toEqual({ a: 1, b: true })
			expect(stringifyQueryString({ a: 1, b: 2 })).toBe('?a=1&b=2')
			expect(stringifyQueryString({ a: 1 }, { withQuestionMark: false })).toBe('a=1')
		})
	})

	describe('getQueryParamValue / getAllQueryParamValues', () => {
		it('should work as get/getAll aliases', () => {
			expect(getQueryParamValue('id', 'https://example.com?id=123')).toBe('123')
			expect(getQueryParamValue('missing', 'https://example.com?id=123')).toBeNull()
			expect(getAllQueryParamValues('id', 'https://example.com?id=1&id=2')).toEqual(['1', '2'])
		})
	})

	describe('hasQueryParam', () => {
		it('should work as has alias', () => {
			expect(hasQueryParam('id', 'https://example.com?id=123')).toBeTruthy()
			expect(hasQueryParam('missing', 'https://example.com?id=123')).toBeFalsy()
		})
	})

	describe('setQueryParam / appendQueryParam', () => {
		it('should work as set/append aliases', () => {
			expect(setQueryParam('page', 2, 'https://example.com')).toBe('https://example.com/?page=2')
			expect(appendQueryParam('id', 2, 'https://example.com?id=1')).toBe('https://example.com/?id=1&id=2')
		})
	})

	describe('deleteQueryParam', () => {
		it('should work as deleteParam alias', () => {
			expect(deleteQueryParam('token', 'https://example.com?token=abc&id=1')).toBe(
				'https://example.com/?id=1'
			)
		})
	})

	describe('getQueryParamKeys / getQueryParamValues / getQueryParamEntries', () => {
		it('should work as keys/values/entries aliases', () => {
			expect(getQueryParamKeys('https://example.com?a=1&b=2')).toEqual(['a', 'b'])
			expect(getQueryParamValues('https://example.com?a=1&b=2')).toEqual(['1', '2'])
			expect(getQueryParamEntries('https://example.com?a=1&b=2')).toEqual([
				['a', '1'],
				['b', '2'],
			])
		})
	})

	describe('URL property extraction aliases', () => {
		it('should work as expected', () => {
			expect(getURLOrigin('https://example.com:8080/path')).toBe('https://example.com:8080')
			expect(getURLHost('https://example.com:8080/path')).toBe('example.com:8080')
			expect(getURLHostname('https://example.com:8080/path')).toBe('example.com')
			expect(getURLPathname('https://example.com/api/users?id=1')).toBe('/api/users')
			expect(getURLSearch('https://example.com?key=value')).toBe('?key=value')
			expect(getURLHash('https://example.com/path#section')).toBe('#section')
		})
	})
})
