import { describe, expect, it } from 'vitest'
import nextVersion from '../src/nextVersion'

describe('nextVersion', () => {
	describe('patch version', () => {
		it('should increment patch by default', () => {
			expect(nextVersion('1.2.3')).toBe('1.2.4')
		})

		it('should increment patch with explicit patch type', () => {
			expect(nextVersion('1.2.3', 'patch')).toBe('1.2.4')
		})

		it('should clear pre-release when incrementing patch', () => {
			expect(nextVersion('1.2.3-alpha.1', 'patch')).toBe('1.2.3')
		})

		it('should increment patch when has release only (no preid)', () => {
			// Version '1.2.3-1' has no preid, only release number
			expect(nextVersion('1.2.3-1')).toBe('1.2.3')
		})
	})

	describe('major version', () => {
		it('should increment major and reset minor/patch', () => {
			expect(nextVersion('1.2.3', 'major')).toBe('2.0.0')
			expect(nextVersion('2.5.10', 'major')).toBe('3.0.0')
		})

		it('should increment major when minor > 0', () => {
			expect(nextVersion('1.2.0', 'major')).toBe('2.0.0')
		})

		it('should increment major when patch > 0', () => {
			expect(nextVersion('1.0.1', 'major')).toBe('2.0.0')
		})

		it('should not increment major when on pre-release with no minor/patch', () => {
			// When minor=0, patch=0, and has preid, major should NOT increment
			expect(nextVersion('1.0.0-alpha.1', 'major')).toBe('1.0.0')
		})

		it('should increment major when on pre-release with minor > 0', () => {
			expect(nextVersion('1.2.0-alpha.1', 'major')).toBe('2.0.0')
		})

		it('should increment major when on pre-release with patch > 0', () => {
			expect(nextVersion('1.0.1-alpha.1', 'major')).toBe('2.0.0')
		})
	})

	describe('minor version', () => {
		it('should increment minor and reset patch', () => {
			expect(nextVersion('1.2.3', 'minor')).toBe('1.3.0')
		})

		it('should increment minor when patch > 0', () => {
			expect(nextVersion('1.2.1', 'minor')).toBe('1.3.0')
		})

		it('should not increment minor when on pre-release with patch=0', () => {
			// When patch=0 and has preid, minor should NOT increment
			expect(nextVersion('1.2.0-alpha.1', 'minor')).toBe('1.2.0')
		})

		it('should increment minor when on pre-release with patch > 0', () => {
			expect(nextVersion('1.2.1-alpha.1', 'minor')).toBe('1.3.0')
		})
	})

	describe('premajor version', () => {
		it('should increment major and set pre-release', () => {
			expect(nextVersion('1.2.3', 'premajor', 'alpha')).toBe('2.0.0-alpha.0')
		})

		it('should work without preid', () => {
			expect(nextVersion('1.2.3', 'premajor')).toBe('2.0.0-0')
		})
	})

	describe('preminor version', () => {
		it('should increment minor and set pre-release', () => {
			expect(nextVersion('1.2.3', 'preminor', 'beta')).toBe('1.3.0-beta.0')
		})

		it('should work without preid', () => {
			expect(nextVersion('1.2.3', 'preminor')).toBe('1.3.0-0')
		})
	})

	describe('prepatch version', () => {
		it('should increment patch and set pre-release', () => {
			expect(nextVersion('1.2.3', 'prepatch', 'rc')).toBe('1.2.4-rc.0')
		})

		it('should work without preid', () => {
			expect(nextVersion('1.2.3', 'prepatch')).toBe('1.2.4-0')
		})
	})

	describe('prerelease version', () => {
		it('should increment release number', () => {
			expect(nextVersion('1.2.3-alpha.1', 'prerelease')).toBe('1.2.3-alpha.2')
			expect(nextVersion('1.2.3-beta.5', 'prerelease')).toBe('1.2.3-beta.6')
		})

		it('should start prerelease when no prerelease exists', () => {
			expect(nextVersion('1.2.3', 'prerelease', 'beta')).toBe('1.2.4-beta.0')
		})

		it('should change prerelease id and reset release', () => {
			expect(nextVersion('1.2.3-alpha.1', 'prerelease', 'beta')).toBe('1.2.3-beta.0')
		})

		it('should change prerelease id when preid is different', () => {
			// '1.2.3-alpha' parses to preid='', release=NaN
			// When prerelease with 'beta', it changes to beta
			expect(nextVersion('1.2.3-alpha', 'prerelease', 'beta')).toBe('1.2.3-beta.0')
		})

		it('should continue prerelease with same preid', () => {
			// Same preid, existing release - just increment
			expect(nextVersion('1.2.3-alpha.1', 'prerelease', 'alpha')).toBe('1.2.3-alpha.2')
		})

		it('should work without preid argument', () => {
			expect(nextVersion('1.2.3', 'prerelease')).toBe('1.2.4-0')
		})
	})

	describe('edge cases', () => {
		it('should handle version starting from 0', () => {
			expect(nextVersion('0.0.1')).toBe('0.0.2')
			expect(nextVersion('0.1.0', 'minor')).toBe('0.2.0')
			expect(nextVersion('0.1.0', 'major')).toBe('1.0.0')
		})

		it('should handle large version numbers', () => {
			expect(nextVersion('100.200.300')).toBe('100.200.301')
			expect(nextVersion('100.200.300', 'minor')).toBe('100.201.0')
			expect(nextVersion('100.200.300', 'major')).toBe('101.0.0')
		})

		it('should handle version with major.minor only', () => {
			expect(nextVersion('1.2')).toBe('1.2.1')
			expect(nextVersion('1.2', 'minor')).toBe('1.3.0')
			expect(nextVersion('1.2', 'major')).toBe('2.0.0')
		})

		it('should handle version with major only', () => {
			expect(nextVersion('1')).toBe('1.0.1')
			expect(nextVersion('1', 'minor')).toBe('1.1.0')
			expect(nextVersion('1', 'major')).toBe('2.0.0')
		})
	})
})
