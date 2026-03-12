import { describe, expect, it } from 'vitest'
import getDirParam from '../src/getDirParam'

describe('getDirParam', () => {
	it('should parse URL directory parameters', () => {
		const result = getDirParam('http://192.168.2.243:7004/media/video/test.mp4')
		expect(result.host).toBe('http://192.168.2.243:7004')
		expect(result.path).toEqual(['media', 'video', 'test.mp4'])
	})

	it('should handle URL without path', () => {
		const result = getDirParam('http://example.com')
		expect(result.host).toBe('http://example.com')
		expect(result.path).toEqual([])
	})

	it('should handle HTTPS URLs', () => {
		const result = getDirParam('https://example.com/path/to/file')
		expect(result.host).toBe('https://example.com')
		expect(result.path).toEqual(['path', 'to', 'file'])
	})
})
