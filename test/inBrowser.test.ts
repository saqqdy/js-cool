/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import inBrowser from '../src/inBrowser'

describe('inBrowser', () => {
	it('should be true in happy-dom environment', () => {
		expect(inBrowser).toBeTruthy()
	})
})
