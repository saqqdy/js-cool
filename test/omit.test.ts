import { describe, expect, it } from 'vitest'
import omit from '../src/omit'

describe('omit', () => {
	it('should omit specified keys', () => {
		const object = { a: 1, b: 2, c: 3 }
		const result = omit(object, ['a', 'c'])

		expect(result).toEqual({ b: 2 })
	})

	it('should return empty object when all keys are omitted', () => {
		const object = { a: 1, b: 2 }
		const result = omit(object, ['a', 'b'])

		expect(result).toEqual({})
	})

	it('should ignore non-existent keys', () => {
		const object = { a: 1, b: 2 }
		const result = omit(object, ['c' as keyof typeof object])

		expect(result).toEqual({ a: 1, b: 2 })
	})

	it('should not modify original object', () => {
		const object = { a: 1, b: 2, c: 3 }
		omit(object, ['a'])

		expect(object).toEqual({ a: 1, b: 2, c: 3 })
	})
})
