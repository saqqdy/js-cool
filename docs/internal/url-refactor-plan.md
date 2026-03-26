# URL 模块重构方案

## 一、现状分析

### 当前文件结构

```
src/url/
├── index.ts      # Url 类 + url 命名空间对象
└── utils.ts      # 工具函数（parse, stringify, get/set/has 等）

src/URLParams.ts  # URLParams 类（被 Url 类依赖）
```

### 存在的问题

1. **职责分散**：`Url` 类和 `URLParams` 类功能高度重叠，两者都处理 search/hash 参数
2. **重复代码**：`utils.ts` 中的 `get/set/has/append/delete` 与 `URLParams` 的方法重复
3. **API 层次混乱**：同时提供类、命名空间对象、独立函数三种使用方式
4. **类型导出分散**：`ParamScope` 定义在 `URLParams.ts`，但在多处使用
5. **拼写错误**：`covert` 应为 `convert`
6. **命名空间与类混淆**：`Url` 类和 `url` 命名空间对象容易混淆

### 现有 API 使用方式

```ts
// 方式1: Url 类（链式构建）
new Url('https://example.com?id=123').set('page', 2).path('users', '123').toString()

// 方式2: URLParams 类（参数处理）
new URLParams('https://a.cn/?ss=1#/path?bb=343')
  .get('ss') // '1'
  .get('bb', 'hash') // '343'

// 方式3: url 命名空间
url.parse('?a=1')
url.getOrigin('https://example.com')
url.get('id', 'https://example.com?id=123')

// 方式4: 直接导入函数
import { parse, getOrigin, get } from 'js-cool'
```

---

## 二、重构目标

1. **简化概念**：从 3 个概念（Url 类 + URLParams 类 + url 命名空间）简化为 1 个类 + 1 组函数
2. **职责清晰**：类负责有状态的链式操作，函数负责无状态的单一操作
3. **消除重复**：合并 Url 和 URLParams，移除 utils.ts 中的重复函数
4. **类型统一**：所有类型定义集中管理
5. **保持兼容**：通过 re-export 保持向后兼容

---

## 三、重构方案

### 新文件结构

```
src/url/
├── index.ts       # 统一导出入口
├── Url.ts         # 核心 URL 处理类（合并 Url + URLParams）
├── parse.ts       # 查询字符串解析：parse, stringify, convertValue
├── extract.ts     # URL 部分提取：getOrigin, getHost, getPathname 等
├── types.ts       # 类型定义
└── patterns.ts    # URL 正则模式
```

### 核心设计原则

- **一个类**：`Url` 类负责所有有状态的 URL 操作
- **一组函数**：独立的纯函数，支持按需导入
- **无命名空间对象**：移除 `url` 命名空间，避免与类混淆

---

## 四、详细设计

### 4.1 types.ts - 统一类型定义

```typescript
/**
 * 参数范围
 * - 'search': URL 查询参数（? 后面的部分）
 * - 'hash': Hash 参数（# 后面的查询参数）
 * - 'all': 全部范围，hash 优先
 */
export type ParamScope = 'search' | 'hash' | 'all'

/**
 * 解析选项
 */
export interface ParseOptions {
  /** 是否转换特殊值（true/false/null/undefined/数字） */
  convert?: boolean
}

/**
 * 序列化选项
 */
export interface StringifyOptions {
  /** 是否转换 null/undefined 为空字符串 */
  convert?: boolean
  /** 是否进行 URI 编码 */
  encode?: boolean
  /** 是否包含 ? 前缀 */
  withQuestionMark?: boolean
}

/**
 * URL 输入类型
 */
export type URLInput = string | URL
```

### 4.2 patterns.ts - URL 正则模式

