import { describe, expect, it } from 'vitest'
import inRange from '../src/inRange'

describe('inRange', () => {
	it('should return true for number in range', () => {
		expect(inRange(3, 1, 5)).toBeTruthy()
	})

	it('should return false for number at end (exclusive)', () => {
		expect(inRange(5, 1, 5)).toBeFalsy()
	})

	it('should return true for number at start (inclusive)', () => {
		expect(inRange(1, 1, 5)).toBeTruthy()
	})

	it('should work with implicit start of 0', () => {
		expect(inRange(1, 5)).toBeTruthy()
		expect(inRange(5, 2)).toBeFalsy()
	})

	it('should handle negative ranges', () => {
		expect(inRange(-3, -5, 0)).toBeTruthy()
	})

	it('should handle reversed range', () => {
		expect(inRange(3, 5, 1)).toBeTruthy()
	})
})
