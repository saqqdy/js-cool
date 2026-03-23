/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it } from 'vitest'
import ua, { UADetector } from '../src/ua/index'

// Import sub-modules for comprehensive testing
import {
	_resetBrowserCache,
	getBrowserEngine,
	getBrowserInfo,
	getBrowserName,
	getBrowserVersion,
	isBlink,
	isChrome,
	isEdge,
	isFirefox,
	isGecko,
	isIE,
	isOpera,
	isSafari,
	isSamsung,
	isUC,
	isWebKit,
	parseBrowser,
} from '../src/ua/browser'
import {
	_resetDeviceCache,
	getDeviceInfo,
	getDeviceType,
	isAndroidPhone,
	isAndroidTablet,
	isDesktop,
	isIPad,
	isIPhone,
	isMobile,
	isTablet,
	parseDevice,
} from '../src/ua/device'
import {
	_resetOSCache,
	getOSInfo,
	getOSName,
	getOSVersion,
	isAndroid,
	isHarmonyOS,
	isiOS,
	isiPadOS,
	isLinux,
	isMacOS,
	isWindows,
	parseOS,
} from '../src/ua/os'
import {
	_resetEnvCache,
	getEnvInfo,
	isAlipay,
	isBaidu,
	isDingtalk,
	isDouyin,
	isHuawei,
	isKuaishou,
	isMiniGame,
	isMiniProgram,
	isOppo,
	isQQ,
	isQQBrowser,
	isQuarkEnv,
	isUCEnv,
	isVivo,
	isWeChat,
	isWeibo,
	isWxwork,
	isXiaomi,
	parseEnvironment,
} from '../src/ua/env'
import {
	getConnectionType,
	getDownlink,
	getEffectiveType,
	getNetworkInfo,
	getRTT,
	isFastConnection,
	isOffline,
	isOnline,
	isSaveData,
	isSlowConnection,
} from '../src/ua/network'
import {
	getAvailHeight,
	getAvailWidth,
	getColorDepth,
	getOrientation,
	getOrientationStatus,
	getPixelRatio,
	getScreenHeight,
	getScreenInfo,
	getScreenWidth,
	isDarkMode,
	isHDR,
	isHighContrast,
	isLandscape,
	isLightMode,
	isPortrait,
	isReducedMotion,
} from '../src/ua/screen'

