import { describe, expect, it } from 'vitest'
import { date, DateParser } from '../src/date/index'
import { formatDate, relativeTime, dateDiff } from '../src/date/index'
import {
	isToday,
	isYesterday,
	isTomorrow,
	isWeekend,
	isLeapYear,
	isBefore,
	isAfter,
	isSame,
	compare,
} from '../src/date/compare'
import {
	getDaysInMonth,
	getQuarter,
	getDayOfYear,
	getWeekOfYear,
	add,
	subtract,
	startOf,
	endOf,
} from '../src/date/manipulate'

describe('date namespace', () => {
	it('should create DateParser instance', () => {
		const parser = date()
		expect(parser).toBeInstanceOf(DateParser)
		expect(parser.isValid).toBe(true)
	})

	it('should parse date string', () => {
		const parser = date('2024-01-15')
		expect(parser.year).toBe(2024)
		expect(parser.month).toBe(1)
		expect(parser.day).toBe(15)
	})

	it('should format date', () => {
		const parser = date('2024-01-15T10:30:45')
		expect(parser.format('YYYY-MM-DD')).toBe('2024-01-15')
		expect(parser.format('YYYY/MM/DD')).toBe('2024/01/15')
	})

	it('should chain operations', () => {
		const result = date('2024-01-15').add(1, 'day').format('YYYY-MM-DD')
		expect(result).toBe('2024-01-16')
	})

	it('should compare dates', () => {
		const d1 = date('2024-01-15')
		const d2 = date('2024-01-16')
		expect(d1.isBefore(d2.date)).toBe(true)
		expect(d2.isAfter(d1.date)).toBe(true)
	})

	it('should check if today', () => {
		const today = date(new Date())
		expect(today.isToday()).toBe(true)
	})

	it('should calculate diff', () => {
		const diff = date('2024-01-01').diff('2024-01-03')
		expect(diff.days).toBe(2)
	})

	it('should get relative time', () => {
		const now = new Date()
		const past = new Date(now.getTime() - 3600000) // 1 hour ago
		const result = date(past).relativeTime(now)
		expect(result).toContain('hour')
	})

	it('should use static methods', () => {
		expect(date.format(new Date('2024-01-15'), 'YYYY-MM-DD')).toBe('2024-01-15')
		expect(date.isToday(new Date())).toBe(true)
		expect(date.getDaysInMonth(2024, 1)).toBe(29) // February in leap year
	})
})

describe('DateParser class', () => {
	it('should get date properties', () => {
		const parser = new DateParser('2024-03-15T14:30:45.123')
		expect(parser.year).toBe(2024)
		expect(parser.month).toBe(3)
		expect(parser.day).toBe(15)
		expect(parser.hours).toBe(14)
		expect(parser.minutes).toBe(30)
		expect(parser.seconds).toBe(45)
		expect(parser.milliseconds).toBe(123)
	})

	it('should add and subtract time', () => {
		const parser = new DateParser('2024-01-15')
		expect(parser.add(1, 'day').day).toBe(16)
		expect(parser.add(1, 'month').month).toBe(2)
		expect(parser.subtract(1, 'day').day).toBe(14)
	})

	it('should get start/end of periods', () => {
		const parser = new DateParser('2024-03-15T14:30:45')
		const startOfDay = parser.startOf('day')
		expect(startOfDay.hours).toBe(0)
		expect(startOfDay.minutes).toBe(0)
		expect(startOfDay.seconds).toBe(0)

		const endOfDay = parser.endOf('day')
		expect(endOfDay.hours).toBe(23)
		expect(endOfDay.minutes).toBe(59)
		expect(endOfDay.seconds).toBe(59)
	})

	it('should check weekend', () => {
		const weekday = new DateParser('2024-03-15') // Friday
		const weekend = new DateParser('2024-03-16') // Saturday
		expect(weekday.isWeekend()).toBe(false)
		expect(weekend.isWeekend()).toBe(true)
	})

	it('should check leap year', () => {
		expect(new DateParser('2024-01-01').isLeapYear()).toBe(true)
		expect(new DateParser('2023-01-01').isLeapYear()).toBe(false)
	})

	it('should get quarter', () => {
		expect(new DateParser('2024-01-15').getQuarter()).toBe(1)
		expect(new DateParser('2024-04-15').getQuarter()).toBe(2)
		expect(new DateParser('2024-07-15').getQuarter()).toBe(3)
		expect(new DateParser('2024-10-15').getQuarter()).toBe(4)
	})

	it('should get day of year', () => {
		expect(new DateParser('2024-01-01').getDayOfYear()).toBe(1)
		expect(new DateParser('2024-02-01').getDayOfYear()).toBe(32)
	})

	it('should get week of year', () => {
		const week = new DateParser('2024-01-01').getWeekOfYear()
		expect(week).toBeGreaterThanOrEqual(1)
		expect(week).toBeLessThanOrEqual(52)
	})
})

describe('formatDate', () => {
	it('should format date with default format', () => {
		const result = formatDate(new Date('2024-01-15T10:30:45'))
		expect(result).toBe('2024-01-15 10:30:45')
	})

	it('should handle custom formats', () => {
		const date = new Date('2024-01-15T14:30:45.123')
		expect(formatDate(date, 'YYYY/MM/DD')).toBe('2024/01/15')
		expect(formatDate(date, 'hh:mm A')).toBe('02:30 PM')
		expect(formatDate(date, 'SSS')).toBe('123')
	})

	it('should return empty string for invalid date', () => {
		expect(formatDate('invalid')).toBe('')
	})
})

