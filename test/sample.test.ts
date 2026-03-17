import { describe, expect, it } from 'vitest'
import sample from '../src/sample'

describe('sample', () => {
	it('should return a random element', () => {
		const array = [1, 2, 3, 4]
		const result = sample(array)
		expect(array).toContain(result)
	})

	it('should return undefined for empty array', () => {
		expect(sample([])).toBeUndefined()
	})

	it('should return undefined for non-array', () => {
		expect(sample(null as any)).toBeUndefined()
	})
})
