import { describe, expect, it } from 'vitest'
import {
	BROWSER_PATTERNS,
	DEVICE_PATTERNS,
	ENGINE_PATTERNS,
	ENV_PATTERNS,
	extractVersion,
	matchPattern,
	OS_PATTERNS,
	patterns,
	validation,
} from '../src/patterns'

describe('patterns', () => {
	describe('patterns object structure', () => {
		it('should have validation patterns', () => {
			expect(patterns.validation).toBeDefined()
			expect(patterns.validation.email).toBeInstanceOf(RegExp)
		})

		it('should have ua patterns', () => {
			expect(patterns.ua).toBeDefined()
			expect(patterns.ua.device).toBeDefined()
			expect(patterns.ua.browser).toBeDefined()
			expect(patterns.ua.os).toBeDefined()
			expect(patterns.ua.engine).toBeDefined()
			expect(patterns.ua.env).toBeDefined()
		})

		it('should have utility functions', () => {
			expect(typeof patterns.ua.getUserAgent).toBe('function')
			expect(typeof patterns.ua.matchPattern).toBe('function')
			expect(typeof patterns.ua.extractVersion).toBe('function')
		})
	})
})

describe('validation patterns', () => {
	it('should match email', () => {
		expect(validation.email.test('user@example.com')).toBeTruthy()
		expect(validation.email.test('test.user@domain.co')).toBeTruthy()
		expect(validation.email.test('invalid')).toBeFalsy()
	})

	it('should match mobile (Chinese)', () => {
		expect(validation.mobile.test('13812345678')).toBeTruthy()
		expect(validation.mobile.test('15812345678')).toBeTruthy()
		expect(validation.mobile.test('19812345678')).toBeTruthy()
		expect(validation.mobile.test('12812345678')).toBeFalsy()
	})

	it('should match url', () => {
		expect(validation.url.test('https://example.com')).toBeTruthy()
		expect(validation.url.test('http://test.org/path')).toBeTruthy()
		expect(validation.url.test('example.com')).toBeTruthy()
	})

	it('should match number', () => {
		expect(validation.number.test('123')).toBeTruthy()
		expect(validation.number.test('-123.45')).toBeTruthy()
		expect(validation.number.test('+0.5')).toBeTruthy()
		expect(validation.number.test('abc')).toBeFalsy()
	})

	it('should match chinese characters', () => {
		expect(validation.chinese.test('中')).toBeTruthy()
		expect(validation.chinese.test('a')).toBeFalsy()
	})

	it('should match ipv4', () => {
		expect(validation.ipv4.test('192.168.1.1')).toBeTruthy()
		expect(validation.ipv4.test('0.0.0.0')).toBeTruthy()
		expect(validation.ipv4.test('255.255.255.255')).toBeTruthy()
		expect(validation.ipv4.test('256.1.1.1')).toBeFalsy()
	})

	it('should match ipv4Private', () => {
		expect(validation.ipv4Private.test('192.168.1.1')).toBeTruthy()
		expect(validation.ipv4Private.test('10.0.0.1')).toBeTruthy()
		expect(validation.ipv4Private.test('172.16.0.1')).toBeTruthy()
		expect(validation.ipv4Private.test('8.8.8.8')).toBeFalsy()
	})

	it('should match mac address', () => {
		expect(validation.mac.test('00:1A:2B:3C:4D:5E')).toBeTruthy()
		expect(validation.mac.test('00-1A-2B-3C-4D-5E')).toBeTruthy()
		expect(validation.mac.test('invalid')).toBeFalsy()
	})

	it('should match hex color', () => {
		expect(validation.hexColor.test('#fff')).toBeTruthy()
		expect(validation.hexColor.test('#FFFFFF')).toBeTruthy()
		expect(validation.hexColor.test('#abc123')).toBeTruthy()
		expect(validation.hexColor.test('red')).toBeFalsy()
	})

	it('should match idCard (Chinese)', () => {
		expect(validation.idCard.test('11010519491231002X')).toBeTruthy()
		expect(validation.idCard.test('11010519491231002x')).toBeTruthy()
		expect(validation.idCard.test('123456900101001')).toBeTruthy()
		expect(validation.idCard.test('invalid')).toBeFalsy()
	})

	it('should match qq number', () => {
		expect(validation.qq.test('12345678')).toBeTruthy()
		expect(validation.qq.test('12345')).toBeTruthy()
		expect(validation.qq.test('1234')).toBeFalsy()
		expect(validation.qq.test('0123456')).toBeFalsy()
	})

	it('should match password', () => {
		expect(validation.password.test('abc123')).toBeTruthy()
		expect(validation.password.test('password1')).toBeTruthy()
		expect(validation.password.test('abcdef')).toBeFalsy()
		expect(validation.password.test('123456')).toBeFalsy()
	})

	it('should match postcode (Chinese)', () => {
		expect(validation.postcode.test('100000')).toBeTruthy()
		expect(validation.postcode.test('12345')).toBeFalsy()
	})

	it('should match username', () => {
		expect(validation.username.test('user_name')).toBeTruthy()
		expect(validation.username.test('user-name')).toBeTruthy()
		expect(validation.username.test('user.name')).toBeTruthy()
		expect(validation.username.test('ab')).toBeFalsy()
	})

	it('should match json string', () => {
		expect(validation.json.test('{"key":"value"}')).toBeTruthy()
		expect(validation.json.test('not json')).toBeFalsy()
	})

	it('should match array json string', () => {
		expect(validation.arrjson.test('[{"key":"value"}]')).toBeTruthy()
		expect(validation.arrjson.test('{}')).toBeFalsy()
	})

	it('should match telephone', () => {
		expect(validation.tel.test('010-12345678')).toBeTruthy()
		expect(validation.tel.test('021-87654321')).toBeTruthy()
		expect(validation.tel.test('12345678')).toBeTruthy()
	})
})

