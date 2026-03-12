import { describe, expect, it } from 'vitest'
import compareVersion from '../src/compareVersion'

describe('compareVersion', () => {
	it('should return 1 when first version is greater', () => {
		expect(compareVersion('1.1.0', '1.0.0')).toBe(1)
		expect(compareVersion('2.0.0', '1.9.9')).toBe(1)
	})

	it('should return -1 when second version is greater', () => {
		expect(compareVersion('1.0.0', '1.1.0')).toBe(-1)
		expect(compareVersion('1.9.9', '2.0.0')).toBe(-1)
	})

	it('should return 0 when versions are equal', () => {
		expect(compareVersion('1.0.0', '1.0.0')).toBe(0)
		expect(compareVersion('2.3.4', '2.3.4')).toBe(0)
	})

	it('should handle versions with different lengths', () => {
		expect(compareVersion('1.0.0.0.0.10', '1.0')).toBe(1)
		expect(compareVersion('1.0', '1.0.0.0.0.10')).toBe(-1)
	})

	it('should compare pre-release versions', () => {
		expect(compareVersion('1.11.0-beta.1', '1.11.0-alpha.1')).toBe(1)
		expect(compareVersion('1.11.0-alpha.1', '1.11.0-beta.1')).toBe(-1)
		expect(compareVersion('1.11.0-rc.1', '1.11.0-beta.1')).toBe(1)
	})

	it('should compare pre-release with release', () => {
		expect(compareVersion('1.11.0', '1.11.0-beta.1')).toBe(1)
		expect(compareVersion('1.11.0-beta.1', '1.11.0')).toBe(-1)
	})

	it('should compare equal pre-release versions', () => {
		expect(compareVersion('1.11.0-beta.10', '1.11.0-beta.10')).toBe(0)
	})

	it('should compare other tag versions', () => {
		expect(compareVersion('1.11.0-tag.10', '1.11.0-alpha.1')).toBe(-1)
		expect(compareVersion('1.11.0-tag.10', '1.11.0-tag.1')).toBe(1)
		expect(compareVersion('1.11.0-release.10', '1.11.0-tag.1')).toBe(1)
	})
})
