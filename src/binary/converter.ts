/**
 * BinaryConverter - Chainable binary conversion
 *
 * @module binary/converter
 * @since 6.0.0
 */

import type { BinaryConverter, BinaryFromOptions, BinaryInput } from './types'
import { arrayBuffer } from './modules/arrayBuffer'
import { base64 } from './modules/base64'
import { blob } from './modules/blob'
import { svg } from './modules/svg'
import { url } from './modules/url'

/**
 * Detect input type
 */
function detectType(input: BinaryInput): 'blob' | 'file' | 'arrayBuffer' | 'base64' | 'dataURL' | 'url' | 'svg' {
	if (input instanceof File) return 'file'
	if (input instanceof Blob) return 'blob'
	if (input instanceof ArrayBuffer) return 'arrayBuffer'
	if (input instanceof Uint8Array) return 'arrayBuffer'

	if (typeof input === 'string') {
		if (input.startsWith('data:')) return 'dataURL'
		if (input.startsWith('<svg')) return 'svg'
		// Check if it looks like a URL
		if (input.startsWith('http://') || input.startsWith('https://') || input.startsWith('//')) {
			return 'url'
		}
		return 'base64'
	}

	return 'blob'
}

/**
 * BinaryConverter class for chainable conversions
 */
export class BinaryConverterImpl implements BinaryConverter {
	private _data: Blob | File | ArrayBuffer | string
	private _type: 'blob' | 'file' | 'arrayBuffer' | 'base64' | 'dataURL' | 'url' | 'svg'
	private _mime?: string
	private _name?: string

	constructor(input: BinaryInput, options?: BinaryFromOptions) {
		this._type = detectType(input)
		this._mime = options?.mime
		this._name = options?.name

		if (input instanceof Uint8Array) {
			this._data = input.buffer.slice(input.byteOffset, input.byteOffset + input.byteLength) as ArrayBuffer
		} else {
			this._data = input
		}

		// Extract mime from data URL if present
		if (this._type === 'dataURL' && typeof input === 'string') {
			const commaIndex = input.indexOf(',')
			if (commaIndex > 0) {
				const prefix = input.slice(0, commaIndex)
				const mimeMatch = prefix.match(/^data:([^;]+);/)
				if (mimeMatch) {
					this._mime = mimeMatch[1]
				}
			}
		}

		// Extract mime from Blob/File
		if ((this._type === 'blob' || this._type === 'file') && input instanceof Blob) {
			this._mime = input.type || this._mime
			if (input instanceof File) {
				this._name = input.name
			}
		}
	}

	/**
	 * Get MIME type
	 */
	getMime(): string | undefined {
		return this._mime
	}

	/**
	 * Get size in bytes
	 */
	getSize(): number {
		if (this._data instanceof Blob) {
			return this._data.size
		}
		if (this._data instanceof ArrayBuffer) {
			return this._data.byteLength
		}
		if (typeof this._data === 'string') {
			// For base64, calculate decoded size
			if (this._type === 'base64' || this._type === 'dataURL') {
				const pureBase64 = this._type === 'dataURL'
					? this._data.slice(this._data.indexOf(',') + 1)
					: this._data
				return Math.floor(pureBase64.length * 3 / 4)
			}
			return this._data.length
		}
		return 0
	}

	/**
	 * Convert to ArrayBuffer first (internal helper)
	 */
	private async _toArrayBuffer(): Promise<ArrayBuffer> {
		switch (this._type) {
			case 'arrayBuffer':
				return this._data as ArrayBuffer
			case 'blob':
			case 'file':
				return blob.toArrayBuffer(this._data as Blob)
			case 'base64':
			case 'dataURL':
				return base64.toArrayBuffer(this._data as string)
			case 'url': {
				const urlBlob = await url.toBlob(this._data as string)
				return blob.toArrayBuffer(urlBlob)
			}
			case 'svg':
				return blob.toArrayBuffer(svg.toBlob(this._data as string))
			default:
				throw new Error(`Cannot convert ${this._type} to ArrayBuffer`)
		}
	}

