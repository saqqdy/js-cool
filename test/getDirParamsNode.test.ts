/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest'
import getDirParams from '../src/getDirParams'

describe('getDirParams - Node.js environment', () => {
	describe('parseWithRegex fallback', () => {
		it('should parse relative path correctly (no origin)', () => {
			const result = getDirParams('/app/user/profile')

			expect(result.origin).toBe('')
			expect(result.host).toBe('')
			expect(result.hostname).toBe('')
			expect(result.pathname).toBe('/app/user/profile')
			expect(result.segments).toEqual(['app', 'user', 'profile'])
		})

		it('should handle relative path not starting with /', () => {
			const result = getDirParams('path/to/file')

			// should add leading /
			expect(result.pathname).toBe('/path/to/file')
			expect(result.segments).toEqual(['path', 'to', 'file'])
		})

		it('should parse relative path with query', () => {
			const result = getDirParams('/api/users?id=123')

			expect(result.pathname).toBe('/api/users')
			expect(result.query).toBe('id=123')
		})

		it('should parse relative path with hash', () => {
			const result = getDirParams('/page#section')

			expect(result.pathname).toBe('/page')
			expect(result.hash).toBe('section')
		})

		it('should parse relative path with query and hash', () => {
			const result = getDirParams('/api/users?id=123#section')

			expect(result.pathname).toBe('/api/users')
			expect(result.query).toBe('id=123')
			expect(result.hash).toBe('section')
		})

		it('should handle path with only hash', () => {
			const result = getDirParams('/page#section')

			expect(result.pathname).toBe('/page')
			expect(result.hash).toBe('section')
			expect(result.query).toBe('')
		})

		it('should handle root path', () => {
			const result = getDirParams('/')

			expect(result.pathname).toBe('/')
			expect(result.segments).toEqual([])
		})

		it('should handle empty string (return empty result)', () => {
			const result = getDirParams('')

			expect(result.origin).toBe('')
			expect(result.host).toBe('')
			expect(result.hostname).toBe('')
			expect(result.pathname).toBe('')
			expect(result.segments).toEqual([])
			expect(result.query).toBe('')
			expect(result.hash).toBe('')
		})

		it('should handle path with only hash (no pathname)', () => {
			const result = getDirParams('#section')

			// relative path adds /, hash is extracted
			expect(result.pathname).toBe('/')
			expect(result.hash).toBe('section')
		})
	})

	describe('no arguments behavior', () => {
		it('should return empty result (no location)', () => {
			const result = getDirParams()

			expect(result.origin).toBe('')
			expect(result.host).toBe('')
			expect(result.hostname).toBe('')
			expect(result.pathname).toBe('')
			expect(result.segments).toEqual([])
			expect(result.query).toBe('')
			expect(result.hash).toBe('')
		})
	})

	describe('full URL parsing (regex fallback)', () => {
		it('should parse HTTP URL correctly', () => {
			const result = getDirParams('http://example.com/path')

			expect(result.origin).toBe('http://example.com')
			expect(result.host).toBe('example.com')
			expect(result.hostname).toBe('example.com')
			expect(result.pathname).toBe('/path')
		})

		it('should parse URL with port correctly', () => {
			const result = getDirParams('http://192.168.2.243:7004/media/video/test.mp4')

			expect(result.origin).toBe('http://192.168.2.243:7004')
			expect(result.host).toBe('192.168.2.243:7004')
			expect(result.hostname).toBe('192.168.2.243')
			expect(result.pathname).toBe('/media/video/test.mp4')
			expect(result.segments).toEqual(['media', 'video', 'test.mp4'])
		})

		it('should parse HTTPS URL correctly', () => {
			const result = getDirParams('https://example.com/path/to/file')

			expect(result.origin).toBe('https://example.com')
			expect(result.host).toBe('example.com')
			expect(result.hostname).toBe('example.com')
			expect(result.pathname).toBe('/path/to/file')
			expect(result.segments).toEqual(['path', 'to', 'file'])
		})

		it('should parse full URL with query and hash', () => {
			const result = getDirParams('https://example.com:8080/api/v1/users?id=123#section')

			expect(result.origin).toBe('https://example.com:8080')
			expect(result.host).toBe('example.com:8080')
			expect(result.hostname).toBe('example.com')
			expect(result.pathname).toBe('/api/v1/users')
			expect(result.segments).toEqual(['api', 'v1', 'users'])
			expect(result.query).toBe('id=123')
			expect(result.hash).toBe('section')
		})

		it('should parse URL without path', () => {
			const result = getDirParams('http://example.com')

			expect(result.origin).toBe('http://example.com')
			expect(result.host).toBe('example.com')
			expect(result.hostname).toBe('example.com')
			expect(result.pathname).toBe('/')
			expect(result.segments).toEqual([])
		})

		it('should parse root path URL', () => {
			const result = getDirParams('http://example.com/')

			expect(result.pathname).toBe('/')
			expect(result.segments).toEqual([])
		})

		it('should parse root path URL with query', () => {
			const result = getDirParams('http://example.com?id=123')

			expect(result.pathname).toBe('/')
			expect(result.query).toBe('id=123')
		})
	})

	describe('edge cases', () => {
		it('should handle deeply nested paths', () => {
			const result = getDirParams('/a/b/c/d/e/f')

			expect(result.segments).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
		})

		it('should handle consecutive slashes', () => {
			const result = getDirParams('/path//to///file')

			expect(result.pathname).toBe('/path//to///file')
			// split creates empty string elements
			expect(result.segments).toContain('path')
			expect(result.segments).toContain('to')
			expect(result.segments).toContain('file')
		})

		it('should handle special characters in path', () => {
			const result = getDirParams('/path/with%20space/file')

			expect(result.segments).toEqual(['path', 'with%20space', 'file'])
		})

		it('should handle Chinese characters', () => {
			const result = getDirParams('/路径/中文')

			expect(result.segments).toEqual(['路径', '中文'])
		})

		it('should handle complex query string', () => {
			const result = getDirParams('/search?q=test&page=1&size=10&filter=a,b')

			expect(result.query).toBe('q=test&page=1&size=10&filter=a,b')
		})

		it('should handle hash with question mark', () => {
			const result = getDirParams('/page#section?foo=bar')

			expect(result.hash).toBe('section?foo=bar')
		})
	})
})
