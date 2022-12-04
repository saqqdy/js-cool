import mountCss from './mountCss'
import mountImg from './mountImg'
import mountJs from './mountJs'
import mountStyle from './mountStyle'

/**
 * 动态加载资源，支持js、图片、css链接、css样式字符串
 *
 * @param url - 资源链接，传入styleString时，type必传
 * @param type - 资源类型，可不传：js/css/img/style
 * @param force - 是否强制加载（一般已加载一次不用重复加载）,默认：false
 * @returns - true|false|imgUrl
 */
async function loadSource(
	url: string,
	type: 'js' | 'img' | 'css' | 'style' | string,
	force = false
): Promise<boolean | string> {
	if (!url) throw new Error('url不能为空')
	if (!type) {
		const match = /\.(\w+)$/.exec(url)
		if (!match) throw new Error('url不合法')
		type = match[1]
	}
	type && (type = type.toLowerCase())
	if (!['js', 'img', 'css', 'style'].includes(type)) throw new Error(`${type}类型暂不支持`)
	const func: Record<'js' | 'img' | 'css' | 'style' | string, Function> = {
		js: (src: string) => mountJs(src, force),
		img: (src: string) => mountImg(src, force),
		css: (src: string) => mountCss(src, force),
		style: (css: string) => mountStyle(css)
	}
	return await func[type]?.(url)
}

export default loadSource
