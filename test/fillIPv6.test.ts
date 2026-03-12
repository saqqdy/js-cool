import { describe, expect, it } from 'vitest'
import fillIPv6 from '../src/fillIPv6'

describe('fillIPv6', () => {
	it('should fill IPv6 with zeros', () => {
		expect(fillIPv6('2409:8005:800::2')).toBe('2409:8005:0800:0000:0000:0000:0000:0002')
	})

	it('should fill IPv6 with leading zeros', () => {
		expect(fillIPv6('2409:8005:800::1c')).toBe('2409:8005:0800:0000:0000:0000:0000:001c')
	})

	it('should handle full IPv6', () => {
		expect(fillIPv6('2409:8005:0800:0000:0000:0000:0000:0002')).toBe('2409:8005:0800:0000:0000:0000:0000:0002')
	})

	it('should handle IPv6 with double colon at end', () => {
		expect(fillIPv6('2001:db8::')).toBe('2001:0db8:0000:0000:0000:0000:0000:0000')
	})
})
