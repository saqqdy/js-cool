import { describe, expect, it } from 'vitest'
import { getDaysInMonth } from '../src/date/manipulate'

describe('getDaysInMonth', () => {
	it('should return 31 for January', () => {
		expect(getDaysInMonth(2024, 0)).toBe(31)
	})

	it('should return 29 for February in leap year', () => {
		expect(getDaysInMonth(2024, 1)).toBe(29)
	})

	it('should return 28 for February in non-leap year', () => {
		expect(getDaysInMonth(2023, 1)).toBe(28)
	})

	it('should return 30 for April', () => {
		expect(getDaysInMonth(2024, 3)).toBe(30)
	})

	it('should return 31 for December', () => {
		expect(getDaysInMonth(2024, 11)).toBe(31)
	})
})