describe('dateDiff', () => {
	it('should calculate difference', () => {
		const result = dateDiff('2024-01-01', '2024-01-03')
		expect(result.days).toBe(2)
		expect(result.total.hours).toBe(48)
	})

	it('should handle reverse order', () => {
		const result = dateDiff('2024-01-03', '2024-01-01')
		expect(result.days).toBe(2)
	})

	it('should return zeros for invalid dates', () => {
		const result = dateDiff('invalid', '2024-01-01')
		expect(result.days).toBe(0)
	})
})

describe('relativeTime', () => {
	it('should return "just now" for current time', () => {
		const now = new Date()
		expect(relativeTime(now, now)).toBe('just now')
	})

	it('should support Chinese locale', () => {
		const now = new Date()
		const past = new Date(now.getTime() - 5 * 60 * 1000)
		const result = relativeTime(past, now, 'zh')
		expect(result).toContain('分钟')
	})
})

describe('compare functions', () => {
	it('isToday', () => {
		expect(isToday(new Date())).toBe(true)
		const yesterday = new Date()
		yesterday.setDate(yesterday.getDate() - 1)
		expect(isToday(yesterday)).toBe(false)
	})

	it('isYesterday/isTomorrow', () => {
		const yesterday = new Date()
		yesterday.setDate(yesterday.getDate() - 1)
		expect(isYesterday(yesterday)).toBe(true)

		const tomorrow = new Date()
		tomorrow.setDate(tomorrow.getDate() + 1)
		expect(isTomorrow(tomorrow)).toBe(true)
	})

	it('isWeekend', () => {
		expect(isWeekend(new Date('2024-03-16'))).toBe(true) // Saturday
		expect(isWeekend(new Date('2024-03-17'))).toBe(true) // Sunday
		expect(isWeekend(new Date('2024-03-15'))).toBe(false) // Friday
	})

	it('isLeapYear', () => {
		expect(isLeapYear(2024)).toBe(true)
		expect(isLeapYear(2023)).toBe(false)
		expect(isLeapYear(2000)).toBe(true)
		expect(isLeapYear(1900)).toBe(false)
	})

	it('isBefore/isAfter', () => {
		expect(isBefore('2024-01-01', '2024-01-02')).toBe(true)
		expect(isAfter('2024-01-02', '2024-01-01')).toBe(true)
	})

	it('isSame', () => {
		expect(isSame('2024-01-15', '2024-01-15', 'day')).toBe(true)
		expect(isSame('2024-01-15', '2024-01-16', 'month')).toBe(true)
		expect(isSame('2024-01-15', '2024-02-15', 'year')).toBe(true)
	})

	it('compare', () => {
		expect(compare('2024-01-01', '2024-01-02')).toBe(-1)
		expect(compare('2024-01-02', '2024-01-01')).toBe(1)
		expect(compare('2024-01-01', '2024-01-01')).toBe(0)
	})
})

describe('manipulate functions', () => {
	it('getDaysInMonth', () => {
		expect(getDaysInMonth(2024, 0)).toBe(31) // January
		expect(getDaysInMonth(2024, 1)).toBe(29) // February (leap year)
		expect(getDaysInMonth(2023, 1)).toBe(28) // February (non-leap year)
	})

	it('getQuarter', () => {
		expect(getQuarter('2024-01-15')).toBe(1)
		expect(getQuarter('2024-06-15')).toBe(2)
		expect(getQuarter('2024-08-15')).toBe(3)
		expect(getQuarter('2024-12-15')).toBe(4)
	})

	it('getDayOfYear', () => {
		expect(getDayOfYear('2024-01-01')).toBe(1)
		expect(getDayOfYear('2024-12-31')).toBe(366) // Leap year
		expect(getDayOfYear('2023-12-31')).toBe(365)
	})

	it('getWeekOfYear', () => {
		expect(getWeekOfYear('2024-01-01')).toBeGreaterThanOrEqual(1)
		expect(getWeekOfYear('2024-01-01')).toBeLessThanOrEqual(52)
	})

	it('add', () => {
		const d = new Date('2024-01-15')
		expect(add(d, 1, 'day').getDate()).toBe(16)
		expect(add(d, 1, 'month').getMonth()).toBe(1)
		expect(add(d, 1, 'year').getFullYear()).toBe(2025)
	})

	it('subtract', () => {
		const d = new Date('2024-01-15')
		expect(subtract(d, 1, 'day').getDate()).toBe(14)
	})

	it('startOf', () => {
		const d = new Date('2024-03-15T14:30:45')
		const start = startOf(d, 'day')
		expect(start.getHours()).toBe(0)
		expect(start.getMinutes()).toBe(0)
		expect(start.getSeconds()).toBe(0)
	})

	it('endOf', () => {
		const d = new Date('2024-03-15T14:30:45')
		const end = endOf(d, 'day')
		expect(end.getHours()).toBe(23)
		expect(end.getMinutes()).toBe(59)
		expect(end.getSeconds()).toBe(59)
	})
})
