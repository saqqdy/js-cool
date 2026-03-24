import { URL_PATTERNS } from './url/utils'

export interface DirParamsResult {
	/** 完整 origin，如 'https://example.com' */
	origin: string
	/** 主机名+端口，如 'example.com:8080' */
	host: string
	/** 主机名（不含端口），如 'example.com' */
	hostname: string
	/** 完整路径，如 '/api/v1/users' */
	pathname: string
	/** 路径段数组，如 ['api', 'v1', 'users'] */
	segments: string[]
	/** 查询字符串（不含?），如 'id=123' */
	query: string
	/** hash 值（不含#），如 'section' */
	hash: string
}

/**
 * 使用正则降级解析 URL（兼容 IE11）
 */
function parseWithRegex(url: string): DirParamsResult {
	const result: DirParamsResult = {
		origin: '',
		host: '',
		hostname: '',
		pathname: '',
		segments: [],
		query: '',
		hash: '',
	}

	if (!url) return result

	// 解析 origin 和 host
	const originMatch = url.match(URL_PATTERNS.origin)
	if (originMatch) {
		result.origin = originMatch[1]
		// 提取 host（去掉协议）
		const hostMatch = originMatch[1].match(URL_PATTERNS.host)
		if (hostMatch) {
			result.host = hostMatch[1]
			// 提取 hostname（去掉端口）
			result.hostname = hostMatch[1].replace(URL_PATTERNS.port, '')
		}
	}

	// 提取路径部分（去掉 origin）
	let pathPart = originMatch ? url.slice(originMatch[1].length) : url

	// 处理相对路径（无 origin 的情况）
	if (!originMatch && pathPart.indexOf('/') !== 0) {
		pathPart = `/${pathPart}`
	}

	// 分离 hash
	const hashIndex = pathPart.indexOf('#')
	if (hashIndex > -1) {
		result.hash = pathPart.slice(hashIndex + 1)
		pathPart = pathPart.slice(0, hashIndex)
	}

	// 分离 query
	const queryIndex = pathPart.indexOf('?')
	if (queryIndex > -1) {
		result.query = pathPart.slice(queryIndex + 1)
		pathPart = pathPart.slice(0, queryIndex)
	}

	result.pathname = pathPart || '/'
	result.segments = pathPart.split('/').filter(Boolean)

	return result
}

/**
 * 解析 URL 路径信息
 *
 * @description 获取 URL 的各个组成部分，支持完整 URL 和相对路径。
 * 现代浏览器使用原生 URL API，IE11 自动降级到正则实现。
 *
 * @param url - URL 字符串，不传则使用当前页面 URL（浏览器环境）
 * @returns URL 解析结果对象
 *
 * @example
 * ```js
 * // 完整 URL
 * getDirParams('https://example.com:8080/api/v1/users?id=123#section')
 * // {
 * //   origin: 'https://example.com:8080',
 * //   host: 'example.com:8080',
 * //   hostname: 'example.com',
 * //   pathname: '/api/v1/users',
 * //   segments: ['api', 'v1', 'users'],
 * //   query: 'id=123',
 * //   hash: 'section'
 * // }
 *
 * // 相对路径
 * getDirParams('/app/user/profile')
 * // {
 * //   origin: '',
 * //   host: '',
 * //   hostname: '',
 * //   pathname: '/app/user/profile',
 * //   segments: ['app', 'user', 'profile'],
 * //   query: '',
 * //   hash: ''
 * // }
 *
 * // 当前页面 URL（浏览器环境）
 * getDirParams()
 * // 返回当前页面的解析结果
 * ```
 *
 * @since 6.0.0
 */
function getDirParams(url?: string): DirParamsResult {
	// 无参数时使用当前页面 URL
	if (typeof url === 'undefined' || url === '') {
		if (typeof location === 'undefined') {
			return {
				origin: '',
				host: '',
				hostname: '',
				pathname: '',
				segments: [],
				query: '',
				hash: '',
			}
		}
		url = location.href
	}

	// 优先使用原生 URL API（现代浏览器）
	if (typeof URL !== 'undefined') {
		try {
			// 处理相对路径
			let urlObj: URL
			if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
				urlObj = new URL(url)
			} else {
				// 相对路径需要基于当前 origin
				if (typeof location !== 'undefined') {
					urlObj = new URL(url, location.origin)
				} else {
					// Node.js 环境下相对路径降级到正则
					return parseWithRegex(url)
				}
			}

			return {
				origin: urlObj.origin,
				host: urlObj.host,
				hostname: urlObj.hostname,
				pathname: urlObj.pathname || '/',
				segments: urlObj.pathname.split('/').filter(Boolean),
				query: urlObj.search.slice(1),
				hash: urlObj.hash.slice(1),
			}
		} catch {
			// URL 解析失败，使用降级方案
			return parseWithRegex(url)
		}
	}

	// 降级：IE11 等不支持 URL 的环境
	return parseWithRegex(url)
}

export default getDirParams
