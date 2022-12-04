/**
 * 动态加载图片资源
 *
 * @param src - 资源地址
 * @param force - 是否强制重载
 * @returns - result
 */
function mountImg(src: string, force = false): Promise<boolean | string> {
	if (!src) throw new Error('[mountImg]:url不能为空')
	return new Promise((resolve, reject) => {
		if (!force && document.querySelector(`img[src="${src}"]`)) {
			resolve(true)
			return
		}
		const dom = document.createElement('img')
		dom.src = src
		document.body.appendChild(dom)
		dom.onload = dom.onratechange = () => {
			resolve(src)
		}
		dom.onerror = reject
	})
}

export default mountImg
