/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import svgToBlob from '../src/svgToBlob'
import blobToUrl from '../src/blobToUrl'
import blobToBase64 from '../src/blobToBase64'
import blobToArrayBuffer from '../src/blobToArrayBuffer'
import arrayBufferToBlob from '../src/arrayBufferToBlob'

describe('svgToBlob', () => {
	it('should convert svg string to blob', () => {
		const result = svgToBlob('<svg></svg>')

		expect(result).toBeInstanceOf(Blob)
		expect(result.type).toBe('image/svg+xml')
	})
})

describe('blobToUrl', () => {
	it('should convert blob to url', () => {
		const blob = new Blob(['test'], { type: 'text/plain' })
		const result = blobToUrl(blob)

		expect(result).toMatch(/^blob:/)
	})
})

describe('blobToBase64', () => {
	it('should convert blob to base64', async () => {
		const blob = new Blob(['test'], { type: 'text/plain' })
		const result = await blobToBase64(blob)

		expect(result).toContain('data:text/plain;base64,')
	})
})

describe('blobToArrayBuffer', () => {
	it('should convert blob to arrayBuffer', async () => {
		const blob = new Blob(['test'], { type: 'text/plain' })
		const result = await blobToArrayBuffer(blob)

		expect(result).toBeInstanceOf(ArrayBuffer)
	})
})

describe('arrayBufferToBlob', () => {
	it('should convert arrayBuffer to blob', () => {
		const buffer = new ArrayBuffer(10)
		const result = arrayBufferToBlob(buffer)

		expect(result).toBeInstanceOf(Blob)
		expect(result.type).toBe('image/png')
	})

	it('should convert with custom mime', () => {
		const buffer = new ArrayBuffer(10)
		const result = arrayBufferToBlob(buffer, 'image/jpeg')

		expect(result.type).toBe('image/jpeg')
	})
})
