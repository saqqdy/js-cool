import { describe, expect, it } from 'vitest'
import {
	BROWSER_PATTERNS,
	DEVICE_PATTERNS,
	ENGINE_PATTERNS,
	ENV_PATTERNS,
	extract,
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

		it('should have extract patterns', () => {
			expect(patterns.extract).toBeDefined()
			expect(patterns.extract.number).toBeInstanceOf(RegExp)
			expect(patterns.extract.version).toBeInstanceOf(RegExp)
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

describe('extract patterns', () => {
	it('should extract numbers', () => {
		expect('Price: $99.99'.match(extract.number)).toEqual(['99.99'])
		expect('Temperature: -5.5°C'.match(extract.number)).toEqual(['-5.5'])
		expect('a1b2c3'.match(extract.number)).toEqual(['1', '2', '3'])
		expect('Range: 10-20'.match(extract.number)).toEqual(['10', '-20'])
	})

	it('should extract versions', () => {
		expect('Chrome/120.0.6099.109'.match(extract.version)).toEqual(['120.0.6099.109'])
		expect('v1.2.3-beta'.match(extract.version)).toEqual(['1.2.3'])
		expect('Node.js v18.17.0'.match(extract.version)).toEqual(['18.17.0'])
	})

	it('should extract integers', () => {
		expect('abc123def456'.match(extract.integer)).toEqual(['123', '456'])
		expect('Temperature: -5 degrees'.match(extract.integer)).toEqual(['-5'])
	})

	it('should extract decimals', () => {
		expect('Price $9.99, Tax 1.50'.match(extract.decimal)).toEqual(['9.99', '1.50'])
		expect('Value: 3.14159'.match(extract.decimal)).toEqual(['3.14159'])
		expect('Integer 5 only'.match(extract.decimal)).toBeNull()
	})

	it('should extract positive integers', () => {
		expect('abc-123def456'.match(extract.positiveInteger)).toEqual(['123', '456'])
		expect('Count: 42 items'.match(extract.positiveInteger)).toEqual(['42'])
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

	// New validation patterns
	it('should match ipv6', () => {
		expect(validation.ipv6.test('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBeTruthy()
		expect(validation.ipv6.test('::1')).toBeTruthy()
		expect(validation.ipv6.test('::')).toBeTruthy()
		expect(validation.ipv6.test('invalid')).toBeFalsy()
	})

	it('should match uuid', () => {
		expect(validation.uuid.test('550e8400-e29b-41d4-a716-446655440000')).toBeTruthy()
		expect(validation.uuid.test('6ba7b810-9dad-11d1-80b4-00c04fd430c8')).toBeTruthy()
		expect(validation.uuid.test('invalid-uuid')).toBeFalsy()
	})

	it('should match semver', () => {
		expect(validation.semver.test('1.2.3')).toBeTruthy()
		expect(validation.semver.test('1.2.3-beta.1')).toBeTruthy()
		expect(validation.semver.test('1.2.3-alpha.1+build.2')).toBeTruthy()
		expect(validation.semver.test('1')).toBeFalsy()
	})

	it('should match base64', () => {
		expect(validation.base64.test('SGVsbG8gV29ybGQ=')).toBeTruthy()
		expect(validation.base64.test('YWJjZA==')).toBeTruthy()
		expect(validation.base64.test('invalid base64!')).toBeFalsy()
	})

	it('should match slug', () => {
		expect(validation.slug.test('hello-world')).toBeTruthy()
		expect(validation.slug.test('hello-world-123')).toBeTruthy()
		expect(validation.slug.test('Hello-World')).toBeFalsy()
		expect(validation.slug.test('hello_world')).toBeFalsy()
	})

	it('should match bankCard', () => {
		expect(validation.bankCard.test('6222021234567890123')).toBeTruthy()
		expect(validation.bankCard.test('6217001234567890')).toBeTruthy()
		expect(validation.bankCard.test('123456789012345')).toBeFalsy() // too short
	})

	it('should match creditCard', () => {
		expect(validation.creditCard.test('4111111111111111')).toBeTruthy() // Visa
		expect(validation.creditCard.test('5500000000000004')).toBeTruthy() // MasterCard
		expect(validation.creditCard.test('378282246310005')).toBeTruthy() // Amex
		expect(validation.creditCard.test('1234567890123456')).toBeFalsy()
	})

	it('should match time', () => {
		expect(validation.time.test('23:59:59')).toBeTruthy()
		expect(validation.time.test('00:00:00')).toBeTruthy()
		expect(validation.time.test('12:30:45')).toBeTruthy()
		expect(validation.time.test('24:00:00')).toBeFalsy()
		expect(validation.time.test('12:60:00')).toBeFalsy()
	})

	it('should match date', () => {
		expect(validation.date.test('2024-01-15')).toBeTruthy()
		expect(validation.date.test('2024-12-31')).toBeTruthy()
		expect(validation.date.test('2024-13-01')).toBeFalsy()
		expect(validation.date.test('2024-01-32')).toBeFalsy()
	})

	it('should match datetime', () => {
		expect(validation.datetime.test('2024-01-15 12:30:00')).toBeTruthy()
		expect(validation.datetime.test('2024-12-31 23:59:59')).toBeTruthy()
		expect(validation.datetime.test('2024-01-15 24:00:00')).toBeFalsy()
	})

	it('should match float correctly', () => {
		expect(validation.float.test('123.45')).toBeTruthy()
		expect(validation.float.test('123')).toBeTruthy()
		expect(validation.float.test('123.')).toBeFalsy() // Fixed bug
		expect(validation.float.test('123.456')).toBeFalsy()
	})

	it('should match username with special char restrictions', () => {
		expect(validation.username.test('user_name')).toBeTruthy()
		expect(validation.username.test('user-name')).toBeTruthy()
		expect(validation.username.test('.username')).toBeFalsy() // Cannot start with .
		expect(validation.username.test('username-')).toBeFalsy() // Cannot end with -
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

	// New browser patterns
	it('should detect Arc', () => {
		const ua =
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36 Arc/1.0.0'
		expect(BROWSER_PATTERNS.arc.test(ua)).toBeTruthy()
	})

	it('should detect Brave', () => {
		const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Brave/1.50.0'
		expect(BROWSER_PATTERNS.brave.test(ua)).toBeTruthy()
	})

	it('should detect Yandex', () => {
		const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 YaBrowser/23.0.0.0'
		expect(BROWSER_PATTERNS.yandex.test(ua)).toBeTruthy()
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

	// New environment patterns
	it('should detect XiaoHongShu', () => {
		const ua = 'Mozilla/5.0 xiaohongshu/8.0.0'
		expect(ENV_PATTERNS.xiaohongshu.test(ua)).toBeTruthy()
	})

	it('should detect Meituan', () => {
		const ua = 'Mozilla/5.0 Meituan/12.0.0'
		expect(ENV_PATTERNS.meituan.test(ua)).toBeTruthy()
	})

	it('should detect Dianping', () => {
		const ua = 'Mozilla/5.0 dianping/10.0.0'
		expect(ENV_PATTERNS.dianping.test(ua)).toBeTruthy()
	})

	it('should detect Taobao', () => {
		const ua = 'Mozilla/5.0 AliApp(TB/10.0.0)'
		expect(ENV_PATTERNS.taobao.test(ua)).toBeTruthy()
	})

	it('should detect Tmall', () => {
		const ua = 'Mozilla/5.0 AliApp(TM/10.0.0)'
		expect(ENV_PATTERNS.tmall.test(ua)).toBeTruthy()
	})

	it('should detect JD', () => {
		const ua = 'Mozilla/5.0 jdapp/12.0.0'
		expect(ENV_PATTERNS.jd.test(ua)).toBeTruthy()
	})

	it('should detect Pinduoduo', () => {
		const ua = 'Mozilla/5.0 pinduoduo/6.0.0'
		expect(ENV_PATTERNS.pinduoduo.test(ua)).toBeTruthy()
	})

	it('should detect mini game', () => {
		const ua = 'Mozilla/5.0 minigame'
		expect(ENV_PATTERNS.miniGame.test(ua)).toBeTruthy()
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
