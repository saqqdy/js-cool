/**
 * Date comparison utilities
 *
 * @module date
 * @since 6.0.0
 */

import { isNumberNaN } from '../_compat'
import type { DateComparisonUnit, DateInput } from './types'

// ============================================
// Internal comparison helpers
// ============================================

/** Check if two dates have the same year */
function sameYear(d1: Date, d2: Date): boolean {
	return d1.getFullYear() === d2.getFullYear()
}

/** Check if two dates have the same year and month */
function sameMonth(d1: Date, d2: Date): boolean {
	return sameYear(d1, d2) && d1.getMonth() === d2.getMonth()
}

/** Check if two dates have the same year, month, and day */
function sameDay(d1: Date, d2: Date): boolean {
	return sameMonth(d1, d2) && d1.getDate() === d2.getDate()
}

/** Check if two dates have the same year, month, day, and hour */
function sameHour(d1: Date, d2: Date): boolean {
	return sameDay(d1, d2) && d1.getHours() === d2.getHours()
}

/** Check if two dates have the same year, month, day, hour, and minute */
function sameMinute(d1: Date, d2: Date): boolean {
	return sameHour(d1, d2) && d1.getMinutes() === d2.getMinutes()
}

/** Check if two dates have the same year, month, day, hour, minute, and second */
function sameSecond(d1: Date, d2: Date): boolean {
	return sameMinute(d1, d2) && d1.getSeconds() === d2.getSeconds()
}

/** Comparison functions mapped by unit */
const sameByUnit: Record<DateComparisonUnit, (d1: Date, d2: Date) => boolean> = {
	year: sameYear,
	month: sameMonth,
	day: sameDay,
	hour: sameHour,
	minute: sameMinute,
	second: sameSecond,
}

// ============================================
// Day checks
// ============================================

/**
 * Check if date is today
 *
 * @example
 * ```ts
 * isToday(new Date())        // true
 * isToday('2024-01-01')      // false (if today is not 2024-01-01)
 * isToday(Date.now())        // true
 * ```
 */
export function isToday(date: DateInput): boolean {
	return sameDay(new Date(date), new Date())
}

/**
 * Check if date is yesterday
 *
 * @example
 * ```ts
 * const yesterday = new Date()
 * yesterday.setDate(yesterday.getDate() - 1)
 * isYesterday(yesterday)     // true
 * ```
 */
export function isYesterday(date: DateInput): boolean {
	const d = new Date(date)
	const yesterday = new Date()
	yesterday.setDate(yesterday.getDate() - 1)
	return sameDay(d, yesterday)
}

/**
 * Check if date is tomorrow
 *
 * @example
 * ```ts
 * const tomorrow = new Date()
 * tomorrow.setDate(tomorrow.getDate() + 1)
 * isTomorrow(tomorrow)       // true
 * ```
 */
export function isTomorrow(date: DateInput): boolean {
	const d = new Date(date)
	const tomorrow = new Date()
	tomorrow.setDate(tomorrow.getDate() + 1)
	return sameDay(d, tomorrow)
}

// ============================================
// Weekday/Weekend checks
// ============================================

/**
 * Check if date is weekend (Saturday or Sunday)
 *
 * @example
 * ```ts
 * isWeekend(new Date('2024-01-06'))  // true (Saturday)
 * isWeekend(new Date('2024-01-08'))  // false (Monday)
 * ```
 */
export function isWeekend(date: DateInput): boolean {
	const day = new Date(date).getDay()
	return day === 0 || day === 6
}

/**
 * Check if date is weekday (Monday to Friday)
 *
 * @example
 * ```ts
 * isWeekday(new Date('2024-01-08'))  // true (Monday)
 * isWeekday(new Date('2024-01-06'))  // false (Saturday)
 * ```
 */
export function isWeekday(date: DateInput): boolean {
	return !isWeekend(date)
}

// ============================================
// Leap year checks
// ============================================

/**
 * Check if year is a leap year
 *
 * @example
 * ```ts
 * isLeapYear(2024)   // true
 * isLeapYear(2023)   // false
 * isLeapYear(2000)   // true (divisible by 400)
 * isLeapYear(1900)   // false (divisible by 100 but not 400)
 * ```
 */
