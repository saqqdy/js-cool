/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it } from 'vitest'
import setSession from '../src/setSession'
import getSession from '../src/getSession'
import delSession from '../src/delSession'

describe('setSession & getSession & delSession', () => {
	beforeEach(() => {
		sessionStorage.clear()
	})

	it('should set and get session', () => {
		setSession('key1', 'value1')
		expect(getSession('key1')).toBe('value1')
	})

	it('should set and get object session', () => {
		setSession('key1', { a: 1 })
		expect(getSession('key1')).toEqual({ a: 1 })
	})

	it('should set session with expiration', () => {
		setSession('key1', 'value1', 1)
		expect(getSession('key1')).toBe('value1')
	})

	it('should return null for non-existent key', () => {
		expect(getSession('non-existent')).toBeNull()
	})

	it('should delete session', () => {
		setSession('key1', 'value1')
		delSession('key1')
		expect(getSession('key1')).toBeNull()
	})

	it('should handle string seconds', () => {
		setSession('key1', 'value1', '100')
		expect(getSession('key1')).toBe('value1')
	})

	it('should handle invalid JSON in storage', () => {
		sessionStorage.setItem('invalid', 'not json')
		expect(getSession('invalid')).toBe('not json')
	})
})
