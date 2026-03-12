import { describe, expect, it } from 'vitest'
import pattern from '../src/pattern'

describe('pattern', () => {
	it('should match any string', () => {
		expect(pattern.any.test('hello')).toBe(true)
		expect(pattern.any.test('')).toBe(false)
	})

	it('should match number string', () => {
		expect(pattern.number.test('123')).toBe(true)
		expect(pattern.number.test('-123.45')).toBe(true)
		expect(pattern.number.test('abc')).toBe(false)
	})

	it('should match email', () => {
		expect(pattern.email.test('test@example.com')).toBe(true)
		expect(pattern.email.test('invalid')).toBe(false)
	})

	it('should match url', () => {
		expect(pattern.url.test('https://example.com')).toBe(true)
		expect(pattern.url.test('example.com')).toBe(true)
	})

	it('should match mobile', () => {
		expect(pattern.mobile.test('13812345678')).toBe(true)
		expect(pattern.mobile.test('12812345678')).toBe(false)
	})

	it('should match postcode', () => {
		expect(pattern.postcode.test('100000')).toBe(true)
		expect(pattern.postcode.test('12345')).toBe(false)
	})

	it('should match chinese characters', () => {
		expect(pattern.chinese.test('测')).toBe(true)
		expect(pattern.chinese.test('a')).toBe(false)
	})

	it('should match username', () => {
		expect(pattern.username.test('user_name')).toBe(true)
		expect(pattern.username.test('ab')).toBe(false)
	})

	it('should match json string', () => {
		expect(pattern.json.test('{"key":"value"}')).toBe(true)
		expect(pattern.json.test('not json')).toBe(false)
	})

	it('should match array json string', () => {
		expect(pattern.arrjson.test('[{"key":"value"}]')).toBe(true)
		expect(pattern.arrjson.test('{}')).toBe(false)
	})

	it('should match mac address', () => {
		expect(pattern.mac.test('00:1A:2B:3C:4D:5E')).toBe(true)
		expect(pattern.mac.test('invalid')).toBe(false)
	})

	it('should match ipv4 address', () => {
		expect(pattern.ip4.test('192.168.1.1')).toBe(true)
		expect(pattern.ip4.test('256.1.1.1')).toBe(false)
	})

	it('should match float', () => {
		expect(pattern.float.test('123.45')).toBe(true)
		expect(pattern.float.test('abc')).toBe(false)
	})

	it('should match qq', () => {
		expect(pattern.qq.test('12345678')).toBe(true)
		expect(pattern.qq.test('1234')).toBe(false)
	})
})
