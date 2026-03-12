/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import arrayBufferToBase64 from '../src/arrayBufferToBase64'

describe('arrayBufferToBase64', () => {
	it('should convert arrayBuffer to base64', () => {
		const buffer = new TextEncoder().encode('Hello World').buffer
		const result = arrayBufferToBase64(buffer)

		expect(result).toBe('SGVsbG8gV29ybGQ=')
	})

	it('should convert arrayBuffer to base64 with mime type', () => {
		const buffer = new TextEncoder().encode('Hello World').buffer
		const result = arrayBufferToBase64(buffer, 'image/png')

		expect(result).toBe('data:image/png;base64,SGVsbG8gV29ybGQ=')
	})
})
