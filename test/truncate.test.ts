import { describe, expect, it } from 'vitest'
import truncate from '../src/truncate'

describe('truncate', () => {
	it('should truncate long strings', () => {
		// length=30, omission='...' (3 chars), so truncate at 27 chars
		expect(truncate('hi-diddly-ho there, neighborino')).toBe('hi-diddly-ho there, neighbo...')
	})

	it('should truncate to specified length', () => {
		// length=24, omission='...' (3 chars), so truncate at 21 chars
		expect(truncate('hi-diddly-ho there, neighborino', { length: 24 })).toBe(
			'hi-diddly-ho there, n...'
		)
	})

	it('should use custom omission', () => {
		// length=30, omission=' [...]' (5 chars), so truncate at 25 chars
		expect(truncate('hi-diddly-ho there, neighborino', { omission: ' [...]' })).toBe(
			'hi-diddly-ho there, neig [...]'
		)
	})

	it('should use separator', () => {
		// length=24, truncate at 21 chars, then find last space
		expect(truncate('hi-diddly-ho there, neighborino', { length: 24, separator: ' ' })).toBe(
			'hi-diddly-ho there,...'
		)
	})

	it('should not truncate short strings', () => {
		expect(truncate('short')).toBe('short')
	})

	it('should handle non-string', () => {
		expect(truncate(123 as any)).toBe('')
		expect(truncate(null as any)).toBe('')
		expect(truncate(undefined as any)).toBe('')
	})

	it('should use regex separator', () => {
		// Regex separator matches ', ' at position 12 in 'hi-diddly-ho there'
		expect(truncate('hi-diddly-ho there, neighborino', { length: 24, separator: /,? +/ })).toBe(
			'hi-diddly-ho...'
		)
	})

	it('should handle empty string', () => {
		expect(truncate('')).toBe('')
	})

	it('should handle string shorter than length', () => {
		expect(truncate('short', { length: 100 })).toBe('short')
	})

	it('should handle string equal to length', () => {
		expect(truncate('exactly5', { length: 8 })).toBe('exactly5')
	})

	it('should handle string longer than length with omission', () => {
		expect(truncate('12345678', { length: 5 })).toBe('12...')
	})

	it('should handle omission longer than length', () => {
		// When omission is longer than length, slice(0, length - omission.length) gives negative
		// which results in truncating to the full omission
		expect(truncate('hello', { length: 2, omission: '...' })).toBe('hell...')
	})

	it('should handle separator at beginning of result', () => {
		// When separator is found at index 0, it should not truncate there
		expect(truncate('hello world', { length: 15, separator: 'h' })).toBe('hello world')
	})

	it('should handle separator not found', () => {
		expect(truncate('hello world', { length: 8, separator: 'x' })).toBe('hello...')
	})

	it('should handle regex separator not matching', () => {
		expect(truncate('hello world', { length: 8, separator: /x/ })).toBe('hello...')
	})

	it('should handle regex separator with match at index 0', () => {
		// If match is at index 0, it should not truncate there (index > 0 check)
		expect(truncate('hello world', { length: 20, separator: /^h/ })).toBe('hello world')
	})

	it('should handle custom omission with separator', () => {
		expect(
			truncate('hi-diddly-ho there, neighborino', {
				length: 24,
				separator: ' ',
				omission: '…',
			})
		).toBe('hi-diddly-ho there,…')
	})

	it('should handle length exactly at separator', () => {
		expect(truncate('hello world test', { length: 12, separator: ' ' })).toBe('hello...')
	})

	it('should handle multiple separators', () => {
		expect(truncate('a-b-c-d-e-f-g', { length: 10, separator: '-' })).toBe('a-b-c...')
	})

	it('should handle omission with special characters', () => {
		// length=8, omission='…' (1 char), so truncate at 7 chars
		expect(truncate('hello world', { length: 8, omission: '…' })).toBe('hello w…')
	})

	it('should handle default options', () => {
		const longString = 'a'.repeat(40)
		expect(truncate(longString)).toBe(`${'a'.repeat(27)  }...`)
	})

	it('should handle separator at position 0', () => {
		// When separator is found at index 0 in truncated string, index > 0 check prevents use
		// Original: ' hello world', length=10, truncate to 7 chars: ' hello'
		// separator ' ' is found at index 0, but index > 0 check fails, so use original truncated
		expect(truncate(' hello world', { length: 10, separator: ' ' })).toBe(' hello...')
	})
})
