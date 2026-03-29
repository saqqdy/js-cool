/**
 * Determine file type based on link suffix
 *
 * @example
 * ```js
 * // Image types
 * getFileType('/name.png')
 * // { suffix: 'png', type: 'image' }
 *
 * getFileType('/photo.JPG')
 * // { suffix: 'jpg', type: 'image' }
 *
 * // Document types
 * getFileType('/document.PDF')
 * // { suffix: 'pdf', type: 'pdf' }
 *
 * getFileType('/report.docx')
 * // { suffix: 'docx', type: 'word' }
 *
 * // Media types
 * getFileType('/video.mp4')
 * // { suffix: 'mp4', type: 'video' }
 *
 * getFileType('/audio.mp3')
 * // { suffix: 'mp3', type: 'audio' }
 *
 * // Unknown type
 * getFileType('/file.xyz')
 * // { suffix: 'xyz', type: 'other' }
 * ```
 * @since 5.11.0
 * @param url - file url or filename
 * @returns object with suffix and type properties
 */
function getFileType(url: string): {
	suffix: string
	type: 'image' | 'txt' | 'excel' | 'word' | 'pdf' | 'ppt' | 'zip' | 'video' | 'audio' | 'other'
} {
	if (!url) throw new Error('"url" is required')

	const _arr = url.split('.')
	const suffix: string = _arr[_arr.length - 1].toLowerCase()
	let type:
		| 'image'
		| 'txt'
		| 'excel'
		| 'word'
		| 'pdf'
		| 'ppt'
		| 'zip'
		| 'video'
		| 'audio'
		| 'other' = 'other'

	if (['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'tiff', 'tif'].indexOf(suffix) !== -1)
		type = 'image'
	else if (['txt'].indexOf(suffix) !== -1) type = 'txt'
	else if (['xls', 'xlsx'].indexOf(suffix) !== -1) type = 'excel'
	else if (['doc', 'docx'].indexOf(suffix) !== -1) type = 'word'
	else if (['pdf'].indexOf(suffix) !== -1) type = 'pdf'
	else if (['ppt', 'pptx'].indexOf(suffix) !== -1) type = 'ppt'
	else if (['rar', 'zip', '7z'].indexOf(suffix) !== -1) type = 'zip'
	else if (
		['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'].indexOf(suffix) !== -1
	)
		type = 'video'
	else if (['mp3', 'wav', 'wmv'].indexOf(suffix) !== -1) type = 'audio'

	return {
		type,
		suffix,
	}
}

export default getFileType
