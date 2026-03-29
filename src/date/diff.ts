/**
 * Date difference calculation
 *
 * @module date
 * @since 6.0.0
 */

import type { DateDiffResult, DateInput } from './types'
import { isNumberNaN } from '../_compat'

// Re-export DateDiffResult type
export type { DateDiffResult } from './types'

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
 */
export function dateDiff(date1: DateInput, date2: DateInput): DateDiffResult {
	const d1 = new Date(date1)
	const d2 = new Date(date2)

	if (isNumberNaN(d1.getTime()) || isNumberNaN(d2.getTime())) {
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

/**
 * Get difference in specific unit
 *
 * @example
 * ```ts
 * diffIn('2024-01-01', '2024-01-03', 'day')  // 2
 * diffIn('2024-01-01', '2024-01-01 12:00', 'hour')  // 12
 * ```
 */
export function diffIn(
	date1: DateInput,
	date2: DateInput,
	unit: 'day' | 'hour' | 'minute' | 'second' | 'millisecond'
): number {
	const d1 = new Date(date1)
	const d2 = new Date(date2)

	if (isNumberNaN(d1.getTime()) || isNumberNaN(d2.getTime())) {
		return 0
	}

	const diff = d2.getTime() - d1.getTime()

	switch (unit) {
		case 'day':
			return Math.floor(diff / (24 * 60 * 60 * 1000))
		case 'hour':
			return Math.floor(diff / (60 * 60 * 1000))
		case 'minute':
			return Math.floor(diff / (60 * 1000))
		case 'second':
			return Math.floor(diff / 1000)
		case 'millisecond':
			return diff
		default:
			return diff
	}
}
