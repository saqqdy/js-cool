/**
 * OS detection module
 *
 * @example
 * ```ts
 * import { isiOS, isAndroid, getOSInfo } from 'js-cool/ua'
 *
 * isiOS()              // true/false
 * isAndroid()          // true/false
 * isHarmonyOS()        // true/false
 * getOSInfo()          // { name: 'Windows', version: '10' }
 * ```
 *
 * @module ua/os
 */

import type { OSInfo, OSName } from './types'
import { getUserAgent, OS_PATTERNS } from './patterns'

/**
 * Parse OS information from user agent
 */
export function parseOS(ua: string): OSInfo {
	// Check HarmonyOS first (Chinese OS)
	const harmonyMatch = ua.match(OS_PATTERNS.harmonyOS)
	if (harmonyMatch) {
		return { name: 'HarmonyOS', version: harmonyMatch[1] || '' }
	}

	// iPadOS (iPad on iOS 13+)
	const iPadOSMatch = ua.match(OS_PATTERNS.iPadOS)
	if (iPadOSMatch) {
		return { name: 'iPadOS', version: iPadOSMatch[1].replace(/_/g, '.') }
	}

	// iOS (iPhone/iPod)
	const iOSMatch = ua.match(OS_PATTERNS.iOS)
	if (iOSMatch) {
		return { name: 'iOS', version: iOSMatch[1].replace(/_/g, '.') }
	}

	// Android
	const androidMatch = ua.match(OS_PATTERNS.android)
	if (androidMatch) {
		return { name: 'Android', version: androidMatch[1] || '' }
	}

	// Windows
	const windowsMatch = ua.match(OS_PATTERNS.windows)
	if (windowsMatch) {
		const version = windowsMatch[1]
		const versionMap: Record<string, string> = {
			'10.0': '10',
			'6.3': '8.1',
			'6.2': '8',
			'6.1': '7',
			'6.0': 'Vista',
			'5.1': 'XP',
		}
		return { name: 'Windows', version: versionMap[version] || version }
	}

	// macOS
	const macOSMatch = ua.match(OS_PATTERNS.macOS)
	if (macOSMatch) {
		return { name: 'macOS', version: macOSMatch[1].replace(/_/g, '.') }
	}

	// Chrome OS
	if (OS_PATTERNS.chromeOS.test(ua)) {
		return { name: 'ChromeOS', version: '' }
	}

	// Linux
	if (OS_PATTERNS.linux.test(ua)) {
		return { name: 'Linux', version: '' }
	}

	return { name: 'Unknown', version: '' }
}

// Cache for default detector
let cachedOSInfo: OSInfo | null = null

/**
 * Get OS info (cached)
 */
export function getOSInfo(): OSInfo {
	if (cachedOSInfo) return cachedOSInfo
	cachedOSInfo = parseOS(getUserAgent())
	return cachedOSInfo
}

/**
 * Check if iOS device
 */
export function isiOS(ua?: string): boolean {
	if (ua) return parseOS(ua).name === 'iOS'
	return getOSInfo().name === 'iOS'
}

/**
 * Check if iPadOS device
 */
export function isiPadOS(ua?: string): boolean {
	if (ua) return parseOS(ua).name === 'iPadOS'
	return getOSInfo().name === 'iPadOS'
}

/**
 * Check if Android device
 */
export function isAndroid(ua?: string): boolean {
	if (ua) return parseOS(ua).name === 'Android'
	return getOSInfo().name === 'Android'
}

/**
 * Check if HarmonyOS device
 */
export function isHarmonyOS(ua?: string): boolean {
	if (ua) return parseOS(ua).name === 'HarmonyOS'
	return getOSInfo().name === 'HarmonyOS'
}

/**
 * Check if Windows
 */
export function isWindows(ua?: string): boolean {
	if (ua) return parseOS(ua).name === 'Windows'
	return getOSInfo().name === 'Windows'
}

/**
 * Check if macOS
 */
export function isMacOS(ua?: string): boolean {
	if (ua) return parseOS(ua).name === 'macOS'
	return getOSInfo().name === 'macOS'
}

/**
 * Check if Linux
 */
export function isLinux(ua?: string): boolean {
	if (ua) return parseOS(ua).name === 'Linux'
	return getOSInfo().name === 'Linux'
}

/**
 * Get OS name
 */
export function getOSName(ua?: string): OSName {
	if (ua) return parseOS(ua).name
	return getOSInfo().name
}

/**
 * Get OS version
 */
export function getOSVersion(ua?: string): string {
	if (ua) return parseOS(ua).version
	return getOSInfo().version
}

// Reset cache (for testing)
export function _resetOSCache(): void {
	cachedOSInfo = null
}
