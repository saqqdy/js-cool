import { describe, expect, it } from 'vitest'
import dash2Camel from '../src/dash2Camel'

describe('dash2Camel', () => {
	it('should convert dash-case to camelCase', () => {
		expect(dash2Camel('camel-case')).toBe('camelCase')
	})

	it('should handle single word', () => {
		expect(dash2Camel('word')).toBe('word')
	})

	it('should handle multiple dashes', () => {
		expect(dash2Camel('my-long-variable-name')).toBe('myLongVariableName')
	})

	it('should handle leading dash', () => {
		expect(dash2Camel('-test')).toBe('Test')
	})
})
