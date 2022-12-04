/**
 * 动态加载js链接资源
 *
 * @param src - 资源地址
 * @param force - 是否强制重载
 * @returns - result
 */
function mountJs(src: string, force = false): Promise<boolean> {
	if (!src) throw new Error('[mountJs]:url不能为空')
	return new Promise((resolve, reject) => {
		if (!force && document.querySelector(`script[src="${src}"]`)) {
			resolve(true)
			return
		}
		const dom = document.createElement('script')
		dom.src = src
		document.body.appendChild(dom)
		dom.onload = dom.onratechange = () => {
			resolve(true)
		}
		dom.onerror = reject
	})
}

export default mountJs
