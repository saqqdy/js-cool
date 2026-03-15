/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import client from '../src/client'

describe('client', () => {
	it('should return browser info object', () => {
		const result = client()

		expect(result).toHaveProperty('IE')
		expect(result).toHaveProperty('WEBKIT')
		expect(result).toHaveProperty('MOBILE')
		expect(result).toHaveProperty('IOS')
		expect(result).toHaveProperty('ANDROID')
		expect(result).toHaveProperty('WEIXIN')
	})

	it('should check specific browser name', () => {
		const result = client('Chrome', 'Mozilla/5.0 Chrome/100')

		expect(result).toBeTruthy()
	})

	it('should return false for non-matching name', () => {
		const result = client('Firefox', 'Mozilla/5.0 Chrome/100')

		expect(result).toBeFalsy()
	})

	it('should detect IE', () => {
		const result = client('', 'Mozilla/5.0 MSIE 10.0')

		expect(result.IE).toBeTruthy()
	})

	it('should detect Android', () => {
		const result = client('', 'Mozilla/5.0 Android')

		expect(result.ANDROID).toBeTruthy()
	})

	it('should detect iOS', () => {
		const result = client('', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)')

		expect(result.IOS).toBeTruthy()
		expect(result.IPHONE).toBeTruthy()
	})

	it('should detect WeChat', () => {
		const result = client('', 'Mozilla/5.0 MicroMessenger')

		expect(result.WEIXIN).toBeTruthy()
	})
})
