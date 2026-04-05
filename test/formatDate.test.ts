import type { DateDiffResult } from '../src/date/types'
import { describe, expect, it } from 'vitest'
import { formatDate, formatDiff, relativeTime } from '../src/date/format'

describe('formatDate', () => {
	it('should format date with default format', () => {
		const date = new Date('2024-01-15T10:30:45')
		const result = formatDate(date)
		expect(result).toBe('2024-01-15 10:30:45')
	})

	it('should format date with custom format', () => {
		const date = new Date('2024-01-15T10:30:45')
		expect(formatDate(date, 'YYYY/MM/DD')).toBe('2024/01/15')
		expect(formatDate(date, 'YYYY年MM月DD日')).toBe('2024年01月15日')
	})

	it('should handle different time components', () => {
		const date = new Date('2024-01-15T14:30:45.123')
		expect(formatDate(date, 'HH:mm:ss')).toBe('14:30:45')
		expect(formatDate(date, 'hh:mm:ss A')).toBe('02:30:45 PM')
		expect(formatDate(date, 'SSS')).toBe('123')
	})

	it('should handle YY format', () => {
		const date = new Date('2024-01-15')
		expect(formatDate(date, 'YY-MM-DD')).toBe('24-01-15')
	})

	it('should handle single digit formats', () => {
		const date = new Date('2024-01-05T09:05:05')
		expect(formatDate(date, 'M-D H:m:s')).toBe('1-5 9:5:5')
	})

	it('should return empty string for invalid date', () => {
		expect(formatDate('invalid')).toBe('')
	})

	it('should handle AM/PM format', () => {
		const morningDate = new Date('2024-01-15T10:30:00')
		const afternoonDate = new Date('2024-01-15T14:30:00')

		expect(formatDate(morningDate, 'A')).toBe('AM')
		expect(formatDate(afternoonDate, 'A')).toBe('PM')
		expect(formatDate(morningDate, 'a')).toBe('am')
		expect(formatDate(afternoonDate, 'a')).toBe('pm')
	})

	it('should handle 12-hour format', () => {
		const date1 = new Date('2024-01-15T00:30:00') // 12:30 AM
		const date2 = new Date('2024-01-15T12:30:00') // 12:30 PM
		const date3 = new Date('2024-01-15T13:30:00') // 1:30 PM

		expect(formatDate(date1, 'h')).toBe('12')
		expect(formatDate(date2, 'h')).toBe('12')
		expect(formatDate(date3, 'h')).toBe('1')
		expect(formatDate(date1, 'hh')).toBe('12')
		expect(formatDate(date3, 'hh')).toBe('01')
	})

	it('should handle milliseconds', () => {
		const date = new Date('2024-01-15T10:30:45.5')
		expect(formatDate(date, 'SSS')).toBe('500')
	})

	it('should accept timestamp as input', () => {
		const timestamp = new Date('2024-01-15T10:30:45').getTime()
		expect(formatDate(timestamp, 'YYYY-MM-DD')).toBe('2024-01-15')
	})

	it('should accept string as input', () => {
		expect(formatDate('2024-01-15T10:30:45', 'YYYY-MM-DD')).toBe('2024-01-15')
	})

	it('should handle unknown format tokens', () => {
		const date = new Date('2024-01-15T10:30:45')
		expect(formatDate(date, 'YYYY-XX-DD')).toBe('2024-XX-15')
	})
})

