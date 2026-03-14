/**
 * Image preloading
 *
 * @example
 * ```js
 * // Single image
 * const img = preloader('https://example.com/image.jpg')
 * // HTMLImageElement
 *
 * // Multiple images
 * const images = preloader([
 *   'https://example.com/image1.jpg',
 *   'https://example.com/image2.jpg'
 * ])
 * // { 'https://example.com/image1.jpg': HTMLImageElement, ... }
 *
 * // Use before animation
 * preloader(['bg.jpg', 'sprite.png'])
 * startAnimation()
 *
 * // Check if loaded
 * const img = preloader('image.jpg')
 * img.onload = () => console.log('Loaded!')
 * img.onerror = () => console.error('Failed!')
 * ```
 * @since 5.5.0
 * @param images - images url (string or array)
 * @returns - HTMLImageElement or object with image elements
 */
function preloader(images: string): HTMLImageElement
function preloader(images: string[]): Record<string, HTMLImageElement>
function preloader(images: string | string[]): HTMLImageElement | Record<string, HTMLImageElement> {
	let isString = false
	if (!images) throw new Error('"images" is required')
	else if (typeof images === 'string') {
		isString = true
		images = ([] as string[]).concat(images)
	}

	const imageObj: Record<string, HTMLImageElement> = {}

	for (const image of images) {
		imageObj[image] = new Image()
		imageObj[image].src = image
	}

	return isString ? imageObj[images[0]] : imageObj
}

export default preloader
