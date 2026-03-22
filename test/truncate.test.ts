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
	})
})
