/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, vi } from 'vitest'
import isNumberBrowser from '../src/isNumberBrowser'

describe('isNumberBrowser', () => {
	it('should detect 360 browser by userAgent (360se)', () => {
		const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) 360SE/114.0.0.0 Safari/537.36'
		const result = isNumberBrowser(ua)

		expect(result).toBe(true)
	})

	it('should detect 360 browser by userAgent (360ee)', () => {
		const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) 360EE/114.0.0.0 Safari/537.36'
		const result = isNumberBrowser(ua)

		expect(result).toBe(true)
	})

	it('should detect 360 browser by WOW64', () => {
		const ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) Safari/537.36'
		const result = isNumberBrowser(ua)

		expect(result).toBe(true)
	})

	it('should return false for non-360 browser', () => {
		const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/114.0.0.0 Safari/537.36'
		const result = isNumberBrowser(ua)

		expect(result).toBe(false)
	})

	it('should use navigator.userAgent when no ua provided', () => {
		const result = isNumberBrowser()
		expect(typeof result).toBe('boolean')
	})
})
