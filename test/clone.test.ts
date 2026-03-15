import { describe, expect, it } from 'vitest'
import clone from '../src/clone'

describe('clone', () => {
	it('should clone plain object', () => {
		const source = { a: 100, b: 'test' }
		const result = clone(source)

		expect(result).toEqual(source)
		expect(result).not.toBe(source)
	})

	it('should clone array', () => {
		const source = [1, 2, 3]
		const result = clone(source)

		expect(result).toEqual(source)
		expect(result).not.toBe(source)
	})

	it('should clone nested object', () => {
		const source = { a: { b: { c: 1 } } }
		const result = clone(source)

		expect(result).toEqual(source)
		expect(result.a).not.toBe(source.a)
	})

	it('should clone regexp', () => {
		const source = { reg: /\d+/g }
		const result = clone(source)

		expect(result.reg.source).toBe(source.reg.source)
		expect(result.reg.flags).toBe(source.reg.flags)
		expect(result.reg).not.toBe(source.reg)
	})

	it('should clone date', () => {
		const source = { date: new Date('2024-01-01') }
		const result = clone(source)

		expect(result.date.getTime()).toBe(source.date.getTime())
		expect(result.date).not.toBe(source.date)
	})

	it('should handle null', () => {
		expect(clone(null)).toBeNull()
	})

	it('should handle primitive values', () => {
		expect(clone(123)).toBe(123)
		expect(clone('string')).toBe('string')
		expect(clone(true)).toBeTruthy()
	})

	it('should handle circular reference', () => {
		const source: any = { a: 1 }

		source.self = source
		const result = clone(source)

		expect(result.a).toBe(1)
		expect(result.self).toBe(result)
	})
})