```typescript
/**
 * URL 解析正则模式
 */
export const URL_PATTERNS = {
  /** 匹配 key=value 对 */
  queryParam: /([^?&=]+)=([^?&=]*)/g,
  /** 匹配 origin（协议 + 主机） */
  origin: /^(https?:\/\/[^/?#]+)/,
  /** 匹配 host */
  host: /^https?:\/\/([^/]+)/,
  /** 匹配端口号 */
  port: /:\d+$/,
  /** 匹配有效 URL */
  url: /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
  /** 匹配查询字符串 */
  queryString: /\?([^#]*)/,
  /** 匹配 hash */
  hash: /#([^?]*)/,
} as const

export type URLPatternName = keyof typeof URL_PATTERNS

/**
 * 值转换映射表
 */
export const VALUE_MAP = {
  '-Infinity': -Infinity,
  false: false,
  Infinity: Infinity,
  NaN: Number.NaN,
  null: null,
  true: true,
  undefined: undefined,
} as const
```

### 4.3 parse.ts - 查询字符串解析

````typescript
import { VALUE_MAP } from './patterns'
import { validation } from '../patterns/validation'
import type { ParseOptions, StringifyOptions } from './types'

/**
 * 将字符串值转换为适当的类型
 */
export function convertValue(value: string): unknown {
  if (value in VALUE_MAP) return VALUE_MAP[value as keyof typeof VALUE_MAP]
  if (validation.number.test(value)) return Number(value)
  return value
}

/**
 * 解析查询字符串为对象
 *
 * @example
 * ```ts
 * parse('?key1=100&key2=true')
 * // { key1: '100', key2: 'true' }
 *
 * parse('key1=100&key2=true', { convert: true })
 * // { key1: 100, key2: true }
 * ```
 */
export function parse(str: string, options?: ParseOptions | boolean): Record<string, unknown> {
  if (!str) return {}

  const convert = typeof options === 'boolean' ? options : (options?.convert ?? false)
  const searchStr = str.startsWith('?') ? str.slice(1) : str

  const params = new URLSearchParams(searchStr)
  const result: Record<string, unknown> = {}

  for (const [key, value] of params) {
    result[key] = convert ? convertValue(value) : value
  }

  return result
}

/**
 * 将对象序列化为查询字符串
 *
 * @example
 * ```ts
 * stringify({ key1: '100', key2: true })
 * // '?key1=100&key2=true'
 *
 * stringify({ key1: '测试' }, { encode: true })
 * // '?key1=%E6%B5%8B%E8%AF%95'
 *
 * stringify({ key1: '100' }, { withQuestionMark: false })
 * // 'key1=100'
 * ```
 */
export function stringify(params: Record<string, unknown>, options?: StringifyOptions): string {
  if (!params) return ''

  const { convert = false, encode = false, withQuestionMark = true } = options ?? {}

  const searchParams = new URLSearchParams()

  for (const key in params) {
    if (Object.hasOwn(params, key)) {
      const value = params[key]
      const strValue = convert ? String(value ?? '') : String(value)
      searchParams.set(key, encode ? decodeURIComponent(strValue) : strValue)
    }
  }

  const result = searchParams.toString()
  return withQuestionMark ? `?${result}` : result
}
````

### 4.4 extract.ts - URL 部分提取

````typescript
import { URL_PATTERNS } from './patterns'
import type { URLInput } from './types'

/**
 * 获取 URL 的 origin
 *
 * @example
 * ```ts
 * getOrigin('https://example.com:8080/path')
 * // 'https://example.com:8080'
 * ```
 */
export function getOrigin(url: string): string {
  if (!url) return ''

  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return new URL(url).origin
    }
  } catch {
    // fallthrough
  }

  const match = url.match(URL_PATTERNS.origin)
  return match ? match[1] : ''
}

/**
 * 获取 URL 的 host（包含端口）
 *
 * @example
 * ```ts
 * getHost('https://example.com:8080/path')
 * // 'example.com:8080'
 * ```
 */
export function getHost(url: string): string {
  if (!url) return ''

  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return new URL(url).host
    }
  } catch {
    // fallthrough
  }

  const origin = getOrigin(url)
  const match = origin.match(URL_PATTERNS.host)
  return match ? match[1] : ''
}

/**
 * 获取 URL 的 hostname（不含端口）
 *
 * @example
 * ```ts
 * getHostname('https://example.com:8080/path')
 * // 'example.com'
 * ```
 */
