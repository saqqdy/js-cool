import { describe, expect, it } from 'vitest'
import mapTemplate from '../src/mapTemplate'

describe('mapTemplate', () => {
	it('should replace ${} placeholders', () => {
		const tmp = "My name is ${name}, I'm ${age} years old."
		expect(mapTemplate(tmp, { name: 'saqqdy', age: 18 })).toBe("My name is saqqdy, I'm 18 years old.")
	})

	it('should replace {{}} placeholders', () => {
		const tmp = "My name is {{name}}, I'm {{age}} years old."
		expect(mapTemplate(tmp, { name: 'saqqdy', age: 18 })).toBe("My name is saqqdy, I'm 18 years old.")
	})

	it('should work with function', () => {
		const tmp = "My name is ${name}, I'm ${age} years old."
		expect(mapTemplate(tmp, (key: string) => ({ name: 'saqqdy', age: 28 }[key]))).toBe("My name is saqqdy, I'm 28 years old.")
	})

	it('should throw error when tmp is empty', () => {
		expect(() => mapTemplate('', {})).toThrow()
	})

	it('should throw error when data is empty', () => {
		expect(() => mapTemplate('test', null as any)).toThrow()
	})

	it('should keep original string when key not found', () => {
		expect(mapTemplate('Hello ${name}', {})).toBe('Hello ${name}')
	})
})
