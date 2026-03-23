/**
 * User Agent detection module - Full entry
 *
 * @example
 * ```ts
 * // Full import
 * import { ua, UADetector } from 'js-cool'
 *
 * // Get all user agent info
 * const info = ua.info
 * // { device: {...}, os: {...}, browser: {...}, environment: {...} }
 *
 * // Quick checks
 * ua.isMobile()    // true/false
 * ua.isWeChat()    // true/false
 * ua.isiOS()       // true/false
 *
 * // Custom UA string
 * const detector = new UADetector('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)')
 * detector.isMobile()  // true
 * ```
 *
 * @module ua
 * @since 6.0.0
 */

import type {
	BrowserInfo,
	BrowserName,
	DeviceInfo,
	DeviceType,
	EngineName,
	EnvironmentInfo,
	IUADetector,
	NetworkInfo,
	OSInfo,
	OSName,
	ScreenInfo,
	UAGetType,
	UAInfo,
} from './types'

import { parseBrowser } from './browser'
import { parseDevice } from './device'
import { parseEnvironment } from './env'
import { getNetworkInfo } from './network'
import { parseOS } from './os'
// Import for internal use
import { getUserAgent } from './patterns'
import { isDarkMode as checkDarkMode, getOrientationStatus, getScreenInfo } from './screen'

export * from './browser'
export * from './device'
export * from './env'
export * from './network'
export * from './os'
// Re-export sub-modules for direct import
export * from './patterns'
export * from './screen'

/**
 * User Agent detector class
 *
 * @example
 * ```ts
 * import { UADetector } from 'js-cool'
 *
 * // Create detector with custom UA
 * const detector = new UADetector('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)')
 *
 * detector.isMobile()  // true
 * detector.isiOS()     // true
 * detector.browser.name // 'Safari'
 * ```
 */
class UADetector implements IUADetector {
	private uaString: string
	private cachedInfo: UAInfo | null = null

	constructor(userAgent?: string) {
		this.uaString = userAgent ?? getUserAgent()
	}

	/**
	 * Get full user agent info (cached)
	 */
	get info(): UAInfo {
		if (this.cachedInfo) {
			return this.cachedInfo
		}

		this.cachedInfo = {
			device: parseDevice(this.uaString),
			os: parseOS(this.uaString),
			browser: parseBrowser(this.uaString),
			environment: parseEnvironment(this.uaString),
			userAgent: this.uaString,
		}

		return this.cachedInfo
	}

	/**
	 * Get device info
	 */
	get device(): DeviceInfo {
		return this.info.device
	}

	/**
	 * Get OS info
	 */
	get os(): OSInfo {
		return this.info.os
	}

	/**
	 * Get browser info
	 */
	get browser(): BrowserInfo {
		return this.info.browser
	}

	/**
	 * Get environment info
	 */
	get environment(): EnvironmentInfo {
		return this.info.environment
	}

	/**
	 * Get user agent string
	 */
	get userAgent(): string {
		return this.uaString
	}

	/**
	 * Get info by type
	 * @param type - The type of info to get: 'device' | 'os' | 'browser' | 'engine' | 'environment'
	 */
	get(type: UAGetType): any {
		const info = this.info

		switch (type) {
			case 'device':
				return info.device
			case 'os':
				return info.os
			case 'browser':
				return info.browser
			case 'engine':
				return { name: info.browser.engine }
			case 'environment':
				return info.environment
			default:
				return null
		}
	}

	/**
	 * Get multiple info types at once
	 * @param types - Array of types to get
	 */
	getMultiple(types: UAGetType[]): Record<string, any> {
		const result: Record<string, any> = {}
		for (const type of types) {
			result[type] = this.get(type)
		}
		return result
	}

	/**
	 * Check if a name exists in the user agent string
	 * @param name - The name to search for
	 */
	has(name: string): boolean {
		return this.uaString.toLowerCase().includes(name.toLowerCase())
	}

	/**
	 * Get network information
	 */
	getNetwork(): NetworkInfo {
		return getNetworkInfo()
	}

	/**
	 * Get screen information
	 */
	getScreen(): ScreenInfo {
		return getScreenInfo()
	}

	/**
	 * Get browser language
	 */
	getLanguage(): string {
		if (typeof navigator === 'undefined') return ''
		return navigator.language || (navigator as any).userLanguage || ''
	}

	/**
	 * Get timezone
	 */
	getTimezone(): string {
		try {
			return Intl.DateTimeFormat().resolvedOptions().timeZone
		} catch {
			return ''
		}
	}

	/**
	 * Get orientation status
	 */
	getOrientationStatus(): 'portrait' | 'landscape' {
		return getOrientationStatus()
	}

	/**
	 * Check if dark mode is preferred
	 */
	isDarkMode(): boolean {
		return checkDarkMode()
	}

