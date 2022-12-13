export type ScriptAttributes = Pick<
	HTMLScriptElement,
	| 'async'
	| 'charset'
	| 'crossOrigin'
	| 'defer'
	| 'event'
	| 'htmlFor'
	| 'integrity'
	| 'noModule'
	| 'referrerPolicy'
	| 'src'
	| 'text'
	| 'type'
>

export interface JsOptions {
	attrs?: ScriptAttributes
	props?: ScriptAttributes
	force?: boolean
}

/**
 * 动态加载js链接资源
 *
 * @param src - 资源地址
 * @param option - 参数
 * @param option.attrs - 标签属性
 * @param option.props - 标签属性
 * @param option.force - 是否强制加载（一般已加载一次不用重复加载）,默认：false
 * @returns - result
 */
function mountJs(src: string, option: JsOptions): Promise<boolean> {
	if (!src) throw new Error('[mountJs]:url不能为空')
	const { attrs, props, force = false } = option
	return new Promise((resolve, reject) => {
		if (!force && document.querySelector(`script[src="${src}"]`)) {
			resolve(true)
			return
		}
		const dom = document.createElement('script')
		let attr: keyof ScriptAttributes, prop: keyof ScriptAttributes
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
		dom.src = src
		document.body.appendChild(dom)
		dom.onload = dom.onratechange = () => {
			resolve(true)
		}
		dom.onerror = reject
	})
}

export default mountJs
