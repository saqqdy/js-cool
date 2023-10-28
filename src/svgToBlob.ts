/**
 * svg to blob
 *
 * @param input - svg string
 * @returns - blob
 */
function svgToBlob(input: string): Blob {
	return new Blob([input], { type: 'image/svg+xml' })
}

export default svgToBlob
