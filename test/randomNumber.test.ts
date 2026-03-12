import { describe, expect, it } from 'vitest'
import randomNumber from '../src/randomNumber'

describe('randomNumber', () => {
	it('should return number between default range (1-10)', () => {
		const result = randomNumber()
		expect(result).toBeGreaterThanOrEqual(1)
		expect(result).toBeLessThanOrEqual(10)
	})

	it('should return number in custom range', () => {
		const result = randomNumber(5, 15)
		expect(result).toBeGreaterThanOrEqual(5)
		expect(result).toBeLessThanOrEqual(15)
	})

	it('should return min when min equals max', () => {
		const result = randomNumber(5, 5)
		expect(result).toBe(5)
	})
})
