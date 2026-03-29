/**
 * Binary conversion module types
 *
 * @module binary/types
 * @since 6.0.0
 */

// ==================== Input Types ====================

/**
 * Input types supported by binary conversion
 */
export type BinaryInput = Blob | File | ArrayBuffer | Uint8Array | string

/**
 * Binary data type identifier
 */
export type BinaryType = 'blob' | 'file' | 'arrayBuffer' | 'base64' | 'dataURL' | 'url' | 'svg'

// ==================== Result Types ====================

/**
 * Parsed binary data structure
 */
export interface BinaryData {
	/** The raw data */
	data: Blob | File | ArrayBuffer | string
	/** Type identifier */
	type: BinaryType
	/** MIME type if available */
	mime?: string
	/** File name if available */
	name?: string
	/** Size in bytes */
	size: number
}

/**
 * Binary metadata
 */
export interface BinaryMeta {
	/** Size in bytes */
	size: number
	/** MIME type */
	mime: string
	/** File name */
	name?: string
	/** Last modified timestamp */
	lastModified?: number
	/** File extension (inferred from mime or name) */
	extension?: string
	/** Whether the file is an image */
	isImage: boolean
	/** Whether the file is a video */
	isVideo: boolean
	/** Whether the file is audio */
	isAudio: boolean
	/** Whether the file is text */
	isText: boolean
}

// ==================== Converter Types ====================

/**
 * BinaryConverter options
 */
export interface BinaryFromOptions {
	/** MIME type hint for conversion */
	mime?: string
	/** File name hint */
	name?: string
}

/**
 * URL result with revoke function
 */
export interface URLResult {
	/** The blob URL */
	url: string
	/** Function to revoke the URL */
	revoke: () => void
}

// ==================== Sub-module API Types ====================

/**
 * Base64 API
 */
export interface Base64API {
	/** Encode string to base64 */
	encode: (str: string) => string
	/** Decode base64 to string */
	decode: (base64: string) => string
	/** Convert base64 to Blob */
	toBlob: (base64: string, mime?: string) => Blob
	/** Convert base64 to ArrayBuffer */
	toArrayBuffer: (base64: string) => ArrayBuffer
	/** Convert base64 to data URL */
	toDataURL: (base64: string, mime: string) => string
	/** Convert base64 to File */
	toFile: (base64: string, filename: string, mime?: string) => File | Blob
}

/**
 * Blob API
 */
export interface BlobAPI {
	/** Convert Blob to base64 */
	toBase64: (blob: Blob) => Promise<string>
	/** Convert Blob to ArrayBuffer */
	toArrayBuffer: (blob: Blob) => Promise<ArrayBuffer>
	/** Convert Blob to data URL */
	toDataURL: (blob: Blob) => Promise<string>
	/** Convert Blob to File */
	toFile: (blob: Blob, filename: string) => File | Blob
	/** Convert Blob to URL with revoke function */
	toURL: (blob: Blob) => URLResult
	/** Concatenate multiple Blobs */
	concat: (blobs: Blob[], mime?: string) => Blob
	/** Slice a Blob */
	slice: (blob: Blob, start: number, end: number, mime?: string) => Blob
}

/**
 * ArrayBuffer API
 */
export interface ArrayBufferAPI {
	/** Convert ArrayBuffer to base64 */
	toBase64: (buffer: ArrayBuffer, mime?: string) => string
	/** Convert ArrayBuffer to data URL */
	toDataURL: (buffer: ArrayBuffer, mime: string) => string
	/** Convert ArrayBuffer to Blob */
	toBlob: (buffer: ArrayBuffer, mime?: string) => Blob
	/** Convert ArrayBuffer to string */
	toString: (buffer: ArrayBuffer, encoding?: string) => string
	/** Convert ArrayBuffer to hex string */
	toHex: (buffer: ArrayBuffer) => string
}

/**
 * File API
 */
export interface FileAPI {
	/** Convert File to base64 */
	toBase64: (file: File) => Promise<string>
	/** Convert File to ArrayBuffer */
	toArrayBuffer: (file: File) => Promise<ArrayBuffer>
	/** Convert File to Blob */
	toBlob: (file: File) => Blob
}

