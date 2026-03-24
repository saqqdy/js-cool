/**
 * User Agent detection patterns
 *
 * @module patterns/ua
 * @since 6.0.0
 */

/**
 * Device detection patterns
 */
export const DEVICE_PATTERNS = {
	mobile: /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Opera Mobi/i,
	tablet: /iPad|Android(?!.*Mobile)|Tablet|PlayBook|Silk/i,
	phone: /iPhone|iPod|Android.*Mobile/i,
	touch: /Touch|Android|iPhone|iPad/i,
	iphone: /iPhone/i,
	ipad: /iPad/i,
	androidPhone: /Android.*Mobile/i,
	androidTablet: /Android(?!.*Mobile)/i,
} as const

/**
 * OS detection patterns
 */
export const OS_PATTERNS = {
	harmonyOS: /HarmonyOS[\s/](\d+\.?\d*\.?\d*)/i,
	windows: /Windows NT (\d+\.?\d*)/i,
	macOS: /Mac OS X (\d+[._]\d+[._]?\d*)/i,
	iOS: /(?:iPhone|iPad|iPod).*?OS (\d+[._]\d+)/i,
	iPadOS: /iPad.*?OS (\d+[._]\d+)/i,
	android: /Android (\d+\.?\d*\.?\d*)/i,
	linux: /Linux/i,
	chromeOS: /CrOS/i,
} as const

/**
 * Browser detection patterns (order matters for detection!)
 */
export const BROWSER_PATTERNS = {
	edge: /Edg(?:e|A|iOS)?\/(\d+\.?\d*)/i,
	opera: /(?:OPR|Opera)\/(\d+\.?\d*)/i,
	samsung: /SamsungBrowser\/(\d+\.?\d*)/i,
	uc: /UCBrowser\/(\d+\.?\d*)/i,
	quark: /Quark\/(\d+\.?\d*)/i,
	arc: /Arc\/(\d+\.?\d*)/i,
	brave: /Brave\/(\d+\.?\d*)/i,
	yandex: /YaBrowser\/(\d+\.?\d*)/i,
	chrome: /Chrome\/(\d+\.?\d*)/i,
	safari: /Version\/(\d+\.?\d*).*Safari/i,
	firefox: /Firefox\/(\d+\.?\d*)/i,
	ie: /(?:MSIE |Trident.*rv:)(\d+\.?\d*)/i,
	vivaldi: /Vivaldi\/(\d+\.?\d*)/i,
} as const

/**
 * Engine detection patterns
 */
export const ENGINE_PATTERNS = {
	blink: /Chrome|Chromium|Edg|OPR|Opera/i,
	gecko: /Firefox/i,
	webkit: /AppleWebKit/i,
	trident: /Trident/i,
	edgeHTML: /Edge\/\d+/i,
} as const

/**
 * Environment detection patterns (Chinese apps, etc.)
 */
export const ENV_PATTERNS = {
	wechat: /MicroMessenger\/(\d+\.?\d*\.?\d*)/i,
	wxwork: /wxwork\/(\d+\.?\d*\.?\d*)/i,
	dingtalk: /DingTalk\/(\d+\.?\d*\.?\d*)/i,
	qq: /\sQQ\/(\d+\.?\d*)/i,
	qqBrowser: /QQBrowser\/(\d+\.?\d*)/i,
	weibo: /Weibo/i,
	alipay: /AlipayClient\/(\d+\.?\d*\.?\d*)/i,
	douyin: /aweme|douyin|TikTok/i,
	kuaishou: /Kuaishou/i,
	baidu: /baiduboxapp|Baidu/i,
	xiaomi: /MiuiBrowser\/(\d+\.?\d*)/i,
	huawei: /HuaweiBrowser|HBPC/i,
	vivo: /VivoBrowser\/(\d+\.?\d*)/i,
	oppo: /HeyTapBrowser\/(\d+\.?\d*)/i,
	uc: /UCBrowser\/(\d+\.?\d*)/i,
	quark: /Quark\/(\d+\.?\d*)/i,
	xiaohongshu: /xhslink|xiaohongshu|XHS\//i,
	meituan: /Meituan/i,
	dianping: /dianping/i,
	zhifubao: /Alipay/i,
	taobao: /AliApp\(TB\//i,
	tmall: /AliApp\(TM\//i,
	jd: /jdapp/i,
	pinduoduo: /pinduoduo/i,
	miniProgram: /miniprogram|swan\//i,
	miniGame: /minigame/i,
} as const

/**
 * Get user agent string safely
 */
export function getUserAgent(): string {
	if (typeof navigator !== 'undefined') {
		return navigator.userAgent || ''
	}
	return ''
}

/**
 * Check if a pattern exists in user agent
 */
export function matchPattern(ua: string, pattern: RegExp): boolean {
	return pattern.test(ua)
}

/**
 * Extract version from user agent using pattern
 */
export function extractVersion(ua: string, pattern: RegExp): string {
	const match = ua.match(pattern)
	return match?.[1]?.replace(/_/g, '.') || ''
}

export type DevicePatternName = keyof typeof DEVICE_PATTERNS
export type OSPatternName = keyof typeof OS_PATTERNS
export type BrowserPatternName = keyof typeof BROWSER_PATTERNS
export type EnginePatternName = keyof typeof ENGINE_PATTERNS
export type EnvPatternName = keyof typeof ENV_PATTERNS
