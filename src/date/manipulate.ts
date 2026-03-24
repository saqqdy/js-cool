/**
 * Date manipulation utilities
 *
 * @module date
 * @since 6.0.0
 */

import type { DateInput, DateUnit } from './types'

/**
 * Get the number of days in a month
 *
 * @example
 * ```ts
 * getDaysInMonth(2024, 0)  // January 2024
 * // => 31
 *
 * getDaysInMonth(2024, 1)  // February 2024 (leap year)
 * // => 29
 *
 * getDaysInMonth(2023, 1)  // February 2023
 * // => 28
 * ```
 */
export function getDaysInMonth(year: number, month: number): number {
	// Create a date for the first day of the next month, then subtract one day
	return new Date(year, month + 1, 0).getDate()
}

/**
 * Get quarter of year (1-4)
 */
export function getQuarter(date: DateInput): number {
	const d = new Date(date)
	return Math.floor(d.getMonth() / 3) + 1
}

/**
 * Get day of year (1-366)
 */
export function getDayOfYear(date: DateInput): number {
	const d = new Date(date)
	const start = new Date(d.getFullYear(), 0, 0)
	const diff = d.getTime() - start.getTime()
	return Math.floor(diff / (1000 * 60 * 60 * 24))
}

/**
 * Get week of year (ISO week)
 */
export function getWeekOfYear(date: DateInput): number {
	const d = new Date(date)
	// Create a copy of the date
	const target = new Date(d.getTime())
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	target.setUTCDate(target.getUTCDate() + 4 - (target.getUTCDay() || 7))
	// Get first day of year
	const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1))
	// Calculate full weeks to nearest Thursday
	return Math.ceil(((target.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

/**
 * Add time to a date
 *
 * @example
 * ```ts
 * add(new Date(), 1, 'day')  // Tomorrow
 * add(new Date(), 2, 'week')  // 2 weeks from now
 * ```
 */
export function add(date: DateInput, value: number, unit: DateUnit): Date {
	const d = new Date(date)
	const result = new Date(d)

	switch (unit) {
		case 'millisecond':
			result.setMilliseconds(result.getMilliseconds() + value)
			break
		case 'second':
			result.setSeconds(result.getSeconds() + value)
			break
		case 'minute':
			result.setMinutes(result.getMinutes() + value)
			break
		case 'hour':
			result.setHours(result.getHours() + value)
			break
		case 'day':
			result.setDate(result.getDate() + value)
			break
		case 'week':
			result.setDate(result.getDate() + value * 7)
			break
		case 'month':
			result.setMonth(result.getMonth() + value)
			break
		case 'year':
			result.setFullYear(result.getFullYear() + value)
			break
	}

	return result
}

/**
 * Subtract time from a date
 */
export function subtract(date: DateInput, value: number, unit: DateUnit): Date {
	return add(date, -value, unit)
}

/**
 * Get start of time period
 *
 * @example
 * ```ts
 * startOf(new Date(), 'day')  // Today at 00:00:00
 * startOf(new Date(), 'month')  // First day of month at 00:00:00
 * startOf(new Date(), 'year')  // January 1st at 00:00:00
 * ```
 */
export function startOf(date: DateInput, unit: DateUnit): Date {
	const d = new Date(date)
	const result = new Date(d)

	switch (unit) {
		case 'millisecond':
			return result
		case 'second':
			result.setMilliseconds(0)
			break
		case 'minute':
			result.setSeconds(0, 0)
			break
		case 'hour':
			result.setMinutes(0, 0, 0)
			break
		case 'day':
			result.setHours(0, 0, 0, 0)
			break
		case 'week': {
			const day = result.getDay()
			result.setDate(result.getDate() - day)
			result.setHours(0, 0, 0, 0)
			break
		}
		case 'month':
			result.setDate(1)
			result.setHours(0, 0, 0, 0)
			break
		case 'year':
			result.setMonth(0, 1)
			result.setHours(0, 0, 0, 0)
			break
	}

	return result
}

/**
 * Get end of time period
 *
 * @example
 * ```ts
 * endOf(new Date(), 'day')  // Today at 23:59:59.999
 * endOf(new Date(), 'month')  // Last day of month at 23:59:59.999
 * ```
 */
export function endOf(date: DateInput, unit: DateUnit): Date {
	const d = new Date(date)
	const result = new Date(d)

	switch (unit) {
		case 'millisecond':
			return result
		case 'second':
			result.setMilliseconds(999)
			break
		case 'minute':
			result.setSeconds(59, 999)
			break
		case 'hour':
			result.setMinutes(59, 59, 999)
			break
		case 'day':
			result.setHours(23, 59, 59, 999)
			break
		case 'week': {
			const day = result.getDay()
			result.setDate(result.getDate() + (6 - day))
			result.setHours(23, 59, 59, 999)
			break
		}
		case 'month':
			result.setMonth(result.getMonth() + 1, 0) // Last day of month
			result.setHours(23, 59, 59, 999)
			break
		case 'year':
			result.setMonth(11, 31) // December 31st
			result.setHours(23, 59, 59, 999)
			break
	}

	return result
}

/**
 * Clone a date
 */
export function clone(date: DateInput): Date {
	return new Date(date)
}

/**
 * Set time to midnight (00:00:00)
 */
export function toMidnight(date: DateInput): Date {
	return startOf(date, 'day')
}

/**
 * Set time to end of day (23:59:59)
 */
export function toEndOfDay(date: DateInput): Date {
	return endOf(date, 'day')
}
