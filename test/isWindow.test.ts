/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import isWindow from '../src/isWindow'

describe('isWindow', () => {
	it('should return true for window object', () => {
		expect(isWindow(window)).toBeTruthy()
	})

	it('should return false for non-window objects', () => {
		expect(isWindow({})).toBeFalsy()
		expect(isWindow(document)).toBeFalsy()
		expect(isWindow(null)).toBeFalsy()
		expect(isWindow(undefined)).toBeFalsy()
		expect(isWindow([])).toBeFalsy()
		expect(isWindow(123)).toBeFalsy()
		expect(isWindow('window')).toBeFalsy()
	})

	it('should return false for objects with window property', () => {
		expect(isWindow({ window: {} })).toBeFalsy()
		expect(isWindow({ window: { window: {} } })).toBeFalsy()
	})
})
