export type LinkAttributes = Pick<
	HTMLLinkElement,
	| 'as'
	| 'charset'
	| 'crossOrigin'
	| 'disabled'
	| 'href'
	| 'hreflang'
	| 'imageSizes'
	| 'imageSrcset'
	| 'integrity'
	| 'media'
	| 'referrerPolicy'
	| 'rel'
	| 'rev'
	| 'target'
	| 'type'
>

export interface CssOptions {
	attrs?: LinkAttributes
	props?: LinkAttributes
	force?: boolean
}

/**
 * 动态加载css链接资源
 *
 * @param src - 资源地址
 * @param option - 参数
 * @param option.attrs - 标签属性
 * @param option.props - 标签属性
 * @param option.force - 是否强制加载（一般已加载一次不用重复加载）,默认：false
 * @returns - result
 */
function mountCss(src: string, option: CssOptions): Promise<boolean> {
	if (!src) throw new Error('[mountCss]:url不能为空')
	const { attrs, props, force = false } = option
	return new Promise((resolve, reject) => {
		if (!force && document.querySelector(`link[href="${src}"]`)) {
			resolve(true)
			return
		}
		const dom = document.createElement('link')
		let attr: keyof LinkAttributes, prop: keyof LinkAttributes
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
