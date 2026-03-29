import { describe, expect, it, vi } from 'vitest'
import * as compat from '../src/binary/_compat'
import { binary } from '../src/binary/index'

describe('binary module', () => {
	describe('type detection', () => {
		it('should detect Blob', () => {
			const blob = new Blob(['hello'])
			expect(binary.isBlob(blob)).toBe(true)
			expect(binary.isBlob('string')).toBe(false)
			expect(binary.isBlob(null)).toBe(false)
			expect(binary.isBlob(undefined)).toBe(false)
			expect(binary.isBlob(123)).toBe(false)
		})

		it('should detect File', () => {
			const file = new File(['hello'], 'test.txt')
			expect(binary.isFile(file)).toBe(true)
			expect(binary.isFile(new Blob(['hello']))).toBe(false)
			expect(binary.isFile('string')).toBe(false)
			expect(binary.isFile(null)).toBe(false)
		})

		it('should detect ArrayBuffer', () => {
			const buffer = new ArrayBuffer(8)
			expect(binary.isArrayBuffer(buffer)).toBe(true)
			expect(binary.isArrayBuffer(new Uint8Array(8))).toBe(false)
			expect(binary.isArrayBuffer('string')).toBe(false)
			expect(binary.isArrayBuffer(null)).toBe(false)
		})

		it('should detect data URL', () => {
			expect(binary.isDataURL('data:text/plain;base64,SGVsbG8=')).toBe(true)
			expect(binary.isDataURL('data:image/png;base64,iVBORw0KGgo')).toBe(true)
			expect(binary.isDataURL('https://example.com')).toBe(false)
			expect(binary.isDataURL('not a data url')).toBe(false)
			expect(binary.isDataURL(null)).toBe(false)
			expect(binary.isDataURL(123)).toBe(false)
			expect(binary.isDataURL('data:text/plain')).toBe(false) // no comma
		})

		it('should detect base64', () => {
			expect(binary.isBase64('SGVsbG8gV29ybGQ=')).toBe(true)
			expect(binary.isBase64('SGVsbG8=')).toBe(true)
			expect(binary.isBase64('')).toBe(true)
			expect(binary.isBase64('data:text/plain;base64,SGVsbG8=')).toBe(false)
			expect(binary.isBase64('not base64!')).toBe(false)
			expect(binary.isBase64(null)).toBe(false)
			expect(binary.isBase64(123)).toBe(false)
			expect(binary.isBase64('invalid=base64==')).toBe(false)
		})
	})

	describe('base64 module', () => {
		it('should encode string to base64', () => {
			expect(binary.base64.encode('Hello World')).toBe('SGVsbG8gV29ybGQ=')
			expect(binary.base64.encode('Hello 世界')).toBe('SGVsbG8g5LiW55WM')
		})

		it('should decode base64 to string', () => {
			expect(binary.base64.decode('SGVsbG8gV29ybGQ=')).toBe('Hello World')
			expect(binary.base64.decode('SGVsbG8g5LiW55WM')).toBe('Hello 世界')
		})

		it('should convert base64 to ArrayBuffer', () => {
			const buffer = binary.base64.toArrayBuffer('SGVsbG8=')
			expect(buffer instanceof ArrayBuffer).toBe(true)
			expect(buffer.byteLength).toBe(5)
		})

		it('should convert base64 to Blob', () => {
			const blob = binary.base64.toBlob('SGVsbG8=', 'text/plain')
			expect(blob instanceof Blob).toBe(true)
			expect(blob.type).toBe('text/plain')
		})

		it('should convert base64 to Blob without mime', () => {
			const blob = binary.base64.toBlob('SGVsbG8=')
			expect(blob instanceof Blob).toBe(true)
			expect(blob.type).toBe('application/octet-stream')
		})

		it('should convert base64 to data URL', () => {
			const dataURL = binary.base64.toDataURL('SGVsbG8=', 'text/plain')
			expect(dataURL).toBe('data:text/plain;base64,SGVsbG8=')
		})

		it('should convert base64 to File', () => {
			const file = binary.base64.toFile('SGVsbG8=', 'test.txt', 'text/plain')
			expect(file instanceof Blob).toBe(true)
			// File constructor is supported in test environment
			expect((file as File).name).toBe('test.txt')
			expect((file as File).type).toBe('text/plain')
		})

		it('should convert base64 to File without mime', () => {
			const file = binary.base64.toFile('SGVsbG8=', 'test.txt')
			expect(file instanceof Blob).toBe(true)
		})

		it('should parse data URL', () => {
			const dataURL = 'data:image/png;base64,iVBORw0KGgo='
			const blob = binary.base64.toBlob(dataURL)
			expect(blob.type).toBe('image/png')
		})

		it('should throw for invalid data URL format', () => {
			expect(() => binary.base64.toArrayBuffer('data:invalid')).toThrow()
		})
	})

	describe('blob module', () => {
		it('should convert Blob to ArrayBuffer', async () => {
			const blob = new Blob(['Hello'])
			const buffer = await binary.blob.toArrayBuffer(blob)
			expect(buffer instanceof ArrayBuffer).toBe(true)
			expect(buffer.byteLength).toBe(5)
		})

		it('should convert Blob to base64', async () => {
			const blob = new Blob(['Hello'])
			const base64 = await binary.blob.toBase64(blob)
			expect(base64).toContain('data:')
			expect(base64).toContain('base64')
		})

		it('should convert Blob to data URL', async () => {
			const blob = new Blob(['Hello'])
			const dataURL = await binary.blob.toDataURL(blob)
			expect(dataURL).toContain('data:')
		})

		it('should convert Blob to File', () => {
			const blob = new Blob(['Hello'], { type: 'text/plain' })
			const file = binary.blob.toFile(blob, 'test.txt')
			expect(file instanceof Blob).toBe(true)
			// File constructor is supported in test environment
			expect((file as File).name).toBe('test.txt')
		})

		it('should convert Blob to URL', () => {
			const blob = new Blob(['Hello'])
			const { url, revoke } = binary.blob.toURL(blob)
			expect(url.startsWith('blob:')).toBe(true)
			revoke()
		})

		it('should concatenate Blobs', () => {
			const blob1 = new Blob(['Hello '])
			const blob2 = new Blob(['World'])
			const merged = binary.blob.concat([blob1, blob2], 'text/plain')
			expect(merged.size).toBe(11)
			expect(merged.type).toBe('text/plain')
		})

		it('should concatenate empty Blob array', () => {
			const merged = binary.blob.concat([])
			expect(merged.size).toBe(0)
		})

		it('should concatenate Blobs without mime', () => {
			const blob1 = new Blob(['Hello '], { type: 'text/plain' })
			const blob2 = new Blob(['World'])
			const merged = binary.blob.concat([blob1, blob2])
			expect(merged.type).toBe('text/plain')
		})

		it('should slice Blob', () => {
			const blob = new Blob(['Hello World'])
			const slice = binary.blob.slice(blob, 0, 5)
			expect(slice.size).toBe(5)
		})

		it('should slice Blob with mime', () => {
			const blob = new Blob(['Hello World'])
			const slice = binary.blob.slice(blob, 0, 5, 'text/plain')
			expect(slice.type).toBe('text/plain')
		})
	})

	describe('arrayBuffer module', () => {
		it('should convert ArrayBuffer to base64', () => {
			const buffer = new TextEncoder().encode('Hello').buffer
			const base64 = binary.arrayBuffer.toBase64(buffer)
			expect(base64).toBe('SGVsbG8=')
		})

		it('should convert ArrayBuffer to base64 with mime', () => {
			const buffer = new TextEncoder().encode('Hello').buffer
			const dataURL = binary.arrayBuffer.toBase64(buffer, 'text/plain')
			expect(dataURL).toBe('data:text/plain;base64,SGVsbG8=')
		})

		it('should convert ArrayBuffer to data URL', () => {
			const buffer = new TextEncoder().encode('Hello').buffer
			const dataURL = binary.arrayBuffer.toDataURL(buffer, 'text/plain')
			expect(dataURL).toBe('data:text/plain;base64,SGVsbG8=')
		})

		it('should convert ArrayBuffer to Blob', () => {
			const buffer = new ArrayBuffer(8)
			const blob = binary.arrayBuffer.toBlob(buffer, 'application/octet-stream')
			expect(blob instanceof Blob).toBe(true)
			expect(blob.size).toBe(8)
		})

		it('should convert ArrayBuffer to Blob without mime', () => {
			const buffer = new ArrayBuffer(8)
			const blob = binary.arrayBuffer.toBlob(buffer)
			expect(blob.type).toBe('application/octet-stream') // actual default
		})

		it('should convert ArrayBuffer to hex', () => {
			const buffer = new Uint8Array([0x48, 0x65, 0x6C, 0x6C, 0x6F]).buffer
			const hex = binary.arrayBuffer.toHex(buffer)
			expect(hex).toBe('48656c6c6f')
		})

		it('should convert ArrayBuffer to string', () => {
			const buffer = new TextEncoder().encode('Hello').buffer
			const str = binary.arrayBuffer.toString(buffer)
			expect(str).toBe('Hello')
		})

		it('should convert ArrayBuffer to string with encoding warning', () => {
			const buffer = new TextEncoder().encode('Hello').buffer
			const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
			const str = binary.arrayBuffer.toString(buffer, 'utf-16')
			expect(warnSpy).toHaveBeenCalled()
			expect(str).toBe('Hello')
			warnSpy.mockRestore()
		})
	})

	describe('file module', () => {
		it('should convert File to ArrayBuffer', async () => {
			const file = new File(['Hello'], 'test.txt', { type: 'text/plain' })
			const buffer = await binary.file.toArrayBuffer(file)
			expect(buffer instanceof ArrayBuffer).toBe(true)
			expect(buffer.byteLength).toBe(5)
		})

		it('should convert File to base64', async () => {
			const file = new File(['Hello'], 'test.txt', { type: 'text/plain' })
			const base64 = await binary.file.toBase64(file)
			expect(base64).toContain('data:text/plain')
			expect(base64).toContain('base64')
		})

		it('should convert File to Blob', () => {
			const file = new File(['Hello'], 'test.txt', { type: 'text/plain' })
			const blob = binary.file.toBlob(file)
			expect(blob instanceof Blob).toBe(true)
			expect(blob.type).toBe('text/plain')
		})
	})

	describe('text module', () => {
		it('should encode string to ArrayBuffer', () => {
			const buffer = binary.text.encode('Hello')
			expect(buffer instanceof ArrayBuffer).toBe(true)
		})

		it('should decode ArrayBuffer to string', () => {
			const buffer = binary.text.encode('Hello')
			const str = binary.text.decode(buffer)
			expect(str).toBe('Hello')
		})

		it('should handle UTF-8 characters', () => {
			const buffer = binary.text.encode('Hello 世界')
			const str = binary.text.decode(buffer)
			expect(str).toBe('Hello 世界')
		})

		it('should handle emoji characters', () => {
			const buffer = binary.text.encode('Hello 😀')
			const str = binary.text.decode(buffer)
			expect(str).toBe('Hello 😀')
		})

		it('should warn for non-UTF-8 encoding in encode', () => {
			const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
			binary.text.encode('Hello', 'utf-16')
			expect(warnSpy).toHaveBeenCalled()
			warnSpy.mockRestore()
		})

		it('should warn for non-UTF-8 encoding in decode', () => {
			const buffer = binary.text.encode('Hello')
			const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
			binary.text.decode(buffer, 'utf-16')
			expect(warnSpy).toHaveBeenCalled()
			warnSpy.mockRestore()
		})

		it('should convert string to base64', () => {
			const base64 = binary.text.toBase64('Hello 世界')
			expect(typeof base64).toBe('string')
			expect(base64.length).toBeGreaterThan(0)
		})

		it('should convert base64 to string', () => {
			const base64 = binary.text.toBase64('Hello 世界')
			const str = binary.text.fromBase64(base64)
			expect(str).toBe('Hello 世界')
		})
	})

	describe('hex module', () => {
		it('should encode ArrayBuffer to hex', () => {
			const buffer = new Uint8Array([0x48, 0x65, 0x6C, 0x6C, 0x6F]).buffer
			const hex = binary.hex.encode(buffer)
			expect(hex).toBe('48656c6c6f')
		})

		it('should decode hex to ArrayBuffer', () => {
			const buffer = binary.hex.decode('48656c6c6f')
			const bytes = new Uint8Array(buffer)
			expect(bytes[0]).toBe(0x48)
			expect(bytes[1]).toBe(0x65)
		})

		it('should handle odd-length hex strings', () => {
			const buffer = binary.hex.decode('48656c6c6') // odd length
			expect(buffer.byteLength).toBe(5)
		})

		it('should handle hex with 0x prefix', () => {
			const buffer = binary.hex.decode('0x48656c6c6f')
			const bytes = new Uint8Array(buffer)
			expect(bytes[0]).toBe(0x48)
		})

		it('should handle hex with whitespace', () => {
			const buffer = binary.hex.decode('48 65 6c 6c 6f')
			const bytes = new Uint8Array(buffer)
			expect(bytes[0]).toBe(0x48)
		})

		it('should throw for invalid hex string', () => {
			expect(() => binary.hex.decode('invalid-hex')).toThrow('Invalid hex string')
		})
	})

	describe('dataURL module', () => {
		it('should parse data URL', () => {
			const dataURL = 'data:text/plain;base64,SGVsbG8='
			const parsed = binary.dataURL.parse(dataURL)
			expect(parsed.mime).toBe('text/plain')
			expect(parsed.base64).toBe('SGVsbG8=')
		})

		it('should build data URL', () => {
			const dataURL = binary.dataURL.build('SGVsbG8=', 'text/plain')
			expect(dataURL).toBe('data:text/plain;base64,SGVsbG8=')
		})

		it('should validate data URL', () => {
			expect(binary.dataURL.isValid('data:text/plain;base64,SGVsbG8=')).toBe(true)
			expect(binary.dataURL.isValid('not a data url')).toBe(false)
			expect(binary.dataURL.isValid(null as any)).toBe(false)
			expect(binary.dataURL.isValid(123 as any)).toBe(false)
		})

		it('should throw for invalid data URL in parse', () => {
			expect(() => binary.dataURL.parse('invalid')).toThrow('Invalid data URL format')
		})
	})

	describe('hash module', () => {
		it('should calculate SHA-256 hash', async () => {
			const hash = await binary.hash.sha256('Hello World')
			expect(hash).toBe('a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e')
		})

		it('should calculate SHA-256 hash from ArrayBuffer', async () => {
			const buffer = new TextEncoder().encode('Hello World').buffer
			const hash = await binary.hash.sha256(buffer)
			expect(hash).toBe('a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e')
		})

		it('should calculate SHA-256 hash from Uint8Array', async () => {
			const bytes = new TextEncoder().encode('Hello World')
			const hash = await binary.hash.sha256(bytes)
			expect(hash).toBe('a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e')
		})

		it('should calculate SHA-256 hash from Blob', async () => {
			const blob = new Blob(['Hello World'])
			const hash = await binary.hash.sha256(blob)
			expect(hash).toBe('a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e')
		})

		it('should calculate SHA-1 hash', async () => {
			const hash = await binary.hash.sha1('Hello World')
			expect(hash).toBe('0a4d55a8d778e5022fab701977c5d840bbc486d0')
		})

		it('should calculate SHA-1 hash from ArrayBuffer', async () => {
			const buffer = new TextEncoder().encode('Hello World').buffer
			const hash = await binary.hash.sha1(buffer)
			expect(hash).toBe('0a4d55a8d778e5022fab701977c5d840bbc486d0')
		})

		it('should calculate CRC32', () => {
			const crc = binary.hash.crc32('Hello World')
			expect(typeof crc).toBe('number')
			expect(crc).toBeGreaterThan(0)
		})

		it('should calculate CRC32 from ArrayBuffer', () => {
			const buffer = new TextEncoder().encode('Hello World').buffer
			const crc = binary.hash.crc32(buffer)
			expect(typeof crc).toBe('number')
		})

		it('should calculate CRC32 from Uint8Array', () => {
			const bytes = new TextEncoder().encode('Hello World')
			const crc = binary.hash.crc32(bytes)
			expect(typeof crc).toBe('number')
		})

		it('should throw CRC32 error for Blob', () => {
			const blob = new Blob(['Hello'])
			expect(() => binary.hash.crc32(blob)).toThrow('crc32 does not support Blob input')
		})

		it('should calculate MD5 hash', async () => {
			const hash = await binary.hash.md5('Hello World')
			expect(hash).toBe('b10a8db164e0754105b7a99be72e3fe5')
		})

		it('should calculate MD5 hash from ArrayBuffer', async () => {
			const buffer = new TextEncoder().encode('Hello World').buffer
			const hash = await binary.hash.md5(buffer)
			expect(hash).toBe('b10a8db164e0754105b7a99be72e3fe5')
		})

		it('should calculate MD5 hash from Blob', async () => {
			const blob = new Blob(['Hello World'])
			const hash = await binary.hash.md5(blob)
			expect(hash).toBe('b10a8db164e0754105b7a99be72e3fe5')
		})

		it('should throw for unsupported hash input type', async () => {
			// Create an object that is not a valid BinaryInput
			const invalidInput = {} as any
			await expect(binary.hash.sha256(invalidInput)).rejects.toThrow('Unsupported input type')
		})

		it('should throw CRC32 for unsupported input type', () => {
			expect(() => binary.hash.crc32({} as any)).toThrow('Unsupported input type')
		})
	})

	describe('meta module', () => {
		it('should get metadata from Blob', () => {
			const blob = new Blob(['Hello'], { type: 'text/plain' })
			const meta = binary.meta.get(blob)
			expect(meta.size).toBe(5)
			expect(meta.mime).toBe('text/plain')
			expect(meta.isText).toBe(true)
		})

		it('should detect image type', () => {
			const blob = new Blob([''], { type: 'image/png' })
			const meta = binary.meta.get(blob)
			expect(meta.isImage).toBe(true)
			expect(meta.extension).toBe('png')
		})

		it('should detect video type', () => {
			const blob = new Blob([''], { type: 'video/mp4' })
			const meta = binary.meta.get(blob)
			expect(meta.isVideo).toBe(true)
			expect(meta.extension).toBe('mp4')
		})

		it('should detect audio type', () => {
			const blob = new Blob([''], { type: 'audio/mpeg' })
			const meta = binary.meta.get(blob)
			expect(meta.isAudio).toBe(true)
			expect(meta.extension).toBe('mp3')
		})

		it('should get metadata from File', () => {
			const file = new File(['Hello'], 'test.txt', { type: 'text/plain' })
			const meta = binary.meta.get(file)
			expect(meta.name).toBe('test.txt')
			expect(meta.extension).toBe('txt')
			expect(meta.lastModified).toBeDefined()
		})

		it('should get extension from File name', () => {
			const file = new File([''], 'document.pdf', { type: 'application/pdf' })
			const meta = binary.meta.get(file)
			expect(meta.extension).toBe('pdf')
		})

		it('should handle unknown MIME type', () => {
			const blob = new Blob([''], { type: 'application/unknown' })
			const meta = binary.meta.get(blob)
			expect(meta.extension).toBeUndefined()
			expect(meta.isImage).toBe(false)
			expect(meta.isVideo).toBe(false)
			expect(meta.isAudio).toBe(false)
			expect(meta.isText).toBe(false)
		})

		it('should handle Blob without type', () => {
			const blob = new Blob(['Hello'])
			const meta = binary.meta.get(blob)
			expect(meta.mime).toBe('application/octet-stream')
		})

		it('should handle File with no extension in name', () => {
			const file = new File([''], 'README', { type: 'text/plain' })
			const meta = binary.meta.get(file)
			expect(meta.extension).toBe('txt') // from MIME type
		})

		it('should handle text MIME types', () => {
			const blob = new Blob([''], { type: 'text/html' })
			const meta = binary.meta.get(blob)
			expect(meta.isText).toBe(true)
			expect(meta.extension).toBe('html')
		})

		it('should handle custom text MIME type', () => {
			const blob = new Blob([''], { type: 'text/custom' })
			const meta = binary.meta.get(blob)
			expect(meta.isText).toBe(true)
		})
	})

	describe('svg module', () => {
		it('should convert SVG to Blob', () => {
			const svg =
				'<svg xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40"/></svg>'
			const blob = binary.svg.toBlob(svg)
			expect(blob.type).toBe('image/svg+xml')
		})

		it('should convert SVG to data URL', () => {
			const svg = '<svg></svg>'
			const dataURL = binary.svg.toDataURL(svg)
			expect(dataURL.startsWith('data:image/svg+xml')).toBe(true)
		})

		it('should convert SVG to URL', () => {
			const svg = '<svg></svg>'
			const { url, revoke } = binary.svg.toURL(svg)
			expect(url.startsWith('blob:')).toBe(true)
			revoke()
		})
	})

	describe('url module', () => {
		it('should fetch URL and convert to Blob', async () => {
			const mockBlob = new Blob(['test data'], { type: 'text/plain' })
			global.fetch = vi.fn().mockResolvedValue({
				ok: true,
				blob: () => Promise.resolve(mockBlob),
			})

			const blob = await binary.url.toBlob('https://example.com/file.txt')
			expect(blob).toBe(mockBlob)
		})

		it('should throw on HTTP error', async () => {
			global.fetch = vi.fn().mockResolvedValue({
				ok: false,
				status: 404,
				statusText: 'Not Found',
			})

			await expect(binary.url.toBlob('https://example.com/notfound')).rejects.toThrow(
				'HTTP 404'
			)
		})

		it('should fetch URL and convert to data URL', async () => {
			const mockBlob = new Blob(['test'], { type: 'text/plain' })
			global.fetch = vi.fn().mockResolvedValue({
				ok: true,
				blob: () => Promise.resolve(mockBlob),
			})

			const dataURL = await binary.url.toDataURL('https://example.com/file.txt')
			expect(dataURL).toContain('data:')
		})
	})

	describe('chainable conversion (from)', () => {
		it('should convert Blob to base64', async () => {
			const blob = new Blob(['Hello'])
			const base64 = await binary.from(blob).toBase64()
			expect(typeof base64).toBe('string')
		})

		it('should convert base64 to Blob', async () => {
			const blob = await binary.from('SGVsbG8=').toBlob('text/plain')
			expect(blob instanceof Blob).toBe(true)
			expect(blob.size).toBe(5)
		})

		it('should convert ArrayBuffer to data URL', async () => {
			const buffer = new TextEncoder().encode('Hello').buffer
			const dataURL = await binary.from(buffer).toDataURL('text/plain')
			expect(dataURL).toBe('data:text/plain;base64,SGVsbG8=')
		})

		it('should get mime type', () => {
			const blob = new Blob(['Hello'], { type: 'text/plain' })
			const mime = binary.from(blob).getMime()
			expect(mime).toBe('text/plain')
		})

		it('should get size', () => {
			const blob = new Blob(['Hello'])
			const size = binary.from(blob).getSize()
			expect(size).toBe(5)
		})

		it('should handle data URL input', async () => {
			const dataURL = 'data:image/png;base64,iVBORw0KGgo='
			const blob = await binary.from(dataURL).toBlob()
			expect(blob.type).toBe('image/png')
		})

		it('should handle SVG input', async () => {
			const svg = '<svg></svg>'
			const blob = await binary.from(svg).toBlob()
			expect(blob.type).toBe('image/svg+xml')
		})

		it('should handle File input', async () => {
			const file = new File(['Hello'], 'test.txt', { type: 'text/plain' })
			const base64 = await binary.from(file).toBase64()
			expect(typeof base64).toBe('string')
		})

		it('should handle Uint8Array input', async () => {
			const bytes = new TextEncoder().encode('Hello')
			const base64 = await binary.from(bytes).toBase64()
			expect(base64).toBe('SGVsbG8=')
		})

		it('should handle ArrayBuffer input', async () => {
			const buffer = new TextEncoder().encode('Hello').buffer
			const base64 = await binary.from(buffer).toBase64()
			expect(base64).toBe('SGVsbG8=')
		})

		it('should convert Blob to File', async () => {
			const blob = new Blob(['Hello'], { type: 'text/plain' })
			const file = await binary.from(blob).toFile('test.txt')
			// File constructor is supported in test environment
			expect((file as File).name).toBe('test.txt')
		})

		it('should convert to URL', async () => {
			const blob = new Blob(['Hello'])
			const { url, revoke } = await binary.from(blob).toURL()
			expect(url.startsWith('blob:')).toBe(true)
			revoke()
		})

		it('should handle Blob with mime change', async () => {
			const blob = new Blob(['Hello'], { type: 'text/plain' })
			const result = await binary.from(blob).toBlob('text/html')
			expect(result.type).toBe('text/html')
		})

		it('should handle Blob with same mime', async () => {
			const blob = new Blob(['Hello'], { type: 'text/plain' })
			const result = await binary.from(blob).toBlob('text/plain')
			expect(result).toBe(blob)
		})

		it('should handle base64 string input', async () => {
			const dataURL = await binary.from('SGVsbG8=').toDataURL('text/plain')
			expect(dataURL).toBe('data:text/plain;base64,SGVsbG8=')
		})

		it('should handle empty base64 string', async () => {
			const size = binary.from('').getSize()
			expect(size).toBe(0)
		})

		it('should handle data URL without comma', async () => {
			// This is an edge case that shouldn't happen in practice
			const converter = binary.from('data:text/plain;base64')
			const size = converter.getSize()
			expect(typeof size).toBe('number')
		})

		it('should handle options parameter', () => {
			const buffer = new ArrayBuffer(8)
			const converter = binary.from(buffer, {
				name: 'custom.bin',
				mime: 'application/custom',
			})
			expect(converter.getMime()).toBe('application/custom')
		})

		it('should handle File with name extraction', () => {
			const file = new File(['Hello'], 'test.txt', { type: 'text/plain' })
			const converter = binary.from(file)
			expect(converter.getMime()).toBe('text/plain')
		})
	})

	describe('parse function', () => {
		it('should parse Blob', () => {
			const blob = new Blob(['Hello'], { type: 'text/plain' })
			const parsed = binary.parse(blob)
			expect(parsed.type).toBe('blob')
			expect(parsed.mime).toBe('text/plain')
			expect(parsed.size).toBe(5)
		})

		it('should parse File', () => {
			const file = new File(['Hello'], 'test.txt', { type: 'text/plain' })
			const parsed = binary.parse(file)
			expect(parsed.type).toBe('file')
			expect(parsed.name).toBe('test.txt')
		})

		it('should parse ArrayBuffer', () => {
			const buffer = new ArrayBuffer(8)
			const parsed = binary.parse(buffer)
			expect(parsed.type).toBe('arrayBuffer')
			expect(parsed.size).toBe(8)
		})

		it('should parse Uint8Array', () => {
			const bytes = new Uint8Array([1, 2, 3, 4, 5])
			const parsed = binary.parse(bytes)
			expect(parsed.type).toBe('arrayBuffer')
			expect(parsed.size).toBe(5)
		})

		it('should parse data URL', () => {
			const dataURL = 'data:text/plain;base64,SGVsbG8='
			const parsed = binary.parse(dataURL)
			expect(parsed.type).toBe('dataURL')
			expect(parsed.mime).toBe('text/plain')
		})

		it('should parse base64 string', () => {
			const parsed = binary.parse('SGVsbG8=')
			expect(parsed.type).toBe('base64')
		})

		it('should parse URL string', () => {
			const parsed = binary.parse('https://example.com/file')
			expect(parsed.type).toBe('url')
		})

		it('should parse URL string with //', () => {
			const parsed = binary.parse('//example.com/file')
			expect(parsed.type).toBe('url')
		})

		it('should parse URL string with http://', () => {
			const parsed = binary.parse('http://example.com/file')
			expect(parsed.type).toBe('url')
		})

		it('should parse SVG string', () => {
			const parsed = binary.parse('<svg></svg>')
			expect(parsed.type).toBe('svg')
			expect(parsed.mime).toBe('image/svg+xml')
		})

		it('should parse Blob without type', () => {
			const blob = new Blob(['Hello'])
			const parsed = binary.parse(blob)
			expect(parsed.mime).toBeUndefined()
		})
	})

	describe('utility methods', () => {
		it('should compare equal binary data', async () => {
			const blob1 = new Blob(['Hello'])
			const blob2 = new Blob(['Hello'])
			const same = await binary.compare(blob1, blob2)
			expect(same).toBe(true)
		})

		it('should compare different binary data', async () => {
			const blob1 = new Blob(['Hello'])
			const blob2 = new Blob(['World'])
			const same = await binary.compare(blob1, blob2)
			expect(same).toBe(false)
		})

		it('should compare different size binary data', async () => {
			const blob1 = new Blob(['Hello'])
			const blob2 = new Blob(['Hello World'])
			const same = await binary.compare(blob1, blob2)
			expect(same).toBe(false)
		})

		it('should compare ArrayBuffer data', async () => {
			const buffer1 = new TextEncoder().encode('Hello').buffer
			const buffer2 = new TextEncoder().encode('Hello').buffer
			const same = await binary.compare(buffer1, buffer2)
			expect(same).toBe(true)
		})

		it('should compare Uint8Array data', async () => {
			const bytes1 = new TextEncoder().encode('Hello')
			const bytes2 = new TextEncoder().encode('Hello')
			const same = await binary.compare(bytes1, bytes2)
			expect(same).toBe(true)
		})

		it('should compare string data', async () => {
			const same = await binary.compare('SGVsbG8=', 'SGVsbG8=') // base64 encoded
			expect(same).toBe(true)
		})

		it('should clone Blob', () => {
			const blob = new Blob(['Hello'], { type: 'text/plain' })
			const cloned = binary.clone(blob)
			expect(cloned).not.toBe(blob)
			expect(cloned.size).toBe(blob.size)
		})

		it('should clone ArrayBuffer', () => {
			const buffer = new ArrayBuffer(8)
			const cloned = binary.clone(buffer)
			expect(cloned).not.toBe(buffer)
			expect(cloned.byteLength).toBe(buffer.byteLength)
		})

		it('should clone File', () => {
			const file = new File(['Hello'], 'test.txt', { type: 'text/plain' })
			const cloned = binary.clone(file)
			expect(cloned).not.toBe(file)
			expect(cloned.size).toBe(file.size)
		})

		it('should throw for unsupported clone type', () => {
			expect(() => binary.clone('string' as any)).toThrow('Unsupported type for cloning')
		})

		it('should download Blob', () => {
			const blob = new Blob(['Hello World'], { type: 'text/plain' })
			const linkSpy = {
				href: '',
				download: '',
				click: vi.fn(),
			}

			const createElementSpy = vi
				.spyOn(document, 'createElement')
				.mockReturnValue(linkSpy as any)
			const bodySpy = {
				appendChild: vi.fn(),
				removeChild: vi.fn(),
			}
			vi.spyOn(document, 'body', 'get').mockReturnValue(bodySpy as any)

			binary.download(blob, 'hello.txt')

			expect(createElementSpy).toHaveBeenCalledWith('a')
			expect(linkSpy.download).toBe('hello.txt')
			expect(linkSpy.click).toHaveBeenCalled()

			createElementSpy.mockRestore()
		})

		it('should download File', () => {
			const file = new File(['Hello'], 'test.txt')
			const linkSpy = {
				href: '',
				download: '',
				click: vi.fn(),
			}

			const createElementSpy = vi
				.spyOn(document, 'createElement')
				.mockReturnValue(linkSpy as any)
			const bodySpy = {
				appendChild: vi.fn(),
				removeChild: vi.fn(),
			}
			vi.spyOn(document, 'body', 'get').mockReturnValue(bodySpy as any)

			binary.download(file, 'test.txt')

			expect(linkSpy.click).toHaveBeenCalled()
			createElementSpy.mockRestore()
		})

		it('should download ArrayBuffer with mime', () => {
			const buffer = new ArrayBuffer(8)
			const linkSpy = {
				href: '',
				download: '',
				click: vi.fn(),
			}

			const createElementSpy = vi
				.spyOn(document, 'createElement')
				.mockReturnValue(linkSpy as any)
			const bodySpy = {
				appendChild: vi.fn(),
				removeChild: vi.fn(),
			}
			vi.spyOn(document, 'body', 'get').mockReturnValue(bodySpy as any)

			binary.download(buffer, 'data.bin', 'application/octet-stream')

			expect(linkSpy.click).toHaveBeenCalled()
			createElementSpy.mockRestore()
		})
	})

	describe('_compat module', () => {
		it('should check btoa availability', () => {
			expect(compat.hasBtoa()).toBe(true)
		})

		it('should check atob availability', () => {
			expect(compat.hasAtob()).toBe(true)
		})

		it('should base64 encode string', () => {
			expect(compat.base64Encode('Hello')).toBe('SGVsbG8=')
		})

		it('should base64 decode string', () => {
			expect(compat.base64Decode('SGVsbG8=')).toBe('Hello')
		})

		it('should convert ArrayBuffer to binary string', () => {
			const buffer = new TextEncoder().encode('Hello').buffer
			const binary = compat.arrayBufferToBinaryString(buffer)
			expect(binary).toBe('Hello')
		})

		it('should convert large ArrayBuffer to binary string', () => {
			const data = 'x'.repeat(10000)
			const buffer = new TextEncoder().encode(data).buffer
			const binary = compat.arrayBufferToBinaryString(buffer)
			expect(binary.length).toBe(10000)
		})

		it('should convert binary string to ArrayBuffer', () => {
			const buffer = compat.binaryStringToArrayBuffer('Hello')
			expect(buffer instanceof ArrayBuffer).toBe(true)
			expect(buffer.byteLength).toBe(5)
		})

		it('should detect capabilities', () => {
			const caps = compat.detectCapabilities()
			expect(typeof caps.file).toBe('boolean')
			expect(typeof caps.textEncoding).toBe('boolean')
			expect(typeof caps.base64).toBe('boolean')
			expect(typeof caps.crypto).toBe('boolean')
			expect(typeof caps.stream).toBe('boolean')
			expect(typeof caps.compression).toBe('boolean')
			expect(typeof caps.blobURL).toBe('boolean')
		})

		it('should get compatibility warnings', () => {
			const warnings = compat.getCompatWarnings()
			expect(Array.isArray(warnings)).toBe(true)
		})
	})

	describe('converter edge cases', () => {
		it('should convert URL input to ArrayBuffer', async () => {
			const mockBlob = new Blob(['test data'])
			global.fetch = vi.fn().mockResolvedValue({
				ok: true,
				blob: () => Promise.resolve(mockBlob),
			})

			const buffer = await binary.from('https://example.com/file').toArrayBuffer()
			expect(buffer instanceof ArrayBuffer).toBe(true)
		})

		it('should convert URL input to data URL', async () => {
			const mockBlob = new Blob(['test'], { type: 'text/plain' })
			global.fetch = vi.fn().mockResolvedValue({
				ok: true,
				blob: () => Promise.resolve(mockBlob),
			})

			const dataURL = await binary.from('https://example.com/file').toDataURL()
			expect(dataURL).toContain('data:')
		})

		it('should convert SVG input to ArrayBuffer', async () => {
			const buffer = await binary.from('<svg></svg>').toArrayBuffer()
			expect(buffer instanceof ArrayBuffer).toBe(true)
		})

		it('should convert File input to Blob', async () => {
			const file = new File(['Hello'], 'test.txt', { type: 'text/plain' })
			const blob = await binary.from(file).toBlob()
			expect(blob instanceof Blob).toBe(true)
		})

		it('should convert File input with type change', async () => {
			const file = new File(['Hello'], 'test.txt', { type: 'text/plain' })
			const blob = await binary.from(file).toBlob('text/html')
			expect(blob.type).toBe('text/html')
		})

		it('should convert ArrayBuffer input to Blob', async () => {
			const buffer = new ArrayBuffer(8)
			const blob = await binary.from(buffer).toBlob('application/octet-stream')
			expect(blob instanceof Blob).toBe(true)
			expect(blob.size).toBe(8)
		})

		it('should convert base64 input to Blob', async () => {
			const blob = await binary.from('SGVsbG8=').toBlob()
			expect(blob.size).toBe(5)
		})

		it('should convert dataURL input to Blob', async () => {
			const blob = await binary.from('data:text/plain;base64,SGVsbG8=').toBlob()
			expect(blob.type).toBe('text/plain')
		})

		it('should convert SVG input to Blob', async () => {
			const blob = await binary.from('<svg></svg>').toBlob()
			expect(blob.type).toBe('image/svg+xml')
		})

		it('should convert URL input to Blob', async () => {
			const mockBlob = new Blob(['test'])
			global.fetch = vi.fn().mockResolvedValue({
				ok: true,
				blob: () => Promise.resolve(mockBlob),
			})

			const blob = await binary.from('https://example.com/file').toBlob()
			expect(blob).toBe(mockBlob)
		})

		it('should convert base64 to File', async () => {
			const file = await binary.from('SGVsbG8=').toFile('test.txt')
			expect(file instanceof Blob).toBe(true)
		})

		it('should get size for string input', () => {
			const size = binary.from('SGVsbG8=').getSize()
			// base64 length * 3 / 4 = 8 * 3 / 4 = 6
			expect(size).toBe(6)
		})
	})
})
