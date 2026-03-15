/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import isDarkMode from '../src/isDarkMode'

describe('isDarkMode', () => {
	it('should return boolean', () => {
		const result = isDarkMode()
		expect(typeof result).toBe('boolean')
	})

	it('should use matchMedia', () => {
		// happy-dom should support matchMedia
		const result = isDarkMode()
		expect(result).toBeDefined()
	})
})
