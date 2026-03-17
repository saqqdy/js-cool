import { describe, expect, it } from 'vitest'
import isCreditCard from '../src/isCreditCard'

describe('isCreditCard', () => {
	it('should return true for valid credit card numbers', () => {
		expect(isCreditCard('4532015112830366')).toBeTruthy() // Visa
		expect(isCreditCard('5555555555554444')).toBeTruthy() // MasterCard
		expect(isCreditCard('378282246310005')).toBeTruthy() // American Express
	})

	it('should handle spaces and dashes', () => {
		expect(isCreditCard('4532 0151 1283 0366')).toBeTruthy()
		expect(isCreditCard('5555-5555-5555-4444')).toBeTruthy()
	})

	it('should return false for invalid credit card numbers', () => {
		expect(isCreditCard('1234567890123456')).toBeFalsy()
		expect(isCreditCard('1234')).toBeFalsy()
	})

	it('should return false for non-string', () => {
		expect(isCreditCard(1234567890123456 as any)).toBeFalsy()
		expect(isCreditCard(null as any)).toBeFalsy()
	})
})
