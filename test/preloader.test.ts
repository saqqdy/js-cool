/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import preloader from '../src/preloader'

describe('preloader', () => {
	it('should preload single image', () => {
		const result = preloader('https://example.com/image.png')

		expect(result).toBeInstanceOf(HTMLImageElement)
		expect(result.src).toBe('https://example.com/image.png')
	})

	it('should preload multiple images', () => {
		const result = preloader(['https://example.com/1.png', 'https://example.com/2.png'])

		expect(typeof result).toBe('object')
		expect(result['https://example.com/1.png']).toBeInstanceOf(HTMLImageElement)
		expect(result['https://example.com/2.png']).toBeInstanceOf(HTMLImageElement)
	})

	it('should throw error when images is null', () => {
		expect(() => preloader(null as any)).toThrow()
	})

	it('should throw error when images is empty', () => {
		expect(() => preloader('')).toThrow()
	})
})
