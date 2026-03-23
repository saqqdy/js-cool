/**
 * User Agent detection type definitions
 *
 * @module ua
 * @since 6.0.0
 */

/**
 * Device type
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

/**
 * Operating system names
 */
export type OSName =
	| 'Windows'
	| 'macOS'
	| 'iOS'
	| 'iPadOS'
	| 'Android'
	| 'Linux'
	| 'HarmonyOS'
	| 'ChromeOS'
	| 'Unknown'

/**
 * Browser names
 */
export type BrowserName =
	| 'Chrome'
	| 'Firefox'
	| 'Safari'
	| 'Edge'
	| 'IE'
	| 'Opera'
	| 'Samsung'
	| 'UC'
	| 'Quark'
	| 'Brave'
	| 'Vivaldi'
	| 'Unknown'

/**
 * Browser engine names
 */
export type EngineName = 'Blink' | 'Gecko' | 'WebKit' | 'Trident' | 'EdgeHTML' | 'Unknown'

/**
 * Operating system information
 */
export interface OSInfo {
	/** OS name */
	name: OSName
	/** OS version */
	version: string
}

/**
 * Browser information
 */
export interface BrowserInfo {
	/** Browser name */
	name: BrowserName
	/** Browser version */
	version: string
	/** Browser engine */
	engine: EngineName
}

/**
 * Special environment detection (mainly Chinese apps)
 */
export interface EnvironmentInfo {
	/** WeChat (微信) */
	wechat: boolean
	/** WeChat Work (企业微信) */
	wxwork: boolean
	/** DingTalk (钉钉) */
	dingtalk: boolean
	/** QQ built-in browser */
	qq: boolean
	/** QQ Browser */
	qqBrowser: boolean
	/** Weibo (微博) */
	weibo: boolean
	/** Alipay (支付宝) */
	alipay: boolean
	/** Douyin/TikTok (抖音) */
	douyin: boolean
	/** Kuaishou (快手) */
	kuaishou: boolean
	/** Baidu App (百度App) */
	baidu: boolean
	/** Xiaomi Browser (小米浏览器) */
	xiaomi: boolean
	/** Huawei Browser (华为浏览器) */
	huawei: boolean
	/** Vivo Browser */
	vivo: boolean
	/** Oppo Browser */
	oppo: boolean
	/** UC Browser */
	uc: boolean
	/** Quark Browser (夸克浏览器) */
	quark: boolean
	/** Mini Program (小程序) */
	miniProgram: boolean
	/** Mini Game (小游戏) */
	miniGame: boolean
}

/**
 * Device information
 */
export interface DeviceInfo {
	/** Device type */
	type: DeviceType
	/** Is mobile device */
	mobile: boolean
	/** Is tablet device */
	tablet: boolean
	/** Is desktop device */
	desktop: boolean
	/** Is touch device */
	touch: boolean
	/** Is phone (iPhone/Android phone) */
	phone: boolean
	/** Is iPad */
	ipad: boolean
	/** Is iPhone */
	iphone: boolean
	/** Is Android phone */
	androidPhone: boolean
	/** Is Android tablet */
	androidTablet: boolean
}

/**
 * Network information
 */
export interface NetworkInfo {
	/** Is online */
	online: boolean
	/** Connection type */
	type: 'wifi' | 'cellular' | 'ethernet' | 'none' | 'unknown'
	/** Effective connection type */
	effectiveType: '4g' | '3g' | '2g' | 'slow-2g' | 'unknown'
	/** Downlink speed (Mbps) */
	downlink: number
	/** Round-trip time (ms) */
	rtt: number
	/** Is data saver mode enabled */
	saveData: boolean
}

/**
 * Screen information
 */
export interface ScreenInfo {
	/** Screen width */
	width: number
	/** Screen height */
	height: number
	/** Device pixel ratio */
	pixelRatio: number
	/** Screen orientation */
	orientation: 'portrait' | 'landscape'
	/** Color depth */
	colorDepth: number
	/** Available screen width */
	availWidth: number
	/** Available screen height */
	availHeight: number
}

/**
 * Full user agent information
 */
export interface UAInfo {
	/** Device information */
	device: DeviceInfo
	/** Operating system information */
	os: OSInfo
	/** Browser information */
	browser: BrowserInfo
	/** Environment detection */
	environment: EnvironmentInfo
	/** Original user agent string */
	userAgent: string
}

/**
 * User Agent getter type
 */
export type UAGetType = 'device' | 'os' | 'browser' | 'engine' | 'environment'

/**
 * User Agent parser class interface
 */
export interface IUAParser {
	/** Get full user agent info */
	readonly info: UAInfo
	/** Get device info */
	readonly device: DeviceInfo
	/** Get OS info */
	readonly os: OSInfo
	/** Get browser info */
	readonly browser: BrowserInfo
	/** Get environment info */
	readonly environment: EnvironmentInfo
	/** Get user agent string */
	readonly userAgent: string

	/** Get info by type */
	get: (type: UAGetType) => any
	/** Get multiple info types */
	getMultiple: (types: UAGetType[]) => Record<string, any>
	/** Check if name exists in user agent */
	has: (name: string) => boolean

	/** Network info */
	getNetwork: () => NetworkInfo
	/** Screen info */
	getScreen: () => ScreenInfo
	/** Language preference */
	getLanguage: () => string
	/** Timezone */
	getTimezone: () => string
	/** Orientation status */
	getOrientationStatus: () => 'portrait' | 'landscape'
	/** Is dark mode */
	isDarkMode: () => boolean

	// Quick check methods
	/** Is mobile device */
	isMobile: () => boolean
	/** Is tablet device */
	isTablet: () => boolean
	/** Is desktop device */
	isDesktop: () => boolean
	/** Is touch device */
	isTouch: () => boolean
	/** Is iOS device */
	isiOS: () => boolean
	/** Is iPadOS device */
	isiPadOS: () => boolean
	/** Is Android device */
	isAndroid: () => boolean
	/** Is HarmonyOS device */
	isHarmonyOS: () => boolean
	/** Is WeChat */
	isWeChat: () => boolean
	/** Is QQ */
	isQQ: () => boolean
	/** Is mini program */
	isMiniProgram: () => boolean
}