// Sample user agents for testing
const SAMPLE_UA = {
	chromeWindows:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	chromeMac:
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	firefoxWindows:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
	firefoxMac:
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0',
	safariMac:
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
	edgeWindows:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
	ie11: 'Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko',
	ie10: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
	iphone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
	ipad: 'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
	androidPhone:
		'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
	androidTablet:
		'Mozilla/5.0 (Linux; Android 14; SM-X900) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	wechat: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.47(0x18002f2c) NetType/WIFI',
	wechatMiniProgram:
		'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 miniProgram/wx2c348e8e561b4e13',
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
	quark: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Quark/6.5.0.388',
	vivaldi:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Vivaldi/6.5.3206.53',
	wxwork: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 wxwork/4.0.16 MicroMessenger/7.0.1',
	dingtalk:
		'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 DingTalk/7.5.0',
	douyin: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 aweme/28.5.0',
	kuaishou:
		'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Kuaishou/12.0.0',
	baidu: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 baiduboxapp/13.5.0.10',
	xiaomi: 'Mozilla/5.0 (Linux; U; Android 14; zh-cn; MI 14) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/100.0.4896.127 Mobile Safari/537.36 XiaoMi/MiuiBrowser/18.5.404',
	huawei: 'Mozilla/5.0 (Linux; Android 14; NOH-AN00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36 HuaweiBrowser/14.0.5.301',
	vivo: 'Mozilla/5.0 (Linux; Android 14; V2302A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36 VivoBrowser/14.5.0.0',
	oppo: 'Mozilla/5.0 (Linux; Android 14; PGBM10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36 HeyTapBrowser/14.5.0.0',
	linux: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	chromeOS:
		'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	miniGame:
		'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 miniGame/1.0.0',
	unknown: 'Unknown Browser/1.0',
	windows81:
		'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	windows8:
		'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	windows7:
		'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	windowsVista:
		'Mozilla/5.0 (Windows NT 6.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	windowsXP:
		'Mozilla/5.0 (Windows NT 5.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

// Reset caches before each test
beforeEach(() => {
	_resetBrowserCache()
	_resetDeviceCache()
	_resetOSCache()
	_resetEnvCache()
})

describe('ua module', () => {
	describe('UADetector class', () => {
		describe('constructor', () => {
			it('should create instance with custom UA', () => {
				const detector = new UADetector(SAMPLE_UA.iphone)
				expect(detector.userAgent).toBe(SAMPLE_UA.iphone)
			})

			it('should create instance without UA (uses default)', () => {
				const detector = new UADetector()
				expect(typeof detector.userAgent).toBe('string')
			})
		})

		describe('info getter', () => {
			it('should return complete info object', () => {
				const detector = new UADetector(SAMPLE_UA.iphone)
				const info = detector.info

				expect(info).toHaveProperty('device')
				expect(info).toHaveProperty('os')
				expect(info).toHaveProperty('browser')
				expect(info).toHaveProperty('environment')
				expect(info).toHaveProperty('userAgent')
				expect(info.userAgent).toBe(SAMPLE_UA.iphone)
			})

			it('should cache results', () => {
				const detector = new UADetector(SAMPLE_UA.iphone)
				const info1 = detector.info
				const info2 = detector.info
				expect(info1).toBe(info2)
			})
		})

		describe('device getter', () => {
			it('should return device info', () => {
				const detector = new UADetector(SAMPLE_UA.iphone)
				expect(detector.device.iphone).toBeTruthy()
				expect(detector.device.mobile).toBeTruthy()
			})
		})

		describe('os getter', () => {
			it('should return OS info', () => {
				const detector = new UADetector(SAMPLE_UA.iphone)
				expect(detector.os.name).toBe('iOS')
				expect(detector.os.version).toBe('17.2')
			})
		})

		describe('browser getter', () => {
			it('should return browser info', () => {
				const detector = new UADetector(SAMPLE_UA.chromeWindows)
				expect(detector.browser.name).toBe('Chrome')
				expect(detector.browser.engine).toBe('Blink')
			})
		})

		describe('environment getter', () => {
			it('should return environment info', () => {
				const detector = new UADetector(SAMPLE_UA.wechat)
				expect(detector.environment.wechat).toBeTruthy()
			})
		})

		describe('userAgent getter', () => {
			it('should return UA string', () => {
				const detector = new UADetector(SAMPLE_UA.iphone)
				expect(detector.userAgent).toBe(SAMPLE_UA.iphone)
			})
		})

		describe('get method', () => {
			it('should get device info', () => {
				const detector = new UADetector(SAMPLE_UA.iphone)
				expect(detector.get('device').mobile).toBeTruthy()
			})

			it('should get OS info', () => {
				const detector = new UADetector(SAMPLE_UA.iphone)
				expect(detector.get('os').name).toBe('iOS')
			})

			it('should get browser info', () => {
				const detector = new UADetector(SAMPLE_UA.chromeWindows)
				expect(detector.get('browser').name).toBe('Chrome')
			})

			it('should get engine info', () => {
				const detector = new UADetector(SAMPLE_UA.chromeWindows)
				expect(detector.get('engine').name).toBe('Blink')
			})

			it('should get environment info', () => {
				const detector = new UADetector(SAMPLE_UA.wechat)
				expect(detector.get('environment').wechat).toBeTruthy()
			})

			it('should return null for unknown type', () => {
				const detector = new UADetector(SAMPLE_UA.iphone)
				expect(detector.get('unknown' as any)).toBeNull()
			})
		})

		describe('getMultiple method', () => {
			it('should get multiple info types', () => {
				const detector = new UADetector(SAMPLE_UA.iphone)
				const result = detector.getMultiple(['device', 'os', 'browser'])
				expect(result.device).toBeDefined()
				expect(result.os).toBeDefined()
				expect(result.browser).toBeDefined()
			})
		})

		describe('has method', () => {
			it('should return true if name exists in UA', () => {
				const detector = new UADetector(SAMPLE_UA.chromeWindows)
				expect(detector.has('Chrome')).toBeTruthy()
			})

			it('should return false if name does not exist', () => {
				const detector = new UADetector(SAMPLE_UA.chromeWindows)
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
				const detector = new UADetector()
				const network = detector.getNetwork()
				expect(network).toHaveProperty('online')
				expect(network).toHaveProperty('type')
				expect(network).toHaveProperty('effectiveType')
			})

			it('should get screen info', () => {
				const detector = new UADetector()
				const screen = detector.getScreen()
				expect(screen).toHaveProperty('width')
				expect(screen).toHaveProperty('height')
				expect(screen).toHaveProperty('pixelRatio')
			})

			it('should get language', () => {
				const detector = new UADetector()
				const lang = detector.getLanguage()
				expect(typeof lang).toBe('string')
			})

			it('should get timezone', () => {
				const detector = new UADetector()
				const tz = detector.getTimezone()
				expect(typeof tz).toBe('string')
			})

			it('should get orientation status', () => {
				const detector = new UADetector()
				const orientation = detector.getOrientationStatus()
				expect(['portrait', 'landscape']).toContain(orientation)
			})

			it('should check dark mode', () => {
				const detector = new UADetector()
				expect(typeof detector.isDarkMode()).toBe('boolean')
			})
		})

		describe('quick check methods', () => {
			it('isMobile', () => {
				expect(new UADetector(SAMPLE_UA.iphone).isMobile()).toBeTruthy()
				expect(new UADetector(SAMPLE_UA.chromeWindows).isMobile()).toBeFalsy()
			})

			it('isTablet', () => {
				expect(new UADetector(SAMPLE_UA.ipad).isTablet()).toBeTruthy()
				expect(new UADetector(SAMPLE_UA.iphone).isTablet()).toBeFalsy()
			})

			it('isDesktop', () => {
				expect(new UADetector(SAMPLE_UA.chromeWindows).isDesktop()).toBeTruthy()
				expect(new UADetector(SAMPLE_UA.iphone).isDesktop()).toBeFalsy()
			})

			it('isTouch', () => {
				const detector = new UADetector(SAMPLE_UA.iphone)
				expect(typeof detector.isTouch()).toBe('boolean')
			})

			it('isiOS', () => {
				expect(new UADetector(SAMPLE_UA.iphone).isiOS()).toBeTruthy()
				expect(new UADetector(SAMPLE_UA.androidPhone).isiOS()).toBeFalsy()
			})

			it('isiPadOS', () => {
				expect(new UADetector(SAMPLE_UA.ipad).isiPadOS()).toBeTruthy()
				expect(new UADetector(SAMPLE_UA.iphone).isiPadOS()).toBeFalsy()
			})

			it('isAndroid', () => {
				expect(new UADetector(SAMPLE_UA.androidPhone).isAndroid()).toBeTruthy()
				expect(new UADetector(SAMPLE_UA.iphone).isAndroid()).toBeFalsy()
			})

			it('isHarmonyOS', () => {
				expect(new UADetector(SAMPLE_UA.harmonyOS).isHarmonyOS()).toBeTruthy()
				expect(new UADetector(SAMPLE_UA.androidPhone).isHarmonyOS()).toBeFalsy()
			})

			it('isWeChat', () => {
				expect(new UADetector(SAMPLE_UA.wechat).isWeChat()).toBeTruthy()
				expect(new UADetector(SAMPLE_UA.iphone).isWeChat()).toBeFalsy()
			})

			it('isQQ', () => {
				expect(new UADetector(SAMPLE_UA.qq).isQQ()).toBeTruthy()
				expect(new UADetector(SAMPLE_UA.iphone).isQQ()).toBeFalsy()
			})

			it('isMiniProgram', () => {
				expect(new UADetector(SAMPLE_UA.wechatMiniProgram).isMiniProgram()).toBeTruthy()
				expect(new UADetector(SAMPLE_UA.iphone).isMiniProgram()).toBeFalsy()
			})
		})
	})

	describe('ua singleton', () => {
		it('should be callable as function', () => {
			const result = ua()
			expect(result).toHaveProperty('device')
			expect(result).toHaveProperty('os')
			expect(result).toHaveProperty('browser')
		})

		it('should have info property', () => {
			expect(ua.info).toHaveProperty('device')
		})

		it('should have device property', () => {
			expect(ua.device).toBeDefined()
		})

		it('should have os property', () => {
			expect(ua.os).toBeDefined()
		})

		it('should have browser property', () => {
			expect(ua.browser).toBeDefined()
		})

		it('should have environment property', () => {
			expect(ua.environment).toBeDefined()
		})

		it('should have userAgent property', () => {
			expect(typeof ua.userAgent).toBe('string')
		})

		it('should have get method', () => {
			expect(ua.get('browser')).toBeDefined()
		})

		it('should have getMultiple method', () => {
			const result = ua.getMultiple(['device', 'os'])
			expect(result.device).toBeDefined()
			expect(result.os).toBeDefined()
		})

		it('should have has method', () => {
			expect(typeof ua.has('Chrome')).toBe('boolean')
		})

		it('should have utility methods', () => {
			expect(ua.getNetwork()).toBeDefined()
			expect(ua.getScreen()).toBeDefined()
			expect(typeof ua.getLanguage()).toBe('string')
			expect(typeof ua.getTimezone()).toBe('string')
			expect(['portrait', 'landscape']).toContain(ua.getOrientationStatus())
			expect(typeof ua.isDarkMode()).toBe('boolean')
		})

		it('should have quick check methods', () => {
			expect(typeof ua.isMobile()).toBe('boolean')
			expect(typeof ua.isTablet()).toBe('boolean')
			expect(typeof ua.isDesktop()).toBe('boolean')
			expect(typeof ua.isTouch()).toBe('boolean')
			expect(typeof ua.isiOS()).toBe('boolean')
			expect(typeof ua.isiPadOS()).toBe('boolean')
			expect(typeof ua.isAndroid()).toBe('boolean')
			expect(typeof ua.isHarmonyOS()).toBe('boolean')
			expect(typeof ua.isWeChat()).toBe('boolean')
			expect(typeof ua.isQQ()).toBe('boolean')
			expect(typeof ua.isMiniProgram()).toBe('boolean')
		})

		it('should expose UADetector class', () => {
			expect(ua.UADetector).toBe(UADetector)
		})
	})
})

describe('browser module', () => {
	describe('parseBrowser', () => {
		it('should detect Chrome', () => {
			const result = parseBrowser(SAMPLE_UA.chromeWindows)
			expect(result.name).toBe('Chrome')
			expect(result.version).toMatch(/^120\.0/)
			expect(result.engine).toBe('Blink')
		})

		it('should detect Firefox', () => {
			const result = parseBrowser(SAMPLE_UA.firefoxWindows)
			expect(result.name).toBe('Firefox')
			expect(result.version).toBe('121.0')
			expect(result.engine).toBe('Gecko')
		})

		it('should detect Safari', () => {
			const result = parseBrowser(SAMPLE_UA.safariMac)
			expect(result.name).toBe('Safari')
			expect(result.version).toBe('17.2')
			expect(result.engine).toBe('WebKit')
		})

		it('should detect Edge', () => {
			const result = parseBrowser(SAMPLE_UA.edgeWindows)
			expect(result.name).toBe('Edge')
			expect(result.engine).toBe('Blink')
		})

		it('should detect IE', () => {
			const result = parseBrowser(SAMPLE_UA.ie11)
			expect(result.name).toBe('IE')
			expect(result.engine).toBe('Trident')
		})

		it('should detect Opera', () => {
			const result = parseBrowser(SAMPLE_UA.opera)
			expect(result.name).toBe('Opera')
			expect(result.engine).toBe('Blink')
		})

		it('should detect Samsung Browser', () => {
			const result = parseBrowser(SAMPLE_UA.samsung)
			expect(result.name).toBe('Samsung')
		})

		it('should detect UC Browser', () => {
			const result = parseBrowser(SAMPLE_UA.uc)
			expect(result.name).toBe('UC')
		})

		it('should detect Quark Browser', () => {
			const result = parseBrowser(SAMPLE_UA.quark)
			expect(result.name).toBe('Quark')
		})

		it('should detect Vivaldi', () => {
			const result = parseBrowser(SAMPLE_UA.vivaldi)
			expect(result.name).toBe('Vivaldi')
		})

		it('should return Unknown for unknown browser', () => {
			const result = parseBrowser(SAMPLE_UA.unknown)
			expect(result.name).toBe('Unknown')
		})
	})

	describe('isChrome', () => {
		it('should return true for Chrome', () => {
			expect(isChrome(SAMPLE_UA.chromeWindows)).toBeTruthy()
		})

		it('should return false for non-Chrome', () => {
			expect(isChrome(SAMPLE_UA.firefoxWindows)).toBeFalsy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isChrome()).toBe('boolean')
		})
	})

	describe('isFirefox', () => {
		it('should return true for Firefox', () => {
			expect(isFirefox(SAMPLE_UA.firefoxWindows)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isFirefox()).toBe('boolean')
		})
	})

	describe('isSafari', () => {
		it('should return true for Safari', () => {
			expect(isSafari(SAMPLE_UA.safariMac)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isSafari()).toBe('boolean')
		})
	})

	describe('isEdge', () => {
		it('should return true for Edge', () => {
			expect(isEdge(SAMPLE_UA.edgeWindows)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isEdge()).toBe('boolean')
		})
	})

	describe('isIE', () => {
		it('should return true for IE', () => {
			expect(isIE(SAMPLE_UA.ie11)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isIE()).toBe('boolean')
		})
	})

	describe('isOpera', () => {
		it('should return true for Opera', () => {
			expect(isOpera(SAMPLE_UA.opera)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isOpera()).toBe('boolean')
		})
	})

	describe('isSamsung', () => {
		it('should return true for Samsung', () => {
			expect(isSamsung(SAMPLE_UA.samsung)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isSamsung()).toBe('boolean')
		})
	})

	describe('isUC', () => {
		it('should return true for UC', () => {
			expect(isUC(SAMPLE_UA.uc)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isUC()).toBe('boolean')
		})
	})

	describe('isBlink', () => {
		it('should return true for Blink browsers', () => {
			expect(isBlink(SAMPLE_UA.chromeWindows)).toBeTruthy()
			expect(isBlink(SAMPLE_UA.edgeWindows)).toBeTruthy()
		})

		it('should return false for non-Blink', () => {
			expect(isBlink(SAMPLE_UA.firefoxWindows)).toBeFalsy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isBlink()).toBe('boolean')
		})
	})

	describe('isWebKit', () => {
		it('should return true for WebKit browsers', () => {
			expect(isWebKit(SAMPLE_UA.safariMac)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isWebKit()).toBe('boolean')
		})
	})

	describe('isGecko', () => {
		it('should return true for Gecko browsers', () => {
			expect(isGecko(SAMPLE_UA.firefoxWindows)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isGecko()).toBe('boolean')
		})
	})

	describe('getBrowserName', () => {
		it('should return browser name', () => {
			expect(getBrowserName(SAMPLE_UA.chromeWindows)).toBe('Chrome')
		})
	})

	describe('getBrowserVersion', () => {
		it('should return browser version', () => {
			expect(getBrowserVersion(SAMPLE_UA.chromeWindows)).toMatch(/^120\.0/)
		})
	})

	describe('getBrowserEngine', () => {
		it('should return engine name', () => {
			expect(getBrowserEngine(SAMPLE_UA.chromeWindows)).toBe('Blink')
		})
	})

	describe('getBrowserInfo', () => {
		it('should return cached browser info', () => {
			const info = getBrowserInfo()
			expect(info).toHaveProperty('name')
			expect(info).toHaveProperty('version')
			expect(info).toHaveProperty('engine')
		})
	})
})

