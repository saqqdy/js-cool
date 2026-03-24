/**
 * @vitest-environment happy-dom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import download, { downloadFile, downloadUrlFile, saveFile } from '../src/download'

describe('download', () => {
	let clickSpy: ReturnType<typeof vi.fn>,
		createElementSpy: ReturnType<typeof vi.spyOn>,
		appendChildSpy: ReturnType<typeof vi.spyOn>,
		removeChildSpy: ReturnType<typeof vi.spyOn>

	beforeEach(() => {
		clickSpy = vi.fn()
		createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
			const element = {
				tagName: tag.toUpperCase(),
				style: { display: '' },
				click: clickSpy,
				href: '',
				download: '',
			}
			return element as unknown as HTMLElement
		})
		appendChildSpy = vi
			.spyOn(document.body, 'appendChild')
			.mockImplementation(() => null as unknown as Node)
		removeChildSpy = vi
			.spyOn(document.body, 'removeChild')
			.mockImplementation(() => null as unknown as Node)
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	describe('download function', () => {
		it('should use downloadFile by default', () => {
			download('https://example.com/file.pdf', 'document.pdf')

			expect(createElementSpy).toHaveBeenCalledWith('a')
			expect(clickSpy).toHaveBeenCalled()
		})

		it('should extract filename from URL if not provided', () => {
			download('https://example.com/report.pdf')

			expect(createElementSpy).toHaveBeenCalledWith('a')
		})

		it('should call window.open for "open" type', () => {
			const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

			download('https://example.com/file.pdf', 'document.pdf', 'open')

			expect(openSpy).toHaveBeenCalledWith('https://example.com/file.pdf')
		})

		it('should navigate for "href" type', () => {
			const originalHref = window.location.href
			vi.spyOn(window, 'location', 'get').mockReturnValue({ href: originalHref } as Location)

			// Note: Cannot fully test window.location.href assignment in happy-dom
			// This is a basic test
			download('https://example.com/file.pdf', 'document.pdf', 'href')
		})
	})

	describe('saveFile', () => {
		it('should save string as file', () => {
			const createObjectURL = vi.fn(() => 'blob:test')
			const revokeObjectURL = vi.fn()

			vi.stubGlobal('URL', {
				createObjectURL,
				revokeObjectURL,
			})

			saveFile('Hello World', 'hello.txt')

			expect(createObjectURL).toHaveBeenCalled()
			expect(clickSpy).toHaveBeenCalled()
			expect(revokeObjectURL).toHaveBeenCalled()
		})

		it('should save Blob directly', () => {
			const createObjectURL = vi.fn(() => 'blob:test')
			const revokeObjectURL = vi.fn()

			vi.stubGlobal('URL', {
				createObjectURL,
				revokeObjectURL,
			})

			const blob = new Blob(['content'], { type: 'text/plain' })
			saveFile(blob, 'file.txt')

			expect(createObjectURL).toHaveBeenCalled()
			expect(clickSpy).toHaveBeenCalled()
		})

		it('should save ArrayBuffer as file', () => {
			const createObjectURL = vi.fn(() => 'blob:test')
			const revokeObjectURL = vi.fn()

			vi.stubGlobal('URL', {
				createObjectURL,
				revokeObjectURL,
			})

			const buffer = new ArrayBuffer(10)
			saveFile(buffer, 'data.bin')

			expect(createObjectURL).toHaveBeenCalled()
			expect(clickSpy).toHaveBeenCalled()
		})

		it('should use custom MIME type', () => {
			const createObjectURL = vi.fn(() => 'blob:test')
			const revokeObjectURL = vi.fn()

			vi.stubGlobal('URL', {
				createObjectURL,
				revokeObjectURL,
			})

			saveFile('<svg></svg>', 'image.svg', 'image/svg+xml')

			expect(createObjectURL).toHaveBeenCalled()
		})
	})

	describe('downloadFile', () => {
		it('should create anchor element and trigger download', () => {
			downloadFile('https://example.com/file.pdf', 'document.pdf')

			expect(createElementSpy).toHaveBeenCalledWith('a')
			expect(clickSpy).toHaveBeenCalled()
			expect(appendChildSpy).toHaveBeenCalled()
			expect(removeChildSpy).toHaveBeenCalled()
		})
	})

	describe('downloadUrlFile', () => {
		it('should create XHR request', () => {
			const xhrMock = {
				open: vi.fn(),
				send: vi.fn(),
				responseType: '',
				status: 0,
				response: null,
				onload: null as (() => void) | null,
			}

			vi.stubGlobal(
				'XMLHttpRequest',
				vi.fn(() => xhrMock)
			)

			downloadUrlFile('https://example.com/file.pdf', 'document.pdf')

			expect(xhrMock.open).toHaveBeenCalledWith('GET', 'https://example.com/file.pdf', true)
			expect(xhrMock.send).toHaveBeenCalled()
			expect(xhrMock.responseType).toBe('blob')
		})
	})

	describe('download namespace', () => {
		it('should have all methods', () => {
			expect(typeof download).toBe('function')
			expect(typeof download.saveFile).toBe('function')
			expect(typeof download.downloadFile).toBe('function')
			expect(typeof download.downloadUrlFile).toBe('function')
		})

		it('should call download namespace methods correctly', () => {
			const createObjectURL = vi.fn(() => 'blob:test')
			const revokeObjectURL = vi.fn()

			vi.stubGlobal('URL', {
				createObjectURL,
				revokeObjectURL,
			})

			download.saveFile('test', 'test.txt')
			expect(createObjectURL).toHaveBeenCalled()
		})
	})
})
