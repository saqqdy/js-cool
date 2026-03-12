import { describe, expect, it } from 'vitest'
import parseUrlParam from '../src/parseUrlParam'

describe('parseUrlParam', () => {
	it('should parse URL parameters to object', () => {
		expect(parseUrlParam('?key1=100&key2=200')).toEqual({ key1: '100', key2: '200' })
	})

	it('should convert values when covert is true', () => {
		const result = parseUrlParam('?key1=100&key2=true&key3=null', true)
		expect(result).toEqual({ key1: 100, key2: true, key3: null })
	})

	it('should handle NaN', () => {
		const result = parseUrlParam('?key=NaN', true)
		expect(result.key).toBeNaN()
	})

	it('should handle Infinity', () => {
		const result = parseUrlParam('?key=Infinity', true)
		expect(result.key).toBe(Infinity)
	})

	it('should handle undefined value', () => {
		const result = parseUrlParam('?key=undefined', true)
		expect(result.key).toBeUndefined()
	})

	it('should handle empty string', () => {
		expect(parseUrlParam('')).toEqual({})
	})

	it('should decode URI components', () => {
		expect(parseUrlParam('?name=%E6%B5%8B%E8%AF%95')).toEqual({ name: '测试' })
	})
})
