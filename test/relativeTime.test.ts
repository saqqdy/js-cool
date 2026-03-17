import { describe, expect, it } from 'vitest'
import relativeTime from '../src/relativeTime'

describe('relativeTime', () => {
	it('should return "just now" for very recent time', () => {
		const now = new Date()
		const result = relativeTime(now, now)
		expect(result).toBe('just now')
	})

	it('should return seconds ago', () => {
		const now = new Date()
		const past = new Date(now.getTime() - 30000) // 30 seconds ago
		const result = relativeTime(past, now)
		expect(result).toBe('30 seconds ago')
	})

	it('should return minutes ago', () => {
		const now = new Date()
		const past = new Date(now.getTime() - 5 * 60 * 1000) // 5 minutes ago
		const result = relativeTime(past, now)
		expect(result).toContain('minute')
		expect(result).toContain('ago')
	})

	it('should return hours ago', () => {
		const now = new Date()
		const past = new Date(now.getTime() - 2 * 60 * 60 * 1000) // 2 hours ago
		const result = relativeTime(past, now)
		expect(result).toContain('hour')
		expect(result).toContain('ago')
	})

	it('should return days ago', () => {
		const now = new Date()
		const past = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
		const result = relativeTime(past, now)
		expect(result).toContain('day')
		expect(result).toContain('ago')
	})

	it('should return future time', () => {
		const now = new Date()
		const future = new Date(now.getTime() + 5 * 60 * 1000) // 5 minutes in future
		const result = relativeTime(future, now)
		expect(result).toContain('in')
		expect(result).toContain('minute')
	})

	it('should support Chinese locale', () => {
		const now = new Date()
		const past = new Date(now.getTime() - 5 * 60 * 1000)
		const result = relativeTime(past, now, 'zh')
		expect(result).toContain('分钟')
		expect(result).toContain('前')
	})
})
