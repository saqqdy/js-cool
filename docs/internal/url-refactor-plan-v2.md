# URL 模块重构方案 v2（精简版）

## 一、现状问题

```
当前结构：
src/url/index.ts      # Url 类 + url 命名空间
src/url/utils.ts      # 工具函数（816行）
src/URLParams.ts      # URLParams 类（353行）

问题：
- Url 和 URLParams 功能重叠
- utils.ts 函数与 URLParams 方法重复
- 三种 API 风格（类、命名空间、函数）增加认知负担
```

## 二、精简方案

### 新文件结构

```
src/url/
├── index.ts    # Url 类 + 工具函数导出
└── Url.ts      # Url 类实现（合并 URLParams）

删除：src/URLParams.ts
删除：src/url/utils.ts
```

**从 3 个文件 → 2 个文件**

### 核心改动

1. **删除 URLParams 类**，功能合并到 Url
2. **删除 utils.ts**，函数作为 Url 的静态方法
3. **删除 url 命名空间对象**，直接导出类和函数

## 三、代码实现

### 3.1 Url.ts

````typescript
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
  Infinity: Infinity,
  NaN: Number.NaN,
  null: null,
  true: true,
  undefined: undefined,
}

/** 转换字符串值为适当类型 */
function convertValue(value: string): unknown {
  if (value in VALUE_MAP) return VALUE_MAP[value]
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value)
  return value
}

