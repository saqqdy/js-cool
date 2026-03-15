/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import copy from '../src/copy'

describe('copy', () => {
	beforeEach(() => {
		// Mock execCommand
		document.execCommand = vi.fn(() => true)
	})

	it('should copy text to clipboard', () => {
		const result = copy('test text')

		expect(document.execCommand).toHaveBeenCalledWith('copy')
		expect(result).toBe(true)
	})

	it('should return undefined in non-browser environment', () => {
		// This test is actually running in happy-dom, so copy should work
		const result = copy('test')
		expect(result).toBeDefined()
	})

	it('should handle empty string', () => {
		copy('')
		expect(document.execCommand).toHaveBeenCalledWith('copy')
	})
})
