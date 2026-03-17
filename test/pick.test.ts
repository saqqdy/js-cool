import { describe, expect, it } from 'vitest'
import pick from '../src/pick'

describe('pick', () => {
	it('should pick specified keys', () => {
		const object = { a: 1, b: 2, c: 3 }
		const result = pick(object, ['a', 'c'])

		expect(result).toEqual({ a: 1, c: 3 })
	})

	it('should return empty object when no keys match', () => {
		const object = { a: 1, b: 2 }
		const result = pick(object, ['c' as keyof typeof object])

		expect(result).toEqual({})
	})

	it('should ignore non-existent keys', () => {
		const object = { a: 1, b: 2 }
		const result = pick(object, ['a', 'c' as keyof typeof object])

		expect(result).toEqual({ a: 1 })
	})

	it('should not modify original object', () => {
		const object = { a: 1, b: 2, c: 3 }
		pick(object, ['a'])

		expect(object).toEqual({ a: 1, b: 2, c: 3 })
	})
})
