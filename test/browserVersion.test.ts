/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import browserVersion from '../src/browserVersion'

describe('browserVersion', () => {
	it('should detect Chrome', () => {
		const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/114.0.0.0 Safari/537.36'
		const result = browserVersion(ua)

		expect(result).toEqual({ name: 'Chrome', version: '114.0.0.0' })
	})

	it('should detect Firefox (now correctly identified before IE)', () => {
		// After fix: Firefox is now checked before IE
		// UA with rv: will correctly identify as Firefox
		const ua =
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0'
		const result = browserVersion(ua)

		expect(result).toEqual({ name: 'Firefox', version: '115.0' })
	})

	it('should detect Firefox without rv:', () => {
		const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Gecko/20100101 Firefox/115.0'
		const result = browserVersion(ua)

		expect(result).toEqual({ name: 'Firefox', version: '115.0' })
	})

	it('should detect Safari', () => {
		const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Version/16.5 Safari/605.1.15'
		const result = browserVersion(ua)

		expect(result).toEqual({ name: 'Safari', version: '16.5' })
	})

	it('should detect Edge', () => {
		const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/114.0.1823.58'
		const result = browserVersion(ua)

		expect(result).toEqual({ name: 'Edge', version: '114.0.1823.58' })
	})

	it('should detect Opera', () => {
		const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) OPR/100.0.0.0'
		const result = browserVersion(ua)

		expect(result).toEqual({ name: 'Opera', version: '100.0.0.0' })
	})

	it('should detect WeChat', () => {
		const ua = 'Mozilla/5.0 MicroMessenger/8.0.0'
		const result = browserVersion(ua)

		expect(result).toEqual({ name: 'Wechat', version: '8.0.0' })
	})

	it('should detect QQ', () => {
		const ua = 'Mozilla/5.0 QQ/8.0.0'
		const result = browserVersion(ua)

		expect(result).toEqual({ name: 'QQ', version: '8.0.0' })
	})

	it('should detect UC Browser', () => {
		const ua = 'Mozilla/5.0 UCBrowser/15.0.0'
		const result = browserVersion(ua)

		expect(result).toEqual({ name: 'UC', version: '15.0.0' })
	})

	it('should return null for unknown browser', () => {
		const ua = 'Unknown Browser'
		const result = browserVersion(ua)

		expect(result).toBeNull()
	})

	it('should use navigator.userAgent in browser', () => {
		const result = browserVersion()

		expect(result).toBeDefined()
	})
})
