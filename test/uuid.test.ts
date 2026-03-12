import { describe, expect, it } from 'vitest'
import uuid from '../src/uuid'

describe('uuid', () => {
	it('should generate a valid UUID v4', () => {
		const result = uuid()
		expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
	})

	it('should generate unique UUIDs', () => {
		const uuid1 = uuid()
		const uuid2 = uuid()
		expect(uuid1).not.toBe(uuid2)
	})

	it('should return a string', () => {
		expect(typeof uuid()).toBe('string')
	})

	it('should have correct length', () => {
		expect(uuid().length).toBe(36)
	})
})
