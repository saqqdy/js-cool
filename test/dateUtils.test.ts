import { describe, expect, it } from 'vitest'
import {
	addToDate,
	endOfDay,
	endOfMonth,
	endOfWeek,
	endOfYear,
	formatTokens,
	getDayOfYear,
	getDaysInMonthRaw,
	getQuarter,
	getSortedTokenKeys,
	getWeekOfYear,
	isLeapYear,
	isValidDate,
	parseDate,
	relativeTimeLocales,
	startOfDay,
	startOfMonth,
	startOfWeek,
	startOfYear,
	toDate,
	unitToMs,
} from '../src/date/utils'

describe('date/utils', () => {
	describe('parseDate', () => {
		it('should return current date for undefined input', () => {
			const result = parseDate(undefined)
			expect(result).toBeInstanceOf(Date)
			expect(result!.getTime()).toBeGreaterThan(0)
		})

		it('should return current date for null input', () => {
			const result = parseDate(null)
			expect(result).toBeInstanceOf(Date)
		})

		it('should parse date string', () => {
			const result = parseDate('2024-01-15')
			expect(result).toBeInstanceOf(Date)
			expect(result!.getFullYear()).toBe(2024)
			expect(result!.getMonth()).toBe(0)
			expect(result!.getDate()).toBe(15)
		})

		it('should parse Date object', () => {
			const date = new Date('2024-01-15')
			const result = parseDate(date)
			expect(result).toBeInstanceOf(Date)
			expect(result!.getTime()).toBe(date.getTime())
		})

		it('should parse timestamp', () => {
			const timestamp = 1705276800000
			const result = parseDate(timestamp)
			expect(result).toBeInstanceOf(Date)
			expect(result!.getTime()).toBe(timestamp)
		})

		it('should return null for invalid date string', () => {
			expect(parseDate('invalid')).toBeNull()
		})

		it('should return null for NaN timestamp', () => {
			expect(parseDate(NaN)).toBeNull()
		})
	})

	describe('isValidDate', () => {
		it('should return true for valid date', () => {
			expect(isValidDate(new Date())).toBeTruthy()
			expect(isValidDate(new Date('2024-01-15'))).toBeTruthy()
		})

		it('should return false for invalid date', () => {
			expect(isValidDate(new Date('invalid'))).toBeFalsy()
			expect(isValidDate(new Date(NaN))).toBeFalsy()
		})
	})

	describe('isLeapYear', () => {
		it('should return true for leap years', () => {
			expect(isLeapYear(2024)).toBeTruthy()
			expect(isLeapYear(2000)).toBeTruthy()
			expect(isLeapYear(2400)).toBeTruthy()
		})

		it('should return false for non-leap years', () => {
			expect(isLeapYear(2023)).toBeFalsy()
			expect(isLeapYear(1900)).toBeFalsy()
			expect(isLeapYear(2100)).toBeFalsy()
		})
	})

	describe('getDaysInMonthRaw', () => {
		it('should return correct days for each month', () => {
			expect(getDaysInMonthRaw(2024, 0)).toBe(31) // January
			expect(getDaysInMonthRaw(2024, 1)).toBe(29) // February (leap year)
			expect(getDaysInMonthRaw(2023, 1)).toBe(28) // February (non-leap year)
			expect(getDaysInMonthRaw(2024, 2)).toBe(31) // March
			expect(getDaysInMonthRaw(2024, 3)).toBe(30) // April
			expect(getDaysInMonthRaw(2024, 4)).toBe(31) // May
			expect(getDaysInMonthRaw(2024, 5)).toBe(30) // June
			expect(getDaysInMonthRaw(2024, 6)).toBe(31) // July
			expect(getDaysInMonthRaw(2024, 7)).toBe(31) // August
			expect(getDaysInMonthRaw(2024, 8)).toBe(30) // September
			expect(getDaysInMonthRaw(2024, 9)).toBe(31) // October
			expect(getDaysInMonthRaw(2024, 10)).toBe(30) // November
			expect(getDaysInMonthRaw(2024, 11)).toBe(31) // December
		})
	})

	describe('getDayOfYear', () => {
		it('should return 1 for January 1st', () => {
			const result = getDayOfYear(new Date('2024-01-01'))
			expect(result).toBe(1)
		})

		it('should return correct day for mid-year dates', () => {
			const result = getDayOfYear(new Date('2024-02-01'))
			expect(result).toBe(32)
		})

		it('should return 366 for December 31st in leap year', () => {
			const result = getDayOfYear(new Date('2024-12-31'))
			expect(result).toBe(366)
		})

		it('should return 365 for December 31st in non-leap year', () => {
			const result = getDayOfYear(new Date('2023-12-31'))
			expect(result).toBe(365)
		})
	})

	describe('getWeekOfYear', () => {
		it('should return week number between 1 and 53', () => {
			const result = getWeekOfYear(new Date('2024-01-15'))
			expect(result).toBeGreaterThanOrEqual(1)
			expect(result).toBeLessThanOrEqual(53)
		})

		it('should return week 1 for early January', () => {
			const result = getWeekOfYear(new Date('2024-01-01'))
			expect(result).toBeGreaterThanOrEqual(1)
			expect(result).toBeLessThanOrEqual(2)
		})
	})

	describe('getQuarter', () => {
		it('should return correct quarter', () => {
			expect(getQuarter(new Date('2024-01-15'))).toBe(1)
			expect(getQuarter(new Date('2024-02-15'))).toBe(1)
			expect(getQuarter(new Date('2024-03-15'))).toBe(1)
			expect(getQuarter(new Date('2024-04-15'))).toBe(2)
			expect(getQuarter(new Date('2024-05-15'))).toBe(2)
			expect(getQuarter(new Date('2024-06-15'))).toBe(2)
			expect(getQuarter(new Date('2024-07-15'))).toBe(3)
			expect(getQuarter(new Date('2024-08-15'))).toBe(3)
			expect(getQuarter(new Date('2024-09-15'))).toBe(3)
			expect(getQuarter(new Date('2024-10-15'))).toBe(4)
			expect(getQuarter(new Date('2024-11-15'))).toBe(4)
			expect(getQuarter(new Date('2024-12-15'))).toBe(4)
		})
	})

	describe('toDate', () => {
		it('should return Date for valid input', () => {
			const result = toDate('2024-01-15')
			expect(result).toBeInstanceOf(Date)
			expect(result.getFullYear()).toBe(2024)
		})

		it('should throw for invalid input', () => {
			expect(() => toDate('invalid')).toThrow('Invalid date')
		})
	})

	describe('startOfDay', () => {
		it('should return start of day (00:00:00.000)', () => {
			const date = new Date('2024-03-15T14:30:45.123')
			const result = startOfDay(date)
			expect(result.getHours()).toBe(0)
			expect(result.getMinutes()).toBe(0)
			expect(result.getSeconds()).toBe(0)
			expect(result.getMilliseconds()).toBe(0)
		})

		it('should not modify original date', () => {
			const date = new Date('2024-03-15T14:30:45.123')
			startOfDay(date)
			expect(date.getHours()).toBe(14)
		})
	})

	describe('endOfDay', () => {
		it('should return end of day (23:59:59.999)', () => {
			const date = new Date('2024-03-15T14:30:45.123')
			const result = endOfDay(date)
			expect(result.getHours()).toBe(23)
			expect(result.getMinutes()).toBe(59)
			expect(result.getSeconds()).toBe(59)
			expect(result.getMilliseconds()).toBe(999)
		})
	})

	describe('startOfWeek', () => {
		it('should return Sunday as start of week', () => {
			// 2024-03-15 is Friday
			const date = new Date('2024-03-15T14:30:45')
			const result = startOfWeek(date)
			expect(result.getDay()).toBe(0) // Sunday
		})

		it('should return same day for Sunday', () => {
			// 2024-03-17 is Sunday
			const date = new Date('2024-03-17T14:30:45')
			const result = startOfWeek(date)
			expect(result.getDate()).toBe(17)
		})
	})

	describe('endOfWeek', () => {
		it('should return Saturday as end of week', () => {
			// 2024-03-15 is Friday
			const date = new Date('2024-03-15T14:30:45')
			const result = endOfWeek(date)
			expect(result.getDay()).toBe(6) // Saturday
		})

		it('should return same day for Saturday', () => {
			// 2024-03-16 is Saturday
			const date = new Date('2024-03-16T14:30:45')
			const result = endOfWeek(date)
			expect(result.getDate()).toBe(16)
		})
	})

	describe('startOfMonth', () => {
		it('should return first day of month', () => {
			const date = new Date('2024-03-15T14:30:45')
			const result = startOfMonth(date)
			expect(result.getDate()).toBe(1)
			expect(result.getHours()).toBe(0)
			expect(result.getMinutes()).toBe(0)
			expect(result.getSeconds()).toBe(0)
		})
	})

	describe('endOfMonth', () => {
		it('should return last day of month', () => {
			const date = new Date('2024-03-15T14:30:45')
			const result = endOfMonth(date)
			expect(result.getDate()).toBe(31)
			expect(result.getHours()).toBe(23)
			expect(result.getMinutes()).toBe(59)
			expect(result.getSeconds()).toBe(59)
		})

		it('should handle February in leap year', () => {
			const date = new Date('2024-02-15')
			const result = endOfMonth(date)
			expect(result.getDate()).toBe(29)
		})

		it('should handle February in non-leap year', () => {
			const date = new Date('2023-02-15')
			const result = endOfMonth(date)
			expect(result.getDate()).toBe(28)
		})
	})

	describe('startOfYear', () => {
		it('should return January 1st', () => {
			const date = new Date('2024-03-15T14:30:45')
			const result = startOfYear(date)
			expect(result.getMonth()).toBe(0)
			expect(result.getDate()).toBe(1)
			expect(result.getHours()).toBe(0)
			expect(result.getMinutes()).toBe(0)
			expect(result.getSeconds()).toBe(0)
		})
	})

	describe('endOfYear', () => {
		it('should return December 31st', () => {
			const date = new Date('2024-03-15T14:30:45')
			const result = endOfYear(date)
			expect(result.getMonth()).toBe(11)
			expect(result.getDate()).toBe(31)
			expect(result.getHours()).toBe(23)
			expect(result.getMinutes()).toBe(59)
			expect(result.getSeconds()).toBe(59)
		})
	})

	describe('relativeTimeLocales', () => {
		it('should have all locale keys', () => {
			expect(relativeTimeLocales.en).toBeDefined()
			expect(relativeTimeLocales.zh).toBeDefined()
			expect(relativeTimeLocales.ja).toBeDefined()
			expect(relativeTimeLocales.ko).toBeDefined()
			expect(relativeTimeLocales.de).toBeDefined()
			expect(relativeTimeLocales.fr).toBeDefined()
			expect(relativeTimeLocales.es).toBeDefined()
		})

		it('should have justNow key for each locale', () => {
			expect(relativeTimeLocales.en.justNow).toBe('just now')
			expect(relativeTimeLocales.zh.justNow).toBe('刚刚')
		})
	})

	describe('formatTokens', () => {
		it('should have all format tokens', () => {
			expect(formatTokens.YYYY).toBeDefined()
			expect(formatTokens.YY).toBeDefined()
			expect(formatTokens.MM).toBeDefined()
			expect(formatTokens.M).toBeDefined()
			expect(formatTokens.DD).toBeDefined()
			expect(formatTokens.D).toBeDefined()
			expect(formatTokens.HH).toBeDefined()
			expect(formatTokens.H).toBeDefined()
			expect(formatTokens.hh).toBeDefined()
			expect(formatTokens.h).toBeDefined()
			expect(formatTokens.mm).toBeDefined()
			expect(formatTokens.m).toBeDefined()
			expect(formatTokens.ss).toBeDefined()
			expect(formatTokens.s).toBeDefined()
			expect(formatTokens.SSS).toBeDefined()
			expect(formatTokens.A).toBeDefined()
			expect(formatTokens.a).toBeDefined()
		})

		it('should format date correctly', () => {
			const date = new Date('2024-03-05T14:30:45.123')
			expect(formatTokens.YYYY(date)).toBe('2024')
			expect(formatTokens.YY(date)).toBe('24')
			expect(formatTokens.MM(date)).toBe('03')
			expect(formatTokens.M(date)).toBe('3')
			expect(formatTokens.DD(date)).toBe('05')
			expect(formatTokens.D(date)).toBe('5')
			expect(formatTokens.HH(date)).toBe('14')
			expect(formatTokens.H(date)).toBe('14')
			expect(formatTokens.hh(date)).toBe('02')
			expect(formatTokens.h(date)).toBe('2')
			expect(formatTokens.mm(date)).toBe('30')
			expect(formatTokens.m(date)).toBe('30')
			expect(formatTokens.ss(date)).toBe('45')
			expect(formatTokens.s(date)).toBe('45')
			expect(formatTokens.SSS(date)).toBe('123')
			expect(formatTokens.A(date)).toBe('PM')
			expect(formatTokens.a(date)).toBe('pm')
		})

		it('should handle midnight correctly for 12-hour format', () => {
			const date = new Date('2024-03-05T00:30:00')
			expect(formatTokens.h(date)).toBe('12')
			expect(formatTokens.hh(date)).toBe('12')
			expect(formatTokens.A(date)).toBe('AM')
		})

		it('should handle noon correctly for 12-hour format', () => {
			const date = new Date('2024-03-05T12:30:00')
			expect(formatTokens.h(date)).toBe('12')
			expect(formatTokens.hh(date)).toBe('12')
			expect(formatTokens.A(date)).toBe('PM')
		})
	})

	describe('getSortedTokenKeys', () => {
		it('should return keys sorted by length (longest first)', () => {
			const keys = getSortedTokenKeys()
			expect(keys[0]).toBe('YYYY')
			expect(keys[1]).toBe('SSS')

			// Check that keys are sorted by length
			for (let i = 0; i < keys.length - 1; i++) {
				expect(keys[i].length).toBeGreaterThanOrEqual(keys[i + 1].length)
			}
		})
	})

	describe('unitToMs', () => {
		it('should have correct millisecond values', () => {
			expect(unitToMs.millisecond).toBe(1)
			expect(unitToMs.second).toBe(1000)
			expect(unitToMs.minute).toBe(60 * 1000)
			expect(unitToMs.hour).toBe(60 * 60 * 1000)
			expect(unitToMs.day).toBe(24 * 60 * 60 * 1000)
			expect(unitToMs.week).toBe(7 * 24 * 60 * 60 * 1000)
			expect(unitToMs.month).toBe(30 * 24 * 60 * 60 * 1000)
			expect(unitToMs.year).toBe(365 * 24 * 60 * 60 * 1000)
		})
	})

	describe('addToDate', () => {
		const date = new Date('2024-03-15T14:30:45.123')

		it('should add milliseconds', () => {
			const result = addToDate(date, 100, 'millisecond')
			expect(result.getMilliseconds()).toBe(223)
		})

		it('should add seconds', () => {
			const result = addToDate(date, 30, 'second')
			expect(result.getSeconds()).toBe(15)
		})

		it('should add minutes', () => {
			const result = addToDate(date, 15, 'minute')
			expect(result.getMinutes()).toBe(45)
		})

		it('should add hours', () => {
			const result = addToDate(date, 2, 'hour')
			expect(result.getHours()).toBe(16)
		})

		it('should add days', () => {
			const result = addToDate(date, 5, 'day')
			expect(result.getDate()).toBe(20)
		})

		it('should add weeks', () => {
			const result = addToDate(date, 1, 'week')
			expect(result.getDate()).toBe(22)
		})

		it('should add months', () => {
			const result = addToDate(date, 2, 'month')
			expect(result.getMonth()).toBe(4) // May
		})

		it('should add years', () => {
			const result = addToDate(date, 1, 'year')
			expect(result.getFullYear()).toBe(2025)
		})

		it('should not modify original date', () => {
			addToDate(date, 1, 'day')
			expect(date.getDate()).toBe(15)
		})

		it('should handle negative values', () => {
			const result = addToDate(date, -1, 'day')
			expect(result.getDate()).toBe(14)
		})
	})
})
