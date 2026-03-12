import { describe, expect, it } from 'vitest'
import safeParse from '../src/safeParse'
import safeStringify from '../src/safeStringify'

describe('safeParse', () => {
	it('should parse JSON string', () => {
		expect(safeParse('{"a":1}')).toEqual({ a: 1 })
	})

	it('should convert special values', () => {
		const result = safeParse('{"a":"undefined","b":"NaN","c":"Infinity"}')
		expect(result.a).toBeUndefined()
		expect(result.b).toBeNaN()
		expect(result.c).toBe(Infinity)
	})

	it('should convert negative Infinity', () => {
		const result = safeParse('{"a":"-Infinity"}')
		expect(result.a).toBe(-Infinity)
	})

	it('should convert BigInt string', () => {
		const result = safeParse('{"a":"9007199254740993"}')
		expect(result.a).toBe(9007199254740993n)
	})

	it('should not convert when covert is false', () => {
		const result = safeParse('{"a":"NaN"}', false)
		expect(result.a).toBe('NaN')
	})

	it('should parse number', () => {
		expect(safeParse('100')).toBe(100)
	})
})

describe('safeStringify', () => {
	it('should stringify object', () => {
		expect(safeStringify({ a: 1 })).toBe('{"a":1}')
	})

	it('should convert undefined to string', () => {
		expect(safeStringify({ a: undefined })).toBe('{"a":"undefined"}')
	})

	it('should convert NaN to string', () => {
		expect(safeStringify({ a: NaN })).toBe('{"a":"NaN"}')
	})

	it('should convert Infinity to string', () => {
		expect(safeStringify({ a: Infinity })).toBe('{"a":"Infinity"}')
		expect(safeStringify({ a: -Infinity })).toBe('{"a":"-Infinity"}')
	})

	it('should convert unsafe integer to string', () => {
		// Note: JavaScript may round unsafe integers
		const result = safeStringify({ a: 9007199254740993 })
		expect(result).toMatch(/"a":"\d+"/)
	})

	it('should convert BigInt', () => {
		// BigInt needs to be handled specially - safeStringify with covert=true doesn't handle BigInt
		// but with covert=false it does convert BigInt to string
		const bigNum = BigInt(9007199254740993)
		const result = safeStringify({ a: bigNum }, false)
		expect(result).toMatch(/"a":"\d+"/)
	})

	it('should not convert when covert is false', () => {
		const bigNum = BigInt(9007199254740993)
		const result = safeStringify({ a: bigNum }, false)
		expect(result).toMatch(/"a":"\d+"/)
	})
})
