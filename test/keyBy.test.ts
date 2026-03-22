import { describe, expect, it } from 'vitest'
import keyBy from '../src/keyBy'

describe('keyBy', () => {
	it('should key by key', () => {
		const array = [
			{ id: 'a', name: 'Alice' },
			{ id: 'b', name: 'Bob' },
		]
		const result = keyBy(array, 'id')
		expect(result).toEqual({
			a: { id: 'a', name: 'Alice' },
			b: { id: 'b', name: 'Bob' },
		})
	})

	it('should key by function', () => {
		const result = keyBy(['a', 'b', 'c'], v => v.toUpperCase())
		expect(result).toEqual({ A: 'a', B: 'b', C: 'c' })
	})

	it('should return empty object for non-array', () => {
		expect(keyBy(null as any, 'id')).toEqual({})
	})

	it('should keep last item for duplicate keys', () => {
		const array = [
			{ id: 'a', name: 'Alice' },
			{ id: 'a', name: 'Bob' },
		]
		const result = keyBy(array, 'id')
		expect(result).toEqual({ a: { id: 'a', name: 'Bob' } })
	})
})
