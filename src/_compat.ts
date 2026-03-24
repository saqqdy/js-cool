/**
 * Internal compatibility utilities for IE11 support
 *
 * This module provides IE11-compatible alternatives to ES6+ features
 * without requiring external polyfills.
 *
 * Strategy: Prefer native APIs when available, fallback to custom implementations.
 * This gives modern browsers native performance while supporting IE11.
 *
 * @internal
 * @since 6.0.0
 */

// ==================== Array ====================

/**
 * IE11-compatible alternative to Array.prototype.includes()
 * Uses native method when available for better performance.
 */
function _arrayIncludes<T>(arr: T[], item: T): boolean {
	return arr.indexOf(item) !== -1
}

export const arrayIncludes: <T>(arr: T[], item: T) => boolean =
	typeof Array.prototype.includes === 'function'
		? (arr, item) => arr.includes(item)
		: _arrayIncludes

// ==================== String ====================

/**
 * IE11-compatible alternative to String.prototype.includes()
 * Uses native method when available for better performance.
 */
function _strIncludes(str: string, search: string): boolean {
	return str.indexOf(search) !== -1
}

export const strIncludes: (str: string, search: string) => boolean =
	typeof String.prototype.includes === 'function'
		? (str, search) => str.includes(search)
		: _strIncludes

/**
 * IE11-compatible alternative to String.prototype.startsWith()
 * Uses native method when available for better performance.
 */
function _strStartsWith(str: string, search: string): boolean {
	return str.indexOf(search) === 0
}

export const strStartsWith: (str: string, search: string) => boolean =
	typeof String.prototype.startsWith === 'function'
		? (str, search) => str.startsWith(search)
		: _strStartsWith

/**
 * IE11-compatible alternative to String.prototype.endsWith()
 * Uses native method when available for better performance.
 */
function _strEndsWith(str: string, search: string): boolean {
	const index = str.lastIndexOf(search)
	return index !== -1 && index === str.length - search.length
}

export const strEndsWith: (str: string, search: string) => boolean =
	typeof String.prototype.endsWith === 'function'
		? (str, search) => str.endsWith(search)
		: _strEndsWith

/**
 * IE11-compatible alternative to String.prototype.padStart()
 * Uses native method when available for better performance.
 */
function _padStart(str: string, len: number, fill: string = ' '): string {
	str = String(str)
	if (str.length >= len) return str
	const fillLen = len - str.length
	const fillStr = new Array(Math.ceil(fillLen / fill.length) + 1).join(fill).slice(0, fillLen)
	return fillStr + str
}

export const padStart: (str: string, len: number, fill?: string) => string =
	typeof String.prototype.padStart === 'function'
		? (str, len, fill = ' ') => str.padStart(len, fill)
		: _padStart

/**
 * IE11-compatible alternative to String.prototype.padEnd()
 * Uses native method when available for better performance.
 */
function _padEnd(str: string, len: number, fill: string = ' '): string {
	str = String(str)
	if (str.length >= len) return str
	const fillLen = len - str.length
	const fillStr = new Array(Math.ceil(fillLen / fill.length) + 1).join(fill).slice(0, fillLen)
	return str + fillStr
}

export const padEnd: (str: string, len: number, fill?: string) => string =
	typeof String.prototype.padEnd === 'function'
		? (str, len, fill = ' ') => str.padEnd(len, fill)
		: _padEnd

// ==================== Number ====================

/**
 * IE11-compatible alternative to Number.isNaN()
 * Uses native method when available for better performance.
 */
function _isNumberNaN(val: unknown): boolean {
	return typeof val === 'number' && val !== val
}

export const isNumberNaN: (val: unknown) => boolean =
	typeof Number.isNaN === 'function' ? Number.isNaN : _isNumberNaN

/**
 * IE11-compatible alternative to Number.isFinite()
 * Uses native method when available for better performance.
 */
function _isNumberFinite(val: unknown): boolean {
	return typeof val === 'number' && isFinite(val)
}

export const isNumberFinite: (val: unknown) => boolean =
	typeof Number.isFinite === 'function' ? Number.isFinite : _isNumberFinite

/**
 * IE11-compatible alternative to Number.isInteger()
 * Uses native method when available for better performance.
 */
function _isNumberInteger(val: unknown): boolean {
	return typeof val === 'number' && isFinite(val) && Math.floor(val) === val
}

export const isNumberInteger: (val: unknown) => boolean =
	typeof Number.isInteger === 'function' ? Number.isInteger : _isNumberInteger

/**
 * IE11-compatible alternative to Number.isSafeInteger()
 * Uses native method when available for better performance.
 */
