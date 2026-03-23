/**
 * Patterns module - unified entry for all regex patterns
 *
 * @module patterns
 * @since 6.0.0
 */

// Re-export validation patterns
// Import for unified patterns object
import { validation } from './validation'
import {
	BROWSER_PATTERNS,
	DEVICE_PATTERNS,
	ENGINE_PATTERNS,
	ENV_PATTERNS,
	extractVersion,
	getUserAgent,
	matchPattern,
	OS_PATTERNS,
} from './ua'

// Re-export UA patterns
export {
	DEVICE_PATTERNS,
	OS_PATTERNS,
	BROWSER_PATTERNS,
	ENGINE_PATTERNS,
	ENV_PATTERNS,
	getUserAgent,
	matchPattern,
	extractVersion,
	type DevicePatternName,
	type OSPatternName,
	type BrowserPatternName,
	type EnginePatternName,
	type EnvPatternName,
} from './ua'

export { validation, type ValidationPatternName } from './validation'

/**
 * Unified patterns object combining validation and UA patterns
 *
 * @example
 * ```js
 * import { patterns } from 'js-cool'
 *
 * // Validation patterns
 * patterns.validation.email.test('user@example.com') // true
 * patterns.validation.mobile.test('13800138000') // true
 *
 * // UA patterns
 * patterns.ua.device.mobile.test(navigator.userAgent) // true/false
 * patterns.ua.browser.chrome.test(navigator.userAgent) // true/false
 *
 * // Utility functions
 * patterns.ua.getUserAgent() // get UA string
 * patterns.ua.matchPattern(ua, /Chrome/i) // check pattern
 * patterns.ua.extractVersion(ua, /Chrome\/(\d+)/i) // extract version
 * ```
 */
export const patterns = {
	/**
	 * Validation patterns for common formats
	 */
	validation,

	/**
	 * UA (User Agent) detection patterns and utilities
	 */
	ua: {
		/** Device detection patterns */
		device: DEVICE_PATTERNS,
		/** OS detection patterns */
		os: OS_PATTERNS,
		/** Browser detection patterns */
		browser: BROWSER_PATTERNS,
		/** Engine detection patterns */
		engine: ENGINE_PATTERNS,
		/** Environment detection patterns (Chinese apps, etc.) */
		env: ENV_PATTERNS,
		/** Get user agent string safely */
		getUserAgent,
		/** Check if pattern exists in UA */
		matchPattern,
		/** Extract version from UA */
		extractVersion,
	},
} as const

export default patterns