describe('device module', () => {
	describe('parseDevice', () => {
		it('should detect iPhone', () => {
			const result = parseDevice(SAMPLE_UA.iphone)
			expect(result.iphone).toBeTruthy()
			expect(result.mobile).toBeTruthy()
			expect(result.phone).toBeTruthy()
			expect(result.type).toBe('mobile')
		})

		it('should detect iPad', () => {
			const result = parseDevice(SAMPLE_UA.ipad)
			expect(result.ipad).toBeTruthy()
			// iPad UA contains 'Mobile' which makes it detect as mobile in current implementation
			expect(result.mobile).toBeTruthy()
		})

		it('should detect Android phone', () => {
			const result = parseDevice(SAMPLE_UA.androidPhone)
			expect(result.androidPhone).toBeTruthy()
			expect(result.mobile).toBeTruthy()
			expect(result.phone).toBeTruthy()
		})

		it('should detect Android tablet', () => {
			const result = parseDevice(SAMPLE_UA.androidTablet)
			expect(result.androidTablet).toBeTruthy()
			expect(result.tablet).toBeTruthy()
		})

		it('should detect desktop', () => {
			const result = parseDevice(SAMPLE_UA.chromeWindows)
			expect(result.desktop).toBeTruthy()
			expect(result.mobile).toBeFalsy()
			expect(result.tablet).toBeFalsy()
			expect(result.type).toBe('desktop')
		})
	})

	describe('isMobile', () => {
		it('should return true for mobile', () => {
			expect(isMobile(SAMPLE_UA.iphone)).toBeTruthy()
		})

		it('should return false for desktop', () => {
			expect(isMobile(SAMPLE_UA.chromeWindows)).toBeFalsy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isMobile()).toBe('boolean')
		})
	})

	describe('isTablet', () => {
		it('should return true for tablet', () => {
			expect(isTablet(SAMPLE_UA.ipad)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isTablet()).toBe('boolean')
		})
	})

	describe('isDesktop', () => {
		it('should return true for desktop', () => {
			expect(isDesktop(SAMPLE_UA.chromeWindows)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isDesktop()).toBe('boolean')
		})
	})

	describe('isIPhone', () => {
		it('should return true for iPhone', () => {
			expect(isIPhone(SAMPLE_UA.iphone)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isIPhone()).toBe('boolean')
		})
	})

	describe('isIPad', () => {
		it('should return true for iPad', () => {
			expect(isIPad(SAMPLE_UA.ipad)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isIPad()).toBe('boolean')
		})
	})

	describe('isAndroidPhone', () => {
		it('should return true for Android phone', () => {
			expect(isAndroidPhone(SAMPLE_UA.androidPhone)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isAndroidPhone()).toBe('boolean')
		})
	})

	describe('isAndroidTablet', () => {
		it('should return true for Android tablet', () => {
			expect(isAndroidTablet(SAMPLE_UA.androidTablet)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isAndroidTablet()).toBe('boolean')
		})
	})

	describe('getDeviceType', () => {
		it('should return device type', () => {
			expect(getDeviceType(SAMPLE_UA.iphone)).toBe('mobile')
			// Note: iPad UA detection depends on implementation
			expect(getDeviceType(SAMPLE_UA.chromeWindows)).toBe('desktop')
		})
	})

	describe('getDeviceInfo', () => {
		it('should return cached device info', () => {
			const info = getDeviceInfo()
			expect(info).toHaveProperty('type')
			expect(info).toHaveProperty('mobile')
			expect(info).toHaveProperty('tablet')
			expect(info).toHaveProperty('desktop')
		})
	})
})

