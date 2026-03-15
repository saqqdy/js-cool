/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import getUrlParam from '../src/getUrlParam'

describe('getUrlParam', () => {
	it('should get URL parameter from URL string', () => {
		expect(getUrlParam('key1', 'https://test.com?key1=100#/home?key1=200')).toBe('100')
	})

	it('should return undefined for missing key', () => {
		expect(getUrlParam('missing', 'https://test.com?key1=100')).toBeUndefined()
	})

	it('should return undefined when key is empty', () => {
		expect(getUrlParam('', 'https://test.com?key1=100')).toBeUndefined()
	})

	it('should handle URL without query string', () => {
		expect(getUrlParam('key1', 'https://test.com')).toBeUndefined()
	})

	it('should use location.search when no url provided', () => {
		const result = getUrlParam('test')

		expect(result).toBeUndefined()
	})
})
