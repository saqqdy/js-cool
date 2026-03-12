import { describe, expect, it } from 'vitest'
import arrayToCSV from '../src/arrayToCSV'

describe('arrayToCSV', () => {
	it('should convert 2D array to CSV string', () => {
		const result = arrayToCSV([['a', 'b'], ['c', 'd']])
		expect(result).toContain('"a"')
		expect(result).toContain('"b"')
	})

	it('should support custom delimiter', () => {
		const result = arrayToCSV([['a', 'b'], ['c', 'd']], ';')
		expect(result).toContain(';')
	})

	it('should handle quotes in values', () => {
		const result = arrayToCSV([['a', '"b" great']])
		expect(result).toContain('"""b"" great"')
	})

	it('should handle numbers', () => {
		const result = arrayToCSV([['a', 3.1415]])
		expect(result).toContain('3.1415')
	})
})
