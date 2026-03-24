/**
 * Date comparison utilities
 *
 * @module date
 * @since 6.0.0
 */

import { isNumberNaN } from '../_compat'
import type { DateInput } from './types'

/**
 * Check if date is today
 *
 * @example
 * ```ts
 * isToday(new Date())  // true
 * isToday('2020-01-01')  // false (if today is not 2020-01-01)
 * ```
 */
export function isToday(date: DateInput): boolean {
	const d = new Date(date)
	const today = new Date()

	return (
		d.getFullYear() === today.getFullYear() &&
		d.getMonth() === today.getMonth() &&
		d.getDate() === today.getDate()
	)
}

/**
 * Check if date is yesterday
 */
export function isYesterday(date: DateInput): boolean {
	const d = new Date(date)
	const yesterday = new Date()
	yesterday.setDate(yesterday.getDate() - 1)

	return (
		d.getFullYear() === yesterday.getFullYear() &&
		d.getMonth() === yesterday.getMonth() &&
		d.getDate() === yesterday.getDate()
	)
}

/**
 * Check if date is tomorrow
 */
export function isTomorrow(date: DateInput): boolean {
	const d = new Date(date)
	const tomorrow = new Date()
	tomorrow.setDate(tomorrow.getDate() + 1)

	return (
		d.getFullYear() === tomorrow.getFullYear() &&
		d.getMonth() === tomorrow.getMonth() &&
		d.getDate() === tomorrow.getDate()
	)
}

/**
 * Check if date is weekend (Saturday or Sunday)
 */
export function isWeekend(date: DateInput): boolean {
	const d = new Date(date)
	const day = d.getDay()
	return day === 0 || day === 6
}

/**
 * Check if date is weekday (Monday to Friday)
 */
export function isWeekday(date: DateInput): boolean {
	return !isWeekend(date)
}

/**
 * Check if year is a leap year
 */
export function isLeapYear(year: number): boolean {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * Check if date is in a leap year
 */
export function isLeapYearDate(date: DateInput): boolean {
	const d = new Date(date)
	return isLeapYear(d.getFullYear())
}

/**
 * Check if date1 is before date2
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
 * Check if two dates are the same (by unit)
 */
export function isSame(
	date1: DateInput,
	date2: DateInput,
	unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' = 'day'
): boolean {
	const d1 = new Date(date1)
	const d2 = new Date(date2)

	if (isNumberNaN(d1.getTime()) || isNumberNaN(d2.getTime())) {
		return false
	}

	switch (unit) {
		case 'year':
			return d1.getFullYear() === d2.getFullYear()
		case 'month':
			return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
		case 'day':
			return (
				d1.getFullYear() === d2.getFullYear() &&
				d1.getMonth() === d2.getMonth() &&
				d1.getDate() === d2.getDate()
			)
		case 'hour':
			return (
				d1.getFullYear() === d2.getFullYear() &&
				d1.getMonth() === d2.getMonth() &&
				d1.getDate() === d2.getDate() &&
				d1.getHours() === d2.getHours()
			)
		case 'minute':
			return (
				d1.getFullYear() === d2.getFullYear() &&
				d1.getMonth() === d2.getMonth() &&
				d1.getDate() === d2.getDate() &&
				d1.getHours() === d2.getHours() &&
				d1.getMinutes() === d2.getMinutes()
			)
		case 'second':
			return (
				d1.getFullYear() === d2.getFullYear() &&
				d1.getMonth() === d2.getMonth() &&
				d1.getDate() === d2.getDate() &&
				d1.getHours() === d2.getHours() &&
				d1.getMinutes() === d2.getMinutes() &&
				d1.getSeconds() === d2.getSeconds()
			)
		default:
			return false
	}
}

/**
 * Check if date is between two dates
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

	if (inclusive) {
		return d.getTime() >= s.getTime() && d.getTime() <= e.getTime()
	}

	return d.getTime() > s.getTime() && d.getTime() < e.getTime()
}

/**
 * Compare two dates
 * Returns -1 if date1 \< date2, 0 if equal, 1 if date1 \> date2
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

/**
 * Get the minimum date from a list
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
 * Get the maximum date from a list
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
