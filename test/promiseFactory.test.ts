import { describe, expect, it } from 'vitest'
import promiseFactory from '../src/promiseFactory'
import waiting from '../src/waiting'

describe('promiseFactory', () => {
	it('should return object that is both value and promise', async () => {
		const stats = { value: 100 }
		const resolver = () =>
			new Promise(resolve =>
				waiting(100).then(() => {
					stats.value = 200
					resolve(stats)
				})
			)
		const result = promiseFactory(stats, resolver)
		expect(result.value).toBe(100)
		const awaited = await result
		expect(awaited.value).toBe(200)
	})

	it('should have then method', () => {
		const obj = { a: 1 }
		const result = promiseFactory(obj, () => Promise.resolve(obj))
		expect(typeof result.then).toBe('function')
	})
})
