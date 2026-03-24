/**
 * Date parsing utilities
 *
 * @module date
 * @since 6.0.0
 */

import { isNumberNaN } from '../_compat'
import type { DateInput } from './types'

/**
 * Parse date input to Date object
 * Returns null if invalid
 *
 * @example
 * ```ts
 * parseDate(new Date())  // Date object
 * parseDate('2024-01-01')  // Date object
 * parseDate(1704067200000)  // Date object from timestamp
 * parseDate('invalid')  // null
 * ```
 */
export function parseDate(input?: DateInput): Date | null {
	if (input === undefined || input === null) {
		return new Date()
	}

	const d = new Date(input)

	if (isNumberNaN(d.getTime())) {
		return null
	}

	return d
}

/**
 * Parse date string with custom format
 * Supports common date formats
 *
 * @example
 * ```ts
 * parseDateWithFormat('2024-01-15', 'YYYY-MM-DD')
 * parseDateWithFormat('15/01/2024', 'DD/MM/YYYY')
 * ```
 */
export function parseDateWithFormat(dateStr: string, format: string): Date | null {
	// Extract format positions
	const formatMap: Record<string, number> = {}
	let idx = 0

	for (let i = 0; i < format.length; i++) {
		const char = format[i]
		if (
			char === 'Y' ||
			char === 'M' ||
			char === 'D' ||
			char === 'H' ||
			char === 'm' ||
			char === 's'
		) {
			if (formatMap[char] === undefined) {
				formatMap[char] = idx
				idx++
			}
		} else if (char !== dateStr[i]) {
			// Separator mismatch, might still work with regex
		}
	}

	// Simple extraction for common formats
	const yearMatch = dateStr.match(/(\d{4})/)
	const monthMatch = dateStr.match(/[-/](\d{1,2})[-/]/)
	const dayMatch = dateStr.match(/[-/](\d{1,2})(?:\s|$|T)/)

	if (!yearMatch) return null

	const year = parseInt(yearMatch[1], 10)
	// eslint-disable-next-line one-var
	let month = 0, // Default January
		day = 1 // Default 1st

	if (monthMatch) {
		month = parseInt(monthMatch[1], 10) - 1 // 0-indexed
	}

	if (dayMatch) {
		day = parseInt(dayMatch[1], 10)
	}

	const d = new Date(year, month, day)

	if (isNumberNaN(d.getTime())) {
		return null
	}

	return d
}

/**
 * Check if a date string is ISO 8601 format
 */
export function isISODateString(str: string): boolean {
	return /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})?)?$/.test(str)
}

/**
 * Parse ISO date string
 */
export function parseISODate(str: string): Date | null {
	if (!isISODateString(str)) return null
	const d = new Date(str)
	return isNumberNaN(d.getTime()) ? null : d
}
