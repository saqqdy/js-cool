/**
 * Meta module - Binary metadata extraction
 *
 * @module binary/modules/meta
 * @since 6.0.0
 */

import type { BinaryMeta, MetaAPI } from '../types'

/**
 * Common MIME type to extension mapping
 */
const MIME_TO_EXT: Record<string, string> = {
	// Images
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/gif': 'gif',
	'image/webp': 'webp',
	'image/svg+xml': 'svg',
	'image/bmp': 'bmp',
	'image/tiff': 'tiff',
	'image/x-icon': 'ico',

	// Video
	'video/mp4': 'mp4',
	'video/webm': 'webm',
	'video/ogg': 'ogv',
	'video/quicktime': 'mov',
	'video/x-msvideo': 'avi',

	// Audio
	'audio/mpeg': 'mp3',
	'audio/wav': 'wav',
	'audio/ogg': 'oga',
	'audio/webm': 'weba',
	'audio/aac': 'aac',

	// Documents
	'application/pdf': 'pdf',
	'application/msword': 'doc',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
	'application/vnd.ms-excel': 'xls',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
	'application/vnd.ms-powerpoint': 'ppt',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',

	// Archives
	'application/zip': 'zip',
	'application/x-rar-compressed': 'rar',
	'application/x-7z-compressed': '7z',
	'application/x-tar': 'tar',
	'application/gzip': 'gz',

	// Text
	'text/plain': 'txt',
	'text/html': 'html',
	'text/css': 'css',
	'text/javascript': 'js',
	'application/json': 'json',
	'application/xml': 'xml',

	// Other
	'application/octet-stream': 'bin',
}

/**
 * Image MIME types
 */
const IMAGE_MIMES = new Set([
	'image/jpeg', 'image/png', 'image/gif', 'image/webp',
	'image/svg+xml', 'image/bmp', 'image/tiff', 'image/x-icon',
])

/**
 * Video MIME types
 */
const VIDEO_MIMES = new Set([
	'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo',
])

/**
 * Audio MIME types
 */
const AUDIO_MIMES = new Set([
	'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm', 'audio/aac',
])

/**
 * Text MIME types
 */
const TEXT_MIMES = new Set([
	'text/plain', 'text/html', 'text/css', 'text/javascript',
	'application/json', 'application/xml', 'text/xml',
])

/**
 * Get file extension from name
 */
function getExtensionFromName(name: string): string | undefined {
	const lastDot = name.lastIndexOf('.')
	if (lastDot > 0 && lastDot < name.length - 1) {
		return name.slice(lastDot + 1).toLowerCase()
	}
	return undefined
}

/**
 * Get extension from MIME type
 */
function getExtensionFromMime(mime: string): string | undefined {
	return MIME_TO_EXT[mime.toLowerCase()]
}

/**
 * Get binary metadata
 *
 * @example
 * ```ts
 * const file = document.querySelector('input[type="file"]').files[0]
 * const meta = binary.meta.get(file)
 * // { size: 1024, mime: 'image/png', extension: 'png', isImage: true, ... }
 * ```
 */
function get(data: Blob | File): BinaryMeta {
	const size = data.size
	const mime = data.type || 'application/octet-stream'
	const name = data instanceof File ? data.name : undefined
	const lastModified = data instanceof File ? data.lastModified : undefined

	// Determine extension
	let extension: string | undefined
	if (name) {
		extension = getExtensionFromName(name)
	}
	if (!extension) {
		extension = getExtensionFromMime(mime)
	}

	// Determine content type
	const isImage = IMAGE_MIMES.has(mime)
	const isVideo = VIDEO_MIMES.has(mime)
	const isAudio = AUDIO_MIMES.has(mime)
	const isText = TEXT_MIMES.has(mime) || mime.startsWith('text/')

	return {
		name,
		size,
		mime,
		lastModified,
		extension,
		isImage,
		isVideo,
		isAudio,
		isText,
	}
}

export const meta: MetaAPI = {
	get,
}
