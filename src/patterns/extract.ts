/**
 * Extract regex patterns for extracting data from strings
 *
 * @module patterns/extract
 * @since 6.0.0
 */

/**
 * Extract patterns for extracting data from strings
 *
 * @example
 * ```js
 * import { extract } from 'js-cool'
 *
 * // Extract numbers from string
 * 'Price: $99.99'.match(extract.number) // ['99.99']
 * 'Temperature: -5.5°C'.match(extract.number) // ['-5.5']
 * 'a1b2c3'.match(extract.number) // ['1', '2', '3']
 *
 * // Extract versions from string
 * 'Chrome/120.0.0'.match(extract.version) // ['120.0.0']
 * 'v1.2.3-beta'.match(extract.version) // ['1.2.3']
 *
 * // Extract integers only
 * 'abc123def456'.match(extract.integer) // ['123', '456']
 *
 * // Extract decimals only
 * 'Price $9.99, Tax 1.50'.match(extract.decimal) // ['9.99', '1.50']
 * ```
 */
export const extract = {
	/**
	 * Extract numbers (integers, decimals, negative numbers)
	 * Use with string.match() for extraction
	 * @example
	 * 'Price: $99.99'.match(extract.number) // ['99.99']
	 * 'Temp: -5.5°C'.match(extract.number) // ['-5.5']
	 */
	number: /-?\d+\.?\d*/g,

	/**
	 * Extract version numbers (semver-like: major.minor.patch[.build])
	 * Supports 2-4 segment versions
	 * @example
	 * 'Chrome/120.0.6099.109'.match(extract.version) // ['120.0.6099.109']
	 * 'v1.2.3'.match(extract.version) // ['1.2.3']
	 */
	version: /\d+(?:\.\d+){1,3}/g,

	/**
	 * Extract integers only (no decimals)
	 * @example
	 * 'abc123def456'.match(extract.integer) // ['123', '456']
	 */
	integer: /-?\d+/g,

	/**
	 * Extract decimal numbers only (must have decimal point)
	 * @example
	 * 'Price $9.99, Qty 5'.match(extract.decimal) // ['9.99']
	 */
	decimal: /-?\d+\.\d+/g,

	/**
	 * Extract positive integers only
	 * @example
	 * 'abc-123def456'.match(extract.positiveInteger) // ['123', '456']
	 */
	positiveInteger: /\d+/g,
} as const

export type ExtractPatternName = keyof typeof extract