export function getHostname(url: string): string {
  if (!url) return ''

  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return new URL(url).hostname
    }
  } catch {
    // fallthrough
  }

  const host = getHost(url)
  return host.replace(URL_PATTERNS.port, '')
}

/**
 * 获取 URL 的 pathname
 *
 * @example
 * ```ts
 * getPathname('https://example.com/api/v1/users?id=123')
 * // '/api/v1/users'
 * ```
 */
export function getPathname(url: string): string {
  if (!url) return ''

  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return new URL(url).pathname
    }
    if (typeof location !== 'undefined') {
      return new URL(url, location.origin).pathname
    }
  } catch {
    // fallthrough
  }

  let pathPart = url.replace(URL_PATTERNS.origin, '')
  pathPart = pathPart.split('?')[0].split('#')[0]
  return pathPart || '/'
}

/**
 * 获取 URL 的 search（包含 ?）
 *
 * @example
 * ```ts
 * getSearch('https://example.com/path?key=value#hash')
 * // '?key=value'
 * ```
 */
export function getSearch(url: string): string {
  if (!url) return ''

  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return new URL(url).search
    }
  } catch {
    // fallthrough
  }

  const match = url.match(URL_PATTERNS.queryString)
  return match ? `?${match[1]}` : ''
}

/**
 * 获取 URL 的 hash（包含 #）
 *
 * @example
 * ```ts
 * getHash('https://example.com/path#section')
 * // '#section'
 * ```
 */
export function getHash(url: string): string {
  if (!url) return ''

  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return new URL(url).hash
    }
  } catch {
    // fallthrough
  }

  const match = url.match(URL_PATTERNS.hash)
  return match ? `#${match[1]}` : ''
}
````

### 4.5 Url.ts - 核心 URL 处理类

````typescript
import inBrowser from '../inBrowser'
import type { ParamScope } from './types'

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
 * const u = new Url('https://a.cn/?ss=1#/path?bb=343')
 *
 * // 参数读取（hash 优先）
 * u.get('ss')              // '1' (from search)
 * u.get('bb')              // '343' (from hash)
 * u.get('ss', 'search')    // '1'
 * u.get('ss', 'hash')      // null
 *
 * // 链式修改
 * u.set('token', 'abc')
 *   .set('page', 1)
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
 * u.toObject()              // { ss: '1', bb: '343' }
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
    // 无参数时使用当前页面 URL
    if (!url && inBrowser) {
      url = location.href
    }

    if (url instanceof URL) {
      this._url = url
      this._search = url.searchParams
      const { path, params } = this._parseHash(url.hash)
      this._hash = params
      this._hashPath = path
    } else if (typeof url === 'string') {
      this._url = this._createURL(url)
      this._search = this._url.searchParams
      const { path, params } = this._parseHash(this._url.hash)
      this._hash = params
      this._hashPath = path
    } else {
      this._search = new URLSearchParams()
      this._hash = new URLSearchParams()
      this._url = null
      this._hashPath = ''
    }
  }

  // ============================================
  // URL 属性 getter
  // ============================================

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
    const str = this._search.toString()
    return str ? `?${str}` : ''
  }

  /** 获取 hash（含 #） */
  get hash(): string {
    return this._buildHash()
  }

  // ============================================
  // 参数读取操作
  // ============================================

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
    if (scope === 'search') return [...this._search.values()]
    if (scope === 'hash') return [...this._hash.values()]
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
    return this.keys()
      .map(k => [k, this.get(k)!] as [string, string])
      .filter(([, v]) => v !== null)
  }

  // ============================================
  // 参数写入操作（链式）
  // ============================================

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

  // ============================================
  // 路径操作（链式）
  // ============================================

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
   * 设置 hash（整体替换）
   */
  setHash(hash: string): this {
    if (!this._url) return this

    const fullHash = hash.startsWith('#') ? hash : `#${hash}`
    this._url.hash = fullHash
    const { path, params } = this._parseHash(fullHash)
    this._hashPath = path
    this._hash = params
    return this
  }

  // ============================================
  // Hash 路径操作
  // ============================================

  /**
   * 获取 hash 路径（# 后到 ? 之前的部分）
   * @example
   * ```ts
   * new Url('https://a.cn/#/path?a=1').getHashPath()
   * // '/path'
   * ```
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

  // ============================================
  // 转换输出
  // ============================================

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
   */
  toString(): string {
    return this.toURL()
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

  // ============================================
  // 迭代器支持
  // ============================================

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

  // ============================================
  // 静态工厂方法
  // ============================================

  /**
   * 从当前页面 URL 创建
   */
  static current(): Url | null {
    if (!inBrowser) return null
    return new Url(location.href)
  }

  /**
   * 从查询字符串创建（仅 search 参数）
   */
  static fromQueryString(queryString: string): Url {
    const search = queryString.startsWith('?') ? queryString : `?${queryString}`
    return new Url(`http://localhost${search}`)
  }

  // ============================================
  // 私有方法
  // ============================================

  private _createURL(url: string): URL {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return new URL(url)
    }
    if (inBrowser) {
      return new URL(url, location.origin)
    }
    return new URL(`http://localhost${url.startsWith('/') ? '' : '/'}${url}`)
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
    if (this._hash.toString()) result += `?${this._hash.toString()}`
    return result
  }
}
````

