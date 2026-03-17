import { describe, expect, it } from 'vitest'
import round from '../src/round'

describe('round', () => {
	it('should round to integer by default', () => {
		expect(round(4.006)).toBe(4)
		expect(round(4.5)).toBe(5)
		expect(round(4.4)).toBe(4)
	})

	it('should round to specified precision', () => {
		expect(round(4.006, 2)).toBe(4.01)
		expect(round(4.004, 2)).toBe(4)
	})

	it('should handle negative precision', () => {
		expect(round(4060, -2)).toBe(4100)
		expect(round(4040, -2)).toBe(4000)
	})

	it('should handle zero precision', () => {
		expect(round(4.5, 0)).toBe(5)
		expect(round(4.4, 0)).toBe(4)
	})
})
