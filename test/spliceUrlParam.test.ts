import { describe, expect, it } from 'vitest'
import spliceUrlParam from '../src/spliceUrlParam'

describe('spliceUrlParam', () => {
	it('should splice url params', () => {
		const result = spliceUrlParam({ key1: '100', key2: '200' })

		expect(result).toBe('?key1=100&key2=200')
	})

	it('should handle null and undefined values', () => {
		const result = spliceUrlParam({ key1: null, key2: undefined })

		expect(result).toBe('?key1=null&key2=undefined')
	})

	it('should convert null values with covert option', () => {
		const result = spliceUrlParam({ key1: null, key2: undefined }, true)

		expect(result).toBe('?key1=&key2=')
	})

	it('should encode values with encode option', () => {
		const result = spliceUrlParam({ key: '测试' }, { encode: true })

		expect(result).toBe('?key=%E6%B5%8B%E8%AF%95')
	})

	it('should not include question mark with withQuestionsMark option', () => {
		const result = spliceUrlParam({ key: 'value' }, { withQuestionsMark: false })

		expect(result).toBe('key=value')
	})

	it('should handle all options', () => {
		const result = spliceUrlParam(
			{ key: null },
			{ covert: true, encode: true, withQuestionsMark: false }
		)

		expect(result).toBe('key=')
	})

	it('should return empty string when params is null', () => {
		const result = spliceUrlParam(null as any)

		expect(result).toBe('')
	})
})