export function isLeapYear(year: number): boolean {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * Check if date is in a leap year
 *
 * @example
 * ```ts
 * isLeapYearDate(new Date('2024-01-01'))  // true
 * isLeapYearDate(new Date('2023-01-01'))  // false
 * ```
 */
export function isLeapYearDate(date: DateInput): boolean {
	return isLeapYear(new Date(date).getFullYear())
}

// ============================================
// Comparison functions
// ============================================

/**
 * Check if date1 is before date2
 *
 * @example
 * ```ts
 * isBefore('2024-01-01', '2024-01-02')  // true
 * isBefore(new Date('2024-01-02'), '2024-01-01')  // false
 * ```
 */
export function isBefore(date1: DateInput, date2: DateInput): boolean {
	const d1 = new Date(date1)
	const d2 = new Date(date2)

	if (isNumberNaN(d1.getTime()) || isNumberNaN(d2.getTime())) {
		return false
	}

	return d1.getTime() < d2.getTime()
}

/**
 * Check if date1 is after date2
 *
 * @example
 * ```ts
 * isAfter('2024-01-02', '2024-01-01')  // true
 * isAfter(new Date('2024-01-01'), '2024-01-02')  // false
 * ```
 */
export function isAfter(date1: DateInput, date2: DateInput): boolean {
	const d1 = new Date(date1)
	const d2 = new Date(date2)

	if (isNumberNaN(d1.getTime()) || isNumberNaN(d2.getTime())) {
		return false
	}

	return d1.getTime() > d2.getTime()
}

/**
 * Check if two dates are the same by specified unit
 *
 * @example
 * ```ts
 * isSame(new Date(), new Date(), 'day')      // true
 * isSame('2024-01-01', '2024-01-02', 'month')  // true (same month)
 * isSame('2024-01-01', '2024-02-01', 'year')   // true (same year)
 * isSame('2024-01-01 10:00', '2024-01-01 11:00', 'day')  // true (same day)
 * ```
 */
export function isSame(
	date1: DateInput,
	date2: DateInput,
	unit: DateComparisonUnit = 'day'
): boolean {
	const d1 = new Date(date1)
	const d2 = new Date(date2)

	if (isNumberNaN(d1.getTime()) || isNumberNaN(d2.getTime())) {
		return false
	}

	return sameByUnit[unit]?.(d1, d2) ?? false
}

/**
 * Check if date is between two dates
 *
 * @example
 * ```ts
 * isBetween('2024-01-15', '2024-01-01', '2024-01-31')  // true
 * isBetween('2024-01-01', '2024-01-01', '2024-01-31')  // true (inclusive)
 * isBetween('2024-01-01', '2024-01-01', '2024-01-31', false)  // false (exclusive)
 * ```
 */
export function isBetween(
	date: DateInput,
	start: DateInput,
	end: DateInput,
	inclusive = true
): boolean {
	const d = new Date(date)
	const s = new Date(start)
	const e = new Date(end)

	if (isNumberNaN(d.getTime()) || isNumberNaN(s.getTime()) || isNumberNaN(e.getTime())) {
		return false
	}

	const time = d.getTime()
	const startTime = s.getTime()
	const endTime = e.getTime()

	return inclusive
		? time >= startTime && time <= endTime
		: time > startTime && time < endTime
}

/**
 * Compare two dates
 *
 * @example
 * ```ts
 * compare('2024-01-01', '2024-01-02')  // -1 (first is earlier)
 * compare('2024-01-02', '2024-01-01')  // 1 (first is later)
 * compare('2024-01-01', '2024-01-01')  // 0 (equal)
 * ```
 *
 * @returns -1 if date1 < date2, 0 if equal, 1 if date1 > date2
 */
export function compare(date1: DateInput, date2: DateInput): -1 | 0 | 1 {
	const d1 = new Date(date1)
	const d2 = new Date(date2)

	if (isNumberNaN(d1.getTime()) || isNumberNaN(d2.getTime())) {
		return 0
	}

	const diff = d1.getTime() - d2.getTime()

	if (diff < 0) return -1
	if (diff > 0) return 1
	return 0
}

// ============================================
// Min/Max functions
// ============================================

/**
 * Get the minimum (earliest) date from a list
 *
 * @example
 * ```ts
 * min('2024-01-03', '2024-01-01', '2024-01-02')  // 2024-01-01
 * min(new Date('2024-01-01'), new Date('2024-01-02'))  // 2024-01-01
 * ```
 */
export function min(...dates: DateInput[]): Date {
	let minDate: Date | null = null

	for (const input of dates) {
		const d = new Date(input)
		if (isNumberNaN(d.getTime())) continue
		if (!minDate || d.getTime() < minDate.getTime()) {
			minDate = d
		}
	}

	return minDate || new Date()
}

/**
 * Get the maximum (latest) date from a list
 *
 * @example
 * ```ts
 * max('2024-01-01', '2024-01-03', '2024-01-02')  // 2024-01-03
 * max(new Date('2024-01-01'), new Date('2024-01-02'))  // 2024-01-02
 * ```
 */
export function max(...dates: DateInput[]): Date {
	let maxDate: Date | null = null

	for (const input of dates) {
		const d = new Date(input)
		if (isNumberNaN(d.getTime())) continue
		if (!maxDate || d.getTime() > maxDate.getTime()) {
			maxDate = d
		}
	}

	return maxDate || new Date()
}
