/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import nextIndex from '../src/nextIndex'

describe('nextIndex', () => {
	it('should return next zIndex', () => {
		document.body.innerHTML = '<div style="z-index: 5001"></div>'

		const result = nextIndex()

		expect(result).toBeGreaterThan(5000)
	})

	it('should use custom min value', () => {
		const result = nextIndex(6000)

		expect(result).toBeGreaterThanOrEqual(6000)
	})

	it('should respect max value', () => {
		document.body.innerHTML = ''

		const result = nextIndex(5000, 5010)

		expect(result).toBeLessThanOrEqual(5010)
	})
})
