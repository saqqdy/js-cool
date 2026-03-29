/**
 * Date manipulation module - Full entry
 *
 * @example
 * ```ts
 * // Full import
 * import { date, DateParser } from 'js-cool'
 *
 * // Chainable API
 * date().format('YYYY-MM-DD')
 * date('2024-01-01').add(1, 'day').format()
 * date().startOf('month').format()
 *
 * // Quick methods
 * date.format(new Date(), 'YYYY-MM-DD')
 * date.diff('2024-01-01', '2024-12-31')
 * date.isToday(new Date())
 * ```
 *
 * @module date
 * @since 6.0.0
 */

import type {
	DateComparisonUnit,
	DateDiffResult,
	DateInput,
	DateUnit,
	IDateParser,
	RelativeTimeLocale,
} from './types'

import {
	compare,
	isAfter,
	isBefore,
	isLeapYear,
	isSame,
	isToday,
	isTomorrow,
	isWeekend,
	isYesterday,
	max,
	min,
} from './compare'
import { dateDiff } from './diff'
import { relativeTime as calcRelativeTime, formatDate } from './format'
import {
	add,
	endOf,
	getDayOfYear,
	getDaysInMonth,
	getQuarter,
	getWeekOfYear,
	startOf,
	subtract,
} from './manipulate'
// Import sub-modules
import { parseDate } from './parse'

// Re-export types
export type {
	DateAPI,
	DateComparisonUnit,
	DateDiffResult,
	DateInput,
	DateUnit,
	IDateParser,
	RelativeTimeLocale,
} from './types'

// Re-export functions for direct import
export { formatDate, relativeTime } from './format'
export { dateDiff } from './diff'
export {
	compare,
	isAfter,
	isBefore,
	isBetween,
	isLeapYear,
	isSame,
	isToday,
	isTomorrow,
	isWeekend,
	isYesterday,
	max,
	min,
} from './compare'
export {
	add,
	endOf,
	getDayOfYear,
	getDaysInMonth,
	getQuarter,
	getWeekOfYear,
	startOf,
	subtract,
} from './manipulate'

/**
 * Date parser class for chainable date operations
 *
 * @example
 * ```ts
 * import { DateParser } from 'js-cool'
 *
 * const parser = new DateParser('2024-01-01')
 * parser.format('YYYY-MM-DD')  // '2024-01-01'
 * parser.add(1, 'day').format()  // '2024-01-02'
 * parser.isLeapYear()  // true
 * ```
 */
class DateParser implements IDateParser {
	private _date: Date

	constructor(input?: DateInput) {
		const parsed = parseDate(input)
		this._date = parsed || new Date()
	}

	// Getters
	get date(): Date {
		return this._date
	}

	get isValid(): boolean {
		return !isNaN(this._date.getTime())
	}

	get timestamp(): number {
		return this._date.getTime()
	}

	get year(): number {
		return this._date.getFullYear()
	}

	get month(): number {
		return this._date.getMonth() + 1
	}

	get day(): number {
		return this._date.getDate()
	}

	get dayOfWeek(): number {
		return this._date.getDay()
	}

	get hours(): number {
		return this._date.getHours()
	}

	get minutes(): number {
		return this._date.getMinutes()
	}

	get seconds(): number {
		return this._date.getSeconds()
	}

	get milliseconds(): number {
		return this._date.getMilliseconds()
	}

	// Formatting
	format(pattern = 'YYYY-MM-DD HH:mm:ss'): string {
		return formatDate(this._date, pattern)
	}

	toISOString(): string {
		return this._date.toISOString()
	}

	toDateString(): string {
		return formatDate(this._date, 'YYYY-MM-DD')
	}

	toTimeString(): string {
		return formatDate(this._date, 'HH:mm:ss')
	}

	// Comparison
	isBefore(date: DateInput): boolean {
		return isBefore(this._date, date)
	}

	isAfter(date: DateInput): boolean {
		return isAfter(this._date, date)
	}

	isSame(date: DateInput, unit?: DateComparisonUnit): boolean {
		return isSame(this._date, date, unit)
	}

	isToday(): boolean {
		return isToday(this._date)
	}