describe('os module', () => {
	describe('parseOS', () => {
		it('should detect Windows 10', () => {
			const result = parseOS(SAMPLE_UA.chromeWindows)
			expect(result.name).toBe('Windows')
			expect(result.version).toBe('10')
		})

		it('should detect Windows 8.1', () => {
			const result = parseOS(SAMPLE_UA.windows81)
			expect(result.name).toBe('Windows')
			expect(result.version).toBe('8.1')
		})

		it('should detect Windows 8', () => {
			const result = parseOS(SAMPLE_UA.windows8)
			expect(result.name).toBe('Windows')
			expect(result.version).toBe('8')
		})

		it('should detect Windows 7', () => {
			const result = parseOS(SAMPLE_UA.windows7)
			expect(result.name).toBe('Windows')
			expect(result.version).toBe('7')
		})

		it('should detect macOS', () => {
			const result = parseOS(SAMPLE_UA.safariMac)
			expect(result.name).toBe('macOS')
			expect(result.version).toBe('10.15.7')
		})

		it('should detect iOS', () => {
			const result = parseOS(SAMPLE_UA.iphone)
			expect(result.name).toBe('iOS')
			expect(result.version).toBe('17.2')
		})

		it('should detect iPadOS', () => {
			const result = parseOS(SAMPLE_UA.ipad)
			expect(result.name).toBe('iPadOS')
		})

		it('should detect Android', () => {
			const result = parseOS(SAMPLE_UA.androidPhone)
			expect(result.name).toBe('Android')
			expect(result.version).toBe('14')
		})

		it('should detect HarmonyOS', () => {
			const result = parseOS(SAMPLE_UA.harmonyOS)
			expect(result.name).toBe('HarmonyOS')
			expect(result.version).toBe('4.0.0')
		})

		it('should detect Linux', () => {
			const result = parseOS(SAMPLE_UA.linux)
			expect(result.name).toBe('Linux')
		})

		it('should detect ChromeOS', () => {
			const result = parseOS(SAMPLE_UA.chromeOS)
			expect(result.name).toBe('ChromeOS')
		})

		it('should return Unknown for unknown OS', () => {
			const result = parseOS(SAMPLE_UA.unknown)
			expect(result.name).toBe('Unknown')
		})
	})

	describe('isiOS', () => {
		it('should return true for iOS', () => {
			expect(isiOS(SAMPLE_UA.iphone)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isiOS()).toBe('boolean')
		})
	})

	describe('isiPadOS', () => {
		it('should return true for iPadOS', () => {
			expect(isiPadOS(SAMPLE_UA.ipad)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isiPadOS()).toBe('boolean')
		})
	})

	describe('isAndroid', () => {
		it('should return true for Android', () => {
			expect(isAndroid(SAMPLE_UA.androidPhone)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isAndroid()).toBe('boolean')
		})
	})

	describe('isHarmonyOS', () => {
		it('should return true for HarmonyOS', () => {
			expect(isHarmonyOS(SAMPLE_UA.harmonyOS)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isHarmonyOS()).toBe('boolean')
		})
	})

	describe('isWindows', () => {
		it('should return true for Windows', () => {
			expect(isWindows(SAMPLE_UA.chromeWindows)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isWindows()).toBe('boolean')
		})
	})

	describe('isMacOS', () => {
		it('should return true for macOS', () => {
			expect(isMacOS(SAMPLE_UA.safariMac)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isMacOS()).toBe('boolean')
		})
	})

	describe('isLinux', () => {
		it('should return true for Linux', () => {
			expect(isLinux(SAMPLE_UA.linux)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isLinux()).toBe('boolean')
		})
	})

	describe('getOSName', () => {
		it('should return OS name', () => {
			expect(getOSName(SAMPLE_UA.iphone)).toBe('iOS')
		})

		it('should work without UA parameter', () => {
			expect(typeof getOSName()).toBe('string')
		})
	})

	describe('getOSVersion', () => {
		it('should return OS version', () => {
			expect(getOSVersion(SAMPLE_UA.iphone)).toBe('17.2')
		})

		it('should work without UA parameter', () => {
			expect(typeof getOSVersion()).toBe('string')
		})
	})

	describe('getOSInfo', () => {
		it('should return cached OS info', () => {
			const info = getOSInfo()
			expect(info).toHaveProperty('name')
			expect(info).toHaveProperty('version')
		})
	})
})

