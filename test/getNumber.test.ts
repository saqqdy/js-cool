import { describe, expect, it } from 'vitest'
import getNumber from '../src/getNumber'

describe('getNumber', () => {
	it('should extract number from string', () => {
		expect(getNumber('Chrome123.33')).toBe('123.33')
	})

	it('should extract multiple numbers', () => {
		expect(getNumber('234test.88')).toBe('234.88')
	})

	it('should handle string without numbers', () => {
		expect(getNumber('hello')).toBe('')
	})

	it('should handle pure number string', () => {
		expect(getNumber('123.45')).toBe('123.45')
	})

	it('should handle empty string', () => {
		expect(getNumber('')).toBe('')
	})

	// New options tests
	it('should return as number type', () => {
		expect(getNumber('Price: $99.99', { type: 'number' })).toBe(99.99)
	})

	it('should extract all numbers with multiple option', () => {
		expect(getNumber('a1b2c3', { multiple: true })).toEqual(['1', '2', '3'])
	})

	it('should extract all numbers as number type', () => {
		expect(getNumber('Values: 10, 20, 30', { type: 'number', multiple: true })).toEqual([10, 20, 30])
	})

	it('should limit decimal places', () => {
		expect(getNumber('Temperature: 36.567°', { decimals: 1 })).toBe('36.6')
	})

	it('should return empty array for multiple with no numbers', () => {
		expect(getNumber('hello', { multiple: true })).toEqual([])
	})

	it('should return 0 for number type with no numbers', () => {
		expect(getNumber('hello', { type: 'number' })).toBe(0)
	})

	it('should limit decimals with multiple option', () => {
		expect(getNumber('1.234 5.678', { multiple: true, decimals: 1 })).toEqual(['1.2', '5.7'])
	})
})