/**
 * URL API
 */
export interface URLAPI {
	/** Fetch URL and convert to Blob */
	toBlob: (url: string) => Promise<Blob>
	/** Fetch URL and convert to data URL */
	toDataURL: (url: string) => Promise<string>
}

/**
 * SVG API
 */
export interface SVGAPI {
	/** Convert SVG string to Blob */
	toBlob: (svg: string) => Blob
	/** Convert SVG string to data URL */
	toDataURL: (svg: string) => string
	/** Convert SVG string to URL with revoke function */
	toURL: (svg: string) => URLResult
}

/**
 * Text API
 */
export interface TextAPI {
	/** Encode string to ArrayBuffer */
	encode: (str: string, encoding?: string) => ArrayBuffer
	/** Decode ArrayBuffer to string */
	decode: (buffer: ArrayBuffer, encoding?: string) => string
	/** Convert string to base64 */
	toBase64: (str: string) => string
	/** Convert base64 to string */
	fromBase64: (base64: string) => string
}

/**
 * DataURL API
 */
export interface DataURLAPI {
	/** Parse data URL into components */
	parse: (dataURL: string) => { mime: string; base64: string; data: ArrayBuffer }
	/** Build data URL from base64 and mime */
	build: (base64: string, mime: string) => string
	/** Check if string is a valid data URL */
	isValid: (str: string) => boolean
}

/**
 * Hex API
 */
export interface HexAPI {
	/** Encode ArrayBuffer to hex string */
	encode: (buffer: ArrayBuffer) => string
	/** Decode hex string to ArrayBuffer */
	decode: (hex: string) => ArrayBuffer
}

/**
 * Hash API
 */
export interface HashAPI {
	/** Calculate MD5 hash */
	md5: (data: BinaryInput) => Promise<string>
	/** Calculate SHA-1 hash */
	sha1: (data: BinaryInput) => Promise<string>
	/** Calculate SHA-256 hash */
	sha256: (data: BinaryInput) => Promise<string>
	/** Calculate CRC32 */
	crc32: (data: BinaryInput) => number
}

/**
 * Meta API
 */
export interface MetaAPI {
	/** Get binary metadata */
	get: (data: Blob | File) => BinaryMeta
}

// ==================== Converter Interface ====================

/**
 * BinaryConverter interface for chainable conversions
 */
export interface BinaryConverter {
	/** Convert to base64 */
	toBase64: () => Promise<string>
	/** Convert to data URL */
	toDataURL: (mime?: string) => Promise<string>
	/** Convert to ArrayBuffer */
	toArrayBuffer: () => Promise<ArrayBuffer>
	/** Convert to Blob */
	toBlob: (mime?: string) => Promise<Blob>
	/** Convert to File */
	toFile: (filename: string, mime?: string) => Promise<File | Blob>
	/** Convert to URL with revoke function */
	toURL: () => Promise<URLResult>
	/** Get MIME type */
	getMime: () => string | undefined
	/** Get size in bytes */
	getSize: () => number
}

// ==================== Main API Interface ====================

/**
 * Binary API interface
 */
export interface BinaryAPI {
	// Type detection
	isBlob: (value: unknown) => value is Blob
	isFile: (value: unknown) => value is File
	isArrayBuffer: (value: unknown) => value is ArrayBuffer
	isDataURL: (value: unknown) => boolean
	isBase64: (value: unknown) => boolean

	// Chainable conversion
	from: (input: BinaryInput, options?: BinaryFromOptions) => BinaryConverter

	// Parse
	parse: (input: BinaryInput) => BinaryData

	// Core conversion modules
	base64: Base64API
	blob: BlobAPI
	arrayBuffer: ArrayBufferAPI
	file: FileAPI
	url: URLAPI
	svg: SVGAPI

	// Enhanced modules
	text: TextAPI
	dataURL: DataURLAPI
	hex: HexAPI
	hash: HashAPI
	meta: MetaAPI

	// Utility methods
	compare: (a: BinaryInput, b: BinaryInput) => Promise<boolean>
	clone: (data: Blob | File | ArrayBuffer) => Blob | ArrayBuffer
	download: (data: Blob | File | ArrayBuffer, filename: string, mime?: string) => void
}
