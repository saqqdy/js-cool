import { describe, expect, it } from 'vitest'
import getDirParams from '../src/getDirParams'

describe('getDirParams', () => {
	describe('full URL', () => {
		it('should parse URL with port correctly', () => {
			const result = getDirParams('http://192.168.2.243:7004/media/video/test.mp4')

			expect(result.origin).toBe('http://192.168.2.243:7004')
			expect(result.host).toBe('192.168.2.243:7004')
			expect(result.hostname).toBe('192.168.2.243')
			expect(result.pathname).toBe('/media/video/test.mp4')
			expect(result.segments).toEqual(['media', 'video', 'test.mp4'])
			expect(result.query).toBe('')
			expect(result.hash).toBe('')
		})

		it('should parse HTTPS URL correctly', () => {
			const result = getDirParams('https://example.com/path/to/file')

			expect(result.origin).toBe('https://example.com')
			expect(result.host).toBe('example.com')
			expect(result.hostname).toBe('example.com')
			expect(result.pathname).toBe('/path/to/file')
			expect(result.segments).toEqual(['path', 'to', 'file'])
		})

		it('should parse URL without path', () => {
			const result = getDirParams('http://example.com')

			expect(result.origin).toBe('http://example.com')
			expect(result.host).toBe('example.com')
			expect(result.pathname).toBe('/')
			expect(result.segments).toEqual([])
		})
	})

	describe('URL with query params', () => {
		it('should separate query string correctly', () => {
			const result = getDirParams('https://example.com/api/v1/users?id=123')

			expect(result.pathname).toBe('/api/v1/users')
			expect(result.segments).toEqual(['api', 'v1', 'users'])
			expect(result.query).toBe('id=123')
		})

		it('should handle multiple query params', () => {
			const result = getDirParams('https://example.com/search?q=test&page=1&size=10')

			expect(result.pathname).toBe('/search')
			expect(result.query).toBe('q=test&page=1&size=10')
		})

		it('should handle URL with only query', () => {
			const result = getDirParams('https://example.com?id=123')

			expect(result.pathname).toBe('/')
			expect(result.query).toBe('id=123')
		})
	})

	describe('URL with hash', () => {
		it('should separate hash correctly', () => {
			const result = getDirParams('https://example.com/page#section')

			expect(result.pathname).toBe('/page')
			expect(result.hash).toBe('section')
		})

		it('should handle full URL (query + hash)', () => {
			const result = getDirParams('https://example.com/api/v1/users?id=123#section')

			expect(result.pathname).toBe('/api/v1/users')
			expect(result.segments).toEqual(['api', 'v1', 'users'])
			expect(result.query).toBe('id=123')
			expect(result.hash).toBe('section')
		})
	})

	describe('relative path', () => {
		it('should parse relative path correctly (browser env uses current origin)', () => {
			const result = getDirParams('/app/user/profile')

			// browser env parses based on current origin
			expect(result.pathname).toBe('/app/user/profile')
			expect(result.segments).toEqual(['app', 'user', 'profile'])
		})

		it('should handle relative path with query', () => {
			const result = getDirParams('/api/users?id=123')

			expect(result.pathname).toBe('/api/users')
			expect(result.query).toBe('id=123')
		})

		it('should handle relative path with hash', () => {
			const result = getDirParams('/page#section')

			expect(result.pathname).toBe('/page')
			expect(result.hash).toBe('section')
		})
	})

	describe('edge cases', () => {
		it('should handle empty string (browser env uses current page URL)', () => {
			const result = getDirParams('')

			// empty string uses current page URL (browser env)
			expect(result.pathname).toBe('/')
			expect(result.segments).toEqual([])
		})

		it('should handle root path', () => {
			const result = getDirParams('https://example.com/')

			expect(result.pathname).toBe('/')
			expect(result.segments).toEqual([])
		})

		it('should handle special characters in path', () => {
			const result = getDirParams('https://example.com/path/with%20space/file')

			expect(result.segments).toEqual(['path', 'with%20space', 'file'])
		})
	})
})