describe('UA device patterns', () => {
	it('should detect mobile devices', () => {
		const mobileUA =
			'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
		expect(DEVICE_PATTERNS.mobile.test(mobileUA)).toBeTruthy()
		expect(DEVICE_PATTERNS.iphone.test(mobileUA)).toBeTruthy()
	})

	it('should detect tablet devices', () => {
		const tabletUA = 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
		expect(DEVICE_PATTERNS.tablet.test(tabletUA)).toBeTruthy()
		expect(DEVICE_PATTERNS.ipad.test(tabletUA)).toBeTruthy()
	})

	it('should detect android phone', () => {
		const androidUA =
			'Mozilla/5.0 (Linux; Android 10; SM-G960F) AppleWebKit/537.36 Chrome/91.0.4472.120 Mobile Safari/537.36'
		expect(DEVICE_PATTERNS.mobile.test(androidUA)).toBeTruthy()
		expect(DEVICE_PATTERNS.androidPhone.test(androidUA)).toBeTruthy()
	})
})

describe('UA OS patterns', () => {
	it('should detect Windows', () => {
		const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
		expect(OS_PATTERNS.windows.test(ua)).toBeTruthy()
	})

	it('should detect macOS', () => {
		const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
		expect(OS_PATTERNS.macOS.test(ua)).toBeTruthy()
	})

	it('should detect iOS', () => {
		const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
		expect(OS_PATTERNS.iOS.test(ua)).toBeTruthy()
	})

	it('should detect Android', () => {
		const ua = 'Mozilla/5.0 (Linux; Android 10; SM-G960F) AppleWebKit/537.36'
		expect(OS_PATTERNS.android.test(ua)).toBeTruthy()
	})

	it('should detect HarmonyOS', () => {
		const ua = 'Mozilla/5.0 (Linux; HarmonyOS/4.0.0; NOH-AN00) AppleWebKit/537.36'
		expect(OS_PATTERNS.harmonyOS.test(ua)).toBeTruthy()
	})
})

describe('UA browser patterns', () => {
	it('should detect Chrome', () => {
		const ua =
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36'
		expect(BROWSER_PATTERNS.chrome.test(ua)).toBeTruthy()
	})

	it('should detect Firefox', () => {
		const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0'
		expect(BROWSER_PATTERNS.firefox.test(ua)).toBeTruthy()
	})

	it('should detect Safari', () => {
		const ua =
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/14.1.1 Safari/605.1.15'
		expect(BROWSER_PATTERNS.safari.test(ua)).toBeTruthy()
	})

	it('should detect Edge', () => {
		const ua =
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59'
		expect(BROWSER_PATTERNS.edge.test(ua)).toBeTruthy()
	})
})

describe('UA engine patterns', () => {
	it('should detect Blink engine', () => {
		const ua = 'Mozilla/5.0 Chrome/91.0.4472.124'
		expect(ENGINE_PATTERNS.blink.test(ua)).toBeTruthy()
	})

	it('should detect Gecko engine', () => {
		const ua = 'Mozilla/5.0 Firefox/89.0'
		expect(ENGINE_PATTERNS.gecko.test(ua)).toBeTruthy()
	})

	it('should detect WebKit engine', () => {
		const ua = 'Mozilla/5.0 AppleWebKit/605.1.15'
		expect(ENGINE_PATTERNS.webkit.test(ua)).toBeTruthy()
	})
})

describe('UA environment patterns', () => {
	it('should detect WeChat', () => {
		const ua = 'Mozilla/5.0 MicroMessenger/8.0.0'
		expect(ENV_PATTERNS.wechat.test(ua)).toBeTruthy()
	})

	it('should detect QQ', () => {
		const ua = 'Mozilla/5.0 QQ/8.5.0'
		expect(ENV_PATTERNS.qq.test(ua)).toBeTruthy()
	})

	it('should detect Alipay', () => {
		const ua = 'Mozilla/5.0 AlipayClient/10.2.0'
		expect(ENV_PATTERNS.alipay.test(ua)).toBeTruthy()
	})

	it('should detect DingTalk', () => {
		const ua = 'Mozilla/5.0 DingTalk/6.0.0'
		expect(ENV_PATTERNS.dingtalk.test(ua)).toBeTruthy()
	})

	it('should detect mini program', () => {
		const ua = 'Mozilla/5.0 miniprogram'
		expect(ENV_PATTERNS.miniProgram.test(ua)).toBeTruthy()
	})
})

describe('utility functions', () => {
	it('matchPattern should work correctly', () => {
		expect(matchPattern('Chrome/91.0', /Chrome/i)).toBeTruthy()
		expect(matchPattern('Firefox/89.0', /Chrome/i)).toBeFalsy()
	})

	it('extractVersion should extract version correctly', () => {
		expect(extractVersion('Chrome/91.0.4472.124', /Chrome\/(\d+\.?\d*)/i)).toBe('91.0')
		expect(extractVersion('Firefox/89.0', /Firefox\/(\d+\.?\d*)/i)).toBe('89.0')
		expect(extractVersion('No version', /Chrome\/(\d+\.?\d*)/i)).toBe('')
	})

	it('extractVersion should handle underscores in iOS versions', () => {
		expect(extractVersion('iPhone OS 14_0', /iPhone OS (\d+[._]\d+)/i)).toBe('14.0')
	})
})
