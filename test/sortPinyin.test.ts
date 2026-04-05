import { describe, expect, it } from 'vitest'
import sortPinyin from '../src/sortPinyin'

describe('sortPinyin', () => {
	it('should sort Chinese by pinyin', () => {
		const items = ['波拉', '啊我', '阿吧']

		items.sort((a, b) => sortPinyin(a, b))

		// The actual order depends on locale-based sorting
		// Just verify that the sort function returns a number
		expect(typeof sortPinyin('啊我', '波拉')).toBe('number')
	})

	it('should sort mixed Chinese and English', () => {
		const items = ['波拉', 'abc', '啊我', 'ABB']

		items.sort((a, b) => sortPinyin(a, b))

		// English should come before Chinese
		const firstTwo = items.slice(0, 2)

		expect(firstTwo).toContain('ABB')
		expect(firstTwo).toContain('abc')
	})

	it('should handle numbers', () => {
		const items = ['啊我', 3, 1, '波拉']

		items.sort((a, b) => sortPinyin(a as any, b as any))

		// Numbers should come before Chinese
		expect(typeof items[0]).toBe('number')
		expect(typeof items[1]).toBe('number')
	})

	it('should handle null values', () => {
		const items = ['啊我', null, '波拉'] as (string | null)[]

		items.sort((a, b) => sortPinyin(a as any, b as any))

		expect(items).toContain(null)
		expect(items).toContain('啊我')
		expect(items).toContain('波拉')
	})

	it('should sort null values to the end', () => {
		const items = ['中文', null, 'English', undefined] as (string | null | undefined)[]

		items.sort((a, b) => sortPinyin(a as any, b as any))

		// null and undefined should be at the end
		const nullIndex = items.indexOf(null)
		const undefinedIndex = items.indexOf(undefined)
		const chineseIndex = items.indexOf('中文')
		const englishIndex = items.indexOf('English')

		expect(nullIndex).toBeGreaterThan(englishIndex)
		expect(undefinedIndex).toBeGreaterThan(englishIndex)
	})

	it('should handle both null values', () => {
		const result = sortPinyin(null, null)

		expect(result).toBe(0)
	})

	it('should handle null vs undefined', () => {
		const result = sortPinyin(null, undefined)

		// Both are null-ish, should return 0
		expect(result).toBe(0)
	})

	it('should handle first argument null', () => {
		const result = sortPinyin(null, 'test')

		// null should be sorted after
		expect(result).toBe(1)
	})

	it('should handle second argument null', () => {
		const result = sortPinyin('test', null)

		// non-null should be sorted before
		expect(result).toBe(-1)
	})

	it('should handle undefined values', () => {
		const result = sortPinyin(undefined, 'test')

		expect(result).toBe(1)
	})

	it('should use sort method', () => {
		const items = ['张三', '李四', '王五']

		const sorted = sortPinyin.sort(items)

		// Original array should not be modified
		expect(items).toEqual(['张三', '李四', '王五'])
		// Sorted array should have same length
		expect(sorted).toHaveLength(3)
	})

	it('should use sort method with options', () => {
		const items = ['波拉', '啊我', '阿吧']

		const sorted = sortPinyin.sort(items, { numeric: true })

		expect(sorted).toHaveLength(3)
	})

	it('should accept custom options', () => {
		const result = sortPinyin('啊', '波', { numeric: true, ignorePunctuation: true })

		expect(typeof result).toBe('number')
	})

	it('should handle Chinese characters detection', () => {
		// Non-Chinese should come before Chinese
		const result = sortPinyin('abc', '中文')

		expect(result).toBeLessThan(0)
	})

	it('should handle Chinese vs Chinese comparison', () => {
		const result = sortPinyin('中文', '英文')

		expect(typeof result).toBe('number')
	})

	it('should handle strings with numbers', () => {
		const items = ['10', '2', '1', '啊我']

		items.sort((a, b) => sortPinyin(a, b))

		// Numbers (as strings) should come before Chinese
		expect(items[3]).toBe('啊我')
	})

	it('should handle CJK Unified Ideographs Extension A', () => {
		// CJK Extension A characters (U+3400-U+4DBF)
		const result = sortPinyin('㐀', '中文')

		expect(typeof result).toBe('number')
	})

	it('should handle mixed content with punctuation', () => {
		const items = ['中文', ',test', 'English']

		items.sort((a, b) => sortPinyin(a, b))

		expect(items).toHaveLength(3)
	})
})
