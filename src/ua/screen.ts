/**
 * Screen information module
 *
 * @example
 * ```ts
 * import { getScreenInfo, isDarkMode, isLandscape } from 'js-cool/ua'
 *
 * isDarkMode()          // true/false
 * isLandscape()         // true/false
 * getScreenInfo()       // { width, height, pixelRatio, orientation, colorDepth }
 * ```
 *
 * @module ua/screen
 */

import type { ScreenInfo } from './types'

/**
 * Get screen information
 */
export function getScreenInfo(): ScreenInfo {
	if (typeof screen === 'undefined') {
		return {
			width: 0,
			height: 0,
			pixelRatio: 1,
			orientation: 'portrait',
			colorDepth: 24,
			availWidth: 0,
			availHeight: 0,
		}
	}

	const orientation = screen.orientation?.type || ''

	return {
		width: screen.width,
		height: screen.height,
		pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
		orientation: orientation.indexOf('portrait') !== -1 ? 'portrait' : 'landscape',
		colorDepth: screen.colorDepth,
		availWidth: screen.availWidth,
		availHeight: screen.availHeight,
	}
}

/**
 * Get screen width
 */
export function getScreenWidth(): number {
	return getScreenInfo().width
}

/**
 * Get screen height
 */
export function getScreenHeight(): number {
	return getScreenInfo().height
}

/**
 * Get device pixel ratio
 */
export function getPixelRatio(): number {
	return getScreenInfo().pixelRatio
}

/**
 * Get screen orientation
 */
export function getOrientation(): 'portrait' | 'landscape' {
	return getScreenInfo().orientation
}

/**
 * Check if portrait orientation
 */
export function isPortrait(): boolean {
	return getOrientation() === 'portrait'
}

/**
 * Check if landscape orientation
 */
export function isLandscape(): boolean {
	return getOrientation() === 'landscape'
}

/**
 * Get orientation status (alias for getOrientation)
 *
 * Uses screen.orientation API when available.
 * Falls back to window dimensions comparison.
 */
export function getOrientationStatus(): 'portrait' | 'landscape' {
	if (typeof window === 'undefined') return 'portrait'

	if (screen?.orientation) {
		return screen.orientation.type.indexOf('portrait') !== -1 ? 'portrait' : 'landscape'
	}

	// Fallback for older browsers
	return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
}

/**
 * Get color depth
 */
export function getColorDepth(): number {
	return getScreenInfo().colorDepth
}

/**
 * Get available screen width
 */
export function getAvailWidth(): number {
	return getScreenInfo().availWidth
}

/**
 * Get available screen height
 */
export function getAvailHeight(): number {
	return getScreenInfo().availHeight
}

/**
 * Check if dark mode is preferred
 */
export function isDarkMode(): boolean {
	if (typeof window === 'undefined') return false
	return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

/**
 * Check if light mode is preferred
 */
export function isLightMode(): boolean {
	if (typeof window === 'undefined') return false
	return window.matchMedia?.('(prefers-color-scheme: light)').matches ?? false
}

/**
 * Check if reduced motion is preferred
 */
export function isReducedMotion(): boolean {
	if (typeof window === 'undefined') return false
	return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

/**
 * Check if high contrast mode is enabled
 */
export function isHighContrast(): boolean {
	if (typeof window === 'undefined') return false
	return window.matchMedia?.('(prefers-contrast: more)').matches ?? false
}

/**
 * Check if HDR display
 */
export function isHDR(): boolean {
	if (typeof window === 'undefined') return false
	return window.matchMedia?.('(dynamic-range: high)').matches ?? false
}
