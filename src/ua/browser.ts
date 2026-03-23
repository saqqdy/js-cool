/**
 * Browser detection module
 *
 * @example
 * ```ts
 * import { isChrome, isFirefox, getBrowserInfo } from 'js-cool/ua'
 *
 * isChrome()           // true/false
 * isFirefox()          // true/false
 * getBrowserInfo()     // { name: 'Chrome', version: '120.0', engine: 'Blink' }
 * ```
 *
 * @module ua/browser
 */

import type { BrowserInfo, BrowserName, EngineName } from './types'
import { BROWSER_PATTERNS, ENGINE_PATTERNS, getUserAgent } from './patterns'

/**
 * Detect browser engine
 */
export function detectEngine(ua: string): EngineName {
	if (ENGINE_PATTERNS.blink.test(ua) || BROWSER_PATTERNS.edge.test(ua)) return 'Blink'
	if (ENGINE_PATTERNS.gecko.test(ua)) return 'Gecko'
	if (ENGINE_PATTERNS.webkit.test(ua)) return 'WebKit'
	if (ENGINE_PATTERNS.trident.test(ua)) return 'Trident'
	if (ENGINE_PATTERNS.edgeHTML.test(ua)) return 'EdgeHTML'
	return 'Unknown'
}

/**
 * Parse browser information from user agent
 */
export function parseBrowser(ua: string): BrowserInfo {
	// Browser detection order matters - more specific first

	// Edge (Chromium)
	const edgeMatch = ua.match(BROWSER_PATTERNS.edge)
	if (edgeMatch) {
		return { name: 'Edge', version: edgeMatch[1] || '', engine: 'Blink' }
	}

	// Opera
	const operaMatch = ua.match(BROWSER_PATTERNS.opera)
	if (operaMatch) {
		return { name: 'Opera', version: operaMatch[1] || '', engine: 'Blink' }
	}

	// Samsung Browser
	const samsungMatch = ua.match(BROWSER_PATTERNS.samsung)
	if (samsungMatch) {
		return { name: 'Samsung', version: samsungMatch[1] || '', engine: 'Blink' }
	}

	// UC Browser
	const ucMatch = ua.match(BROWSER_PATTERNS.uc)
	if (ucMatch) {
		return { name: 'UC', version: ucMatch[1] || '', engine: detectEngine(ua) }
	}

	// Quark Browser
	const quarkMatch = ua.match(BROWSER_PATTERNS.quark)
	if (quarkMatch) {
		return { name: 'Quark', version: quarkMatch[1] || '', engine: 'Blink' }
	}

	// Vivaldi
	const vivaldiMatch = ua.match(BROWSER_PATTERNS.vivaldi)
	if (vivaldiMatch) {
		return { name: 'Vivaldi', version: vivaldiMatch[1] || '', engine: 'Blink' }
	}

	// Chrome (must check before Safari)
	const chromeMatch = ua.match(BROWSER_PATTERNS.chrome)
	if (chromeMatch && !ua.includes('Edge') && !ua.includes('OPR')) {
		return { name: 'Chrome', version: chromeMatch[1] || '', engine: 'Blink' }
	}

	// Safari (must check after Chrome)
	const safariMatch = ua.match(BROWSER_PATTERNS.safari)
	if (safariMatch && !ua.includes('Chrome')) {
		return { name: 'Safari', version: safariMatch[1] || '', engine: 'WebKit' }
	}

	// Firefox
	const firefoxMatch = ua.match(BROWSER_PATTERNS.firefox)
	if (firefoxMatch) {
		return { name: 'Firefox', version: firefoxMatch[1] || '', engine: 'Gecko' }
	}

	// IE
	const ieMatch = ua.match(BROWSER_PATTERNS.ie)
	if (ieMatch) {
		return { name: 'IE', version: ieMatch[1] || '', engine: 'Trident' }
	}

	return { name: 'Unknown', version: '', engine: 'Unknown' }
}

// Cache for default detector
let cachedBrowserInfo: BrowserInfo | null = null

/**
 * Get browser info (cached)
 */
export function getBrowserInfo(): BrowserInfo {
	if (cachedBrowserInfo) return cachedBrowserInfo
	cachedBrowserInfo = parseBrowser(getUserAgent())
	return cachedBrowserInfo
}

/**
 * Check if Chrome browser
 */
export function isChrome(ua?: string): boolean {
	if (ua) return parseBrowser(ua).name === 'Chrome'
	return getBrowserInfo().name === 'Chrome'
}

/**
 * Check if Firefox browser
 */
export function isFirefox(ua?: string): boolean {
	if (ua) return parseBrowser(ua).name === 'Firefox'
	return getBrowserInfo().name === 'Firefox'
}

/**
 * Check if Safari browser
 */
export function isSafari(ua?: string): boolean {
	if (ua) return parseBrowser(ua).name === 'Safari'
	return getBrowserInfo().name === 'Safari'
}

/**
 * Check if Edge browser
 */
export function isEdge(ua?: string): boolean {
	if (ua) return parseBrowser(ua).name === 'Edge'
	return getBrowserInfo().name === 'Edge'
}

/**
 * Check if IE browser
 */
export function isIE(ua?: string): boolean {
	if (ua) return parseBrowser(ua).name === 'IE'
	return getBrowserInfo().name === 'IE'
}

/**
 * Check if Opera browser
 */
export function isOpera(ua?: string): boolean {
	if (ua) return parseBrowser(ua).name === 'Opera'
	return getBrowserInfo().name === 'Opera'
}

/**
 * Check if Samsung browser
 */
export function isSamsung(ua?: string): boolean {
	if (ua) return parseBrowser(ua).name === 'Samsung'
	return getBrowserInfo().name === 'Samsung'
}

/**
 * Check if UC browser
 */
export function isUC(ua?: string): boolean {
	if (ua) return parseBrowser(ua).name === 'UC'
	return getBrowserInfo().name === 'UC'
}

/**
 * Get browser name
 */
export function getBrowserName(ua?: string): BrowserName {
	if (ua) return parseBrowser(ua).name
	return getBrowserInfo().name
}

/**
 * Get browser version
 */
export function getBrowserVersion(ua?: string): string {
	if (ua) return parseBrowser(ua).version
	return getBrowserInfo().version
}

/**
 * Get browser engine
 */
export function getBrowserEngine(ua?: string): EngineName {
	if (ua) return parseBrowser(ua).engine
	return getBrowserInfo().engine
}

/**
 * Check if Blink engine
 */
export function isBlink(ua?: string): boolean {
	if (ua) return parseBrowser(ua).engine === 'Blink'
	return getBrowserInfo().engine === 'Blink'
}

/**
 * Check if WebKit engine
 */
export function isWebKit(ua?: string): boolean {
	if (ua) return parseBrowser(ua).engine === 'WebKit'
	return getBrowserInfo().engine === 'WebKit'
}

/**
 * Check if Gecko engine
 */
export function isGecko(ua?: string): boolean {
	if (ua) return parseBrowser(ua).engine === 'Gecko'
	return getBrowserInfo().engine === 'Gecko'
}

// Reset cache (for testing)
export function _resetBrowserCache(): void {
	cachedBrowserInfo = null
}
