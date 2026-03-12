/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import getQueryParam from '../src/getQueryParam'

describe('getQueryParam', () => {
	it('should get query parameter from URL string', () => {
		expect(getQueryParam('key1', 'https://test.com?key1=100#/home?key1=200')).toBe('200')
	})

	it('should return undefined for missing key', () => {
		expect(getQueryParam('missing', 'https://test.com?key1=100')).toBeUndefined()
	})

	it('should return undefined when key is empty', () => {
		expect(getQueryParam('', 'https://test.com?key1=100')).toBeUndefined()
	})

	it('should use location.href when no url provided', () => {
		const result = getQueryParam('test')
		expect(result).toBeUndefined()
	})
})
