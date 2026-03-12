import { describe, expect, it } from 'vitest'
import CSVToJSON from '../src/CSVToJSON'

describe('CSVToJSON', () => {
	it('should convert CSV string to JSON array', () => {
		expect(CSVToJSON('col1,col2\na,b\nc,d')).toEqual([
			{ col1: 'a', col2: 'b' },
			{ col1: 'c', col2: 'd' }
		])
	})

	it('should support custom delimiter', () => {
		expect(CSVToJSON('col1;col2\na;b\nc;d', ';')).toEqual([
			{ col1: 'a', col2: 'b' },
			{ col1: 'c', col2: 'd' }
		])
	})

	it('should handle single data row', () => {
		expect(CSVToJSON('name,age\nJohn,30')).toEqual([{ name: 'John', age: '30' }])
	})
})