	/**
	 * Convert to base64
	 */
	async toBase64(): Promise<string> {
		switch (this._type) {
			case 'base64':
				return this._data as string
			case 'dataURL': {
				const data = this._data as string
				const commaIndex = data.indexOf(',')
				return commaIndex > 0 ? data.slice(commaIndex + 1) : data
			}
			case 'blob':
			case 'file':
				return blob.toBase64(this._data as Blob).then(dataURL => {
					const commaIndex = dataURL.indexOf(',')
					return commaIndex > 0 ? dataURL.slice(commaIndex + 1) : dataURL
				})
			case 'arrayBuffer':
				return arrayBuffer.toBase64(this._data as ArrayBuffer)
			case 'url': {
				const urlBlob = await url.toBlob(this._data as string)
				const dataURL = await blob.toBase64(urlBlob)
				const commaIndex = dataURL.indexOf(',')
				return commaIndex > 0 ? dataURL.slice(commaIndex + 1) : dataURL
			}
			case 'svg': {
				const svgBlob = svg.toBlob(this._data as string)
				const dataURL = await blob.toBase64(svgBlob)
				const commaIndex = dataURL.indexOf(',')
				return commaIndex > 0 ? dataURL.slice(commaIndex + 1) : dataURL
			}
			default:
				throw new Error(`Cannot convert ${this._type} to base64`)
		}
	}

	/**
	 * Convert to data URL
	 */
	async toDataURL(mime?: string): Promise<string> {
		const finalMime = mime || this._mime || 'application/octet-stream'

		switch (this._type) {
			case 'dataURL':
				return this._data as string
			case 'base64':
				return base64.toDataURL(this._data as string, finalMime)
			case 'blob':
			case 'file':
				return blob.toDataURL(this._data as Blob)
			case 'arrayBuffer':
				return arrayBuffer.toDataURL(this._data as ArrayBuffer, finalMime)
			case 'url':
				return url.toDataURL(this._data as string)
			case 'svg':
				return svg.toDataURL(this._data as string)
			default:
				throw new Error(`Cannot convert ${this._type} to data URL`)
		}
	}

	/**
	 * Convert to ArrayBuffer
	 */
	async toArrayBuffer(): Promise<ArrayBuffer> {
		return this._toArrayBuffer()
	}

	/**
	 * Convert to Blob
	 */
	async toBlob(mime?: string): Promise<Blob> {
		const finalMime = mime || this._mime

		if (this._type === 'blob') {
			const b = this._data as Blob
			if (finalMime && b.type !== finalMime) {
				return new Blob([b], { type: finalMime })
			}
			return b
		}

		if (this._type === 'file') {
			const f = this._data as File
			if (finalMime && f.type !== finalMime) {
				return new Blob([f], { type: finalMime })
			}
			return f
		}

		if (this._type === 'arrayBuffer') {
			return arrayBuffer.toBlob(this._data as ArrayBuffer, finalMime)
		}

		if (this._type === 'base64' || this._type === 'dataURL') {
			return base64.toBlob(this._data as string, finalMime)
		}

		if (this._type === 'url') {
			return url.toBlob(this._data as string)
		}

		if (this._type === 'svg') {
			return svg.toBlob(this._data as string)
		}

		throw new Error(`Cannot convert ${this._type} to Blob`)
	}

	/**
	 * Convert to File
	 */
	async toFile(filename: string, mime?: string): Promise<File | Blob> {
		const finalMime = mime || this._mime
		const finalName = filename || this._name || 'file'

		// Convert to blob first
		const b = await this.toBlob(finalMime)

		// Convert blob to file
		return blob.toFile(b, finalName)
	}

	/**
	 * Convert to URL with revoke function
	 */
	async toURL(): Promise<{ url: string; revoke: () => void }> {
		const b = await this.toBlob()
		return blob.toURL(b)
	}
}

/**
 * Create a BinaryConverter instance
 */
export function from(input: BinaryInput, options?: BinaryFromOptions): BinaryConverter {
	return new BinaryConverterImpl(input, options)
}
