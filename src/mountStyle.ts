export type StyleAttributes = Pick<HTMLStyleElement, 'disabled' | 'media' | 'type'>

export interface StyleOptions {
	attrs?: StyleAttributes
	props?: StyleAttributes
}

/**
 * 动态加载css样式
 *
 * @param src - css string
 * @param option - 参数: "{ attrs, props }"
 * @returns - result
 */
function mountStyle(css: string, option: StyleOptions): Promise<boolean> {
	if (!css) throw new Error('[mountStyle]:css不能为空')
	const { attrs, props } = option
	return new Promise(resolve => {
		const dom = document.createElement('style')
		let attr: keyof StyleAttributes, prop: keyof StyleAttributes
		if (attrs) {
			for (attr in attrs) {
				dom[attr] = attrs[attr] as never
			}
		}
		if (props) {
			for (prop in props) {
				dom[prop] = props[prop] as never
			}
		}
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
