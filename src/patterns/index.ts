/**
 * Patterns module - unified entry for all regex patterns
 *
 * @module patterns
 * @since 6.0.0
 */

// Import UA patterns from sub-module
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

// Import validation patterns
import { validation } from './validation'

// Import extract patterns
import { extract } from './extract'

// Re-export validation patterns
export { validation, type ValidationPatternName } from './validation'

// Re-export extract patterns
export { extract, type ExtractPatternName } from './extract'

// Re-export UA patterns from sub-module
export {
	BROWSER_PATTERNS,
	DEVICE_PATTERNS,
	ENGINE_PATTERNS,
	ENV_PATTERNS,
	extractVersion,
	getUserAgent,
	matchPattern,
	OS_PATTERNS,
	type BrowserPatternName,
	type DevicePatternName,
	type EnginePatternName,
	type EnvPatternName,
	type OSPatternName,
} from './ua'

/**
 * Unified patterns object combining validation, extract and UA patterns
 *
 * @example
 * ```js
 * import { patterns } from 'js-cool'
 *
 * // Validation patterns
 * patterns.validation.email.test('user@example.com') // true
 * patterns.validation.mobile.test('13800138000') // true
 *
 * // Extract patterns
 * 'Price: $99.99'.match(patterns.extract.number) // ['99.99']
 * 'Chrome/120.0.0'.match(patterns.extract.version) // ['120.0.0']
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
	 * Extract patterns for extracting data from strings
	 */
	extract,

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
