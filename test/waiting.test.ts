import { describe, expect, it } from 'vitest'
import waiting from '../src/waiting'

describe('waiting', () => {
	it('should resolve after specified milliseconds', async () => {
		const start = Date.now()

		await waiting(100)
		const elapsed = Date.now() - start

		expect(elapsed).toBeGreaterThanOrEqual(90) // Allow some variance
	})

	it('should return a promise', () => {
		const result = waiting(10)

		expect(result).toBeInstanceOf(Promise)
	})

	it('should reject when throwOnTimeout is true', async () => {
		await expect(waiting(10, true)).rejects.toBeUndefined()
	})
})
