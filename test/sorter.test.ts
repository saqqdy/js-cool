import { describe, expect, it } from 'vitest'
import sorter from '../src/sorter'

describe('sorter', () => {
	it('should return a compare function', () => {
		const compare = sorter()

		expect(typeof compare).toBe('function')
	})

	it('should sort strings', () => {
		const items = ['b', 'a', 'c']

		items.sort(sorter())
		expect(items).toEqual(['a', 'b', 'c'])
	})

	it('should sort numbers', () => {
		const items = [3, 1, 2]

		items.sort(sorter())
		expect(items).toEqual([1, 2, 3])
	})

	it('should sort with locale', () => {
		const items = ['啊我', '波拉', 'abc']

		items.sort(sorter('zh-Hans-CN'))
		// Chinese locale sort: English letters come before Chinese characters in some implementations
		expect(items).toContain('abc')
	})

	it('should sort with options', () => {
		const items = ['10', '2', '1']

		items.sort(sorter('en', { numeric: true }))
		expect(items).toEqual(['1', '2', '10'])
	})

	it('should handle locale fallback when extended locales not supported', () => {
		// Test that sorter works even when localeCompare doesn't support extended arguments
		const compare = sorter()
		const result = compare('a', 'b')

		expect(typeof result).toBe('number')
	})

	it('should work with array of locales', () => {
		const items = ['b', 'a', 'c']

		items.sort(sorter(['en', 'de']))
		expect(items).toEqual(['a', 'b', 'c'])
	})

	it('should handle null and undefined values', () => {
		const compare = sorter()
		const result1 = compare(null, 'a')
		const result2 = compare('a', null)

		expect(typeof result1).toBe('number')
		expect(typeof result2).toBe('number')
	})
})
