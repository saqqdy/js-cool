import { describe, expect, it } from 'vitest'
import setProperty from '../src/setProperty'

describe('setProperty', () => {
	it('should set simple property', () => {
		const target = { a: 1 }
		const result = setProperty(target, 'a', 2)

		expect(result.a).toBe(2)
	})

	it('should set nested property', () => {
		const target = { b: [{ c: 2 }] }
		const result = setProperty(target, 'b[0].c', 3)

		expect(result.b[0].c).toBe(3)
	})

	it('should create nested path', () => {
		const target = {}
		const result = setProperty(target, 'a.b.c', 1)

		expect(result.a.b.c).toBe(1)
	})

	it('should work with function prop', () => {
		const target = { a: 1 }
		const result = setProperty(target, () => 'a', 100)

		expect(result.a).toBe(100)
	})

	it('should throw when target is null', () => {
		expect(() => setProperty(null as any, 'a', 1)).toThrow()
	})

	it('should throw when prop is null', () => {
		expect(() => setProperty({}, null as any, 1)).toThrow()
	})

	it('should set array element', () => {
		const target = { arr: [] }
		const result = setProperty(target, 'arr[0]', 'value')

		expect(result.arr[0]).toBe('value')
	})

	it('should set nested array element', () => {
		const target = { data: { items: [] } }
		const result = setProperty(target, 'data.items[1]', 'test')

		expect(result.data.items[1]).toBe('test')
	})
})
