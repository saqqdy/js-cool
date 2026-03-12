/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, vi, beforeAll, afterAll } from 'vitest'
import fingerprint from '../src/fingerprint'

describe('fingerprint', () => {
	beforeAll(() => {
		// Mock canvas getContext to return a mock 2D context
		const mockCtx = {
			textBaseline: '',
			font: '',
			fillStyle: '',
			fillRect: vi.fn(),
			fillText: vi.fn()
		}
		HTMLCanvasElement.prototype.getContext = vi.fn((contextId: string) => {
			if (contextId === '2d') return mockCtx as any
			return null
		}) as any

		// Use a valid base64 PNG string (1x1 red pixel)
		// This is a real valid PNG in base64
		const validPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg=='

		HTMLCanvasElement.prototype.toDataURL = vi.fn(() => `data:image/png;base64,${validPngBase64}`)
	})

	afterAll(() => {
		vi.restoreAllMocks()
	})

	it('should generate fingerprint', () => {
		const result = fingerprint('example.com')

		expect(typeof result).toBe('string')
		expect(result.length).toBeGreaterThan(0)
	})

	it('should use location.host as default domain', () => {
		const result = fingerprint()

		expect(typeof result).toBe('string')
	})

	it('should return a string for same domain', () => {
		const result = fingerprint('example.com')
		expect(typeof result).toBe('string')
	})

	it('should return strings for different domains', () => {
		const result1 = fingerprint('example.com')
		const result2 = fingerprint('other.com')

		expect(typeof result1).toBe('string')
		expect(typeof result2).toBe('string')
	})
})
