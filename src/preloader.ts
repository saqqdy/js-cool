/**
 * Image preloading
 *
 * @since 5.5.0
 * @param images - images url
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
