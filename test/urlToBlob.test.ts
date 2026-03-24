/**
 * @vitest-environment happy-dom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import urlToBlob from '../src/urlToBlob'

describe('urlToBlob', () => {
	const originalFetch = globalThis.fetch

	beforeEach(() => {
		// Reset fetch mock
		globalThis.fetch = vi.fn().mockResolvedValue({
			blob: () => Promise.resolve(new Blob(['test content'], { type: 'text/plain' })),
		})
	})

	afterEach(() => {
		globalThis.fetch = originalFetch
	})

	describe('with fetch available', () => {
		it('should fetch url and return blob', async () => {
			const mockBlob = new Blob(['test content'], { type: 'text/plain' })

			globalThis.fetch = vi.fn().mockResolvedValue({
				blob: () => Promise.resolve(mockBlob),
			})

			const result = await urlToBlob('https://example.com/image.png')

			expect(result).toBeInstanceOf(Blob)
			expect(globalThis.fetch).toHaveBeenCalledWith('https://example.com/image.png')
		})

		it('should handle fetch error', async () => {
			globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

			await expect(urlToBlob('https://example.com/error.png')).rejects.toThrow(
				'Network error'
			)
		})

		it('should fetch different URLs', async () => {
			const mockBlob = new Blob(['pdf content'], { type: 'application/pdf' })

			globalThis.fetch = vi.fn().mockResolvedValue({
				blob: () => Promise.resolve(mockBlob),
			})

			const result = await urlToBlob('https://example.com/document.pdf')

			expect(result).toBeInstanceOf(Blob)
		})
	})

	describe('without fetch (XHR fallback)', () => {
		it('should use XHR when fetch is not available', async () => {
			// Temporarily remove fetch
			// @ts-expect-error - testing without fetch
			globalThis.fetch = undefined

			// Mock XMLHttpRequest
			const mockXHR = {
				open: vi.fn(),
				send: vi.fn(),
				response: new Blob(['xhr content'], { type: 'text/plain' }),
				status: 200,
				onload: null as (() => void) | null,
				onerror: null as ((error: Error) => void) | null,
			}

			const XHRMock = vi.fn(() => mockXHR)
			vi.stubGlobal('XMLHttpRequest', XHRMock)

			const promise = urlToBlob('https://example.com/xhr-test.png')

			// Simulate successful response
			mockXHR.onload!()

			const result = await promise

			expect(mockXHR.open).toHaveBeenCalledWith(
				'get',
				'https://example.com/xhr-test.png',
				true
			)
			expect(mockXHR.send).toHaveBeenCalled()
			expect(result).toBeInstanceOf(Blob)

			vi.unstubAllGlobals()
			globalThis.fetch = originalFetch
		})

		it('should handle XHR error', async () => {
			// @ts-expect-error - testing without fetch
			globalThis.fetch = undefined

			const mockXHR = {
				open: vi.fn(),
				send: vi.fn(),
				status: 200,
				onload: null as (() => void) | null,
				onerror: null as ((error: Error) => void) | null,
			}

			const XHRMock = vi.fn(() => mockXHR)
			vi.stubGlobal('XMLHttpRequest', XHRMock)

			const promise = urlToBlob('https://example.com/xhr-error.png')

			// Simulate error
			mockXHR.onerror!(new Error('XHR network error'))

			await expect(promise).rejects.toThrow()

			vi.unstubAllGlobals()
			globalThis.fetch = originalFetch
		})

		it('should not resolve for non-200 status', async () => {
			// @ts-expect-error - testing without fetch
			globalThis.fetch = undefined

			const mockXHR = {
				open: vi.fn(),
				send: vi.fn(),
				response: new Blob(['error'], { type: 'text/plain' }),
				status: 404,
				onload: null as (() => void) | null,
				onerror: null as ((error: Error) => void) | null,
			}

			const XHRMock = vi.fn(() => mockXHR)
			vi.stubGlobal('XMLHttpRequest', XHRMock)

			const promise = urlToBlob('https://example.com/not-found.png')

			// Simulate response with 404 status
			mockXHR.onload!()

			// The promise should not resolve (or reject) for non-200 status
			// Wait a bit to ensure no resolution
			const result = await Promise.race([
				promise,
				new Promise<null>(resolve => setTimeout(() => resolve(null), 100)),
			])

			expect(result).toBeNull()

			vi.unstubAllGlobals()
			globalThis.fetch = originalFetch
		})
	})
})