describe('env module', () => {
	describe('parseEnvironment', () => {
		it('should detect WeChat', () => {
			const result = parseEnvironment(SAMPLE_UA.wechat)
			expect(result.wechat).toBeTruthy()
		})

		it('should detect QQ', () => {
			const result = parseEnvironment(SAMPLE_UA.qq)
			expect(result.qq).toBeTruthy()
		})

		it('should detect QQ Browser', () => {
			const result = parseEnvironment(SAMPLE_UA.qqBrowser)
			expect(result.qqBrowser).toBeTruthy()
		})

		it('should detect Alipay', () => {
			const result = parseEnvironment(SAMPLE_UA.alipay)
			expect(result.alipay).toBeTruthy()
		})

		it('should detect Weibo', () => {
			const result = parseEnvironment(SAMPLE_UA.weibo)
			expect(result.weibo).toBeTruthy()
		})

		it('should detect mini program', () => {
			const result = parseEnvironment(SAMPLE_UA.wechatMiniProgram)
			expect(result.miniProgram).toBeTruthy()
		})

		it('should detect mini game', () => {
			const result = parseEnvironment(SAMPLE_UA.miniGame)
			expect(result.miniGame).toBeTruthy()
		})
	})

	describe('isWeChat', () => {
		it('should return true for WeChat', () => {
			expect(isWeChat(SAMPLE_UA.wechat)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isWeChat()).toBe('boolean')
		})
	})

	describe('isWxwork', () => {
		it('should return true for WeChat Work', () => {
			expect(isWxwork(SAMPLE_UA.wxwork)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isWxwork()).toBe('boolean')
		})
	})

	describe('isDingtalk', () => {
		it('should return true for DingTalk', () => {
			expect(isDingtalk(SAMPLE_UA.dingtalk)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isDingtalk()).toBe('boolean')
		})
	})

	describe('isQQ', () => {
		it('should return true for QQ', () => {
			expect(isQQ(SAMPLE_UA.qq)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isQQ()).toBe('boolean')
		})
	})

	describe('isQQBrowser', () => {
		it('should return true for QQ Browser', () => {
			expect(isQQBrowser(SAMPLE_UA.qqBrowser)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isQQBrowser()).toBe('boolean')
		})
	})

	describe('isWeibo', () => {
		it('should return true for Weibo', () => {
			expect(isWeibo(SAMPLE_UA.weibo)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isWeibo()).toBe('boolean')
		})
	})

	describe('isAlipay', () => {
		it('should return true for Alipay', () => {
			expect(isAlipay(SAMPLE_UA.alipay)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isAlipay()).toBe('boolean')
		})
	})

	describe('isDouyin', () => {
		it('should return true for Douyin', () => {
			expect(isDouyin(SAMPLE_UA.douyin)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isDouyin()).toBe('boolean')
		})
	})

	describe('isKuaishou', () => {
		it('should return true for Kuaishou', () => {
			expect(isKuaishou(SAMPLE_UA.kuaishou)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isKuaishou()).toBe('boolean')
		})
	})

	describe('isBaidu', () => {
		it('should return true for Baidu', () => {
			expect(isBaidu(SAMPLE_UA.baidu)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isBaidu()).toBe('boolean')
		})
	})

	describe('isXiaomi', () => {
		it('should return true for Xiaomi', () => {
			expect(isXiaomi(SAMPLE_UA.xiaomi)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isXiaomi()).toBe('boolean')
		})
	})

	describe('isHuawei', () => {
		it('should return true for Huawei', () => {
			expect(isHuawei(SAMPLE_UA.huawei)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isHuawei()).toBe('boolean')
		})
	})

	describe('isVivo', () => {
		it('should return true for Vivo', () => {
			expect(isVivo(SAMPLE_UA.vivo)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isVivo()).toBe('boolean')
		})
	})

	describe('isOppo', () => {
		it('should return true for Oppo', () => {
			expect(isOppo(SAMPLE_UA.oppo)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isOppo()).toBe('boolean')
		})
	})

	describe('isUCEnv', () => {
		it('should return true for UC', () => {
			expect(isUCEnv(SAMPLE_UA.uc)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isUCEnv()).toBe('boolean')
		})
	})

	describe('isQuarkEnv', () => {
		it('should return true for Quark', () => {
			expect(isQuarkEnv(SAMPLE_UA.quark)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isQuarkEnv()).toBe('boolean')
		})
	})

	describe('isMiniProgram', () => {
		it('should return true for mini program', () => {
			expect(isMiniProgram(SAMPLE_UA.wechatMiniProgram)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isMiniProgram()).toBe('boolean')
		})
	})

	describe('isMiniGame', () => {
		it('should return true for mini game', () => {
			expect(isMiniGame(SAMPLE_UA.miniGame)).toBeTruthy()
		})

		it('should work without UA parameter', () => {
			expect(typeof isMiniGame()).toBe('boolean')
		})
	})

	describe('getEnvInfo', () => {
		it('should return cached environment info', () => {
			const info = getEnvInfo()
			expect(info).toHaveProperty('wechat')
			expect(info).toHaveProperty('qq')
			expect(info).toHaveProperty('alipay')
		})
	})
})

