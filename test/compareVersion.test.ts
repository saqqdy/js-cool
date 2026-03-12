import { describe, expect, it } from 'vitest'
import compareVersion from '../src/compareVersion'

describe('compareVersion', () => {
	describe('basic version comparison', () => {
		it('should return 1 when first version is greater', () => {
			expect(compareVersion('1.1.0', '1.0.0')).toBe(1)
			expect(compareVersion('2.0.0', '1.9.9')).toBe(1)
			expect(compareVersion('1.10.0', '1.9.0')).toBe(1)
		})

		it('should return -1 when second version is greater', () => {
			expect(compareVersion('1.0.0', '1.1.0')).toBe(-1)
			expect(compareVersion('1.9.9', '2.0.0')).toBe(-1)
			expect(compareVersion('1.9.0', '1.10.0')).toBe(-1)
		})

		it('should return 0 when versions are equal', () => {
			expect(compareVersion('1.0.0', '1.0.0')).toBe(0)
			expect(compareVersion('2.3.4', '2.3.4')).toBe(0)
		})
	})

	describe('versions with different lengths', () => {
		it('should pad shorter version with zeros', () => {
			expect(compareVersion('1.0.0.0.0.10', '1.0')).toBe(1)
			expect(compareVersion('1.0', '1.0.0.0.0.10')).toBe(-1)
			expect(compareVersion('1.0.0', '1.0')).toBe(0)
			expect(compareVersion('1', '1.0.0.0')).toBe(0)
		})
	})

	describe('pre-release version comparison', () => {
		it('should compare alpha, beta, rc versions', () => {
			// alpha < beta < rc
			expect(compareVersion('1.11.0-beta.1', '1.11.0-alpha.1')).toBe(1)
			expect(compareVersion('1.11.0-alpha.1', '1.11.0-beta.1')).toBe(-1)
			expect(compareVersion('1.11.0-rc.1', '1.11.0-beta.1')).toBe(1)
			expect(compareVersion('1.11.0-rc.1', '1.11.0-alpha.1')).toBe(1)
			expect(compareVersion('1.11.0-alpha.1', '1.11.0-rc.1')).toBe(-1)
		})

		it('should compare equal pre-release versions', () => {
			expect(compareVersion('1.11.0-beta.10', '1.11.0-beta.10')).toBe(0)
			expect(compareVersion('1.11.0-alpha.5', '1.11.0-alpha.5')).toBe(0)
			expect(compareVersion('1.11.0-rc.2', '1.11.0-rc.2')).toBe(0)
		})

		it('should compare pre-release version numbers', () => {
			expect(compareVersion('1.11.0-beta.10', '1.11.0-beta.1')).toBe(1)
			expect(compareVersion('1.11.0-beta.1', '1.11.0-beta.10')).toBe(-1)
			expect(compareVersion('1.11.0-alpha.2', '1.11.0-alpha.1')).toBe(1)
		})
	})

	describe('pre-release vs release comparison', () => {
		it('should consider release version greater than pre-release', () => {
			// release version > pre-release version
			expect(compareVersion('1.11.0', '1.11.0-beta.1')).toBe(1)
			expect(compareVersion('1.11.0-beta.1', '1.11.0')).toBe(-1)
			expect(compareVersion('1.11.0', '1.11.0-rc.1')).toBe(1)
			expect(compareVersion('1.11.0-alpha.1', '1.11.0')).toBe(-1)
		})

		it('should return 0 when both have no pre-release', () => {
			expect(compareVersion('1.11.0', '1.11.0')).toBe(0)
		})
	})

	describe('unknown tag comparison', () => {
		it('should give unknown tags lower priority than alpha/beta/rc', () => {
			// unknown = priority 1, alpha = priority 2, beta = priority 3, rc = priority 4
			expect(compareVersion('1.11.0-tag.10', '1.11.0-alpha.1')).toBe(-1)
			expect(compareVersion('1.11.0-tag.10', '1.11.0-beta.1')).toBe(-1)
			expect(compareVersion('1.11.0-tag.10', '1.11.0-rc.1')).toBe(-1)
			expect(compareVersion('1.11.0-alpha.1', '1.11.0-tag.10')).toBe(1)
		})

		it('should compare unknown tags by version number', () => {
			expect(compareVersion('1.11.0-tag.10', '1.11.0-tag.1')).toBe(1)
			expect(compareVersion('1.11.0-tag.1', '1.11.0-tag.10')).toBe(-1)
			expect(compareVersion('1.11.0-tag.5', '1.11.0-tag.5')).toBe(0)
		})

		it('should compare different unknown tags', () => {
			// Both unknown tags have same priority (1), compare by version number
			expect(compareVersion('1.11.0-release.10', '1.11.0-tag.1')).toBe(1)
			expect(compareVersion('1.11.0-tag.1', '1.11.0-release.10')).toBe(-1)
		})
	})

	describe('edge cases', () => {
		it('should handle versions with major.minor only', () => {
			expect(compareVersion('1.2', '1.2.0')).toBe(0)
			expect(compareVersion('1.2', '1.2.1')).toBe(-1)
			expect(compareVersion('1.3', '1.2.9')).toBe(1)
		})

		it('should handle versions with major only', () => {
			expect(compareVersion('1', '1.0.0')).toBe(0)
			expect(compareVersion('2', '1.9.9')).toBe(1)
			expect(compareVersion('1', '2.0.0')).toBe(-1)
		})
	})
})
