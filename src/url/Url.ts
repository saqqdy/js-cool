import { hasOwn } from '../_compat'
import inBrowser from '../inBrowser'

export type ParamScope = 'search' | 'hash' | 'all'

export interface ParseOptions {
	/** 是否转换特殊值（true/false/null/数字） */
	convert?: boolean
}

export interface StringifyOptions {
	convert?: boolean
	encode?: boolean
	withQuestionMark?: boolean
}

/** 值转换映射 */
const VALUE_MAP: Record<string, unknown> = {
	'-Infinity': -Infinity,
	false: false,
	Infinity,
	NaN: Number.NaN,
	null: null,
	true: true,
	undefined,
}

/** 转换字符串值为适当类型 */
function convertValue(value: string): unknown {
	if (value in VALUE_MAP) return VALUE_MAP[value]
	if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value)
	return value
}

/**
 * URL 处理器 - 链式构建 + 参数管理
 *
 * @description
 * 增强版 URLSearchParams，解决原生 URL 无法解析 hash 内参数的问题。
 * 支持 search 和 hash 两个范围的参数操作，hash 参数优先级更高。
 *
 * @example
 * ```ts
 * // 基础用法
 * const u = new Url('https://a.cn/?id=1#/path?token=abc')
 * u.get('id')              // '1' (search)
 * u.get('token')           // 'abc' (hash 优先)
 * u.get('id', 'search')    // '1'
 * u.get('id', 'hash')      // null
 *
 * // 链式修改
 * u.set('page', 2)
 *   .path('users', '123')
 *   .toString()
 *
 * // URL 属性访问
 * u.origin    // 'https://a.cn'
 * u.pathname  // '/'
 * u.host      // 'a.cn'
 *
 * // Hash 路径操作
 * u.getHashPath()           // '/path'
 * u.setHashPath('/detail')
 *
 * // 详细信息
 * u.toObject()              // { id: '1', token: 'abc' }
 * u.toDetailObject()        // 区分参数来源
 * ```
 *
 * @since 6.0.0
 */
export class Url {
	private _search: URLSearchParams
	private _hash: URLSearchParams
	private _url: URL | null
	private _hashPath: string

	constructor(url?: string | URL) {
		if (!url && inBrowser) url = location.href

		if (url instanceof URL) {
			this._url = url
		} else if (typeof url === 'string') {
			this._url = this._parse(url)
		} else {
			this._url = null
		}

		this._search = this._url?.searchParams ?? new URLSearchParams()
		const { path, params } = this._parseHash(this._url?.hash ?? '')
		this._hash = params
		this._hashPath = path
	}

	// ============ URL 属性 ============

	/** 获取 origin */
	get origin(): string {
		return this._url?.origin ?? ''
	}

	/** 获取 host（含端口） */
	get host(): string {
		return this._url?.host ?? ''
	}

	/** 获取 hostname（不含端口） */
	get hostname(): string {
		return this._url?.hostname ?? ''
	}

	/** 获取 pathname */
	get pathname(): string {
		return this._url?.pathname ?? '/'
	}

	/** 获取 search（含 ?） */
	get search(): string {
		return this._search.toString() ? `?${this._search}` : ''
	}

	/** 获取 hash（含 #） */
	get hash(): string {
		return this._buildHash()
	}

	// ============ 参数读取 ============

	/**
	 * 获取参数值
	 * @param name - 参数名
	 * @param scope - 范围，默认 'all'（hash 优先）
	 */
	get(name: string, scope?: ParamScope): string | null {
		if (scope === 'search') return this._search.get(name)
		if (scope === 'hash') return this._hash.get(name)
		return this._hash.get(name) ?? this._search.get(name)
	}

	/**
	 * 获取所有同名参数值
	 */
	getAll(name: string, scope?: ParamScope): string[] {
		if (scope === 'search') return this._search.getAll(name)
		if (scope === 'hash') return this._hash.getAll(name)
		return [...this._search.getAll(name), ...this._hash.getAll(name)]
	}

	/**
	 * 检查参数是否存在
	 */
	has(name: string, scope?: ParamScope): boolean {
		if (scope === 'search') return this._search.has(name)
		if (scope === 'hash') return this._hash.has(name)
		return this._search.has(name) || this._hash.has(name)
	}

