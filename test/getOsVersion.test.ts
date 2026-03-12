/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import getOsVersion from '../src/getOsVersion'

describe('getOsVersion', () => {
	it('should get iPhone OS version', () => {
		const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)'
		const result = getOsVersion('iPhone', false, ua)

		expect(result).toBe('13.2.3')
	})

	it('should get iPhone OS version with name', () => {
		const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)'
		const result = getOsVersion('iPhone', true, ua)

		expect(result).toBe('iPhone/13.2.3')
	})

	it('should get iPad OS version', () => {
		const ua = 'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X)'
		const result = getOsVersion('iPad', false, ua)

		expect(result).toBe('13.3')
	})

	it('should get Android version', () => {
		const ua = 'Mozilla/5.0 (Linux; Android 10; SM-G960F)'
		const result = getOsVersion('Android', false, ua)

		expect(result).toBe('10')
	})
})
