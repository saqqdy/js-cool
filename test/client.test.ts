/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
// Test backward compatibility
import client, { ClientDetector } from '../src/client'
import ua, { UADetector, UAParser } from '../src/ua/index'

// Sample user agents for testing
const SAMPLE_UA = {
	chromeWindows:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	chromeMac:
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	firefoxWindows:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
	safariMac:
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
	edgeWindows:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
	ie11: 'Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko',
	iphone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
	ipad: 'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
	androidPhone:
		'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
	androidTablet:
		'Mozilla/5.0 (Linux; Android 14; SM-X900) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	wechat: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.47(0x18002f2c) NetType/WIFI',
	qq: 'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 QQ/8.9.58.8700',
	qqBrowser:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 QQBrowser/13.5.0',
	alipay: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AlipayClient/10.5.26',
	weibo: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Weibo (iPhone8,2__os17.2__iphone__TrackId_)',
	harmonyOS:
		'Mozilla/5.0 (Linux; HarmonyOS 4.0.0; NOH-AN00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
	opera: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0',
	samsung:
		'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36',
	uc: 'Mozilla/5.0 (Linux; U; Android 14; en-US; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/100.0.4896.58 UCBrowser/15.5.6.1197 Mobile Safari/537.36',
}

describe('ua', () => {
	describe('basic functionality', () => {
		it('should return ua info object', () => {
			const result = ua()

			expect(result).toHaveProperty('device')
			expect(result).toHaveProperty('os')
			expect(result).toHaveProperty('browser')
			expect(result).toHaveProperty('environment')
			expect(result).toHaveProperty('userAgent')
		})

		it('should have info property', () => {
			expect(ua.info).toHaveProperty('device')
			expect(ua.info).toHaveProperty('os')
			expect(ua.info).toHaveProperty('browser')
		})

		it('should cache results', () => {
			const result1 = ua()
			const result2 = ua()
			expect(result1).toBe(result2)
		})
	})

	describe('device detection', () => {
		it('should detect iPhone', () => {
			const detector = new UADetector(SAMPLE_UA.iphone)
			expect(detector.device.iphone).toBeTruthy()
			expect(detector.device.mobile).toBeTruthy()
			expect(detector.device.phone).toBeTruthy()
			expect(detector.isiOS()).toBeTruthy()
			expect(detector.isMobile()).toBeTruthy()
		})

		it('should detect iPad', () => {
			const detector = new UADetector(SAMPLE_UA.ipad)
			expect(detector.device.ipad).toBeTruthy()
			expect(detector.device.tablet).toBeTruthy()
			expect(detector.isiPadOS()).toBeTruthy()
			expect(detector.isTablet()).toBeTruthy()
		})

		it('should detect Android phone', () => {
			const detector = new UADetector(SAMPLE_UA.androidPhone)
			expect(detector.device.androidPhone).toBeTruthy()
			expect(detector.device.mobile).toBeTruthy()
			expect(detector.isAndroid()).toBeTruthy()
		})

		it('should detect Android tablet', () => {
			const detector = new UADetector(SAMPLE_UA.androidTablet)
			expect(detector.device.androidTablet).toBeTruthy()
			expect(detector.device.tablet).toBeTruthy()
			expect(detector.isAndroid()).toBeTruthy()
		})

		it('should detect desktop', () => {
			const detector = new UADetector(SAMPLE_UA.chromeWindows)
			expect(detector.device.desktop).toBeTruthy()
			expect(detector.device.mobile).toBeFalsy()
			expect(detector.isDesktop()).toBeTruthy()
		})
	})

	describe('OS detection', () => {
		it('should detect Windows', () => {
			const detector = new UADetector(SAMPLE_UA.chromeWindows)
			expect(detector.os.name).toBe('Windows')
			expect(detector.os.version).toBe('10')
		})

		it('should detect macOS', () => {
			const detector = new UADetector(SAMPLE_UA.safariMac)
			expect(detector.os.name).toBe('macOS')
			expect(detector.os.version).toBe('10.15.7')
		})

		it('should detect iOS', () => {
			const detector = new UADetector(SAMPLE_UA.iphone)
			expect(detector.os.name).toBe('iOS')
			expect(detector.os.version).toBe('17.2')
		})

		it('should detect iPadOS', () => {
			const detector = new UADetector(SAMPLE_UA.ipad)
			expect(detector.os.name).toBe('iPadOS')
		})

		it('should detect Android', () => {
			const detector = new UADetector(SAMPLE_UA.androidPhone)
			expect(detector.os.name).toBe('Android')
			expect(detector.os.version).toBe('14')
		})

		it('should detect HarmonyOS', () => {
			const detector = new UADetector(SAMPLE_UA.harmonyOS)
			expect(detector.os.name).toBe('HarmonyOS')
			expect(detector.os.version).toBe('4.0.0')
			expect(detector.isHarmonyOS()).toBeTruthy()
		})
	})

	describe('browser detection', () => {
		it('should detect Chrome', () => {
			const detector = new UADetector(SAMPLE_UA.chromeWindows)
			expect(detector.browser.name).toBe('Chrome')
			expect(detector.browser.version).toMatch(/^120\.0/)
			expect(detector.browser.engine).toBe('Blink')
		})

		it('should detect Firefox', () => {
			const detector = new UADetector(SAMPLE_UA.firefoxWindows)
			expect(detector.browser.name).toBe('Firefox')
			expect(detector.browser.version).toBe('121.0')
			expect(detector.browser.engine).toBe('Gecko')
		})

		it('should detect Safari', () => {
			const detector = new UADetector(SAMPLE_UA.safariMac)
			expect(detector.browser.name).toBe('Safari')
			expect(detector.browser.version).toBe('17.2')
			expect(detector.browser.engine).toBe('WebKit')
		})

		it('should detect Edge', () => {
			const detector = new UADetector(SAMPLE_UA.edgeWindows)
			expect(detector.browser.name).toBe('Edge')
			expect(detector.browser.version).toMatch(/^120\.0/)
			expect(detector.browser.engine).toBe('Blink')
		})

		it('should detect IE', () => {
			const detector = new UADetector(SAMPLE_UA.ie11)
			expect(detector.browser.name).toBe('IE')
			expect(detector.browser.engine).toBe('Trident')
		})

		it('should detect Opera', () => {
			const detector = new UADetector(SAMPLE_UA.opera)
			expect(detector.browser.name).toBe('Opera')
			expect(detector.browser.engine).toBe('Blink')
		})

		it('should detect Samsung Browser', () => {
			const detector = new UADetector(SAMPLE_UA.samsung)
			expect(detector.browser.name).toBe('Samsung')
		})

		it('should detect UC Browser', () => {
			const detector = new UADetector(SAMPLE_UA.uc)
			expect(detector.browser.name).toBe('UC')
		})
	})

	describe('environment detection', () => {
		it('should detect WeChat', () => {
			const detector = new UADetector(SAMPLE_UA.wechat)
			expect(detector.environment.wechat).toBeTruthy()
			expect(detector.isWeChat()).toBeTruthy()
		})

		it('should detect QQ', () => {
			const detector = new UADetector(SAMPLE_UA.qq)
			expect(detector.environment.qq).toBeTruthy()
			expect(detector.isQQ()).toBeTruthy()
		})

		it('should detect QQ Browser', () => {
			const detector = new UADetector(SAMPLE_UA.qqBrowser)
			expect(detector.environment.qqBrowser).toBeTruthy()
		})

		it('should detect Alipay', () => {
			const detector = new UADetector(SAMPLE_UA.alipay)
			expect(detector.environment.alipay).toBeTruthy()
		})

		it('should detect Weibo', () => {
			const detector = new UADetector(SAMPLE_UA.weibo)
			expect(detector.environment.weibo).toBeTruthy()
		})
	})

	describe('get methods', () => {
		it('should get device info', () => {
			const detector = new UADetector(SAMPLE_UA.iphone)
			const device = detector.get('device')
			expect(device.type).toBe('mobile')
			expect(device.mobile).toBeTruthy()
		})

		it('should get OS info', () => {
			const detector = new UADetector(SAMPLE_UA.iphone)
			const os = detector.get('os')
			expect(os.name).toBe('iOS')
		})

		it('should get browser info', () => {
			const detector = new UADetector(SAMPLE_UA.chromeWindows)
			const browser = detector.get('browser')
			expect(browser.name).toBe('Chrome')
		})

		it('should get engine info', () => {
			const detector = new UADetector(SAMPLE_UA.chromeWindows)
			const engine = detector.get('engine')
			expect(engine.name).toBe('Blink')
		})

		it('should get environment info', () => {
			const detector = new UADetector(SAMPLE_UA.wechat)
			const env = detector.get('environment')
			expect(env.wechat).toBeTruthy()
		})

		it('should get multiple info types', () => {
			const detector = new UADetector(SAMPLE_UA.iphone)
			const result = detector.getMultiple(['device', 'os', 'browser'])
			expect(result.device).toBeDefined()
			expect(result.os).toBeDefined()
			expect(result.browser).toBeDefined()
		})
	})

	describe('has method', () => {
		it('should check if name exists in UA', () => {
			const detector = new UADetector(SAMPLE_UA.chromeWindows)
			expect(detector.has('Chrome')).toBeTruthy()
			expect(detector.has('Firefox')).toBeFalsy()
		})

		it('should be case insensitive', () => {
			const detector = new UADetector(SAMPLE_UA.chromeWindows)
			expect(detector.has('chrome')).toBeTruthy()
			expect(detector.has('CHROME')).toBeTruthy()
		})
	})

	describe('utility methods', () => {
		it('should get network info', () => {
			const network = ua.getNetwork()
			expect(network).toHaveProperty('online')
			expect(network).toHaveProperty('type')
			expect(network).toHaveProperty('effectiveType')
		})

		it('should get screen info', () => {
			const screen = ua.getScreen()
			expect(screen).toHaveProperty('width')
			expect(screen).toHaveProperty('height')
			expect(screen).toHaveProperty('pixelRatio')
			expect(screen).toHaveProperty('orientation')
		})

		it('should get language', () => {
			const lang = ua.getLanguage()
			expect(typeof lang).toBe('string')
		})

		it('should get orientation status', () => {
			const orientation = ua.getOrientationStatus()
			expect(['portrait', 'landscape']).toContain(orientation)
		})
	})

	describe('legacy API', () => {
		it('should return legacy format', () => {
			const detector = new UADetector(SAMPLE_UA.iphone)
			const legacy = detector.legacy()

			expect(legacy).toHaveProperty('ANDROID')
			expect(legacy).toHaveProperty('GECKO')
			expect(legacy).toHaveProperty('IE')
			expect(legacy).toHaveProperty('IOS')
			expect(legacy).toHaveProperty('IPAD')
			expect(legacy).toHaveProperty('IPHONE')
			expect(legacy).toHaveProperty('MOBILE')
			expect(legacy).toHaveProperty('OPERA')
			expect(legacy).toHaveProperty('QQ')
			expect(legacy).toHaveProperty('QQBROWSER')
			expect(legacy).toHaveProperty('TRIDENT')
			expect(legacy).toHaveProperty('WEBKIT')
			expect(legacy).toHaveProperty('WEIXIN')

			// Verify boolean types
			expect(typeof legacy.IOS).toBe('boolean')
			expect(typeof legacy.MOBILE).toBe('boolean')
			expect(legacy.IOS).toBeTruthy()
			expect(legacy.MOBILE).toBeTruthy()
		})

		it('should detect WeChat in legacy format', () => {
			const detector = new UADetector(SAMPLE_UA.wechat)
			const legacy = detector.legacy()
			expect(legacy.WEIXIN).toBeTruthy()
		})

		it('should detect Android in legacy format', () => {
			const detector = new UADetector(SAMPLE_UA.androidPhone)
			const legacy = detector.legacy()
			expect(legacy.ANDROID).toBeTruthy()
		})
	})

	describe('singleton methods', () => {
		it('should work with singleton isMobile', () => {
			const detector = new UADetector(SAMPLE_UA.iphone)
			expect(detector.isMobile()).toBeTruthy()
		})

		it('should work with singleton isWeChat', () => {
			const detector = new UADetector(SAMPLE_UA.wechat)
			expect(detector.isWeChat()).toBeTruthy()
		})

		it('ua function should use default detector', () => {
			expect(typeof ua.isMobile()).toBe('boolean')
			expect(typeof ua.isWeChat()).toBe('boolean')
		})
	})

	describe('UAParser alias', () => {
		it('UAParser should be an alias for UADetector', () => {
			expect(UAParser).toBe(UADetector)
			const detector = new UAParser(SAMPLE_UA.iphone)
			expect(detector.isiOS()).toBeTruthy()
		})
	})
})

describe('client (backward compatibility)', () => {
	it('should work as an alias for ua', () => {
		expect(client.info).toEqual(ua.info)
		expect(client.isMobile()).toBe(ua.isMobile())
		expect(client.isWeChat()).toBe(ua.isWeChat())
	})

	it('ClientDetector should be an alias for UADetector', () => {
		expect(ClientDetector).toBe(UADetector)
		const detector = new ClientDetector(SAMPLE_UA.iphone)
		expect(detector.isiOS()).toBeTruthy()
	})

	it('should support old API style', () => {
		const detector = new ClientDetector(SAMPLE_UA.wechat)
		expect(detector.isWeChat()).toBeTruthy()
		expect(detector.legacy().WEIXIN).toBeTruthy()
	})
})