/**
 * URL 处理器
 *
 * @example
 * ```ts
 * const u = new Url('https://a.cn/?id=1#/path?token=abc')
 * u.get('id')              // '1' (search)
 * u.get('token')           // 'abc' (hash 优先)
 * u.set('page', 2).path('users').toString()
 * ```
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

  get origin(): string {
    return this._url?.origin ?? ''
  }
  get host(): string {
    return this._url?.host ?? ''
  }
  get hostname(): string {
    return this._url?.hostname ?? ''
  }
  get pathname(): string {
    return this._url?.pathname ?? '/'
  }
  get search(): string {
    return this._search.toString() ? `?${this._search}` : ''
  }
  get hash(): string {
    return this._buildHash()
  }

  // ============ 参数读取 ============

  get(name: string, scope?: ParamScope): string | null {
    if (scope === 'search') return this._search.get(name)
    if (scope === 'hash') return this._hash.get(name)
    return this._hash.get(name) ?? this._search.get(name)
  }

  getAll(name: string, scope?: ParamScope): string[] {
    if (scope === 'search') return this._search.getAll(name)
    if (scope === 'hash') return this._hash.getAll(name)
    return [...this._search.getAll(name), ...this._hash.getAll(name)]
  }

  has(name: string, scope?: ParamScope): boolean {
    if (scope === 'search') return this._search.has(name)
    if (scope === 'hash') return this._hash.has(name)
    return this._search.has(name) || this._hash.has(name)
  }

  keys(scope?: ParamScope): string[] {
    if (scope === 'search') return [...this._search.keys()]
    if (scope === 'hash') return [...this._hash.keys()]
    return [...new Set([...this._search.keys(), ...this._hash.keys()])]
  }

  values(scope?: ParamScope): string[] {
    return this.keys(scope)
      .map(k => this.get(k)!)
      .filter(Boolean)
  }

  entries(scope?: ParamScope): [string, string][] {
    return this.keys(scope).map(k => [k, this.get(k)!] as [string, string])
  }

  // ============ 参数写入（链式） ============

  set(name: string, value: string | number | boolean, scope?: 'search' | 'hash'): this {
    ;(scope === 'hash' ? this._hash : this._search).set(name, String(value))
    return this
  }

  append(name: string, value: string | number | boolean, scope?: 'search' | 'hash'): this {
    ;(scope === 'hash' ? this._hash : this._search).append(name, String(value))
    return this
  }

  delete(name: string, scope?: ParamScope): this {
    if (scope === 'all' || !scope) {
      this._search.delete(name)
      this._hash.delete(name)
    } else {
      ;(scope === 'hash' ? this._hash : this._search).delete(name)
    }
    return this
  }

  clear(scope?: ParamScope): this {
    if (scope === 'hash') this._hash = new URLSearchParams()
    else if (scope === 'search') this._search = new URLSearchParams()
    else {
      this._search = new URLSearchParams()
      this._hash = new URLSearchParams()
    }
    return this
  }

  // ============ 路径操作 ============

  path(...segments: string[]): this {
    if (!this._url) return this
    this._url.pathname =
      '/' +
      segments
        .map(s => s.replace(/^\/|\/$/g, ''))
        .filter(Boolean)
        .join('/')
    return this
  }

  getHashPath(): string {
    return this._hashPath
  }
  setHashPath(path: string): this {
    this._hashPath = path
    return this
  }

  // ============ 输出 ============

  toObject(scope?: ParamScope): Record<string, string> {
    return Object.fromEntries(this.entries(scope))
  }

  toString(): string {
    return this.toURL()
  }

  toURL(): string {
    const base = this._url ? this._url.origin + this._url.pathname : '/'
    const search = this._search.toString()
    const hash =
      this._hashPath || this._hash.toString()
        ? `#${this._hashPath}${this._hash.toString() ? '?' + this._hash : ''}`
        : ''
    return `${base}${search ? '?' + search : ''}${hash}`
  }

  // ============ 迭代器 ============

  [Symbol.iterator]() {
    const entries = this.entries()
    let i = 0
    return {
      next: () =>
        i < entries.length
          ? { value: entries[i++], done: false }
          : { value: undefined, done: true },
    }
  }

  // ============ 静态方法（工具函数） ============

  /** 解析查询字符串 */
  static parse(str: string, options?: ParseOptions | boolean): Record<string, unknown> {
    if (!str) return {}
    const convert = typeof options === 'boolean' ? options : (options?.convert ?? false)
    const result: Record<string, unknown> = {}
    for (const [k, v] of new URLSearchParams(str.replace(/^\?/, ''))) {
      result[k] = convert ? convertValue(v) : v
    }
    return result
  }

  /** 序列化为查询字符串 */
  static stringify(params: Record<string, unknown>, options?: StringifyOptions): string {
    if (!params) return ''
    const { convert = false, encode = false, withQuestionMark = true } = options ?? {}
    const sp = new URLSearchParams()
    for (const k in params) {
      if (Object.hasOwn(params, k)) {
        const v = convert ? String(params[k] ?? '') : String(params[k])
        sp.set(k, encode ? decodeURIComponent(v) : v)
      }
    }
    const s = sp.toString()
    return withQuestionMark ? `?${s}` : s
  }

  /** 获取 origin */
  static getOrigin(url: string): string {
    try {
      return new URL(url).origin
    } catch {
      return url.match(/^https?:\/\/[^/?#]+/)?.[0] ?? ''
    }
  }

  /** 获取 host */
  static getHost(url: string): string {
    try {
      return new URL(url).host
    } catch {
      return ''
    }
  }

  /** 获取 hostname */
  static getHostname(url: string): string {
    try {
      return new URL(url).hostname
    } catch {
      return ''
    }
  }

  /** 获取 pathname */
  static getPathname(url: string): string {
    try {
      return new URL(url).pathname
    } catch {
      return '/'
    }
  }

  /** 获取 search */
  static getSearch(url: string): string {
    try {
      return new URL(url).search
    } catch {
      return ''
    }
  }

  /** 获取 hash */
  static getHash(url: string): string {
    try {
      return new URL(url).hash
    } catch {
      return ''
    }
  }

  /** 从当前页面创建 */
  static current(): Url | null {
    return inBrowser ? new Url(location.href) : null
  }

  // ============ 私有方法 ============

  private _parse(url: string): URL | null {
    try {
      if (url.startsWith('http://') || url.startsWith('https://')) return new URL(url)
      if (inBrowser) return new URL(url, location.origin)
      return new URL(`http://localhost${url.startsWith('/') ? '' : '/'}${url}`)
    } catch {
      return null
    }
  }

  private _parseHash(hash: string): { path: string; params: URLSearchParams } {
    if (!hash || hash === '#') return { path: '', params: new URLSearchParams() }
    const content = hash.slice(1)
    const idx = content.indexOf('?')
    if (idx === -1) return { path: content, params: new URLSearchParams() }
    return { path: content.slice(0, idx), params: new URLSearchParams(content.slice(idx + 1)) }
  }

  private _buildHash(): string {
    if (!this._hashPath && !this._hash.toString()) return ''
    return `#${this._hashPath}${this._hash.toString() ? '?' + this._hash : ''}`
  }
}

// 默认导出
export default Url
````

### 3.2 index.ts

```typescript
// 类
export { Url, type ParamScope, type ParseOptions, type StringifyOptions } from './Url'

// 函数（静态方法别名，支持直接导入）
import { Url } from './Url'

export const parse = Url.parse
export const stringify = Url.stringify
export const getOrigin = Url.getOrigin
export const getHost = Url.getHost
export const getHostname = Url.getHostname
export const getPathname = Url.getPathname
export const getSearch = Url.getSearch
export const getHash = Url.getHash

// 兼容旧名称
export const URLParams = Url
```

## 四、API 使用

```typescript
import { Url, parse, stringify, getOrigin } from 'js-cool'

// ===== 类用法（链式） =====
new Url('https://api.example.com?id=1#/path?token=abc')
  .set('page', 2)
  .path('users', '123')
  .toString()

// ===== 静态方法 =====
Url.parse('?a=1&b=true', { convert: true })
Url.stringify({ a: 1 })
Url.getOrigin('https://example.com:8080/path')

// ===== 直接导入函数 =====
parse('?a=1')
stringify({ a: 1 })
getOrigin('https://example.com')
```

## 五、代码量对比

| 文件         | 重构前      | 重构后      |
| ------------ | ----------- | ----------- |
| URLParams.ts | 353 行      | 删除        |
| url/utils.ts | 816 行      | 删除        |
| url/index.ts | 417 行      | 删除        |
| url/Url.ts   | -           | ~200 行     |
| url/index.ts | -           | ~20 行      |
| **总计**     | **1586 行** | **~220 行** |

**精简约 86%**

## 六、迁移对照

| 旧 API                    | 新 API                             |
| ------------------------- | ---------------------------------- |
| `new URLParams(url)`      | `new Url(url)`                     |
| `url.parse()`             | `parse()` 或 `Url.parse()`         |
| `url.stringify()`         | `stringify()` 或 `Url.stringify()` |
| `url.getOrigin()`         | `getOrigin()` 或 `Url.getOrigin()` |
| `url.from()`              | `new Url()`                        |
| `parse({ covert: true })` | `parse({ convert: true })`         |

## 七、核心优势

1. **文件精简**：3 文件 → 2 文件
2. **代码精简**：1586 行 → 220 行（-86%）
3. **API 简洁**：一个类 + 静态方法
4. **Tree-shaking**：支持按需导入函数
5. **向后兼容**：`URLParams = Url` 别名
