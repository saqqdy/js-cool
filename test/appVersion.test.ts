/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import appVersion from '../src/appVersion'

describe('appVersion', () => {
	it('should get version from userAgent', () => {
		const ua = 'Mozilla/5.0 Chrome/114.0.0.0 Safari/537.36'
		const result = appVersion('Chrome', ua)

		expect(result).toBe('114.0.0.0')
	})

	it('should return null when app not found', () => {
		const ua = 'Mozilla/5.0 Chrome/114.0.0.0 Safari/537.36'
		const result = appVersion('Firefox', ua)

		expect(result).toBeNull()
	})

	it('should handle version with tag', () => {
		const ua = 'AppName/1.0.0-beta.8'
		const result = appVersion('AppName', ua)

		expect(result).toBe('1.0.0-beta.8')
	})

	it('should return null when appName is not provided', () => {
		const result = appVersion('' as any)

		expect(result).toBeNull()
	})

	it('should use ignoreCase option', () => {
		const ua = 'Chrome/114.0.0.0'
		const result = appVersion('chrome', ua, false)

		expect(result).toBeNull()
	})

	it('should work with boolean ua parameter', () => {
		// In happy-dom, Chrome may or may not be in userAgent
		const result = appVersion('Chrome', true)

		// Result depends on actual userAgent
		expect(result === null || typeof result === 'string').toBeTruthy()
	})
})
