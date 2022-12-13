import mountCss, { type CssOptions, type LinkAttributes } from './mountCss'
import mountImg, { type ImageAttributes, type ImgOptions } from './mountImg'
import mountJs, { type JsOptions, type ScriptAttributes } from './mountJs'
import mountStyle, { type StyleAttributes, type StyleOptions } from './mountStyle'

export type SourceFileType = 'js' | 'img' | 'css' | 'style' | string
export interface SourceOptions {
	type: SourceFileType
	attrs?: LinkAttributes | StyleAttributes | ScriptAttributes | ImageAttributes
	props?: LinkAttributes | StyleAttributes | ScriptAttributes | ImageAttributes
	force?: boolean
}

/**
 * 动态加载资源，支持js、图片、css链接、css样式字符串
 *
 * @param url - 资源链接，传入styleString时，type必传
 * @param option - 参数: attrs, props, force
 * @returns - true|false|imgUrl
 */
async function loadSource(
	url: string,
	option: SourceFileType | SourceOptions
): Promise<boolean | string> {
	if (!url) throw new Error('url不能为空')
	if (!option) option = {} as SourceOptions
	if (typeof option === 'string') {
		option = { type: option }
	} else if (!option.type) {
		const match = /\.(\w+)$/.exec(url)
		if (!match || !match[1]) throw new Error('url不合法')
		option.type = match[1]
	}
	option.force ??= false
	option.type && (option.type = option.type.toLowerCase())
	if (!['js', 'img', 'css', 'style'].includes(option.type))
		throw new Error(`${option.type}类型暂不支持`)
	const func: Record<'js' | 'img' | 'css' | 'style' | string, Function> = {
		js: (src: string) => mountJs(src, option as JsOptions),
		img: (src: string) => mountImg(src, option as ImgOptions),
		css: (src: string) => mountCss(src, option as CssOptions),
		style: (css: string) => mountStyle(css, option as StyleOptions)
	}
	return await func[option.type]?.(url)
}

export default loadSource
