/**
 * Precompiled regex patterns for User Agent detection
 *
 * @deprecated Use `patterns.ua` instead. This module will be removed in the next major version.
 * @internal
 * @module ua/patterns
 */

// Re-export from new location
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
} from '../patterns/ua'
