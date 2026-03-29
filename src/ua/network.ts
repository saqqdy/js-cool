/**
 * Network information module
 *
 * @example
 * ```ts
 * import { getNetworkInfo, isOnline } from 'js-cool/ua'
 *
 * isOnline()            // true/false
 * getNetworkInfo()      // { online, type, effectiveType, downlink, rtt, saveData }
 * ```
 *
 * @module ua/network
 */

import type { NetworkInfo } from './types'

/**
 * Get network information
 *
 * Uses Navigator Connection API when available.
 * Falls back to basic navigator.onLine check.
 */
export function getNetworkInfo(): NetworkInfo {
	if (typeof navigator === 'undefined') {
		return {
			type: 'unknown',
			online: false,
			effectiveType: 'unknown',
			downlink: 0,
			rtt: 0,
			saveData: false,
		}
	}

	const connection =
		(navigator as any).connection ||
		(navigator as any).mozConnection ||
		(navigator as any).webkitConnection

	return {
		type: connection?.type || 'unknown',
		online: navigator.onLine,
		effectiveType: connection?.effectiveType || 'unknown',
		downlink: connection?.downlink || 0,
		rtt: connection?.rtt || 0,
		saveData: connection?.saveData || false,
	}
}

/**
 * Check if online
 */
export function isOnline(): boolean {
	if (typeof navigator === 'undefined') return false
	return navigator.onLine
}

/**
 * Check if offline
 */
export function isOffline(): boolean {
	return !isOnline()
}

/**
 * Get connection type
 */
export function getConnectionType(): 'wifi' | 'cellular' | 'ethernet' | 'none' | 'unknown' {
	return getNetworkInfo().type
}

/**
 * Get effective connection type (4g, 3g, 2g, etc.)
 */
export function getEffectiveType(): '4g' | '3g' | '2g' | 'slow-2g' | 'unknown' {
	return getNetworkInfo().effectiveType
}

/**
 * Get downlink speed (Mbps)
 */
export function getDownlink(): number {
	return getNetworkInfo().downlink
}

/**
 * Get round-trip time (ms)
 */
export function getRTT(): number {
	return getNetworkInfo().rtt
}

/**
 * Check if data saver mode is enabled
 */
export function isSaveData(): boolean {
	return getNetworkInfo().saveData
}

/**
 * Check if connection is slow (2g or slow-2g)
 */
export function isSlowConnection(): boolean {
	const { effectiveType } = getNetworkInfo()
	return effectiveType === '2g' || effectiveType === 'slow-2g'
}

/**
 * Check if connection is fast (4g)
 */
export function isFastConnection(): boolean {
	return getNetworkInfo().effectiveType === '4g'
}
