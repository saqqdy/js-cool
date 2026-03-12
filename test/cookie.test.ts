/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, beforeEach } from 'vitest'
import setCookie from '../src/setCookie'
import getCookie from '../src/getCookie'
import delCookie from '../src/delCookie'
import getCookies from '../src/getCookies'

describe('cookie functions', () => {
	beforeEach(() => {
		document.cookie = ''
	})

	it('should set and get cookie', () => {
		setCookie('test', 'value', 3600)
		expect(getCookie('test')).toBe('value')
	})

	it('should set cookie with default expiration', () => {
		setCookie('test2', 'value2', 86400)
		expect(getCookie('test2')).toBe('value2')
	})

	it('should return null for non-existent cookie', () => {
		expect(getCookie('non-existent')).toBeNull()
	})

	it('should delete cookie', () => {
		setCookie('toDelete', 'value', 3600)
		delCookie('toDelete')
		expect(getCookie('toDelete')).toBeNull()
	})

	it('should get all cookies', () => {
		setCookie('cookie1', 'value1', 3600)
		setCookie('cookie2', 'value2', 3600)

		const cookies = getCookies()

		expect(cookies['cookie1']).toBe('value1')
		expect(cookies['cookie2']).toBe('value2')
	})

	it('should handle string seconds', () => {
		setCookie('test', 'value', '3600')
		expect(getCookie('test')).toBe('value')
	})

	it('should set cookie with custom path', () => {
		setCookie('test', 'value', 3600, '/app')
		expect(getCookie('test')).toBe('value')
	})
})
