/**
 * Internal utilities for date module
 *
 * @internal
 * @module date
 * @since 6.0.0
 */

import type { DateInput, DateUnit, RelativeTimeLocale } from './types'
import { isNumberNaN, padStart } from '../_compat'

/**
 * Parse date input to Date object
 * Returns null if invalid
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
 * Check if date is valid
 */
export function isValidDate(d: Date): boolean {
	return !isNumberNaN(d.getTime())
}

/**
 * Check if year is a leap year
 */
export function isLeapYear(year: number): boolean {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * Get days in month (month is 0-indexed like Date)
 */
export function getDaysInMonthRaw(year: number, month: number): number {
	return new Date(year, month + 1, 0).getDate()
}

/**
 * Get day of year (1-366)
 */
export function getDayOfYear(d: Date): number {
	const start = new Date(d.getFullYear(), 0, 0)
	const diff = d.getTime() - start.getTime()
	return Math.floor(diff / (1000 * 60 * 60 * 24))
}

/**
 * Get week of year (ISO week)
 */
export function getWeekOfYear(d: Date): number {
	// Create a copy of the date
	const date = new Date(d.getTime())
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7))
	// Get first day of year
	const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
	// Calculate full weeks to nearest Thursday
	return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

/**
 * Get quarter of year (1-4)
 */
export function getQuarter(d: Date): number {
	return Math.floor(d.getMonth() / 3) + 1
}

/**
 * Normalize date input to Date object (throws if invalid)
 */
export function toDate(input: DateInput): Date {
	const d = new Date(input)
	if (!isValidDate(d)) {
		throw new Error('Invalid date')
	}
	return d
}

/**
 * Get start of day (00:00:00.000)
 */
export function startOfDay(d: Date): Date {
	const result = new Date(d)
	result.setHours(0, 0, 0, 0)
	return result
}

/**
 * Get end of day (23:59:59.999)
 */
export function endOfDay(d: Date): Date {
	const result = new Date(d)
	result.setHours(23, 59, 59, 999)
	return result
}

/**
 * Get start of week (Sunday)
 */
export function startOfWeek(d: Date): Date {
	const result = new Date(d)
	const day = result.getDay()
	result.setDate(result.getDate() - day)
	return startOfDay(result)
}

/**
 * Get end of week (Saturday)
 */
export function endOfWeek(d: Date): Date {
	const result = new Date(d)
	const day = result.getDay()
	result.setDate(result.getDate() + (6 - day))
	return endOfDay(result)
}

/**
 * Get start of month
 */
export function startOfMonth(d: Date): Date {
	return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0)
}

/**
 * Get end of month
 */
export function endOfMonth(d: Date): Date {
	return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999)
}

/**
 * Get start of year
 */
export function startOfYear(d: Date): Date {
	return new Date(d.getFullYear(), 0, 1, 0, 0, 0, 0)
}

/**
 * Get end of year
 */
export function endOfYear(d: Date): Date {
	return new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999)
}

/**
 * Relative time locale strings
 */
