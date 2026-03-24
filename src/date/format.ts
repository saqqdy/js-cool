/**
 * Date formatting utilities
 *
 * @module date
 * @since 6.0.0
 */

import { objectEntries, padStart, isNumberNaN } from '../_compat'
import type { DateInput, RelativeTimeLocale, DateDiffResult } from './types'
import { relativeTimeLocales } from './utils'

// Cached sorted token keys
let sortedTokenKeys: string[] | null = null

/**
 * Format date to string with pattern
 *
 * @example
 * ```ts
 * formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
 * // => '2024-01-15 10:30:45'
 *
 * formatDate(new Date(), 'YYYY/MM/DD')
 * // => '2024/01/15'
 *
 * formatDate(new Date('2024-01-15'), 'YYYY年MM月DD日')
 * // => '2024年01月15日'
 * ```
 */
export function formatDate(date: DateInput, format = 'YYYY-MM-DD HH:mm:ss'): string {
	const d = new Date(date)

	// IE11-compatible NaN check
	if (isNumberNaN(d.getTime())) {
		return ''
	}

	const tokens: Record<string, () => string> = {
		A: () => (d.getHours() >= 12 ? 'PM' : 'AM'),
		a: () => (d.getHours() >= 12 ? 'pm' : 'am'),
		D: () => String(d.getDate()),
		DD: () => padStart(String(d.getDate()), 2, '0'),
		H: () => String(d.getHours()),
		h: () => String(d.getHours() % 12 || 12),
		HH: () => padStart(String(d.getHours()), 2, '0'),
		hh: () => padStart(String(d.getHours() % 12 || 12), 2, '0'),
		M: () => String(d.getMonth() + 1),
		m: () => String(d.getMinutes()),
		MM: () => padStart(String(d.getMonth() + 1), 2, '0'),
		mm: () => padStart(String(d.getMinutes()), 2, '0'),
		s: () => String(d.getSeconds()),
		ss: () => padStart(String(d.getSeconds()), 2, '0'),
		SSS: () => padStart(String(d.getMilliseconds()), 3, '0'),
		YY: () => String(d.getFullYear()).slice(-2),
		YYYY: () => String(d.getFullYear()),
	}

	// Get sorted tokens (cached)
	if (!sortedTokenKeys) {
		sortedTokenKeys = objectEntries(tokens)
			.sort((a, b) => b[0].length - a[0].length)
			.map(([key]) => key)
	}

	const tokenRegex = new RegExp(sortedTokenKeys.join('|'), 'g')

	return format.replace(tokenRegex, match => tokens[match]?.() ?? match)
}

/**
 * Get relative time string (e.g., "3 minutes ago", "in 2 hours")
 *
 * @example
 * ```ts
 * relativeTime(new Date(Date.now() - 1000 * 60 * 5))
 * // => '5 minutes ago'
 *
 * relativeTime(new Date(Date.now() + 1000 * 60 * 60 * 2))
 * // => 'in 2 hours'
 *
 * relativeTime(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7))
 * // => '7 days ago'
 * ```
 */
export function relativeTime(date: DateInput, now: DateInput = new Date(), locale: RelativeTimeLocale = 'en'): string {
	const d = new Date(date)
	const nowDate = new Date(now)

	if (isNumberNaN(d.getTime()) || isNumberNaN(nowDate.getTime())) {
		return ''
	}

	const diff = nowDate.getTime() - d.getTime()
	const isPast = diff > 0
	const absDiff = Math.abs(diff)

	const seconds = Math.floor(absDiff / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)
	const weeks = Math.floor(days / 7)
	const months = Math.floor(days / 30)
	const years = Math.floor(days / 365)

	const t = relativeTimeLocales[locale] || relativeTimeLocales.en

	const format = (key: string, n: number): string => key.replace('{n}', String(n))

	if (absDiff < 1000) {
		return t.justNow
	}

	if (isPast) {
		if (seconds < 60) return format(t.secondsAgo, seconds)
		if (minutes < 60) return format(t.minutesAgo, minutes)
		if (hours < 24) return format(t.hoursAgo, hours)
		if (days < 7) return format(t.daysAgo, days)
		if (weeks < 4) return format(t.weeksAgo, weeks)
		if (months < 12) return format(t.monthsAgo, months)
		return format(t.yearsAgo, years)
	} else {
		if (seconds < 60) return format(t.inSeconds, seconds)
		if (minutes < 60) return format(t.inMinutes, minutes)
		if (hours < 24) return format(t.inHours, hours)
		if (days < 7) return format(t.inDays, days)
		if (weeks < 4) return format(t.inWeeks, weeks)
		if (months < 12) return format(t.inMonths, months)
		return format(t.inYears, years)
	}
}

/**
 * Format date diff to human readable string
 *
 * @example
 * ```ts
 * formatDiff(diff)
 * // => '2 days, 3 hours, 30 minutes'
 * ```
 */
export function formatDiff(diff: DateDiffResult, locale: 'en' | 'zh' = 'en'): string {
	const parts: string[] = []

	if (locale === 'zh') {
		if (diff.days > 0) parts.push(`${diff.days}天`)
		if (diff.hours > 0) parts.push(`${diff.hours}小时`)
		if (diff.minutes > 0) parts.push(`${diff.minutes}分钟`)
		if (diff.seconds > 0) parts.push(`${diff.seconds}秒`)
	} else {
		if (diff.days > 0) parts.push(`${diff.days} day${diff.days > 1 ? 's' : ''}`)
		if (diff.hours > 0) parts.push(`${diff.hours} hour${diff.hours > 1 ? 's' : ''}`)
		if (diff.minutes > 0) parts.push(`${diff.minutes} minute${diff.minutes > 1 ? 's' : ''}`)
		if (diff.seconds > 0) parts.push(`${diff.seconds} second${diff.seconds > 1 ? 's' : ''}`)
	}

	return parts.join(', ') || (locale === 'zh' ? '0秒' : '0 seconds')
}
