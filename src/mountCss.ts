/**
 * 动态加载css链接资源
 *
 * @param src - 资源地址
 * @param force - 是否强制重载
 * @returns - result
 */
function mountCss(src: string, force = false): Promise<boolean> {
	if (!src) throw new Error('[mountCss]:url不能为空')
	return new Promise((resolve, reject) => {
		if (!force && document.querySelector(`link[href="${src}"]`)) {
			resolve(true)
			return
		}
		const dom = document.createElement('link')
		dom.rel = 'stylesheet'
		dom.type = 'text/css'
		dom.href = src
		document.getElementsByTagName('head')[0].appendChild(dom)
		dom.onload = dom.onratechange = () => {
			resolve(true)
		}
		dom.onerror = reject
	})
}

export default mountCss
