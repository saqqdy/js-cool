/**
 * @deprecated Use `ua.types` instead. Will be removed in v7.0.0
 *
 * This module is kept for backward compatibility only.
 * Please migrate to the new `ua.types` module.
 *
 * @see {@link ua.types} for the new type definitions
 * @module client.types
 */

// Re-export everything from ua.types for backward compatibility
export type {
	DeviceType,
	OSName,
	BrowserName,
	EngineName,
	OSInfo,
	BrowserInfo,
	EnvironmentInfo,
	DeviceInfo,
	NetworkInfo,
	ScreenInfo,
	UAInfo as ClientInfo,
	LegacyClientResult,
	UAGetType as ClientGetType,
	IUADetector as IClientDetector,
} from './ua/types'
