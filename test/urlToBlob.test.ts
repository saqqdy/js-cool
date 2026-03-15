/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, vi } from 'vitest'
import urlToBlob from '../src/urlToBlob'

describe('urlToBlob', () => {
	it('should fetch url and return blob', async () => {
		// Mock fetch to return a Response with blob method
		const mockBlob = new Blob(['test content'], { type: 'text/plain' })

		globalThis.fetch = vi.fn().mockResolvedValue({
			blob: () => Promise.resolve(mockBlob),
		})

		const result = await urlToBlob('https://example.com/image.png')

		expect(result).toBeInstanceOf(Blob)
	})

	it('should handle fetch error', async () => {
		// Override fetch to throw
		globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

		await expect(urlToBlob('https://example.com/error.png')).rejects.toThrow()

		// Restore fetch
		globalThis.fetch = vi.fn().mockResolvedValue({
			blob: () => Promise.resolve(new Blob(['test'])),
		})
	})
})
