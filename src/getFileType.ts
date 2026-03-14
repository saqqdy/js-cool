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
function getFileType(url: string) {
	if (!url) throw new Error('"url" is required')

	const _arr = url.split('.')
	const suffix: string = _arr[_arr.length - 1].toLocaleLowerCase()
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

	if (['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'tiff', 'tif'].includes(suffix)) type = 'image'
	else if (['txt'].includes(suffix)) type = 'txt'
	else if (['xls', 'xlsx'].includes(suffix)) type = 'excel'
	else if (['doc', 'docx'].includes(suffix)) type = 'word'
	else if (['pdf'].includes(suffix)) type = 'pdf'
	else if (['ppt', 'pptx'].includes(suffix)) type = 'ppt'
	else if (['rar', 'zip', '7z'].includes(suffix)) type = 'zip'
	else if (['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'].includes(suffix))
		type = 'video'
	else if (['mp3', 'wav', 'wmv'].includes(suffix)) type = 'audio'

	return {
		suffix,
		type
	}
}

export default getFileType