	// Quick check methods

	/**
	 * Check if mobile device
	 */
	isMobile(): boolean {
		return this.info.device.mobile
	}

	/**
	 * Check if tablet device
	 */
	isTablet(): boolean {
		return this.info.device.tablet
	}

	/**
	 * Check if desktop device
	 */
	isDesktop(): boolean {
		return this.info.device.desktop
	}

	/**
	 * Check if touch device
	 */
	isTouch(): boolean {
		return this.info.device.touch
	}

	/**
	 * Check if iOS device
	 */
	isiOS(): boolean {
		return this.info.os.name === 'iOS'
	}

	/**
	 * Check if iPadOS device
	 */
	isiPadOS(): boolean {
		return this.info.os.name === 'iPadOS'
	}

	/**
	 * Check if Android device
	 */
	isAndroid(): boolean {
		return this.info.os.name === 'Android'
	}

	/**
	 * Check if HarmonyOS device
	 */
	isHarmonyOS(): boolean {
		return this.info.os.name === 'HarmonyOS'
	}

	/**
	 * Check if WeChat environment
	 */
	isWeChat(): boolean {
		return this.info.environment.wechat
	}

	/**
	 * Check if QQ environment
	 */
	isQQ(): boolean {
		return this.info.environment.qq
	}

	/**
	 * Check if mini program environment
	 */
	isMiniProgram(): boolean {
		return this.info.environment.miniProgram
	}
}

// Create singleton instance
const uaInstance = new UADetector()

/**
 * User Agent detection utility
 *
 * A lightweight, comprehensive user agent parser for browser/device/environment detection.
 *
 * @example
 * ```ts
 * import { ua } from 'js-cool'
 *
 * // Get all user agent info
 * const info = ua.info
 * // { device: {...}, os: {...}, browser: {...}, environment: {...} }
 *
 * // Get single info type
 * ua.get('browser')
 * // { name: 'Chrome', version: '123.0.0.0', engine: 'Blink' }
 *
 * // Get multiple info types
 * ua.getMultiple(['device', 'os'])
 * // { device: {...}, os: {...} }
 *
 * // Quick checks
 * ua.isMobile()    // true/false
 * ua.isWeChat()    // true/false
 * ua.isiOS()       // true/false
 * ua.isHarmonyOS() // true/false
 *
 * // Check if name in UA
 * ua.has('Chrome') // true/false
 *
 * // Network info
 * ua.getNetwork()  // { online, type, effectiveType, downlink, rtt, saveData }
 *
 * // Screen info
 * ua.getScreen()   // { width, height, pixelRatio, orientation, colorDepth }
 * ```
 */
const ua = Object.assign(
	/**
	 * Get full user agent info
	 */
	(): UAInfo => uaInstance.info,
	{
		// Expose instance methods
		get: (type: UAGetType) => uaInstance.get(type),
		getMultiple: (types: UAGetType[]) => uaInstance.getMultiple(types),
		has: (name: string) => uaInstance.has(name),
		getNetwork: () => uaInstance.getNetwork(),
		getScreen: () => uaInstance.getScreen(),
		getLanguage: () => uaInstance.getLanguage(),
		getTimezone: () => uaInstance.getTimezone(),
		getOrientationStatus: () => uaInstance.getOrientationStatus(),
		isDarkMode: () => uaInstance.isDarkMode(),
		isMobile: () => uaInstance.isMobile(),
		isTablet: () => uaInstance.isTablet(),
		isDesktop: () => uaInstance.isDesktop(),
		isTouch: () => uaInstance.isTouch(),
		isiOS: () => uaInstance.isiOS(),
		isiPadOS: () => uaInstance.isiPadOS(),
		isAndroid: () => uaInstance.isAndroid(),
		isHarmonyOS: () => uaInstance.isHarmonyOS(),
		isWeChat: () => uaInstance.isWeChat(),
		isQQ: () => uaInstance.isQQ(),
		isMiniProgram: () => uaInstance.isMiniProgram(),

		// Expose info getter
		get info() {
			return uaInstance.info
		},
		get device() {
			return uaInstance.device
		},
		get os() {
			return uaInstance.os
		},
		get browser() {
			return uaInstance.browser
		},
		get environment() {
			return uaInstance.environment
		},
		get userAgent() {
			return uaInstance.userAgent
		},

		// Expose class for custom instances
		UADetector,
	}
)

export default ua
export { UADetector }
export type {
	UAInfo,
	DeviceInfo,
	OSInfo,
	BrowserInfo,
	EnvironmentInfo,
	NetworkInfo,
	ScreenInfo,
	UAGetType,
	IUADetector,
	OSName,
	BrowserName,
	EngineName,
	DeviceType,
}