	/**
	 * 获取所有参数名
	 */
	keys(scope?: ParamScope): string[] {
		if (scope === 'search') return [...this._search.keys()]
		if (scope === 'hash') return [...this._hash.keys()]
		return [...new Set([...this._search.keys(), ...this._hash.keys()])]
	}

	/**
	 * 获取所有参数值
	 */
	values(scope?: ParamScope): string[] {
		return this.keys(scope)
			.map(k => this.get(k))
			.filter((v): v is string => v !== null)
	}

	/**
	 * 获取所有键值对
	 */
	entries(scope?: ParamScope): [string, string][] {
		return this.keys(scope).map(k => [k, this.get(k)!] as [string, string])
	}

	// ============ 参数写入（链式） ============

	/**
	 * 设置参数（覆盖）
	 * @param scope - 默认 'search'
	 */
	set(name: string, value: string | number | boolean, scope?: 'search' | 'hash'): this {
		const params = scope === 'hash' ? this._hash : this._search
		params.set(name, String(value))
		return this
	}

	/**
	 * 追加参数
	 */
	append(name: string, value: string | number | boolean, scope?: 'search' | 'hash'): this {
		const params = scope === 'hash' ? this._hash : this._search
		params.append(name, String(value))
		return this
	}

	/**
	 * 删除参数
	 */
	delete(name: string, scope?: ParamScope): this {
		if (scope === 'all' || !scope) {
			this._search.delete(name)
			this._hash.delete(name)
		} else {
			const params = scope === 'hash' ? this._hash : this._search
			params.delete(name)
		}
		return this
	}

	/**
	 * 清空所有参数
	 */
	clear(scope?: ParamScope): this {
		if (scope === 'hash') {
			this._hash = new URLSearchParams()
		} else if (scope === 'search') {
			this._search = new URLSearchParams()
		} else {
			this._search = new URLSearchParams()
			this._hash = new URLSearchParams()
		}
		return this
	}

	// ============ 路径操作 ============

	/**
	 * 设置 pathname
	 * @example
	 * ```ts
	 * new Url('https://api.example.com')
	 *   .path('users', '123')
	 *   .toString()
	 * // 'https://api.example.com/users/123'
	 * ```
	 */
	path(...segments: string[]): this {
		if (!this._url) return this
		const normalized = segments.map(s => s.replace(/^\/|\/$/g, '')).filter(Boolean)
		this._url.pathname = normalized.length > 0 ? `/${normalized.join('/')}` : '/'
		return this
	}

	/**
	 * 获取 hash 路径（# 后到 ? 之前的部分）
	 */
	getHashPath(): string {
		return this._hashPath
	}

	/**
	 * 设置 hash 路径
	 */
	setHashPath(path: string): this {
		this._hashPath = path
		return this
	}

	// ============ 输出 ============

	/**
	 * 转为对象
	 */
	toObject(scope?: ParamScope): Record<string, string> {
		return Object.fromEntries(this.entries(scope))
	}

	/**
	 * 转为详细对象（区分来源）
	 */
	toDetailObject(): {
		search: Record<string, string>
		hash: Record<string, string>
		all: Record<string, string>
		source: Record<string, 'search' | 'hash' | 'both'>
	} {
		const search = this.toObject('search')
		const hash = this.toObject('hash')
		const source: Record<string, 'search' | 'hash' | 'both'> = {}

		for (const k of Object.keys(search)) source[k] = 'search'
		for (const k of Object.keys(hash)) {
			source[k] = k in source ? 'both' : 'hash'
		}

		return { search, hash, all: this.toObject(), source }
	}

	/**
	 * 转为字符串
	 */
	toString(): string {
		return this.toURL()
	}

	/**
	 * 构建完整 URL
	 */
	toURL(): string {
		const base = this._url ? this._url.origin + this._url.pathname : '/'
		const search = this._search.toString()
		const hashParams = this._hash.toString()

		let hash = ''
		if (this._hashPath || hashParams) {
			hash = '#'
			if (this._hashPath) hash += this._hashPath
			if (hashParams) hash += `?${hashParams}`
		}

		return `${base}${search ? `?${search}` : ''}${hash}`
	}

	// ============ 迭代器 ============

