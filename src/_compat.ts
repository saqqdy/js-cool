/**
 * Internal compatibility utilities for IE11 support
 *
 * This module provides IE11-compatible alternatives to ES6+ features
 * without requiring external polyfills.
 *
 * @internal
 * @since 6.0.0
 */

// ==================== Array ====================

/**
 * IE11-compatible alternative to Array.includes()
 */
export function arrayIncludes<T>(arr: T[], item: T): boolean {
	return arr.indexOf(item) !== -1
}

// ==================== String ====================

/**
 * IE11-compatible alternative to String.includes()
 */
export function strIncludes(str: string, search: string): boolean {
	return str.indexOf(search) !== -1
}

/**
 * IE11-compatible alternative to String.startsWith()
 */
export function strStartsWith(str: string, search: string): boolean {
	return str.indexOf(search) === 0
}

/**
 * IE11-compatible alternative to String.endsWith()
 */
export function strEndsWith(str: string, search: string): boolean {
	const index = str.lastIndexOf(search)
	return index !== -1 && index === str.length - search.length
}

/**
 * IE11-compatible alternative to String.padStart()
 */
export function padStart(str: string, len: number, fill: string = ' '): string {
	str = String(str)
	if (str.length >= len) return str
	const fillLen = len - str.length
	const fillStr = new Array(Math.ceil(fillLen / fill.length) + 1).join(fill).slice(0, fillLen)
	return fillStr + str
}

/**
 * IE11-compatible alternative to String.padEnd()
 */
export function padEnd(str: string, len: number, fill: string = ' '): string {
	str = String(str)
	if (str.length >= len) return str
	const fillLen = len - str.length
	const fillStr = new Array(Math.ceil(fillLen / fill.length) + 1).join(fill).slice(0, fillLen)
	return str + fillStr
}

// ==================== Number ====================

/**
 * IE11-compatible alternative to Number.isNaN()
 */
export function isNumberNaN(val: unknown): boolean {
	return typeof val === 'number' && val !== val
}

/**
 * IE11-compatible alternative to Number.isFinite()
 */
export function isNumberFinite(val: unknown): boolean {
	return typeof val === 'number' && isFinite(val)
}

/**
 * IE11-compatible alternative to Number.isInteger()
 */
export function isNumberInteger(val: unknown): boolean {
	return typeof val === 'number' && isFinite(val) && Math.floor(val) === val
}

/**
 * IE11-compatible alternative to Number.isSafeInteger()
 */
export function isSafeInteger(val: unknown): boolean {
	return (
		typeof val === 'number' &&
		val === val && // not NaN
		isFinite(val) &&
		Math.floor(val) === val &&
		Math.abs(val) <= 9007199254740991
	)
}

// ==================== Object ====================

/**
 * IE11-compatible alternative to Object.assign()
 */
export function objectAssign<T extends object>(target: T, ...sources: object[]): T {
	if (target == null) {
		throw new TypeError('Cannot convert undefined or null to object')
	}
	const to = (new Object(target)) as Record<string, unknown>
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

/**
 * IE11-compatible alternative to Object.values()
 */
export function objectValues<T>(obj: Record<string, T>): T[] {
	const values: T[] = []
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			values.push(obj[key])
		}
	}
	return values
}

/**
 * IE11-compatible alternative to Object.entries()
 */
export function objectEntries<T>(obj: Record<string, T>): [string, T][] {
	const entries: [string, T][] = []
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			entries.push([key, obj[key]])
		}
	}
	return entries
}

/**
 * IE11-compatible alternative to Object.fromEntries()
 */
export function objectFromEntries<T>(entries: Iterable<[string, T]>): Record<string, T> {
	const obj: Record<string, T> = {}
	for (const [key, value] of entries) {
		obj[key] = value
	}
	return obj
}

// ==================== Global ====================

/**
 * IE11-compatible way to get the global object
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
 */
export function arrayUnique<T>(arr: T[]): T[] {
	const result: T[] = []
	for (const item of arr) {
		if (result.indexOf(item) === -1) {
			result.push(item)
		}
	}
	return result
}

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
