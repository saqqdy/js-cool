import { describe, expect, it } from 'vitest'
import pattern from '../src/pattern'

describe('pattern', () => {
	it('should match any string', () => {
		expect(pattern.any.test('hello')).toBeTruthy()
		expect(pattern.any.test('')).toBeFalsy()
	})

	it('should match number string', () => {
		expect(pattern.number.test('123')).toBeTruthy()
		expect(pattern.number.test('-123.45')).toBeTruthy()
		expect(pattern.number.test('abc')).toBeFalsy()
	})

	it('should match email', () => {
		expect(pattern.email.test('test@example.com')).toBeTruthy()
		expect(pattern.email.test('invalid')).toBeFalsy()
	})

	it('should match url', () => {
		expect(pattern.url.test('https://example.com')).toBeTruthy()
		expect(pattern.url.test('example.com')).toBeTruthy()
	})

	it('should match mobile', () => {
		expect(pattern.mobile.test('13812345678')).toBeTruthy()
		expect(pattern.mobile.test('12812345678')).toBeFalsy()
	})

	it('should match postcode', () => {
		expect(pattern.postcode.test('100000')).toBeTruthy()
		expect(pattern.postcode.test('12345')).toBeFalsy()
	})

	it('should match chinese characters', () => {
		expect(pattern.chinese.test('测')).toBeTruthy()
		expect(pattern.chinese.test('a')).toBeFalsy()
	})

	it('should match username', () => {
		expect(pattern.username.test('user_name')).toBeTruthy()
		expect(pattern.username.test('ab')).toBeFalsy()
	})

	it('should match json string', () => {
		expect(pattern.json.test('{"key":"value"}')).toBeTruthy()
		expect(pattern.json.test('not json')).toBeFalsy()
	})

	it('should match array json string', () => {
		expect(pattern.arrjson.test('[{"key":"value"}]')).toBeTruthy()
		expect(pattern.arrjson.test('{}')).toBeFalsy()
	})

	it('should match mac address', () => {
		expect(pattern.mac.test('00:1A:2B:3C:4D:5E')).toBeTruthy()
		expect(pattern.mac.test('invalid')).toBeFalsy()
	})

	it('should match ipv4 address', () => {
		expect(pattern.ip4.test('192.168.1.1')).toBeTruthy()
		expect(pattern.ip4.test('256.1.1.1')).toBeFalsy()
	})

	it('should match float', () => {
		expect(pattern.float.test('123.45')).toBeTruthy()
		expect(pattern.float.test('abc')).toBeFalsy()
	})

	it('should match qq', () => {
		expect(pattern.qq.test('12345678')).toBeTruthy()
		expect(pattern.qq.test('1234')).toBeFalsy()
	})
})
