import { describe, expect, it } from 'vitest'
import JSONToCSV from '../src/JSONToCSV'

describe('JSONToCSV', () => {
	it('should convert JSON array to CSV string', () => {
		const result = JSONToCSV([{ a: 1, b: 2 }], ['a', 'b'])

		expect(result).toContain('a,b')
		expect(result).toContain('"1"')
		expect(result).toContain('"2"')
	})

	it('should support custom delimiter', () => {
		const result = JSONToCSV([{ a: 1, b: 2 }], ['a', 'b'], ';')

		expect(result).toContain('a;b')
	})

	it('should handle missing values', () => {
		const result = JSONToCSV([{ a: 1 }, { b: 2 }], ['a', 'b'])

		expect(result).toContain('""')
	})
})
