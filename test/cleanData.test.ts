import { describe, expect, it } from 'vitest'
import cleanData from '../src/cleanData'

describe('cleanData', () => {
	it('should clean data with array map', () => {
		const data = { a: 1, b: 2, c: 3 }

		expect(cleanData(data, ['a', 'b'])).toEqual({ a: 1, b: 2 })
	})

	it('should clean data with object map', () => {
		const data = { oldName: 'test', other: 'value' }

		expect(cleanData(data, { newName: 'oldName' })).toEqual({ newName: 'test' })
	})

	it('should handle function in map', () => {
		const data = { a: 1 }

		expect(cleanData(data, { double: (d: any) => d.a * 2 })).toEqual({ double: 2 })
	})

	it('should return undefined for null data', () => {
		expect(cleanData(null, ['a'])).toBeUndefined()
	})

	it('should return original data when map is not provided', () => {
		const data = { a: 1 }

		expect(cleanData(data, null as any)).toEqual(data)
	})

	it('should use nullFix for missing properties', () => {
		const data = { a: 1 }

		expect(cleanData(data, ['a', 'b'], 'default')).toEqual({ a: 1, b: 'default' })
	})
})
