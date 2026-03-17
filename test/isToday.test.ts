import { describe, expect, it } from 'vitest'
import isToday from '../src/isToday'

describe('isToday', () => {
	it('should return true for today', () => {
		expect(isToday(new Date())).toBeTruthy()
	})

	it('should return false for yesterday', () => {
		const yesterday = new Date()
		yesterday.setDate(yesterday.getDate() - 1)
		expect(isToday(yesterday)).toBeFalsy()
	})

	it('should return false for tomorrow', () => {
		const tomorrow = new Date()
		tomorrow.setDate(tomorrow.getDate() + 1)
		expect(isToday(tomorrow)).toBeFalsy()
	})

	it('should handle string input', () => {
		const today = new Date().toISOString()
		expect(isToday(today)).toBeTruthy()
	})
})