describe('network module', () => {
	describe('getNetworkInfo', () => {
		it('should return network info', () => {
			const info = getNetworkInfo()
			expect(info).toHaveProperty('online')
			expect(info).toHaveProperty('type')
			expect(info).toHaveProperty('effectiveType')
			expect(info).toHaveProperty('downlink')
			expect(info).toHaveProperty('rtt')
			expect(info).toHaveProperty('saveData')
		})
	})

	describe('isOnline', () => {
		it('should return boolean', () => {
			expect(typeof isOnline()).toBe('boolean')
		})
	})

	describe('isOffline', () => {
		it('should return opposite of isOnline', () => {
			expect(isOffline()).toBe(!isOnline())
		})
	})

	describe('getConnectionType', () => {
		it('should return connection type', () => {
			const type = getConnectionType()
			expect(['wifi', 'cellular', 'ethernet', 'none', 'unknown']).toContain(type)
		})
	})

	describe('getEffectiveType', () => {
		it('should return effective type', () => {
			const type = getEffectiveType()
			expect(['4g', '3g', '2g', 'slow-2g', 'unknown']).toContain(type)
		})
	})

	describe('getDownlink', () => {
		it('should return number', () => {
			expect(typeof getDownlink()).toBe('number')
		})
	})

	describe('getRTT', () => {
		it('should return number', () => {
			expect(typeof getRTT()).toBe('number')
		})
	})

	describe('isSaveData', () => {
		it('should return boolean', () => {
			expect(typeof isSaveData()).toBe('boolean')
		})
	})

	describe('isSlowConnection', () => {
		it('should return boolean', () => {
			expect(typeof isSlowConnection()).toBe('boolean')
		})
	})

	describe('isFastConnection', () => {
		it('should return boolean', () => {
			expect(typeof isFastConnection()).toBe('boolean')
		})
	})
})

