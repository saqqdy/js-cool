import { describe, expect, it } from 'vitest'
import { dateDiff } from '../src/date/diff'

describe('dateDiff', () => {
	it('should calculate difference between two dates', () => {
		const result = dateDiff('2024-01-01', '2024-01-03')
		expect(result.days).toBe(2)
		expect(result.total.days).toBe(2)
		expect(result.total.hours).toBe(48)
	})

	it('should calculate hours and minutes', () => {
		const result = dateDiff('2024-01-01T00:00:00', '2024-01-02T12:30:00')
		expect(result.days).toBe(1)
		expect(result.hours).toBe(12)
		expect(result.minutes).toBe(30)
	})

	it('should handle reverse order', () => {
		const result = dateDiff('2024-01-03', '2024-01-01')
		expect(result.days).toBe(2)
	})

	it('should return zeros for invalid dates', () => {
		const result = dateDiff('invalid', '2024-01-01')
		expect(result.days).toBe(0)
		expect(result.total.days).toBe(0)
	})
})
