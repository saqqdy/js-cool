/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import getUrlParams from '../src/getUrlParams'

describe('getUrlParams', () => {
	it('should get all URL parameters from URL string', () => {
		expect(getUrlParams('https://test.com?key1=100#/home?key1=200')).toEqual({ key1: '100' })
	})

	it('should convert values when covert is true', () => {
		expect(getUrlParams('https://test.com?key1=100#/home?key1=200', true)).toEqual({
			key1: 100,
		})
	})

	it('should return params from location.search in browser', () => {
		// In browser environment, it uses location.search
		const result = getUrlParams()

		expect(typeof result).toBe('object')
	})
})
