export interface DateDiffResult {
	days: number
	hours: number
	milliseconds: number
	minutes: number
	seconds: number
	total: {
		days: number
		hours: number
		minutes: number
		seconds: number
		milliseconds: number
	}
}

/**
 * Calculate the difference between two dates
 *
 * @example
 * ```ts
 * const diff = dateDiff('2024-01-01', '2024-01-03')
 * // => { days: 2, hours: 0, minutes: 0, seconds: 0, milliseconds: 0, total: { days: 2, hours: 48, ... } }
 *
 * const diff = dateDiff(new Date('2024-01-01'), new Date('2024-01-02 12:30:00'))
 * // => { days: 1, hours: 12, minutes: 30, seconds: 0, milliseconds: 0, ... }
 * ```
 *
 * @since 6.0.0
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns - Returns the difference object
 */
function dateDiff(date1: Date | string | number, date2: Date | string | number): DateDiffResult {
	const d1 = new Date(date1)
	const d2 = new Date(date2)

	if (Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) {
		return {
			days: 0,
			hours: 0,
			milliseconds: 0,
			minutes: 0,
			seconds: 0,
			total: {
				days: 0,
				hours: 0,
				milliseconds: 0,
				minutes: 0,
				seconds: 0,
			},
		}
	}

	const diff = Math.abs(d2.getTime() - d1.getTime())

	const totalMilliseconds = diff
	const totalSeconds = Math.floor(diff / 1000)
	const totalMinutes = Math.floor(totalSeconds / 60)
	const totalHours = Math.floor(totalMinutes / 60)
	const totalDays = Math.floor(totalHours / 24)

	return {
		days: totalDays,
		hours: totalHours % 24,
		milliseconds: totalMilliseconds % 1000,
		minutes: totalMinutes % 60,
		seconds: totalSeconds % 60,
		total: {
			days: totalDays,
			hours: totalHours,
			milliseconds: totalMilliseconds,
			minutes: totalMinutes,
			seconds: totalSeconds,
		},
	}
}

export default dateDiff