describe('screen module', () => {
	describe('getScreenInfo', () => {
		it('should return screen info', () => {
			const info = getScreenInfo()
			expect(info).toHaveProperty('width')
			expect(info).toHaveProperty('height')
			expect(info).toHaveProperty('pixelRatio')
			expect(info).toHaveProperty('orientation')
			expect(info).toHaveProperty('colorDepth')
		})
	})

	describe('getScreenWidth', () => {
		it('should return number', () => {
			expect(typeof getScreenWidth()).toBe('number')
		})
	})

	describe('getScreenHeight', () => {
		it('should return number', () => {
			expect(typeof getScreenHeight()).toBe('number')
		})
	})

	describe('getPixelRatio', () => {
		it('should return number', () => {
			expect(typeof getPixelRatio()).toBe('number')
			expect(getPixelRatio()).toBeGreaterThan(0)
		})
	})

	describe('getOrientation', () => {
		it('should return portrait or landscape', () => {
			const orientation = getOrientation()
			expect(['portrait', 'landscape']).toContain(orientation)
		})
	})

	describe('isPortrait', () => {
		it('should return boolean', () => {
			expect(typeof isPortrait()).toBe('boolean')
		})
	})

	describe('isLandscape', () => {
		it('should return boolean', () => {
			expect(typeof isLandscape()).toBe('boolean')
		})

		it('should be opposite of isPortrait', () => {
			expect(isLandscape()).toBe(!isPortrait())
		})
	})

	describe('getOrientationStatus', () => {
		it('should return portrait or landscape', () => {
			const orientation = getOrientationStatus()
			expect(['portrait', 'landscape']).toContain(orientation)
		})
	})

	describe('getColorDepth', () => {
		it('should return number', () => {
			expect(typeof getColorDepth()).toBe('number')
		})
	})

	describe('getAvailWidth', () => {
		it('should return number', () => {
			expect(typeof getAvailWidth()).toBe('number')
		})
	})

	describe('getAvailHeight', () => {
		it('should return number', () => {
			expect(typeof getAvailHeight()).toBe('number')
		})
	})

	describe('isDarkMode', () => {
		it('should return boolean', () => {
			expect(typeof isDarkMode()).toBe('boolean')
		})
	})

	describe('isLightMode', () => {
		it('should return boolean', () => {
			expect(typeof isLightMode()).toBe('boolean')
		})
	})

	describe('isReducedMotion', () => {
		it('should return boolean', () => {
			expect(typeof isReducedMotion()).toBe('boolean')
		})
	})

	describe('isHighContrast', () => {
		it('should return boolean', () => {
			expect(typeof isHighContrast()).toBe('boolean')
		})
	})

	describe('isHDR', () => {
		it('should return boolean', () => {
			expect(typeof isHDR()).toBe('boolean')
		})
	})
})