describe('relativeTime', () => {
	it('should return "just now" for very recent time', () => {
		expect(relativeTime(new Date())).toBe('just now')
	})

	it('should return seconds ago', () => {
		const date = new Date(Date.now() - 5000)
		expect(relativeTime(date)).toBe('5 seconds ago')
	})

	it('should return minutes ago', () => {
		const date = new Date(Date.now() - 5 * 60 * 1000)
		expect(relativeTime(date)).toBe('5 minute(s) ago')
	})

	it('should return hours ago', () => {
		const date = new Date(Date.now() - 2 * 60 * 60 * 1000)
		expect(relativeTime(date)).toBe('2 hour(s) ago')
	})

	it('should return days ago', () => {
		const date = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
		expect(relativeTime(date)).toBe('3 day(s) ago')
	})

	it('should return weeks ago', () => {
		const date = new Date(Date.now() - 2 * 7 * 24 * 60 * 60 * 1000)
		expect(relativeTime(date)).toBe('2 week(s) ago')
	})

	it('should return months ago', () => {
		const date = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
		expect(relativeTime(date)).toBe('2 month(s) ago')
	})

	it('should return years ago', () => {
		const date = new Date(Date.now() - 400 * 24 * 60 * 60 * 1000)
		expect(relativeTime(date)).toBe('1 year(s) ago')
	})

	it('should return future time (in seconds)', () => {
		const date = new Date(Date.now() + 5000)
		expect(relativeTime(date)).toBe('in 5 second(s)')
	})

	it('should return future time (in minutes)', () => {
		const date = new Date(Date.now() + 5 * 60 * 1000)
		expect(relativeTime(date)).toBe('in 5 minute(s)')
	})

	it('should return future time (in hours)', () => {
		const date = new Date(Date.now() + 2 * 60 * 60 * 1000)
		expect(relativeTime(date)).toBe('in 2 hour(s)')
	})

	it('should return future time (in days)', () => {
		const date = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
		expect(relativeTime(date)).toBe('in 3 day(s)')
	})

	it('should return future time (in weeks)', () => {
		const date = new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000)
		expect(relativeTime(date)).toBe('in 2 week(s)')
	})

	it('should return future time (in months)', () => {
		const date = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
		expect(relativeTime(date)).toBe('in 2 month(s)')
	})

	it('should return future time (in years)', () => {
		const date = new Date(Date.now() + 400 * 24 * 60 * 60 * 1000)
		expect(relativeTime(date)).toBe('in 1 year(s)')
	})

	it('should return empty string for invalid date', () => {
		expect(relativeTime('invalid')).toBe('')
	})

	it('should return empty string when now is invalid', () => {
		expect(relativeTime(new Date(), 'invalid')).toBe('')
	})

	it('should support zh locale', () => {
		const date = new Date(Date.now() - 5 * 60 * 1000)
		expect(relativeTime(date, new Date(), 'zh')).toBe('5分钟前')
	})

	it('should support zh locale for future time', () => {
		const date = new Date(Date.now() + 5 * 60 * 1000)
		expect(relativeTime(date, new Date(), 'zh')).toBe('5分钟后')
	})

	it('should support zh locale for just now', () => {
		expect(relativeTime(new Date(), new Date(), 'zh')).toBe('刚刚')
	})

	it('should fallback to en for unknown locale', () => {
		const date = new Date(Date.now() - 5 * 60 * 1000)
		expect(relativeTime(date, new Date(), 'unknown' as any)).toBe('5 minute(s) ago')
	})

	it('should handle custom now parameter', () => {
		const date = new Date('2024-01-15T10:30:00')
		const now = new Date('2024-01-15T10:35:00')
		expect(relativeTime(date, now)).toBe('5 minute(s) ago')
	})

	it('should handle 1 second ago (singular)', () => {
		const date = new Date(Date.now() - 1000)
		expect(relativeTime(date)).toBe('1 seconds ago')
	})

	it('should handle 1 minute ago (singular)', () => {
		const date = new Date(Date.now() - 60 * 1000)
		expect(relativeTime(date)).toBe('1 minute(s) ago')
	})

	it('should handle 1 hour ago (singular)', () => {
		const date = new Date(Date.now() - 60 * 60 * 1000)
		expect(relativeTime(date)).toBe('1 hour(s) ago')
	})

	it('should handle 1 day ago (singular)', () => {
		const date = new Date(Date.now() - 24 * 60 * 60 * 1000)
		expect(relativeTime(date)).toBe('1 day(s) ago')
	})

	it('should handle 1 week ago (singular)', () => {
		const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
		expect(relativeTime(date)).toBe('1 week(s) ago')
	})

	it('should handle 1 month ago (singular)', () => {
		const date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
		expect(relativeTime(date)).toBe('1 month(s) ago')
	})

	it('should handle 1 year ago (singular)', () => {
		const date = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
		expect(relativeTime(date)).toBe('1 year(s) ago')
	})
})

describe('formatDiff', () => {
	it('should format diff in English', () => {
		const diff: DateDiffResult = { days: 2, hours: 3, minutes: 30, seconds: 0 }
		expect(formatDiff(diff)).toBe('2 days, 3 hours, 30 minutes')
	})

	it('should format diff in Chinese', () => {
		const diff: DateDiffResult = { days: 2, hours: 3, minutes: 30, seconds: 0 }
		expect(formatDiff(diff, 'zh')).toBe('2天, 3小时, 30分钟')
	})

	it('should handle singular values in English', () => {
		const diff: DateDiffResult = { days: 1, hours: 1, minutes: 1, seconds: 1 }
		expect(formatDiff(diff)).toBe('1 day, 1 hour, 1 minute, 1 second')
	})

	it('should handle plural values in English', () => {
		const diff: DateDiffResult = { days: 2, hours: 3, minutes: 4, seconds: 5 }
		expect(formatDiff(diff)).toBe('2 days, 3 hours, 4 minutes, 5 seconds')
	})

	it('should skip zero values', () => {
		const diff: DateDiffResult = { days: 0, hours: 2, minutes: 0, seconds: 30 }
		expect(formatDiff(diff)).toBe('2 hours, 30 seconds')
	})

	it('should handle all zeros in English', () => {
		const diff: DateDiffResult = { days: 0, hours: 0, minutes: 0, seconds: 0 }
		expect(formatDiff(diff)).toBe('0 seconds')
	})

	it('should handle all zeros in Chinese', () => {
		const diff: DateDiffResult = { days: 0, hours: 0, minutes: 0, seconds: 0 }
		expect(formatDiff(diff, 'zh')).toBe('0秒')
	})

	it('should format only seconds', () => {
		const diff: DateDiffResult = { days: 0, hours: 0, minutes: 0, seconds: 45 }
		expect(formatDiff(diff)).toBe('45 seconds')
	})

	it('should format only minutes', () => {
		const diff: DateDiffResult = { days: 0, hours: 0, minutes: 5, seconds: 0 }
		expect(formatDiff(diff)).toBe('5 minutes')
	})

	it('should format only hours', () => {
		const diff: DateDiffResult = { days: 0, hours: 3, minutes: 0, seconds: 0 }
		expect(formatDiff(diff)).toBe('3 hours')
	})

	it('should format only days', () => {
		const diff: DateDiffResult = { days: 5, hours: 0, minutes: 0, seconds: 0 }
		expect(formatDiff(diff)).toBe('5 days')
	})
})
