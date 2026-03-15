import { describe, expect, it } from 'vitest'
import getProperty from '../src/getProperty'

describe('getProperty', () => {
	it('should get simple property', () => {
		const target = { a: 1 }
		const result = getProperty(target, 'a')

		expect(result).toBe(1)
	})

	it('should get nested property', () => {
		const target = { b: [{ c: 2 }] }
		const result = getProperty(target, 'b[0].c')

		expect(result).toBe(2)
	})

	it('should return default value for missing property', () => {
		const target = { a: 1 }
		const result = getProperty(target, 'd', 100)

		expect(result).toBe(100)
	})

	it('should return default value for null', () => {
		const target = { a: null }
		const result = getProperty(target, 'a', 100)

		expect(result).toBe(100)
	})

	it('should return false value', () => {
		const target = { a: false }
		const result = getProperty(target, 'a', true)

		expect(result).toBeFalsy()
	})

	it('should return target when prop is empty', () => {
		const target = { a: 1 }
		const result = getProperty(target, '' as any)

		expect(result).toBe(target)
	})

	it('should work with function prop', () => {
		const target = { a: 1 }
		const result = getProperty(target, () => 'a')

		expect(result).toBe(1)
	})

	it('should throw when target is null', () => {
		expect(() => getProperty(null as any, 'a')).toThrow()
	})

	it('should return NaN value', () => {
		const target = { a: Number.NaN }
		const result = getProperty(target, 'a', 100)

		expect(result).toBe(100)
	})

	it('should get array element', () => {
		const target = { arr: ['a', 'b', 'c'] }
		const result = getProperty(target, 'arr[1]')

		expect(result).toBe('b')
	})
})
