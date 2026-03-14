/**
 * svg to blob
 *
 * @example
 * ```js
 * // Basic usage
 * const svgString = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>'
 * const blob = svgToBlob(svgString)
 * // Blob { size: 100, type: 'image/svg+xml' }
 *
 * // Use with URL.createObjectURL
 * const url = URL.createObjectURL(svgToBlob(svgString))
 * document.getElementById('img').src = url
 *
 * // Download SVG
 * const link = document.createElement('a')
 * link.href = URL.createObjectURL(svgToBlob(svgString))
 * link.download = 'image.svg'
 * link.click()
 * ```
 * @since 5.13.0
 * @param input - svg string
 * @returns - blob with type 'image/svg+xml'
 */
function svgToBlob(input: string): Blob {
	return new Blob([input], { type: 'image/svg+xml' })
}

export default svgToBlob
