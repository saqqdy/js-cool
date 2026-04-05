import { describe, expect, it } from 'vitest'
import count from '../src/count'

describe('count', () => {
	it('should count occurrences of substring', () => {
		expect(count('hello hello hello', 'hello')).toBe(3)
	})

	it('should return 0 for non-matching substring', () => {
		expect(count('abc', 'd')).toBe(0)
	})

	it('should count non-overlapping by default', () => {
		expect(count('aaa', 'aa')).toBe(1)
	})

	it('should count overlapping when specified', () => {
		expect(count('aaa', 'aa', { overlapping: true })).toBe(2)
	})

	it('should be case sensitive by default', () => {
		expect(count('Hello World', 'hello')).toBe(0)
	})

	it('should be case insensitive when specified', () => {
		expect(count('Hello World', 'hello', { caseSensitive: false })).toBe(1)
	})

	it('should handle empty string', () => {
		expect(count('', 'a')).toBe(0)
	})

	it('should handle empty substring', () => {
		expect(count('hello', '')).toBe(0)
	})

	it('should handle non-string input', () => {
		expect(count(null as any, 'a')).toBe(0)
		expect(count('hello', null as any)).toBe(0)
	})

	it('should handle substring longer than string', () => {
		expect(count('ab', 'abc')).toBe(0)
	})
})
