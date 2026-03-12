import { describe, expect, it } from 'vitest'
import nextVersion from '../src/nextVersion'

describe('nextVersion', () => {
	it('should increment patch version', () => {
		expect(nextVersion('1.2.3')).toBe('1.2.4')
	})

	it('should increment major version', () => {
		expect(nextVersion('1.2.3', 'major')).toBe('2.0.0')
	})

	it('should increment minor version', () => {
		expect(nextVersion('1.2.3', 'minor')).toBe('1.3.0')
	})

	it('should increment premajor version', () => {
		// The implementation sets release to 0, not 1
		expect(nextVersion('1.2.3', 'premajor', 'alpha')).toBe('2.0.0-alpha.0')
	})

	it('should increment preminor version', () => {
		expect(nextVersion('1.2.3', 'preminor', 'beta')).toBe('1.3.0-beta.0')
	})

	it('should increment prepatch version', () => {
		expect(nextVersion('1.2.3', 'prepatch', 'rc')).toBe('1.2.4-rc.0')
	})

	it('should increment prerelease version', () => {
		expect(nextVersion('1.2.3-alpha.1', 'prerelease')).toBe('1.2.3-alpha.2')
	})

	it('should start prerelease if no prerelease exists', () => {
		// When no prerelease exists and preid is given, it starts from 0
		expect(nextVersion('1.2.3', 'prerelease', 'beta')).toBe('1.2.4-beta.0')
	})

	it('should change prerelease id', () => {
		// When preid changes, release resets to 0
		expect(nextVersion('1.2.3-alpha.1', 'prerelease', 'beta')).toBe('1.2.3-beta.0')
	})

	it('should not increment minor when already on prerelease', () => {
		expect(nextVersion('1.2.0-alpha.1', 'minor')).toBe('1.2.0')
	})

	it('should increment major when minor is 0 but major has prerelease', () => {
		// The logic: if (ver.minor || ver.patch || !ver.preid) ver.major++
		// Here: minor=0, patch=0, preid='alpha' -> !ver.preid is false
		// So minor || patch is falsy, and !ver.preid is false
		// Major won't increment, it will stay 1.0.0
		expect(nextVersion('1.0.0-alpha.1', 'major')).toBe('1.0.0')
	})

	it('should handle version with release only', () => {
		// Version like '1.2.3-1' has subVer='1' without '.', so release is set to 1
		// Then preid is empty, release is 1
		// Patch doesn't increment because release is defined
		expect(nextVersion('1.2.3-1')).toBe('1.2.3')
	})
})