function _isSafeInteger(val: unknown): boolean {
	return (
		typeof val === 'number' &&
		val === val && // not NaN
		isFinite(val) &&
		Math.floor(val) === val &&
		Math.abs(val) <= 9007199254740991
	)
}

export const isSafeInteger: (val: unknown) => boolean =
	typeof Number.isSafeInteger === 'function' ? Number.isSafeInteger : _isSafeInteger

// ==================== Object ====================

/**
 * IE11-compatible alternative to Object.assign()
 * Uses native method when available for better performance.
 */
function _objectAssign<T extends object>(target: T, ...sources: object[]): T {
	if (target == null) {
		throw new TypeError('Cannot convert undefined or null to object')
	}
	const to = new Object(target) as Record<string, unknown>
	for (const source of sources) {
		if (source != null) {
			const src = source as Record<string, unknown>
			for (const key in src) {
				if (Object.prototype.hasOwnProperty.call(src, key)) {
					to[key] = src[key]
				}
			}
		}
	}
	return to as T
}

export const objectAssign: <T extends object>(target: T, ...sources: object[]) => T =
	typeof Object.assign === 'function' ? Object.assign : _objectAssign

/**
 * IE11-compatible alternative to Object.values()
 * Uses native method when available for better performance.
 */
function _objectValues<T>(obj: Record<string, T>): T[] {
	const values: T[] = []
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			values.push(obj[key])
		}
	}
	return values
}

export const objectValues: <T>(obj: Record<string, T>) => T[] =
	typeof Object.values === 'function' ? Object.values : _objectValues

/**
 * IE11-compatible alternative to Object.entries()
 * Uses native method when available for better performance.
 */
function _objectEntries<T>(obj: Record<string, T>): [string, T][] {
	const entries: [string, T][] = []
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			entries.push([key, obj[key]])
		}
	}
	return entries
}

export const objectEntries: <T>(obj: Record<string, T>) => [string, T][] =
	typeof Object.entries === 'function' ? Object.entries : _objectEntries

/**
 * IE11-compatible alternative to Object.fromEntries()
 * Uses native method when available for better performance.
 */
function _objectFromEntries<T>(entries: Iterable<[string, T]>): Record<string, T> {
	const obj: Record<string, T> = {}
	for (const [key, value] of entries) {
		obj[key] = value
	}
	return obj
}

export const objectFromEntries: <T>(entries: Iterable<[string, T]>) => Record<string, T> =
	typeof Object.fromEntries === 'function' ? Object.fromEntries : _objectFromEntries

// ==================== Global ====================

/**
 * IE11-compatible way to get the global object
 * Uses globalThis when available, falls back to environment-specific globals.
 */
export function getGlobalObject(): object {
	// Try globalThis (ES2020)
	if (typeof globalThis !== 'undefined') {
		return globalThis
	}
	// Try window (browser)
	if (typeof window !== 'undefined') {
		return window
	}
	// Try self (Web Worker)
	if (typeof self !== 'undefined') {
		return self
	}
	// Fallback
	return {}
}

// ==================== Unique (Set alternative) ====================

/**
 * IE11-compatible array unique (alternative to [...new Set(arr)])
 * Uses Set when available for better performance.
 */
function _arrayUnique<T>(arr: T[]): T[] {
	const result: T[] = []
	for (const item of arr) {
		if (result.indexOf(item) === -1) {
			result.push(item)
		}
	}
	return result
}

export const arrayUnique: <T>(arr: T[]) => T[] =
	typeof Set === 'function' ? arr => [...new Set(arr)] : _arrayUnique

// ==================== Iterable Check ====================

/**
 * IE11-compatible iterable check
 * Symbol.iterator does not exist in IE11
 */
export function isIterableCompat(target: unknown): boolean {
	if (target === null || target === undefined) return false
	if (typeof target === 'string') return true
	if (Array.isArray(target)) return true
	// Primitives are not iterable (except strings handled above)
	if (typeof target !== 'object') return false

	// Symbol may not exist in IE11
	if (typeof Symbol === 'undefined' || !Symbol.iterator) {
		return false
	}

	return Symbol.iterator in (target as Iterable<unknown>)
}

// ==================== File Constructor ====================

/**
 * IE11-compatible File constructor
 * IE11 does not support new File(), fallback to Blob
 */
export function createFile(
	// eslint-disable-next-line no-undef
	parts: BlobPart[],
	name: string,
	// eslint-disable-next-line no-undef
	options?: BlobPropertyBag
): File | Blob {
	// IE11 does not support File constructor
	if (typeof File === 'undefined') {
		const blob = new Blob(parts, options)
		// Add name property to simulate File
		;(blob as any).name = name
		return blob
	}
	return new File(parts, name, options)
}
