/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest'

// Test for fallback paths without URLSearchParams and URL
describe('url/utils fallback paths', () => {
	describe('parse with covert option', () => {
		it('should convert special values with covert option', async () => {
			const { parse } = await import('../src/url/utils')

			const result = parse('?a=true&b=false&c=null&d=undefined&e=Infinity&f=-Infinity', {
				covert: true,
			})

			expect(result.a).toBeTruthy()
			expect(result.b).toBeFalsy()
			expect(result.c).toBeNull()
			expect(result.d).toBeUndefined()
			expect(result.e).toBe(Infinity)
			expect(result.f).toBe(-Infinity)
		})

		it('should convert NaN with covert option', async () => {
			const { parse } = await import('../src/url/utils')

			const result = parse('?a=NaN', { covert: true })
			expect(Number.isNaN(result.a)).toBeTruthy()
		})

		it('should convert numbers with covert option', async () => {
			const { parse } = await import('../src/url/utils')

			const result = parse('?a=123&b=-456&c=3.14', { covert: true })

			expect(result.a).toBe(123)
			expect(result.b).toBe(-456)
			expect(result.c).toBe(3.14)
		})

		it('should handle covert as boolean shorthand', async () => {
			const { parse } = await import('../src/url/utils')

			const result = parse('?a=true&b=123', true)

			expect(result.a).toBeTruthy()
			expect(result.b).toBe(123)
		})

		it('should not convert values without covert option', async () => {
			const { parse } = await import('../src/url/utils')

			const result = parse('?a=true&b=123')

			expect(result.a).toBe('true')
			expect(result.b).toBe('123')
		})

		it('should handle empty query string', async () => {
			const { parse } = await import('../src/url/utils')

			expect(parse('')).toEqual({})
			expect(parse('?')).toEqual({})
		})
	})

	describe('stringify options', () => {
		it('should stringify with encode option', async () => {
			const { stringify } = await import('../src/url/utils')

			const result = stringify({ name: '测试' }, { encode: true })
			expect(result).toContain('name=')
		})

		it('should stringify with covert option', async () => {
			const { stringify } = await import('../src/url/utils')

			const result = stringify({ a: null, b: undefined }, { covert: true })
			expect(result).toBe('?a=&b=')
		})

		it('should handle empty object', async () => {
			const { stringify } = await import('../src/url/utils')

			expect(stringify({})).toBe('?')
		})
	})

	describe('get with URL object', () => {
		it('should work with URL object', async () => {
			const { get } = await import('../src/url/utils')

			const url = new URL('https://example.com?id=123')
			expect(get('id', url)).toBe('123')
		})

		it('should return null for empty name', async () => {
			const { get } = await import('../src/url/utils')

			expect(get('', 'https://example.com?id=123')).toBeNull()
		})
	})

	describe('getAll', () => {
		it('should return empty array for empty name', async () => {
			const { getAll } = await import('../src/url/utils')

			expect(getAll('', 'https://example.com?id=123')).toEqual([])
		})

		it('should work with URL object', async () => {
			const { getAll } = await import('../src/url/utils')

			const url = new URL('https://example.com?id=1&id=2')
			expect(getAll('id', url)).toEqual(['1', '2'])
		})
	})

	describe('has', () => {
		it('should return false for empty name', async () => {
			const { has } = await import('../src/url/utils')

			expect(has('', 'https://example.com?id=123')).toBeFalsy()
		})
	})

	describe('set with relative URLs', () => {
		it('should handle relative URLs without browser context', async () => {
			const { set } = await import('../src/url/utils')

			const result = set('page', 2, '/path?existing=value')
			expect(result).toContain('page=2')
		})

		it('should handle relative URLs with hash', async () => {
			const { set } = await import('../src/url/utils')

			const result = set('page', 2, '/path#section')
			expect(result).toContain('page=2')
			expect(result).toContain('#section')
		})

		it('should return empty string when no url and no location', async () => {
			const { set } = await import('../src/url/utils')

			expect(set('page', 2)).toBe('')
		})

		it('should return url for empty name', async () => {
			const { set } = await import('../src/url/utils')

			expect(set('', 2, 'https://example.com')).toBe('https://example.com')
		})

		it('should handle relative URLs without protocol', async () => {
			const { set } = await import('../src/url/utils')

			// Relative URL without protocol is treated as relative path
			const result = set('page', 2, 'not-a-url')
			expect(result).toContain('page=2')
		})
	})

	describe('append with relative URLs', () => {
		it('should handle relative URLs without browser context', async () => {
			const { append } = await import('../src/url/utils')

			const result = append('id', 2, '/path?id=1')
			expect(result).toContain('id=1')
			expect(result).toContain('id=2')
		})

		it('should return empty string when no url and no location', async () => {
			const { append } = await import('../src/url/utils')

			expect(append('id', 2)).toBe('')
		})

		it('should return url for empty name', async () => {
			const { append } = await import('../src/url/utils')

			expect(append('', 2, 'https://example.com')).toBe('https://example.com')
		})
	})

	describe('deleteParam with relative URLs', () => {
		it('should handle relative URLs without browser context', async () => {
			const { deleteParam } = await import('../src/url/utils')

			const result = deleteParam('token', '/path?token=abc&id=1')
			expect(result).toContain('id=1')
			expect(result).not.toContain('token')
		})

		it('should remove all query params if only param is deleted', async () => {
			const { deleteParam } = await import('../src/url/utils')

			const result = deleteParam('token', '/path?token=abc')
			expect(result).toBe('/path')
		})

		it('should preserve hash when deleting params', async () => {
			const { deleteParam } = await import('../src/url/utils')

			const result = deleteParam('token', '/path?token=abc#section')
			expect(result).toBe('/path#section')
		})

		it('should return empty string when no url and no location', async () => {
			const { deleteParam } = await import('../src/url/utils')

			expect(deleteParam('token')).toBe('')
		})

		it('should return url for empty name', async () => {
			const { deleteParam } = await import('../src/url/utils')

			expect(deleteParam('', 'https://example.com')).toBe('https://example.com')
		})
	})

	describe('keys/values/entries with empty URL', () => {
		it('should return empty arrays for empty URL', async () => {
			const { keys, values, entries } = await import('../src/url/utils')

			expect(keys('')).toEqual([])
			expect(values('')).toEqual([])
			expect(entries('')).toEqual([])
		})

		it('should work with URL object', async () => {
			const { keys, values, entries } = await import('../src/url/utils')

			const url = new URL('https://example.com?a=1&b=2')
			expect(keys(url)).toEqual(['a', 'b'])
			expect(values(url)).toEqual(['1', '2'])
			expect(entries(url)).toEqual([
				['a', '1'],
				['b', '2'],
			])
		})
	})

	describe('getOrigin', () => {
		it('should return empty string for empty URL', async () => {
			const { getOrigin } = await import('../src/url/utils')

			expect(getOrigin('')).toBe('')
		})

		it('should return empty string for relative URL', async () => {
			const { getOrigin } = await import('../src/url/utils')

			expect(getOrigin('/path/to/page')).toBe('')
		})

		it('should handle invalid URLs', async () => {
			const { getOrigin } = await import('../src/url/utils')

			expect(getOrigin('not-a-url')).toBe('')
		})
	})

	describe('getHost', () => {
		it('should return empty string for empty URL', async () => {
			const { getHost } = await import('../src/url/utils')

			expect(getHost('')).toBe('')
		})

		it('should return empty string for relative URL', async () => {
			const { getHost } = await import('../src/url/utils')

			expect(getHost('/path/to/page')).toBe('')
		})
	})

	describe('getHostname', () => {
		it('should return empty string for empty URL', async () => {
			const { getHostname } = await import('../src/url/utils')

			expect(getHostname('')).toBe('')
		})

		it('should strip port from host', async () => {
			const { getHostname } = await import('../src/url/utils')

			expect(getHostname('https://example.com:8080/path')).toBe('example.com')
		})
	})

	describe('getPathname', () => {
		it('should return empty string for empty URL', async () => {
			const { getPathname } = await import('../src/url/utils')

			expect(getPathname('')).toBe('')
		})

		it('should handle relative URLs', async () => {
			const { getPathname } = await import('../src/url/utils')

			expect(getPathname('/api/users?id=1')).toBe('/api/users')
		})

		it('should remove query and hash', async () => {
			const { getPathname } = await import('../src/url/utils')

			expect(getPathname('https://example.com/path?key=value#section')).toBe('/path')
		})
	})

	describe('getSearch', () => {
		it('should return empty string for URL without query', async () => {
			const { getSearch } = await import('../src/url/utils')

			expect(getSearch('https://example.com/path')).toBe('')
		})

		it('should extract query string', async () => {
			const { getSearch } = await import('../src/url/utils')

			expect(getSearch('https://example.com?key=value')).toBe('?key=value')
		})

		it('should extract query before hash', async () => {
			const { getSearch } = await import('../src/url/utils')

			expect(getSearch('https://example.com?key=value#section')).toBe('?key=value')
		})
	})

	describe('getHash', () => {
		it('should return empty string for URL without hash', async () => {
			const { getHash } = await import('../src/url/utils')

			expect(getHash('https://example.com/path')).toBe('')
		})

		it('should extract hash', async () => {
			const { getHash } = await import('../src/url/utils')

			expect(getHash('https://example.com#section')).toBe('#section')
		})

		it('should extract hash with query params', async () => {
			const { getHash } = await import('../src/url/utils')

			expect(getHash('https://example.com?key=value#section')).toBe('#section')
		})

		it('should handle hash with query inside', async () => {
			const { getHash } = await import('../src/url/utils')

			expect(getHash('https://example.com#section?foo=bar')).toBe('#section?foo=bar')
		})
	})

	describe('VALUE_MAP constant', () => {
		it('should have correct values', async () => {
			const { VALUE_MAP } = await import('../src/url/utils')

			expect(VALUE_MAP.true).toBeTruthy()
			expect(VALUE_MAP.false).toBeFalsy()
			expect(VALUE_MAP.null).toBeNull()
			expect(VALUE_MAP.undefined).toBeUndefined()
			expect(VALUE_MAP.Infinity).toBe(Infinity)
			expect(VALUE_MAP['-Infinity']).toBe(-Infinity)
			expect(Number.isNaN(VALUE_MAP.NaN)).toBeTruthy()
		})
	})

	describe('URL_PATTERNS constant', () => {
		it('should have all patterns', async () => {
			const { URL_PATTERNS } = await import('../src/url/utils')

			expect(URL_PATTERNS.queryParam).toBeInstanceOf(RegExp)
			expect(URL_PATTERNS.origin).toBeInstanceOf(RegExp)
			expect(URL_PATTERNS.host).toBeInstanceOf(RegExp)
			expect(URL_PATTERNS.port).toBeInstanceOf(RegExp)
			expect(URL_PATTERNS.url).toBeInstanceOf(RegExp)
			expect(URL_PATTERNS.queryString).toBeInstanceOf(RegExp)
			expect(URL_PATTERNS.hash).toBeInstanceOf(RegExp)
		})
	})
})
