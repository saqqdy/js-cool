/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import osVersion from '../src/osVersion'

describe('osVersion', () => {
	it('should detect Windows 10', () => {
		const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/114.0.0.0'
		const result = osVersion(ua)

		expect(result?.name).toBe('Windows')
		expect(result?.version).toBe('10.0')
	})

	it('should detect Windows XP', () => {
		const ua = 'Mozilla/5.0 (Windows NT 5.1; Win64; x64) Chrome/114.0.0.0'
		const result = osVersion(ua)

		expect(result).toEqual({ name: 'Windows', version: 'XP' })
	})

	it('should detect MacOS', () => {
		const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/114.0.0.0'
		const result = osVersion(ua)

		expect(result).toEqual({ name: 'MacOS', version: '10.15.7' })
	})

	it('should detect iOS', () => {
		const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)'
		const result = osVersion(ua)

		expect(result).toEqual({ name: 'iOS', version: '13.2.3' })
	})

	it('should detect Android', () => {
		const ua = 'Mozilla/5.0 (Linux; Android 10; SM-G960F)'
		const result = osVersion(ua)

		expect(result).toEqual({ name: 'Android', version: '10' })
	})

	it('should return null for unknown OS', () => {
		const ua = 'Mozilla/5.0 (Unknown)'
		const result = osVersion(ua)

		expect(result).toBeNull()
	})

	it('should use navigator.userAgent in browser', () => {
		const result = osVersion()
		expect(result).toBeDefined()
	})
})