	[Symbol.iterator](): Iterator<[string, string]> {
		const entries = this.entries()
		let i = 0
		return {
			next: () => {
				if (i < entries.length) {
					return { value: entries[i++], done: false }
				}
				return { value: undefined, done: true } as IteratorReturnResult<undefined>
			},
		}
	}

	// ============ 静态方法（工具函数） ============

	/**
	 * 解析查询字符串为对象
	 *
	 * @example
	 * ```ts
	 * Url.parse('?a=1&b=true')
	 * // { a: '1', b: 'true' }
	 *
	 * Url.parse('?a=1&b=true', { convert: true })
	 * // { a: 1, b: true }
	 * ```
	 */
	static parse(str: string, options?: ParseOptions | boolean): Record<string, unknown> {
		if (!str) return {}
		const convert = typeof options === 'boolean' ? options : (options?.convert ?? false)
		const result: Record<string, unknown> = {}
		for (const [k, v] of new URLSearchParams(str.replace(/^\?/, ''))) {
			result[k] = convert ? convertValue(v) : v
		}
		return result
	}

	/**
	 * 序列化对象为查询字符串
	 *
	 * @example
	 * ```ts
	 * Url.stringify({ a: 1, b: true })
	 * // '?a=1&b=true'
	 * ```
	 */
	static stringify(params: Record<string, unknown>, options?: StringifyOptions): string {
		if (!params) return ''
		const { convert = false, encode = false, withQuestionMark = true } = options ?? {}
		const sp = new URLSearchParams()
		for (const k in params) {
			if (hasOwn(params, k)) {
				const v = convert ? String(params[k] ?? '') : String(params[k])
				sp.set(k, encode ? decodeURIComponent(v) : v)
			}
		}
		const s = sp.toString()
		return withQuestionMark ? `?${s}` : s
	}

	/**
	 * 获取 URL 的 origin
	 */
	static getOrigin(url: string): string {
		try {
			return new URL(url).origin
		} catch {
			return url.match(/^https?:\/\/[^/?#]+/)?.[0] ?? ''
		}
	}

	/**
	 * 获取 URL 的 host（含端口）
	 */
	static getHost(url: string): string {
		try {
			return new URL(url).host
		} catch {
			return ''
		}
	}

	/**
	 * 获取 URL 的 hostname（不含端口）
	 */
	static getHostname(url: string): string {
		try {
			return new URL(url).hostname
		} catch {
			return ''
		}
	}

	/**
	 * 获取 URL 的 pathname
	 */
	static getPathname(url: string): string {
		try {
			return new URL(url).pathname
		} catch {
			return '/'
		}
	}

	/**
	 * 获取 URL 的 search（含 ?）
	 */
	static getSearch(url: string): string {
		try {
			return new URL(url).search
		} catch {
			return ''
		}
	}

	/**
	 * 获取 URL 的 hash（含 #）
	 */
	static getHash(url: string): string {
		try {
			return new URL(url).hash
		} catch {
			return ''
		}
	}

	/**
	 * 从当前页面 URL 创建
	 */
	static current(): Url | null {
		return inBrowser ? new Url(location.href) : null
	}

	/**
	 * 从查询字符串创建
	 */
	static fromQueryString(queryString: string): Url {
		const search = queryString.startsWith('?') ? queryString : `?${queryString}`
		return new Url(`http://localhost${search}`)
	}

	// ============ 私有方法 ============

	private _parse(url: string): URL | null {
		try {
			if (url.startsWith('http://') || url.startsWith('https://')) {
				return new URL(url)
			}
			if (inBrowser) {
				return new URL(url, location.origin)
			}
			return new URL(`http://localhost${url.startsWith('/') ? '' : '/'}${url}`)
		} catch {
			return null
		}
	}

	private _parseHash(hash: string): { path: string; params: URLSearchParams } {
		if (!hash || hash === '#') {
			return { path: '', params: new URLSearchParams() }
		}
		const content = hash.slice(1)
		const idx = content.indexOf('?')
		if (idx === -1) {
			return { path: content, params: new URLSearchParams() }
		}
		return {
			path: content.slice(0, idx),
			params: new URLSearchParams(content.slice(idx + 1)),
		}
	}

	private _buildHash(): string {
		if (!this._hashPath && !this._hash.toString()) return ''
		let result = '#'
		if (this._hashPath) result += this._hashPath
		if (this._hash.toString()) result += `?${this._hash}`
		return result
	}
}

export default Url
