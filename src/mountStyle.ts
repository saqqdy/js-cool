/**
 * 动态加载css样式
 *
 * @param src - css string
 * @returns - result
 */
function mountStyle(css: string): Promise<boolean> {
	if (!css) throw new Error('[mountStyle]:css不能为空')
	return new Promise(resolve => {
		const dom = document.createElement('style')
		dom.type = 'text/css'
		try {
			dom.appendChild(document.createTextNode(css))
		} catch (ex) {
			dom.textContent = css
		}
		document.getElementsByTagName('head')[0].appendChild(dom)
		resolve(true)
	})
}

export default mountStyle
