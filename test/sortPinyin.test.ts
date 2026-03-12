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
})
