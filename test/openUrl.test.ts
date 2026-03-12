/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, vi } from 'vitest'
import openUrl from '../src/openUrl'

describe('openUrl', () => {
	it('should create anchor element and click it', () => {
		const clickSpy = vi.spyOn(HTMLElement.prototype, 'click')

		openUrl('https://example.com')

		expect(clickSpy).toHaveBeenCalled()
		clickSpy.mockRestore()
	})

	it('should remove anchor after click', () => {
		openUrl('https://example.com')

		// Anchor should be removed from DOM
		const anchors = document.querySelectorAll('a')
		expect(anchors.length).toBe(0)
	})
})
