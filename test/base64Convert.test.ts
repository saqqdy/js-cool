/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import base64ToArrayBuffer from '../src/base64ToArrayBuffer'
import base64ToBlob from '../src/base64ToBlob'
import base64ToFile from '../src/base64ToFile'
import fileToBase64 from '../src/fileToBase64'

describe('base64ToBlob', () => {
	it('should convert base64 to blob', () => {
		const base64 = 'data:text/plain;base64,SGVsbG8gV29ybGQ='
		const result = base64ToBlob(base64)

		expect(result).toBeInstanceOf(Blob)
		expect(result.type).toBe('text/plain')
	})

	it('should convert base64 without mime type', () => {
		// Test with just base64 data (no prefix)
		const result = base64ToBlob('SGVsbG8gV29ybGQ=')

		expect(result).toBeInstanceOf(Blob)
	})
})

describe('base64ToFile', () => {
	it('should convert base64 to file', () => {
		const base64 = 'data:text/plain;base64,SGVsbG8gV29ybGQ='
		const result = base64ToFile(base64, 'test.txt')

		expect(result).toBeInstanceOf(File)
		expect(result.name).toBe('test.txt')
		expect(result.type).toBe('text/plain')
	})

	it('should convert base64 without mime type', () => {
		const result = base64ToFile('SGVsbG8gV29ybGQ=', 'test.txt')

		expect(result).toBeInstanceOf(File)
		expect(result.name).toBe('test.txt')
	})
})

describe('base64ToArrayBuffer', () => {
	it('should convert base64 to arrayBuffer', () => {
		const base64 = 'data:text/plain;base64,SGVsbG8gV29ybGQ='
		const result = base64ToArrayBuffer(base64)

		expect(result).toBeInstanceOf(Uint8Array)
	})

	it('should convert base64 without prefix', () => {
		const result = base64ToArrayBuffer('SGVsbG8gV29ybGQ=')

		expect(result).toBeInstanceOf(Uint8Array)
	})

	it('should throw for empty string', () => {
		expect(() => base64ToArrayBuffer('')).toThrow()
	})
})

describe('fileToBase64', () => {
	it('should convert file to base64', async () => {
		const file = new File(['test content'], 'test.txt', { type: 'text/plain' })
		const result = await fileToBase64(file)

		expect(result).toContain('data:text/plain;base64,')
	})
})
