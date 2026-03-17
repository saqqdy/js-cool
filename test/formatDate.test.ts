import { describe, expect, it } from 'vitest'
import formatDate from '../src/formatDate'

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
})
