import { describe, expect, it } from 'vitest'
import date, { dateDiff, DateParser, formatDate, relativeTime } from '../src/date/index'
import {
	compare,
	isAfter,
	isBefore,
	isBetween,
	isLeapYear,
	isLeapYearDate,
	isSame,
	isToday,
	isTomorrow,
	isWeekday,
	isWeekend,
	isYesterday,
	max,
	min,
} from '../src/date/compare'
import {
	add,
	clone,
	endOf,
	getDayOfYear,
	getDaysInMonth,
	getQuarter,
	getWeekOfYear,
	startOf,
	subtract,
	toEndOfDay,
	toMidnight,
} from '../src/date/manipulate'
import { diffIn } from '../src/date/diff'
import { isISODateString, parseDate, parseDateWithFormat, parseISODate } from '../src/date/parse'

describe('date namespace', () => {
	it('should create DateParser instance', () => {
		const parser = date()
		expect(parser).toBeInstanceOf(DateParser)
		expect(parser.isValid).toBeTruthy()
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
		expect(d1.isBefore(d2.date)).toBeTruthy()
		expect(d2.isAfter(d1.date)).toBeTruthy()
	})

	it('should check if today', () => {
		const today = date(new Date())
		expect(today.isToday()).toBeTruthy()
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
		expect(date.isToday(new Date())).toBeTruthy()
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
		expect(weekday.isWeekend()).toBeFalsy()
		expect(weekend.isWeekend()).toBeTruthy()
	})

	it('should check leap year', () => {
		expect(new DateParser('2024-01-01').isLeapYear()).toBeTruthy()
		expect(new DateParser('2023-01-01').isLeapYear()).toBeFalsy()
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
		expect(isToday(new Date())).toBeTruthy()
		const yesterday = new Date()
		yesterday.setDate(yesterday.getDate() - 1)
		expect(isToday(yesterday)).toBeFalsy()
	})

	it('isYesterday/isTomorrow', () => {
		const yesterday = new Date()
		yesterday.setDate(yesterday.getDate() - 1)
		expect(isYesterday(yesterday)).toBeTruthy()

		const tomorrow = new Date()
		tomorrow.setDate(tomorrow.getDate() + 1)
		expect(isTomorrow(tomorrow)).toBeTruthy()
	})

	it('isWeekend', () => {
		expect(isWeekend(new Date('2024-03-16'))).toBeTruthy() // Saturday
		expect(isWeekend(new Date('2024-03-17'))).toBeTruthy() // Sunday
		expect(isWeekend(new Date('2024-03-15'))).toBeFalsy() // Friday
	})

	it('isLeapYear', () => {
		expect(isLeapYear(2024)).toBeTruthy()
		expect(isLeapYear(2023)).toBeFalsy()
		expect(isLeapYear(2000)).toBeTruthy()
		expect(isLeapYear(1900)).toBeFalsy()
	})

	it('isBefore/isAfter', () => {
		expect(isBefore('2024-01-01', '2024-01-02')).toBeTruthy()
		expect(isAfter('2024-01-02', '2024-01-01')).toBeTruthy()
	})

	it('isSame', () => {
		expect(isSame('2024-01-15', '2024-01-15', 'day')).toBeTruthy()
		expect(isSame('2024-01-15', '2024-01-16', 'month')).toBeTruthy()
		expect(isSame('2024-01-15', '2024-02-15', 'year')).toBeTruthy()
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

describe('additional compare functions', () => {
	it('isBetween', () => {
		expect(isBetween('2024-01-15', '2024-01-01', '2024-01-31')).toBeTruthy()
		expect(isBetween('2024-01-15', '2024-01-01', '2024-01-10')).toBeFalsy()
		// Exclusive mode
		expect(isBetween('2024-01-01', '2024-01-01', '2024-01-31', false)).toBeFalsy()
		expect(isBetween('2024-01-15', '2024-01-01', '2024-01-31', false)).toBeTruthy()
	})

	it('isWeekday', () => {
		expect(isWeekday(new Date('2024-03-15'))).toBeTruthy() // Friday
		expect(isWeekday(new Date('2024-03-16'))).toBeFalsy() // Saturday
	})

	it('isLeapYearDate', () => {
		expect(isLeapYearDate(new Date('2024-01-01'))).toBeTruthy()
		expect(isLeapYearDate(new Date('2023-01-01'))).toBeFalsy()
	})

	it('min', () => {
		const minDate = min('2024-01-01', '2024-06-01', '2024-03-01')
		expect(minDate.getFullYear()).toBe(2024)
		expect(minDate.getMonth()).toBe(0) // January
	})

	it('max', () => {
		const maxDate = max('2024-01-01', '2024-06-01', '2024-03-01')
		expect(maxDate.getFullYear()).toBe(2024)
		expect(maxDate.getMonth()).toBe(5) // June
	})

	it('isSame with different units', () => {
		expect(isSame('2024-01-15 10:00', '2024-01-15 12:00', 'year')).toBeTruthy()
		expect(isSame('2024-01-15 10:00', '2024-01-15 12:00', 'month')).toBeTruthy()
		expect(isSame('2024-01-15 10:00', '2024-01-15 12:00', 'day')).toBeTruthy()
		expect(isSame('2024-01-15 10:00', '2024-01-15 12:00', 'hour')).toBeFalsy()
		expect(isSame('2024-01-15 10:30', '2024-01-15 10:45', 'hour')).toBeTruthy()
		expect(isSame('2024-01-15 10:30', '2024-01-15 10:45', 'minute')).toBeFalsy()
		expect(isSame('2024-01-15 10:30:45', '2024-01-15 10:30:50', 'minute')).toBeTruthy()
		expect(isSame('2024-01-15 10:30:45', '2024-01-15 10:30:50', 'second')).toBeFalsy()
	})

	it('isBefore/isAfter with invalid dates', () => {
		expect(isBefore('invalid', '2024-01-01')).toBeFalsy()
		expect(isAfter('invalid', '2024-01-01')).toBeFalsy()
		expect(isSame('invalid', '2024-01-01')).toBeFalsy()
	})

	it('compare with invalid dates', () => {
		expect(compare('invalid', '2024-01-01')).toBe(0)
	})

	it('min/max with invalid dates', () => {
		// min/max should skip invalid dates
		const minDate = min('invalid', '2024-01-01')
		expect(minDate.getMonth()).toBe(0)

		const maxDate = max('invalid', '2024-01-01')
		expect(maxDate.getMonth()).toBe(0)
	})
})

describe('diffIn function', () => {
	it('should calculate diff in days', () => {
		expect(diffIn('2024-01-01', '2024-01-03', 'day')).toBe(2)
	})

	it('should calculate diff in hours', () => {
		expect(diffIn('2024-01-01 00:00', '2024-01-01 12:00', 'hour')).toBe(12)
	})

	it('should calculate diff in minutes', () => {
		expect(diffIn('2024-01-01 00:00', '2024-01-01 00:30', 'minute')).toBe(30)
	})

	it('should calculate diff in seconds', () => {
		expect(diffIn('2024-01-01 00:00:00', '2024-01-01 00:00:30', 'second')).toBe(30)
	})

	it('should calculate diff in milliseconds', () => {
		expect(diffIn('2024-01-01', '2024-01-01', 'millisecond')).toBe(0)
	})

	it('should handle invalid dates', () => {
		expect(diffIn('invalid', '2024-01-01', 'day')).toBe(0)
	})
})

describe('parse functions', () => {
	it('parseDate', () => {
		expect(parseDate(new Date('2024-01-15'))).toBeInstanceOf(Date)
		expect(parseDate('2024-01-15')).toBeInstanceOf(Date)
		expect(parseDate(1705276800000)).toBeInstanceOf(Date)
		expect(parseDate()).toBeInstanceOf(Date) // Returns current date
		expect(parseDate(null)).toBeInstanceOf(Date) // Returns current date
		expect(parseDate('invalid')).toBeNull()
	})

	it('parseDateWithFormat', () => {
		expect(parseDateWithFormat('2024-01-15', 'YYYY-MM-DD')).toBeInstanceOf(Date)
		expect(parseDateWithFormat('15/01/2024', 'DD/MM/YYYY')).toBeInstanceOf(Date)
		expect(parseDateWithFormat('invalid', 'YYYY-MM-DD')).toBeNull()
		expect(parseDateWithFormat('2024', 'YYYY')).toBeInstanceOf(Date)
	})

	it('isISODateString', () => {
		expect(isISODateString('2024-01-15')).toBeTruthy()
		expect(isISODateString('2024-01-15T10:30:45')).toBeTruthy()
		expect(isISODateString('2024-01-15T10:30:45.123Z')).toBeTruthy()
		expect(isISODateString('2024-01-15T10:30:45+08:00')).toBeTruthy()
		expect(isISODateString('invalid')).toBeFalsy()
	})

	it('parseISODate', () => {
		expect(parseISODate('2024-01-15')).toBeInstanceOf(Date)
		expect(parseISODate('2024-01-15T10:30:45Z')).toBeInstanceOf(Date)
		expect(parseISODate('invalid')).toBeNull()
	})
})

describe('additional manipulate functions', () => {
	it('add with different units', () => {
		const d = new Date('2024-01-15T10:30:45.123')

		// millisecond
		const ms = add(d, 100, 'millisecond')
		expect(ms.getMilliseconds()).toBe(223)

		// second
		const s = add(d, 30, 'second')
		expect(s.getSeconds()).toBe(15)

		// minute
		const m = add(d, 15, 'minute')
		expect(m.getMinutes()).toBe(45)

		// hour
		const h = add(d, 2, 'hour')
		expect(h.getHours()).toBe(12)

		// week
		const w = add(d, 1, 'week')
		expect(w.getDate()).toBe(22)
	})

	it('subtract with different units', () => {
		const d = new Date('2024-01-15T10:30:45.123')

		const ms = subtract(d, 100, 'millisecond')
		expect(ms.getMilliseconds()).toBe(23)

		const s = subtract(d, 30, 'second')
		expect(s.getSeconds()).toBe(15)

		const m = subtract(d, 15, 'minute')
		expect(m.getMinutes()).toBe(15)
	})

	it('startOf with different units', () => {
		const d = new Date('2024-03-15T14:30:45.123')

		const s = startOf(d, 'second')
		expect(s.getMilliseconds()).toBe(0)

		const m = startOf(d, 'minute')
		expect(m.getSeconds()).toBe(0)
		expect(m.getMilliseconds()).toBe(0)

		const h = startOf(d, 'hour')
		expect(h.getMinutes()).toBe(0)
		expect(h.getSeconds()).toBe(0)

		const day = startOf(d, 'day')
		expect(day.getHours()).toBe(0)
		expect(day.getMinutes()).toBe(0)

		const week = startOf(d, 'week')
		expect(week.getDay()).toBe(0) // Sunday

		const month = startOf(d, 'month')
		expect(month.getDate()).toBe(1)

		const year = startOf(d, 'year')
		expect(year.getMonth()).toBe(0)
		expect(year.getDate()).toBe(1)

		const ms = startOf(d, 'millisecond')
		expect(ms.getTime()).toBe(d.getTime())
	})

	it('endOf with different units', () => {
		const d = new Date('2024-03-15T14:30:45.123')

		const s = endOf(d, 'second')
		expect(s.getMilliseconds()).toBe(999)

		const m = endOf(d, 'minute')
		expect(m.getSeconds()).toBe(59)
		expect(m.getMilliseconds()).toBe(999)

		const h = endOf(d, 'hour')
		expect(h.getMinutes()).toBe(59)
		expect(h.getSeconds()).toBe(59)

		const day = endOf(d, 'day')
		expect(day.getHours()).toBe(23)
		expect(day.getMinutes()).toBe(59)

		const week = endOf(d, 'week')
		expect(week.getDay()).toBe(6) // Saturday

		const month = endOf(d, 'month')
		expect(month.getDate()).toBe(31) // March

		const year = endOf(d, 'year')
		expect(year.getMonth()).toBe(11)
		expect(year.getDate()).toBe(31)

		const ms = endOf(d, 'millisecond')
		expect(ms.getTime()).toBe(d.getTime())
	})

	it('clone', () => {
		const d = new Date('2024-01-15')
		const cloned = clone(d)
		expect(cloned.getTime()).toBe(d.getTime())
		expect(cloned).not.toBe(d)
	})

	it('toMidnight', () => {
		const d = new Date('2024-01-15T14:30:45')
		const midnight = toMidnight(d)
		expect(midnight.getHours()).toBe(0)
		expect(midnight.getMinutes()).toBe(0)
		expect(midnight.getSeconds()).toBe(0)
	})

	it('toEndOfDay', () => {
		const d = new Date('2024-01-15T14:30:45')
		const end = toEndOfDay(d)
		expect(end.getHours()).toBe(23)
		expect(end.getMinutes()).toBe(59)
		expect(end.getSeconds()).toBe(59)
	})
})

describe('DateParser additional methods', () => {
	it('isWeekday', () => {
		expect(new DateParser('2024-03-15').isWeekday()).toBeTruthy() // Friday
		expect(new DateParser('2024-03-16').isWeekday()).toBeFalsy() // Saturday
	})

	it('get method', () => {
		const d = new DateParser('2024-03-15T14:30:45.123')

		expect(d.get('year')).toBe(2024)
		expect(d.get('month')).toBe(3)
		expect(d.get('day')).toBe(15)
		expect(d.get('hour')).toBe(14)
		expect(d.get('minute')).toBe(30)
		expect(d.get('second')).toBe(45)
		expect(d.get('millisecond')).toBe(123)
		expect(d.get('week')).toBeGreaterThan(0)
		expect(d.get('unknown' as any)).toBe(0)
	})
})

describe('date namespace additional methods', () => {
	it('date.now()', () => {
		const parser = date.now()
		expect(parser).toBeInstanceOf(DateParser)
	})

	it('date.parse()', () => {
		const parser = date.parse('2024-01-15')
		expect(parser.year).toBe(2024)
	})

	it('date.min()', () => {
		const minParser = date.min('2024-01-01', '2024-06-01')
		expect(minParser.month).toBe(1)
	})

	it('date.max()', () => {
		const maxParser = date.max('2024-01-01', '2024-06-01')
		expect(maxParser.month).toBe(6)
	})
})

describe('relativeTime with different locales', () => {
	it('should support Japanese locale', () => {
		const now = new Date()
		const past = new Date(now.getTime() - 5 * 60 * 1000)
		const result = relativeTime(past, now, 'ja')
		expect(result).toContain('分')
	})

	it('should support Korean locale', () => {
		const now = new Date()
		const past = new Date(now.getTime() - 5 * 60 * 1000)
		const result = relativeTime(past, now, 'ko')
		expect(result).toContain('분')
	})

	it('should support German locale', () => {
		const now = new Date()
		const past = new Date(now.getTime() - 5 * 60 * 1000)
		const result = relativeTime(past, now, 'de')
		expect(result).toContain('Minute')
	})

	it('should support French locale', () => {
		const now = new Date()
		const past = new Date(now.getTime() - 5 * 60 * 1000)
		const result = relativeTime(past, now, 'fr')
		expect(result).toContain('minute')
	})

	it('should support Spanish locale', () => {
		const now = new Date()
		const past = new Date(now.getTime() - 5 * 60 * 1000)
		const result = relativeTime(past, now, 'es')
		expect(result).toContain('minuto')
	})

	it('should handle future times', () => {
		const now = new Date()
		const future = new Date(now.getTime() + 5 * 60 * 1000)
		const result = relativeTime(future, now, 'en')
		expect(result).toContain('minute')
	})
})
