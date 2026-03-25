import inBrowser from './inBrowser'

export type ParamScope = 'search' | 'hash' | 'all'

/**
 * URL 参数处理器 - 同时支持 search 和 hash 参数
 *
 * @description 增强版 URLSearchParams，解决原生 URL 无法解析 hash 内参数的问题。
 *
 * @example
 * ```js
 * // 基础用法
 * const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')
 *
 * // 自动从 search + hash 查找（hash 优先）
 * params.get('ss')     // '1'  (from search)
 * params.get('bb')     // '343' (from hash)
 * params.has('ss')     // true
 * params.keys()        // ['ss', 'bb']
 *
 * // 指定范围操作
 * params.get('ss', 'search')  // '1'
 * params.get('ss', 'hash')    // null
 * params.get('ss', 'all')     // '1' (默认，hash 优先)
 *
 * // 获取所有参数
 * params.toObject()           // { ss: '1', bb: '343' }
 * params.toObject('search')   // { ss: '1' }
 * params.toObject('hash')     // { bb: '343' }
 *
 * // 详细信息（区分来源）
 * params.toDetailObject()
 * // {
 * //   search: { ss: '1' },
 * //   hash: { bb: '343' },
 * //   all: { ss: '1', bb: '343' },
 * //   source: { ss: 'search', bb: 'hash' }
 * // }
 *
 * // 链式修改
 * params.set('token', 'abc').set('page', 1).delete('ss')
 * params.toString()           // '?token=abc&page=1'
 *
 * // 操作 hash 参数
 * params.set('bb', '999', 'hash')
 * params.toString('hash')     // 'bb=999'
 *
 * // 构建完整 URL
 * params.toURL()              // 'https://a.cn/?token=abc&page=1#/path?bb=999'
 * ```
 *
 * @since 6.1.0
 */
class URLParams {
	private _search: URLSearchParams
	private _hash: URLSearchParams
	private _url: URL | null
	private _hashPath: string

	constructor(url?: string | URL) {
		// 无参数时使用当前页面 URL
		if (!url && inBrowser) {
			url = location.href
		}

		if (url instanceof URL) {
			this._url = url
			this._search = url.searchParams
			const { path, params } = this._parseHashParams(url.hash)
			this._hash = params
			this._hashPath = path
		} else if (typeof url === 'string') {
			this._url = this._createURL(url)
			this._search = this._url.searchParams
			const { path, params } = this._parseHashParams(this._url.hash)
			this._hash = params
			this._hashPath = path
		} else {
			this._search = new URLSearchParams()
			this._hash = new URLSearchParams()
			this._url = null
			this._hashPath = ''
		}
	}

	// ==================== 读取操作 ====================

	/**
	 * 获取参数值
	 * @param name - 参数名
	 * @param scope - 范围：'search'(#前) | 'hash'(#后) | 'all'(全部，默认)
	 */
	get(name: string, scope?: ParamScope): string | null {
		if (scope === 'search') return this._search.get(name)
		if (scope === 'hash') return this._hash.get(name)
		// scope === 'all': hash 优先
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
		if (scope === 'search') return [...this._search.values()]
		if (scope === 'hash') return [...this._hash.values()]
		// scope === 'all' or undefined (default to all)
		return this.keys()
			.map(k => this.get(k))
			.filter((v): v is string => v !== null)
	}

	/**
	 * 获取所有键值对
	 */
	entries(scope?: ParamScope): [string, string][] {
		if (scope === 'search') return [...this._search.entries()]
		if (scope === 'hash') return [...this._hash.entries()]
		// scope === 'all' or undefined (default to all)
		return this.keys()
			.map(k => [k, this.get(k)!] as [string, string])
			.filter(([, v]) => v !== null)
	}

	// ==================== 写入操作 ====================

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

	// ==================== 转换操作 ====================

	/**
	 * 转为对象
	 */
	toObject(scope?: ParamScope): Record<string, string> {
		const result: Record<string, string> = {}
		for (const [k, v] of this.entries(scope)) {
			result[k] = v
		}
		return result
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
	 * @param scope - 默认 'search'
	 */
	toString(scope?: 'search' | 'hash'): string {
		const params = scope === 'hash' ? this._hash : this._search
		return params.toString()
	}

	/**
	 * 构建完整 URL
	 */
	toURL(): string {
		const search = this._search.toString()
		const hashParams = this._hash.toString()

		if (!this._url) {
			let result = '/'
			if (search) result += `?${search}`
			if (this._hashPath || hashParams) {
				result += '#'
				if (this._hashPath) result += this._hashPath
				if (hashParams) result += `?${hashParams}`
			}
			return result
		}

		let result = this._url.origin + this._url.pathname
		if (search) result += `?${search}`
		if (this._hashPath || hashParams) {
			result += '#'
			if (this._hashPath) result += this._hashPath
			if (hashParams) result += `?${hashParams}`
		}

		return result
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

	// ==================== 迭代器支持 ====================

	/**
	 * 支持迭代（默认 all scope）
	 */
	[Symbol.iterator](): Iterator<[string, string]> {
		const entries = this.entries()
		let index = 0
		return {
			next: () => {
				if (index < entries.length) {
					return { value: entries[index++], done: false }
				}
				return { value: undefined, done: true } as IteratorReturnResult<undefined>
			},
		}
	}

	// ==================== 静态方法 ====================

	/**
	 * 从当前页面 URL 创建
	 */
	static current(): URLParams | null {
		if (!inBrowser) return null
		return new URLParams(location.href)
	}

	/**
	 * 从 query string 创建（仅 search 参数）
	 */
	static fromQueryString(queryString: string): URLParams {
		const search = queryString.startsWith('?') ? queryString : `?${queryString}`
		return new URLParams(`http://localhost${search}`)
	}

	// ==================== 私有方法 ====================

	private _createURL(url: string): URL {
		if (url.startsWith('http://') || url.startsWith('https://')) {
			return new URL(url)
		}
		if (inBrowser) {
			return new URL(url, location.origin)
		}
		return new URL(`http://localhost${url.startsWith('/') ? '' : '/'}${url}`)
	}

	private _parseHashParams(hash: string): { path: string; params: URLSearchParams } {
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
}

export default URLParams