### 4.6 index.ts - 统一导出入口

````typescript
// 类
export { Url } from './Url'

// 函数
export { parse, stringify, convertValue } from './parse'
export { getOrigin, getHost, getHostname, getPathname, getSearch, getHash } from './extract'

// 类型
export type { ParamScope, ParseOptions, StringifyOptions, URLInput } from './types'

// 常量
export { URL_PATTERNS, VALUE_MAP } from './patterns'
export type { URLPatternName } from './patterns'

// ============================================
// 向后兼容（deprecated，将在下个大版本移除）
// ============================================

import { Url } from './Url'
import * as parseFns from './parse'
import * as extractFns from './extract'

/**
 * @deprecated 请直接导入函数使用
 * @example
 * ```ts
 * // 旧写法
 * import { url } from 'js-cool'
 * url.parse('?a=1')
 *
 * // 新写法
 * import { parse } from 'js-cool'
 * parse('?a=1')
 * ```
 */
export const url = {
  from: (urlStr?: string) => new Url(urlStr),
  parse: parseFns.parse,
  stringify: parseFns.stringify,
  ...extractFns,
}

/**
 * @deprecated 请使用 Url 类
 */
export const URLParams = Url
````

---

## 五、API 使用示例

### 5.1 类用法（有状态、链式操作）

```typescript
import { Url } from 'js-cool'

// 创建实例
const u = new Url('https://api.example.com/users?id=123#/detail?token=abc')

// 读取参数
u.get('id') // '123' (from search)
u.get('token') // 'abc' (from hash，优先)
u.get('id', 'search') // '123'
u.get('id', 'hash') // null

// 链式修改
const newUrl = new Url('https://api.example.com')
  .path('users', '123', 'profile')
  .set('page', 1)
  .set('size', 20)
  .setHashPath('/detail')
  .set('token', 'xyz', 'hash')
  .toString()
// 'https://api.example.com/users/123/profile?page=1&size=20#/detail?token=xyz'

// URL 属性访问
u.origin // 'https://api.example.com'
u.host // 'api.example.com'
u.pathname // '/users'
u.search // '?id=123'
u.hash // '#/detail?token=abc'

// 转换输出
u.toObject() // { id: '123', token: 'abc' }
u.toObject('search') // { id: '123' }
u.toObject('hash') // { token: 'abc' }
u.toDetailObject() // 区分参数来源
```

### 5.2 函数用法（无状态、单一操作）

