/**
 * Device detection module
 *
 * @example
 * ```ts
 * import { isMobile, isTablet, getDeviceInfo } from 'js-cool/ua'
 *
 * isMobile()           // true/false
 * isTablet()           // true/false
 * isDesktop()          // true/false
 * isTouch()            // true/false
 * getDeviceInfo()      // { type, mobile, tablet, desktop, ... }
 * ```
 *
 * @module ua/device
 */

import type { DeviceInfo, DeviceType } from './types'
import { DEVICE_PATTERNS, getUserAgent } from './patterns'

/**
 * Parse device information from user agent
 */
export function parseDevice(ua: string): DeviceInfo {
	const isIPhone = DEVICE_PATTERNS.iphone.test(ua)
	const isIPad = DEVICE_PATTERNS.ipad.test(ua)
	const isAndroidPhone = DEVICE_PATTERNS.androidPhone.test(ua)
	const isAndroidTablet = DEVICE_PATTERNS.androidTablet.test(ua)
	const isMobile = DEVICE_PATTERNS.mobile.test(ua) || isIPhone || isAndroidPhone
	const isTablet = DEVICE_PATTERNS.tablet.test(ua) || isIPad || isAndroidTablet
	const isTouch =
		DEVICE_PATTERNS.touch.test(ua) ||
		(typeof navigator !== 'undefined' && 'ontouchstart' in window)

	return {
		type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
		mobile: isMobile,
		tablet: isTablet,
		desktop: !isMobile && !isTablet,
		touch: isTouch,
		phone: isIPhone || isAndroidPhone,
		ipad: isIPad,
		iphone: isIPhone,
		androidPhone: isAndroidPhone,
		androidTablet: isAndroidTablet,
	}
}

// Cache for default detector
let cachedDeviceInfo: DeviceInfo | null = null

/**
 * Get device info (cached)
 */
export function getDeviceInfo(): DeviceInfo {
	if (cachedDeviceInfo) return cachedDeviceInfo
	cachedDeviceInfo = parseDevice(getUserAgent())
	return cachedDeviceInfo
}

/**
 * Check if mobile device
 */
export function isMobile(ua?: string): boolean {
	if (ua) return parseDevice(ua).mobile
	return getDeviceInfo().mobile
}

/**
 * Check if tablet device
 */
export function isTablet(ua?: string): boolean {
	if (ua) return parseDevice(ua).tablet
	return getDeviceInfo().tablet
}

/**
 * Check if desktop device
 */
export function isDesktop(ua?: string): boolean {
	if (ua) return parseDevice(ua).desktop
	return getDeviceInfo().desktop
}

/**
 * Check if touch device
 */
export function isTouch(ua?: string): boolean {
	if (ua) return parseDevice(ua).touch
	return getDeviceInfo().touch
}

/**
 * Check if iPhone
 */
export function isIPhone(ua?: string): boolean {
	if (ua) return DEVICE_PATTERNS.iphone.test(ua)
	return getDeviceInfo().iphone
}

/**
 * Check if iPad
 */
export function isIPad(ua?: string): boolean {
	if (ua) return DEVICE_PATTERNS.ipad.test(ua)
	return getDeviceInfo().ipad
}

/**
 * Check if Android phone
 */
export function isAndroidPhone(ua?: string): boolean {
	if (ua) return DEVICE_PATTERNS.androidPhone.test(ua)
	return getDeviceInfo().androidPhone
}

/**
 * Check if Android tablet
 */
export function isAndroidTablet(ua?: string): boolean {
	if (ua) return DEVICE_PATTERNS.androidTablet.test(ua)
	return getDeviceInfo().androidTablet
}

/**
 * Get device type
 */
export function getDeviceType(ua?: string): DeviceType {
	if (ua) return parseDevice(ua).type
	return getDeviceInfo().type
}

// Reset cache (for testing)
export function _resetDeviceCache(): void {
	cachedDeviceInfo = null
}