	isYesterday(): boolean {
		return isYesterday(this._date)
	}

	isTomorrow(): boolean {
		return isTomorrow(this._date)
	}

	isWeekend(): boolean {
		return isWeekend(this._date)
	}

	isWeekday(): boolean {
		return !isWeekend(this._date)
	}

	isLeapYear(): boolean {
		return isLeapYear(this._date.getFullYear())
	}

	// Manipulation
	add(value: number, unit: DateUnit): DateParser {
		return new DateParser(add(this._date, value, unit))
	}

	subtract(value: number, unit: DateUnit): DateParser {
		return new DateParser(subtract(this._date, value, unit))
	}

	startOf(unit: DateUnit): DateParser {
		return new DateParser(startOf(this._date, unit))
	}

	endOf(unit: DateUnit): DateParser {
		return new DateParser(endOf(this._date, unit))
	}

	// Difference
	diff(date: DateInput): DateDiffResult {
		return dateDiff(this._date, date)
	}

	// Relative time
	relativeTime(now?: DateInput, locale?: RelativeTimeLocale): string {
		return calcRelativeTime(this._date, now, locale)
	}

	// Getters
	get(unit: DateUnit): number {
		switch (unit) {
			case 'year':
				return this._date.getFullYear()
			case 'month':
				return this._date.getMonth() + 1
			case 'day':
				return this._date.getDate()
			case 'hour':
				return this._date.getHours()
			case 'minute':
				return this._date.getMinutes()
			case 'second':
				return this._date.getSeconds()
			case 'millisecond':
				return this._date.getMilliseconds()
			case 'week':
				return getWeekOfYear(this._date)
			default:
				return 0
		}
	}

	getDaysInMonth(): number {
		return getDaysInMonth(this._date.getFullYear(), this._date.getMonth())
	}

	getQuarter(): number {
		return getQuarter(this._date)
	}

	getWeekOfYear(): number {
		return getWeekOfYear(this._date)
	}

	getDayOfYear(): number {
		return getDayOfYear(this._date)
	}
}

/**
 * Date utility namespace
 *
 * @example
 * ```ts
 * import { date } from 'js-cool'
 *
 * // Create DateParser instance
 * date()  // now
 * date('2024-01-01')  // specific date
 *
 * // Quick methods
 * date.format(new Date(), 'YYYY-MM-DD')
 * date.diff('2024-01-01', '2024-12-31')
 * date.isToday(new Date())
 * date.getDaysInMonth(2024, 1)  // 29 (February in leap year)
 *
 * // Compare dates
 * date.compare('2024-01-01', '2024-01-02')  // -1
 * date.min(new Date('2024-01-01'), new Date('2024-01-02'))  // 2024-01-01
 * ```
 */

// Create the date function
function date(input?: DateInput): IDateParser {
	return new DateParser(input)
}

// Define static methods
date.now = () => new DateParser()
date.parse = (input?: DateInput) => new DateParser(input)
date.format = (d: DateInput, pattern?: string) => formatDate(d, pattern)
date.diff = (d1: DateInput, d2: DateInput) => dateDiff(d1, d2)
date.relativeTime = (d: DateInput, now?: DateInput, locale?: RelativeTimeLocale) =>
	calcRelativeTime(d, now, locale)
date.isToday = (d: DateInput) => isToday(d)
date.isYesterday = (d: DateInput) => isYesterday(d)
date.isTomorrow = (d: DateInput) => isTomorrow(d)
date.isWeekend = (d: DateInput) => isWeekend(d)
date.isLeapYear = (year: number) => isLeapYear(year)
date.getDaysInMonth = (year: number, month: number) => getDaysInMonth(year, month)
date.getQuarter = (d: DateInput) => getQuarter(d)
date.getWeekOfYear = (d: DateInput) => getWeekOfYear(d)
date.getDayOfYear = (d: DateInput) => getDayOfYear(d)
date.compare = (d1: DateInput, d2: DateInput) => compare(d1, d2)
date.min = (...dates: DateInput[]) => new DateParser(min(...dates))
date.max = (...dates: DateInput[]) => new DateParser(max(...dates))
date.DateParser = DateParser

export default date
export { DateParser }
