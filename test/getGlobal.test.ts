import { describe, expect, it } from 'vitest'
import getGlobal from '../src/getGlobal'

describe('getGlobal', () => {
	it('should return function for valid function path', () => {
		const result = getGlobal('console.log')
		expect(typeof result).toBe('function')
	})

	it('should return undefined for non-existent path', () => {
		const result = getGlobal('nonExistentFunction')
		expect(result).toBeUndefined()
	})

	it('should return Number constructor', () => {
		const result = getGlobal('Number')
		expect(result).toBe(Number)
	})

	it('should return String constructor', () => {
		const result = getGlobal('String')
		expect(result).toBe(String)
	})

	it('should return JSON.parse', () => {
		const result = getGlobal('JSON.parse')
		expect(result).toBe(JSON.parse)
	})

	it('should return Array.isArray', () => {
		const result = getGlobal('Array.isArray')
		expect(result).toBe(Array.isArray)
	})

	it('should return Object', () => {
		const result = getGlobal('Object')
		expect(result).toBe(Object)
	})

	it('should return undefined for deeply nested non-existent path', () => {
		const result = getGlobal('a.b.c.d.e')
		expect(result).toBeUndefined()
	})

	it('should return undefined for empty string', () => {
		const result = getGlobal('')
		expect(result).toBeUndefined()
	})
})