export const relativeTimeLocales: Record<RelativeTimeLocale, Record<string, string>> = {
	en: {
		daysAgo: '{n} day(s) ago',
		hoursAgo: '{n} hour(s) ago',
		inDays: 'in {n} day(s)',
		inHours: 'in {n} hour(s)',
		inMinutes: 'in {n} minute(s)',
		inMonths: 'in {n} month(s)',
		inSeconds: 'in {n} second(s)',
		inWeeks: 'in {n} week(s)',
		inYears: 'in {n} year(s)',
		justNow: 'just now',
		minutesAgo: '{n} minute(s) ago',
		monthsAgo: '{n} month(s) ago',
		secondsAgo: '{n} seconds ago',
		weeksAgo: '{n} week(s) ago',
		yearsAgo: '{n} year(s) ago',
	},
	zh: {
		daysAgo: '{n}天前',
		hoursAgo: '{n}小时前',
		inDays: '{n}天后',
		inHours: '{n}小时后',
		inMinutes: '{n}分钟后',
		inMonths: '{n}个月后',
		inSeconds: '{n}秒后',
		inWeeks: '{n}周后',
		inYears: '{n}年后',
		justNow: '刚刚',
		minutesAgo: '{n}分钟前',
		monthsAgo: '{n}个月前',
		secondsAgo: '{n}秒前',
		weeksAgo: '{n}周前',
		yearsAgo: '{n}年前',
	},
	ja: {
		daysAgo: '{n}日前',
		hoursAgo: '{n}時間前',
		inDays: '{n}日後',
		inHours: '{n}時間後',
		inMinutes: '{n}分後',
		inMonths: '{n}ヶ月後',
		inSeconds: '{n}秒後',
		inWeeks: '{n}週間後',
		inYears: '{n}年後',
		justNow: 'たった今',
		minutesAgo: '{n}分前',
		monthsAgo: '{n}ヶ月前',
		secondsAgo: '{n}秒前',
		weeksAgo: '{n}週間前',
		yearsAgo: '{n}年前',
	},
	ko: {
		daysAgo: '{n}일 전',
		hoursAgo: '{n}시간 전',
		inDays: '{n}일 후',
		inHours: '{n}시간 후',
		inMinutes: '{n}분 후',
		inMonths: '{n}개월 후',
		inSeconds: '{n}초 후',
		inWeeks: '{n}주 후',
		inYears: '{n}년 후',
		justNow: '방금',
		minutesAgo: '{n}분 전',
		monthsAgo: '{n}개월 전',
		secondsAgo: '{n}초 전',
		weeksAgo: '{n}주 전',
		yearsAgo: '{n}년 전',
	},
	de: {
		daysAgo: 'vor {n} Tag(en)',
		hoursAgo: 'vor {n} Stunde(n)',
		inDays: 'in {n} Tag(en)',
		inHours: 'in {n} Stunde(n)',
		inMinutes: 'in {n} Minute(n)',
		inMonths: 'in {n} Monat(en)',
		inSeconds: 'in {n} Sekunde(n)',
		inWeeks: 'in {n} Woche(n)',
		inYears: 'in {n} Jahr(en)',
		justNow: 'gerade jetzt',
		minutesAgo: 'vor {n} Minute(n)',
		monthsAgo: 'vor {n} Monat(en)',
		secondsAgo: 'vor {n} Sekunden',
		weeksAgo: 'vor {n} Woche(n)',
		yearsAgo: 'vor {n} Jahr(en)',
	},
	fr: {
		daysAgo: 'il y a {n} jour(s)',
		hoursAgo: 'il y a {n} heure(s)',
		inDays: 'dans {n} jour(s)',
		inHours: 'dans {n} heure(s)',
		inMinutes: 'dans {n} minute(s)',
		inMonths: 'dans {n} mois',
		inSeconds: 'dans {n} seconde(s)',
		inWeeks: 'dans {n} semaine(s)',
		inYears: 'dans {n} an(s)',
		justNow: "à l'instant",
		minutesAgo: 'il y a {n} minute(s)',
		monthsAgo: 'il y a {n} mois',
		secondsAgo: 'il y a {n} secondes',
		weeksAgo: 'il y a {n} semaine(s)',
		yearsAgo: 'il y a {n} an(s)',
	},
	es: {
		daysAgo: 'hace {n} día(s)',
		hoursAgo: 'hace {n} hora(s)',
		inDays: 'en {n} día(s)',
		inHours: 'en {n} hora(s)',
		inMinutes: 'en {n} minuto(s)',
		inMonths: 'en {n} mes(es)',
		inSeconds: 'en {n} segundo(s)',
		inWeeks: 'en {n} semana(s)',
		inYears: 'en {n} año(s)',
		justNow: 'ahora mismo',
		minutesAgo: 'hace {n} minuto(s)',
		monthsAgo: 'hace {n} mes(es)',
		secondsAgo: 'hace {n} segundos',
		weeksAgo: 'hace {n} semana(s)',
		yearsAgo: 'hace {n} año(s)',
	},
}

/**
 * Format token handlers
 */
export const formatTokens: Record<string, (d: Date) => string> = {
	A: d => (d.getHours() >= 12 ? 'PM' : 'AM'),
	a: d => (d.getHours() >= 12 ? 'pm' : 'am'),
	D: d => String(d.getDate()),
	DD: d => padStart(String(d.getDate()), 2, '0'),
	H: d => String(d.getHours()),
	h: d => String(d.getHours() % 12 || 12),
	HH: d => padStart(String(d.getHours()), 2, '0'),
	hh: d => padStart(String(d.getHours() % 12 || 12), 2, '0'),
	M: d => String(d.getMonth() + 1),
	m: d => String(d.getMinutes()),
	MM: d => padStart(String(d.getMonth() + 1), 2, '0'),
	mm: d => padStart(String(d.getMinutes()), 2, '0'),
	s: d => String(d.getSeconds()),
	ss: d => padStart(String(d.getSeconds()), 2, '0'),
	SSS: d => padStart(String(d.getMilliseconds()), 3, '0'),
	YY: d => String(d.getFullYear()).slice(-2),
	YYYY: d => String(d.getFullYear()),
}

/**
 * Get sorted token keys (longest first for regex matching)
 */
export function getSortedTokenKeys(): string[] {
	return Object.keys(formatTokens).sort((a, b) => b.length - a.length)
}

/**
 * Unit conversion to milliseconds
 */
export const unitToMs: Record<DateUnit, number> = {
	millisecond: 1,
	second: 1000,
	minute: 60 * 1000,
	hour: 60 * 60 * 1000,
	day: 24 * 60 * 60 * 1000,
	week: 7 * 24 * 60 * 60 * 1000,
	month: 30 * 24 * 60 * 60 * 1000, // Approximate
	year: 365 * 24 * 60 * 60 * 1000, // Approximate
}

/**
 * Add time to date
 */
export function addToDate(d: Date, value: number, unit: DateUnit): Date {
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
