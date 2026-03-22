import { describe, expect, it } from 'vitest'
import groupBy from '../src/groupBy'

describe('groupBy', () => {
	it('should group by key', () => {
		const array = [{ a: 1 }, { a: 2 }, { a: 1 }]
		const result = groupBy(array, 'a')
		expect(result).toEqual({
			'1': [{ a: 1 }, { a: 1 }],
			'2': [{ a: 2 }],
		})
	})

	it('should group by function', () => {
		const result = groupBy([6.1, 4.2, 6.3], Math.floor)
		expect(result).toEqual({ '4': [4.2], '6': [6.1, 6.3] })
	})

	it('should group by length property', () => {
		const result = groupBy(['one', 'two', 'three'], 'length')
		expect(result).toEqual({ '3': ['one', 'two'], '5': ['three'] })
	})

	it('should return empty object for non-array', () => {
		expect(groupBy(null as any, 'a')).toEqual({})
	})
})
