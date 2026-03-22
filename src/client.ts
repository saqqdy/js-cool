/**
 * @deprecated Use `ua` instead. Will be removed in v7.0.0
 *
 * This module is kept for backward compatibility only.
 * Please migrate to the new `ua` module.
 *
 * @example
 * ```ts
 * // Old (deprecated)
 * import { client } from 'js-cool'
 *
 * // New (recommended)
 * import { ua } from 'js-cool'
 * ```
 *
 * @see {@link ua} for the new API
 * @module client
 */

// Re-export everything from ua module for backward compatibility
export { default, UADetector as ClientDetector, UADetector as Client } from './ua/index'

export type {
	UAInfo as ClientInfo,
	DeviceInfo,
	OSInfo,
	BrowserInfo,
	EnvironmentInfo,
	NetworkInfo,
	ScreenInfo,
	LegacyClientResult,
	UAGetType as ClientGetType,
	IUADetector as IClientDetector,
	OSName,
	BrowserName,
	EngineName,
	DeviceType,
} from './ua/types'
