import { describe, expect, it } from 'vitest'
import extend from '../src/extend'

describe('extend', () => {
	it('should merge objects', () => {
		const result = extend({ a: 1 }, { b: 2 })

		expect(result).toEqual({ a: 1, b: 2 })
	})

	it('should override existing properties', () => {
		const result = extend({ a: 1 }, { a: 2 })

		expect(result).toEqual({ a: 2 })
	})

	it('should merge multiple objects', () => {
		const result = extend({ a: 1 }, { b: 2 }, { c: 3 })

		expect(result).toEqual({ a: 1, b: 2, c: 3 })
	})

	it('should deep merge when first argument is true', () => {
		const result = extend(true, { a: { b: 1 } }, { a: { c: 2 } })

		expect(result).toEqual({ a: { b: 1, c: 2 } })
	})

	it('should merge arrays', () => {
		const result = extend([1, 2], [3, 4])

		expect(result).toEqual([3, 4])
	})
})
