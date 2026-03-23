import { describe, expect, it } from 'vitest'
import getDirParams from '../src/getDirParams'

describe('getDirParams', () => {
	describe('完整 URL', () => {
		it('应该正确解析带端口的 URL', () => {
			const result = getDirParams('http://192.168.2.243:7004/media/video/test.mp4')

			expect(result.origin).toBe('http://192.168.2.243:7004')
			expect(result.host).toBe('192.168.2.243:7004')
			expect(result.hostname).toBe('192.168.2.243')
			expect(result.pathname).toBe('/media/video/test.mp4')
			expect(result.segments).toEqual(['media', 'video', 'test.mp4'])
			expect(result.query).toBe('')
			expect(result.hash).toBe('')
		})

		it('应该正确解析 HTTPS URL', () => {
			const result = getDirParams('https://example.com/path/to/file')

			expect(result.origin).toBe('https://example.com')
			expect(result.host).toBe('example.com')
			expect(result.hostname).toBe('example.com')
			expect(result.pathname).toBe('/path/to/file')
			expect(result.segments).toEqual(['path', 'to', 'file'])
		})

		it('应该正确解析无路径的 URL', () => {
			const result = getDirParams('http://example.com')

			expect(result.origin).toBe('http://example.com')
			expect(result.host).toBe('example.com')
			expect(result.pathname).toBe('/')
			expect(result.segments).toEqual([])
		})
	})

	describe('带查询参数的 URL', () => {
		it('应该正确分离 query string', () => {
			const result = getDirParams('https://example.com/api/v1/users?id=123')

			expect(result.pathname).toBe('/api/v1/users')
			expect(result.segments).toEqual(['api', 'v1', 'users'])
			expect(result.query).toBe('id=123')
		})

		it('应该正确处理多个查询参数', () => {
			const result = getDirParams('https://example.com/search?q=test&page=1&size=10')

			expect(result.pathname).toBe('/search')
			expect(result.query).toBe('q=test&page=1&size=10')
		})

		it('应该正确处理只有 query 的 URL', () => {
			const result = getDirParams('https://example.com?id=123')

			expect(result.pathname).toBe('/')
			expect(result.query).toBe('id=123')
		})
	})

	describe('带 hash 的 URL', () => {
		it('应该正确分离 hash', () => {
			const result = getDirParams('https://example.com/page#section')

			expect(result.pathname).toBe('/page')
			expect(result.hash).toBe('section')
		})

		it('应该正确处理完整 URL（query + hash）', () => {
			const result = getDirParams('https://example.com/api/v1/users?id=123#section')

			expect(result.pathname).toBe('/api/v1/users')
			expect(result.segments).toEqual(['api', 'v1', 'users'])
			expect(result.query).toBe('id=123')
			expect(result.hash).toBe('section')
		})
	})

	describe('相对路径', () => {
		it('应该正确解析相对路径（浏览器环境会基于当前 origin）', () => {
			const result = getDirParams('/app/user/profile')

			// 浏览器环境下会基于当前 origin 解析
			expect(result.pathname).toBe('/app/user/profile')
			expect(result.segments).toEqual(['app', 'user', 'profile'])
		})

		it('应该正确处理带 query 的相对路径', () => {
			const result = getDirParams('/api/users?id=123')

			expect(result.pathname).toBe('/api/users')
			expect(result.query).toBe('id=123')
		})

		it('应该正确处理带 hash 的相对路径', () => {
			const result = getDirParams('/page#section')

			expect(result.pathname).toBe('/page')
			expect(result.hash).toBe('section')
		})
	})

	describe('边界情况', () => {
		it('应该处理空字符串（浏览器环境使用当前页面 URL）', () => {
			const result = getDirParams('')

			// 空字符串会使用当前页面 URL（浏览器环境）
			expect(result.pathname).toBe('/')
			expect(result.segments).toEqual([])
		})

		it('应该处理根路径', () => {
			const result = getDirParams('https://example.com/')

			expect(result.pathname).toBe('/')
			expect(result.segments).toEqual([])
		})

		it('应该正确处理特殊字符路径', () => {
			const result = getDirParams('https://example.com/path/with%20space/file')

			expect(result.segments).toEqual(['path', 'with%20space', 'file'])
		})
	})
})