```typescript
import { parse, stringify, getOrigin, getHost, getPathname } from 'js-cool'

// 解析查询字符串
parse('?a=1&b=true')
// { a: '1', b: 'true' }

parse('?a=1&b=true', { convert: true })
// { a: 1, b: true }

// 序列化为查询字符串
stringify({ a: 1, b: true })
// '?a=1&b=true'

stringify({ a: 1, b: true }, { withQuestionMark: false })
// 'a=1&b=true'

// 提取 URL 部分
getOrigin('https://example.com:8080/path')
// 'https://example.com:8080'

getHost('https://example.com:8080/path')
// 'example.com:8080'

getPathname('https://example.com/api/v1/users?id=123')
// '/api/v1/users'
```

### 5.3 静态工厂方法

```typescript
import { Url } from 'js-cool'

// 从当前页面 URL 创建
const currentUrl = Url.current()

// 从查询字符串创建
const params = Url.fromQueryString('a=1&b=2')
params.toObject() // { a: '1', b: '2' }
```

---

## 六、迁移指南

### 6.1 废弃的 API

| 旧 API                | 新 API                 | 说明         |
| --------------------- | ---------------------- | ------------ |
| `URLParams`           | `Url`                  | 类重命名     |
| `url.parse()`         | `parse()`              | 直接导入函数 |
| `url.stringify()`     | `stringify()`          | 直接导入函数 |
| `url.getOrigin()`     | `getOrigin()`          | 直接导入函数 |
| `url.get()`           | `new Url().get()`      | 使用类方法   |
| `url.set()`           | `new Url().set()`      | 使用类方法   |
| `url.has()`           | `new Url().has()`      | 使用类方法   |
| `url.from()`          | `new Url()`            | 直接实例化   |
| `ParseOptions.covert` | `ParseOptions.convert` | 修正拼写     |

### 6.2 迁移示例

```typescript
// ===== 旧写法 =====
import { URLParams, url } from 'js-cool'

const params = new URLParams('https://example.com?a=1')
params.get('a')

url.parse('?a=1', { covert: true })
url.get('id', 'https://example.com?id=123')
url.getOrigin('https://example.com')

// ===== 新写法 =====
import { Url, parse, getOrigin, get } from 'js-cool'

const u = new Url('https://example.com?a=1')
u.get('a')

parse('?a=1', { convert: true })
get('id', 'https://example.com?id=123')
getOrigin('https://example.com')
```

---

## 七、与原生 URL 对比

| 特性              | 原生 URL | Url 类               |
| ----------------- | -------- | -------------------- |
| 解析 URL 组成部分 | ✅       | ✅                   |
| 操作 search 参数  | ✅       | ✅                   |
| 操作 hash 参数    | ❌       | ✅                   |
| 链式调用          | ❌       | ✅                   |
| 参数范围控制      | ❌       | ✅ (search/hash/all) |
| Hash 路径操作     | ❌       | ✅                   |
| 参数来源追踪      | ❌       | ✅ (toDetailObject)  |

---

## 八、总结

### 改动清单

| 操作 | 文件                  | 说明                          |
| ---- | --------------------- | ----------------------------- |
| 删除 | `src/Url.ts` (旧)     | 合并到新 Url 类               |
| 删除 | `src/URLParams.ts`    | 重命名为 Url                  |
| 删除 | `src/url/utils.ts`    | 拆分到 parse.ts 和 extract.ts |
| 新建 | `src/url/types.ts`    | 统一类型定义                  |
| 新建 | `src/url/patterns.ts` | URL 正则模式                  |
| 新建 | `src/url/parse.ts`    | 解析相关函数                  |
| 新建 | `src/url/extract.ts`  | URL 部分提取函数              |
| 重写 | `src/url/Url.ts`      | 合并后的核心类                |
| 重写 | `src/url/index.ts`    | 统一导出入口                  |

### 核心改进

1. **概念简化**：3 个概念 → 1 个类 + 1 组函数
2. **职责清晰**：类负责有状态操作，函数负责无状态操作
3. **消除重复**：合并 Url 和 URLParams
4. **拼写修正**：`covert` → `convert`
5. **Tree-shaking 友好**：支持按需导入
6. **向后兼容**：通过 re-export 和 deprecated 标记保持兼容
