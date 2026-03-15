import { describe, expect, it } from 'vitest'
import CSVToArray from '../src/CSVToArray'

describe('CSVToArray', () => {
	it('should convert CSV string to 2D array', () => {
		expect(CSVToArray('a,b\nc,d')).toEqual([
			['a', 'b'],
			['c', 'd'],
		])
	})

	it('should support custom delimiter', () => {
		expect(CSVToArray('a;b\nc;d', ';')).toEqual([
			['a', 'b'],
			['c', 'd'],
		])
	})

	it('should omit first row when omitFirstRow is true', () => {
		expect(CSVToArray('col1,col2\na,b\nc,d', ',', true)).toEqual([
			['a', 'b'],
			['c', 'd'],
		])
	})

	it('should handle single line', () => {
		expect(CSVToArray('a,b,c')).toEqual([['a', 'b', 'c']])
	})

	it('should handle empty string', () => {
		expect(CSVToArray('')).toEqual([['']])
	})
})
