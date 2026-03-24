/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest'
import getDirParams from '../src/getDirParams'

describe('getDirParams - Node.js environment', () => {
	describe('parseWithRegex fallback', () => {
		it('应该正确解析相对路径（无 origin）', () => {
			const result = getDirParams('/app/user/profile')

			expect(result.origin).toBe('')
			expect(result.host).toBe('')
			expect(result.hostname).toBe('')
			expect(result.pathname).toBe('/app/user/profile')
			expect(result.segments).toEqual(['app', 'user', 'profile'])
		})

		it('应该处理不以 / 开头的相对路径', () => {
			const result = getDirParams('path/to/file')

			// 应该添加前导 /
			expect(result.pathname).toBe('/path/to/file')
			expect(result.segments).toEqual(['path', 'to', 'file'])
		})

		it('应该正确解析带 query 的相对路径', () => {
			const result = getDirParams('/api/users?id=123')

			expect(result.pathname).toBe('/api/users')
			expect(result.query).toBe('id=123')
		})

		it('应该正确解析带 hash 的相对路径', () => {
			const result = getDirParams('/page#section')

			expect(result.pathname).toBe('/page')
			expect(result.hash).toBe('section')
		})

		it('应该正确解析带 query 和 hash 的相对路径', () => {
			const result = getDirParams('/api/users?id=123#section')

			expect(result.pathname).toBe('/api/users')
			expect(result.query).toBe('id=123')
			expect(result.hash).toBe('section')
		})

		it('应该处理只有 hash 的路径', () => {
			const result = getDirParams('/page#section')

			expect(result.pathname).toBe('/page')
			expect(result.hash).toBe('section')
			expect(result.query).toBe('')
		})

		it('应该处理根路径', () => {
			const result = getDirParams('/')

			expect(result.pathname).toBe('/')
			expect(result.segments).toEqual([])
		})

		it('应该处理空字符串（返回空结果）', () => {
			const result = getDirParams('')

			expect(result.origin).toBe('')
			expect(result.host).toBe('')
			expect(result.hostname).toBe('')
			expect(result.pathname).toBe('')
			expect(result.segments).toEqual([])
			expect(result.query).toBe('')
			expect(result.hash).toBe('')
		})

		it('应该处理只有 hash 的路径（无 pathname）', () => {
			const result = getDirParams('#section')

			// 相对路径会添加 /，hash 会被提取
			expect(result.pathname).toBe('/')
			expect(result.hash).toBe('section')
		})
	})

	describe('无参数时的行为', () => {
		it('应该返回空结果（无 location）', () => {
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

	describe('完整 URL 解析（正则降级）', () => {
		it('应该正确解析 HTTP URL', () => {
			const result = getDirParams('http://example.com/path')

			expect(result.origin).toBe('http://example.com')
			expect(result.host).toBe('example.com')
			expect(result.hostname).toBe('example.com')
			expect(result.pathname).toBe('/path')
		})

		it('应该正确解析带端口的 URL', () => {
			const result = getDirParams('http://192.168.2.243:7004/media/video/test.mp4')

			expect(result.origin).toBe('http://192.168.2.243:7004')
			expect(result.host).toBe('192.168.2.243:7004')
			expect(result.hostname).toBe('192.168.2.243')
			expect(result.pathname).toBe('/media/video/test.mp4')
			expect(result.segments).toEqual(['media', 'video', 'test.mp4'])
		})

		it('应该正确解析 HTTPS URL', () => {
			const result = getDirParams('https://example.com/path/to/file')

			expect(result.origin).toBe('https://example.com')
			expect(result.host).toBe('example.com')
			expect(result.hostname).toBe('example.com')
			expect(result.pathname).toBe('/path/to/file')
			expect(result.segments).toEqual(['path', 'to', 'file'])
		})

		it('应该正确解析带 query 和 hash 的完整 URL', () => {
			const result = getDirParams('https://example.com:8080/api/v1/users?id=123#section')

			expect(result.origin).toBe('https://example.com:8080')
			expect(result.host).toBe('example.com:8080')
			expect(result.hostname).toBe('example.com')
			expect(result.pathname).toBe('/api/v1/users')
			expect(result.segments).toEqual(['api', 'v1', 'users'])
			expect(result.query).toBe('id=123')
			expect(result.hash).toBe('section')
		})

		it('应该正确解析无路径的 URL', () => {
			const result = getDirParams('http://example.com')

			expect(result.origin).toBe('http://example.com')
			expect(result.host).toBe('example.com')
			expect(result.hostname).toBe('example.com')
			expect(result.pathname).toBe('/')
			expect(result.segments).toEqual([])
		})

		it('应该正确解析根路径 URL', () => {
			const result = getDirParams('http://example.com/')

			expect(result.pathname).toBe('/')
			expect(result.segments).toEqual([])
		})

		it('应该正确解析带 query 的根路径 URL', () => {
			const result = getDirParams('http://example.com?id=123')

			expect(result.pathname).toBe('/')
			expect(result.query).toBe('id=123')
		})
	})

	describe('边界情况', () => {
		it('应该处理多层嵌套路径', () => {
			const result = getDirParams('/a/b/c/d/e/f')

			expect(result.segments).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
		})

		it('应该处理连续斜杠', () => {
			const result = getDirParams('/path//to///file')

			expect(result.pathname).toBe('/path//to///file')
			// split 会创建空字符串元素
			expect(result.segments).toContain('path')
			expect(result.segments).toContain('to')
			expect(result.segments).toContain('file')
		})

		it('应该处理特殊字符路径', () => {
			const result = getDirParams('/path/with%20space/file')

			expect(result.segments).toEqual(['path', 'with%20space', 'file'])
		})

		it('应该处理中文字符', () => {
			const result = getDirParams('/路径/中文')

			expect(result.segments).toEqual(['路径', '中文'])
		})

		it('应该处理复杂 query string', () => {
			const result = getDirParams('/search?q=test&page=1&size=10&filter=a,b')

			expect(result.query).toBe('q=test&page=1&size=10&filter=a,b')
		})

		it('应该处理带问号的 hash', () => {
			const result = getDirParams('/page#section?foo=bar')

			expect(result.hash).toBe('section?foo=bar')
		})
	})
})
