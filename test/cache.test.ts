/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it } from 'vitest'
import delCache from '../src/delCache'
import getCache from '../src/getCache'
import setCache from '../src/setCache'

describe('setCache & getCache & delCache', () => {
	beforeEach(() => {
		localStorage.clear()
	})

	it('should set and get cache', () => {
		setCache('key1', 'value1')
		expect(getCache('key1')).toBe('value1')
	})

	it('should set and get object cache', () => {
		setCache('key1', { a: 1 })
		expect(getCache('key1')).toEqual({ a: 1 })
	})

	it('should set cache with expiration', () => {
		setCache('key1', 'value1', 1)
		expect(getCache('key1')).toBe('value1')
	})

	it('should return null for non-existent key', () => {
		expect(getCache('non-existent')).toBeNull()
	})

	it('should delete cache', () => {
		setCache('key1', 'value1')
		delCache('key1')
		expect(getCache('key1')).toBeNull()
	})

	it('should handle null value', () => {
		setCache('key1', null)
		expect(getCache('key1')).toBeNull()
	})

	it('should handle number value', () => {
		setCache('key1', 100)
		expect(getCache('key1')).toBe(100)
	})

	it('should handle string seconds', () => {
		setCache('key1', 'value1', '100')
		expect(getCache('key1')).toBe('value1')
	})

	it('should handle invalid JSON in storage', () => {
		localStorage.setItem('invalid', 'not json')
		expect(getCache('invalid')).toBe('not json')
	})
})
