/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import getAppVersion from '../src/getAppVersion'

describe('getAppVersion', () => {
	it('should get version from userAgent', () => {
		const ua = 'Mozilla/5.0 Chrome/114.0.0.0 Safari/537.36'
		const result = getAppVersion('Chrome', false, ua)

		expect(result).toBe('114.0.0.0')
	})

	it('should return version with app name', () => {
		const ua = 'Mozilla/5.0 Chrome/114.0.0.0 Safari/537.36'
		const result = getAppVersion('Chrome', true, ua)

		expect(result).toBe('Chrome/114.0.0.0')
	})

	it('should return false when app found but no version', () => {
		const ua = 'Mozilla/5.0 Chrome Safari/537.36'
		const result = getAppVersion('Chrome', false, ua)

		expect(result).toBeFalsy()
	})

	it('should return null when app not found', () => {
		const ua = 'Mozilla/5.0 Chrome/114.0.0.0 Safari/537.36'
		const result = getAppVersion('Firefox', false, ua)

		expect(result).toBeNull()
	})
})
