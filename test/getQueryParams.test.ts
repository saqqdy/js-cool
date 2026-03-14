/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import getQueryParams from '../src/getQueryParams'

describe('getQueryParams', () => {
	it('should get all query parameters from URL string', () => {
		expect(getQueryParams('https://test.com?key1=100#/home?key1=200')).toEqual({ key1: '200' })
	})

	it('should convert values when covert is true', () => {
		expect(getQueryParams('https://test.com?key1=100#/home?key1=200', true)).toEqual({
			key1: 200
		})
	})

	it('should return params from location.href in browser', () => {
		// In browser environment, it uses location.href
		const result = getQueryParams()
		expect(typeof result).toBe('object')
	})
})
