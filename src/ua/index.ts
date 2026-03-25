/**
 * User Agent detection module - Full entry
 *
 * @example
 * ```ts
 * // Full import
 * import { ua, UAParser } from 'js-cool'
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
 * const parser = new UAParser('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)')
 * parser.isMobile()  // true
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
	IUAParser,
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
import { getUserAgent } from '../patterns/ua'
import { isDarkMode as checkDarkMode, getOrientationStatus, getScreenInfo } from './screen'

// Re-export sub-modules for direct import
export * from '../patterns/ua'
export * from './browser'
export * from './device'
export * from './env'
export * from './network'
export * from './os'
export * from './screen'

/**
 * User Agent parser class
 *
 * @example
 * ```ts
 * import { UAParser } from 'js-cool'
 *
 * // Create parser with custom UA
 * const parser = new UAParser('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)')
 *
 * parser.isMobile()  // true
 * parser.isiOS()     // true
 * parser.browser.name // 'Safari'
 * ```
 */
class UAParser implements IUAParser {
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
	get(
		type: UAGetType
	): DeviceInfo | OSInfo | BrowserInfo | { name: string } | EnvironmentInfo | null {
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
		return this.uaString.toLowerCase().indexOf(name.toLowerCase()) !== -1
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
const uaInstance = new UAParser()

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

// IE11-compatible: manual assignment instead of Object.assign
interface UA {
	(): UAInfo
	get: (type: UAGetType) => any
	getMultiple: (types: UAGetType[]) => Record<string, any>
	has: (name: string) => boolean
	getNetwork: () => NetworkInfo
	getScreen: () => ScreenInfo
	getLanguage: () => string
	getTimezone: () => string
	getOrientationStatus: () => 'portrait' | 'landscape'
	isDarkMode: () => boolean
	isMobile: () => boolean
	isTablet: () => boolean
	isDesktop: () => boolean
	isTouch: () => boolean
	isiOS: () => boolean
	isiPadOS: () => boolean
	isAndroid: () => boolean
	isHarmonyOS: () => boolean
	isWeChat: () => boolean
	isQQ: () => boolean
	isMiniProgram: () => boolean
	readonly info: UAInfo
	readonly device: DeviceInfo
	readonly os: OSInfo
	readonly browser: BrowserInfo
	readonly environment: EnvironmentInfo
	readonly userAgent: string
	UAParser: typeof UAParser
}

function ua(): UAInfo {
	return uaInstance.info
}

// Define getters as properties (for both TypeScript inference and runtime)
Object.defineProperties(ua, {
	info: { get: () => uaInstance.info, enumerable: true },
	device: { get: () => uaInstance.device, enumerable: true },
	os: { get: () => uaInstance.os, enumerable: true },
	browser: { get: () => uaInstance.browser, enumerable: true },
	environment: { get: () => uaInstance.environment, enumerable: true },
	userAgent: { get: () => uaInstance.userAgent, enumerable: true },
})

// Define methods
ua.get = (type: UAGetType) => uaInstance.get(type)
ua.getMultiple = (types: UAGetType[]) => uaInstance.getMultiple(types)
ua.has = (name: string) => uaInstance.has(name)
ua.getNetwork = () => uaInstance.getNetwork()
ua.getScreen = () => uaInstance.getScreen()
ua.getLanguage = () => uaInstance.getLanguage()
ua.getTimezone = () => uaInstance.getTimezone()
ua.getOrientationStatus = () => uaInstance.getOrientationStatus()
ua.isDarkMode = () => uaInstance.isDarkMode()
ua.isMobile = () => uaInstance.isMobile()
ua.isTablet = () => uaInstance.isTablet()
ua.isDesktop = () => uaInstance.isDesktop()
ua.isTouch = () => uaInstance.isTouch()
ua.isiOS = () => uaInstance.isiOS()
ua.isiPadOS = () => uaInstance.isiPadOS()
ua.isAndroid = () => uaInstance.isAndroid()
ua.isHarmonyOS = () => uaInstance.isHarmonyOS()
ua.isWeChat = () => uaInstance.isWeChat()
ua.isQQ = () => uaInstance.isQQ()
ua.isMiniProgram = () => uaInstance.isMiniProgram()
ua.UAParser = UAParser

// Declare namespace for getter properties (TypeScript needs this for proper type inference)
// eslint-disable-next-line ts/no-namespace
declare namespace ua {
	let info: UAInfo,
		device: DeviceInfo,
		os: OSInfo,
		browser: BrowserInfo,
		environment: EnvironmentInfo,
		userAgent: string
}

export default ua
export { UAParser }
export type {
	UA,
	UAInfo,
	DeviceInfo,
	OSInfo,
	BrowserInfo,
	EnvironmentInfo,
	NetworkInfo,
	ScreenInfo,
	UAGetType,
	IUAParser,
	OSName,
	BrowserName,
	EngineName,
	DeviceType,
}
