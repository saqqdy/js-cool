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
 *
 * @since 5.24.0
 * @param date - The date to compare
 * @param now - The current date (default: new Date())
 * @param locale - The locale string (default: 'en')
 * @returns - Returns the relative time string
 */
function relativeTime(date: Date | string | number, now = new Date(), locale = 'en'): string {
	const d = new Date(date)
	const nowDate = new Date(now)

	if (Number.isNaN(d.getTime()) || Number.isNaN(nowDate.getTime())) {
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

	const locales: Record<string, Record<string, string>> = {
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
			yearsAgo: '{n} year(s) ago'
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
			yearsAgo: '{n}年前'
		}
	}

	const t = locales[locale] || locales.en

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

export default relativeTime
