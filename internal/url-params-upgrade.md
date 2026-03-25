# URL 参数方法升级建议

> 针对 `getUrlParams`、`getUrlParam`、`parseUrlParam`、`spliceUrlParam`、`getDirParam`、`getQueryParam`、`getQueryParams` 方法的升级优化建议。

---

## 一、当前实现分析

### 1.1 方法概览

| 方法             | 位置                    | 功能                                | 状态                       |
| ---------------- | ----------------------- | ----------------------------------- | -------------------------- |
| `getUrlParams`   | `src/getUrlParams.ts`   | 获取所有 URL 参数（`?` 后，`#` 前） | ✅ 正常                    |
| `getUrlParam`    | `src/getUrlParam.ts`    | 获取单个 URL 参数                   | ✅ 正常                    |
| `parseUrlParam`  | `src/parseUrlParam.ts`  | 解析参数字符串为对象                | ✅ 正常                    |
| `spliceUrlParam` | `src/spliceUrlParam.ts` | 对象转参数字符串                    | ✅ 正常                    |
| `getQueryParams` | `src/getQueryParams.ts` | 获取所有 hash 参数（`#` 后）        | ✅ 正常                    |
| `getQueryParam`  | `src/getQueryParam.ts`  | 获取单个 hash 参数                  | ✅ 正常                    |
| `getDirParam`    | `src/getDirParam.ts`    | 获取目录路径参数                    | ✅ 已重构为 getDirParams   |
| `URLParams`      | 待新增                  | 增强版 URLSearchParams 类           | 📝 计划中（推荐）          |

### 1.2 依赖关系

```
getUrlParams ──┐
getUrlParam ───┼──► parseUrlParam
getQueryParams ─┤
getQueryParam ──┘

URLParams ──────┴──► URLSearchParams + URL API
                     ├── _search: URLSearchParams (# 前参数)
                     └── _hash: URLSearchParams (# 后参数)

parseUrlParam ──► pattern.number (正则)
```

---

## 二、升级建议

### 2.1 使用原生 `URLSearchParams` API

**问题**：当前实现使用正则解析，现代浏览器原生支持更高效的 API。

**建议**：优先使用 `URLSearchParams`，兼容环境降级处理。

```typescript
// parseUrlParam.ts 优化建议
function parseUrlParam(url: string, covert = false): Record<string, unknown> {
  if (!url) {
    console.info('url is required')
    return {}
  }

  // 提取查询字符串
  const searchStr = url.includes('?') ? url.slice(url.lastIndexOf('?') + 1) : url

  // 优先使用原生 API
  if (typeof URLSearchParams !== 'undefined') {
    const params = new URLSearchParams(searchStr)
    const result: Record<string, unknown> = {}

    for (const [key, value] of params) {
      result[key] = covert ? convertValue(value) : value
    }

    return result
  }

  // 降级：使用现有正则实现
  return parseWithRegex(searchStr, covert)
}

// 类型转换辅助函数
function convertValue(value: string): unknown {
  const VALUE_MAP: Record<string, unknown> = {
    true: true,
    false: false,
    null: null,
    undefined: undefined,
    NaN: Number.NaN,
    Infinity: Infinity,
    '-Infinity': -Infinity,
  }

  if (value in VALUE_MAP) return VALUE_MAP[value]
  if (/^-?\d+\.?\d*$/.test(value)) return Number(value)

  return value
}
```

### 2.2 `getDirParam` 重构为 `getDirParams` ✅

> **状态**：已完成，新增 `getDirParams` 方法

**原问题**：

1. 已标记 `@deprecated`
2. 路径中包含 query string 时处理不正确
3. 返回结构不够清晰

**原实现问题**：

```typescript
getDirParam('https://example.com/api/v1/users?id=123')
// { host: 'https://example.com', path: ['api', 'v1', 'users?id=123'] }
// 问题：'users?id=123' 应该分离
```

**已实现方案**：

````typescript
export interface DirParamsResult {
  origin: string // 协议+域名，如 'https://example.com'
  host: string // 仅域名，如 'example.com'
  pathname: string // 完整路径，如 '/api/v1/users'
  segments: string[] // 路径段，如 ['api', 'v1', 'users']
  query: string // 查询字符串，如 'id=123'
  hash: string // hash 值
}

/**
 * 解析 URL 路径信息
 *
 * @example
 * ```js
 * getDirParams('https://example.com/api/v1/users?id=123#section')
 * // {
 * //   origin: 'https://example.com',
 * //   host: 'example.com',
 * //   pathname: '/api/v1/users',
 * //   segments: ['api', 'v1', 'users'],
 * //   query: 'id=123',
 * //   hash: 'section'
 * // }
 * ```
 */
function getDirParams(url: string): DirParamsResult {
  // 在浏览器环境中无参数时使用当前页面 URL
  if (!url && typeof location !== 'undefined') {
    url = location.href
  }

  try {
    const urlObj = new URL(url)

    return {
      origin: urlObj.origin,
      host: urlObj.host,
      pathname: urlObj.pathname,
      segments: urlObj.pathname.split('/').filter(Boolean),
      query: urlObj.search.slice(1),
      hash: urlObj.hash.slice(1),
    }
  } catch {
    // 相对路径处理
    return {
      origin: '',
      host: '',
      pathname: url,
      segments: url.split('/').filter(Boolean),
      query: '',
      hash: '',
    }
  }
}

export default getDirParams
````

### 2.3 新增 `UrlBuilder` 类

**目的**：提供链式 URL 构建能力，提升开发体验。

````typescript
// src/UrlBuilder.ts

export interface UrlBuilderOptions {
  encode?: boolean
}

/**
 * URL 构建器 - 链式构建 URL
 *
 * @example
 * ```js
 * const url = new UrlBuilder('https://api.example.com')
 *   .path('users', '123')
 *   .param('fields', 'name,email')
 *   .param('expand', 'profile')
 *   .hash('section-1')
 *   .build()
 * // https://api.example.com/users/123?fields=name%2Cemail&expand=profile#section-1
 *
 * // 快捷方法
 * UrlBuilder.from('https://api.example.com')
 *   .params({ page: 1, size: 20 })
 *   .build()
 * ```
 */
class UrlBuilder {
  private url: URL
  private options: UrlBuilderOptions

  constructor(base: string, options: UrlBuilderOptions = {}) {
    // 支持相对路径
    if (!base.startsWith('http://') && !base.startsWith('https://')) {
      if (typeof location !== 'undefined') {
        base = location.origin + (base.startsWith('/') ? '' : '/') + base
      } else {
        base = 'http://localhost' + (base.startsWith('/') ? '' : '/') + base
      }
    }

    this.url = new URL(base)
    this.options = { encode: true, ...options }
  }

  /**
   * 设置路径
   */
  path(...segments: string[]): this {
    this.url.pathname = '/' + segments.map(encodeURIComponent).join('/')
    return this
  }

  /**
   * 追加路径
   */
  appendPath(...segments: string[]): this {
    const current = this.url.pathname.endsWith('/') ? this.url.pathname : this.url.pathname + '/'
    this.url.pathname = current + segments.map(encodeURIComponent).join('/')
    return this
  }

  /**
   * 设置单个参数
   */
  param(key: string, value: string | number | boolean | null | undefined): this {
    if (value != null) {
      this.url.searchParams.set(key, String(value))
    }
    return this
  }

  /**
   * 批量设置参数
   */
  params(obj: Record<string, unknown>): this {
    for (const [k, v] of Object.entries(obj)) {
      if (v != null) {
        this.url.searchParams.set(k, String(v))
      }
    }
    return this
  }

  /**
   * 删除参数
   */
  removeParam(key: string): this {
    this.url.searchParams.delete(key)
    return this
  }

  /**
   * 设置 hash
   */
  hash(hash: string): this {
    this.url.hash = hash
    return this
  }

  /**
   * 构建最终 URL
   */
  build(): string {
    return this.url.toString()
  }

  /**
   * 获取 URL 对象
   */
  toURL(): URL {
    return this.url
  }

  /**
   * 获取查询参数对象
   */
  getParams(): Record<string, string> {
    const result: Record<string, string> = {}
    for (const [k, v] of this.url.searchParams) {
      result[k] = v
    }
    return result
  }

  /**
   * 快捷创建方法
   */
  static from(base: string, options?: UrlBuilderOptions): UrlBuilder {
    return new UrlBuilder(base, options)
  }

  /**
   * 从当前页面 URL 创建
   */
  static current(): UrlBuilder | null {
    if (typeof location === 'undefined') return null
    return new UrlBuilder(location.href)
  }
}

export default UrlBuilder
````

### 2.4 支持 `URL` 对象输入

**目的**：提升方法灵活性，支持 `URL | string` 类型输入。

```typescript
// getUrlParams.ts 增强签名
function getUrlParams(): Record<string, string> | null
function getUrlParams(url: URL): Record<string, string>
function getUrlParams(url: URL, covert: boolean): Record<string, unknown>
function getUrlParams(url: string): Record<string, string>
function getUrlParams(url: string, covert: boolean): Record<string, unknown>
function getUrlParams(url: boolean): Record<string, unknown>
function getUrlParams(
  url?: URL | string | boolean,
  covert?: boolean
): Record<string, string | unknown> | null {
  // 处理 URL 对象
  if (url instanceof URL) {
    return parseUrlParam(url.search, covert)
  }

  // 处理无参数或布尔值（使用当前页面）
  if (!url || typeof url === 'boolean') {
    if (typeof location === 'undefined') {
      console.info('url is required')
      return null
    }
    typeof url === 'boolean' && (covert = url)
    return parseUrlParam(location.search, covert)
  }

  // 处理字符串
  const searchStr = url.includes('#') ? url.slice(0, url.indexOf('#')) : url

  return parseUrlParam(searchStr.slice(searchStr.indexOf('?')), covert)
}
```

### 2.5 API 命名优化建议

| 当前方法         | 建议               | 原因                                | 状态      |
| ---------------- | ------------------ | ----------------------------------- | --------- |
| `parseUrlParam`  | `parseQueryString` | 更语义化，明确处理的是 query string | 待处理    |
| `spliceUrlParam` | `buildQueryString` | 更语义化，明确是构建操作            | 待处理    |
| `getDirParam`    | `getDirParams`     | 已废弃，新方法返回更多信息          | ✅ 已完成 |

**兼容性处理**：

````typescript
// src/parseQueryString.ts
import parseUrlParam from './parseUrlParam'

/**
 * @deprecated Use `parseQueryString` instead. Will be removed in v7.0.0
 */
export { parseUrlParam }

/**
 * Parse query string to object
 *
 * @example
 * ```js
 * parseQueryString('?key1=100&key2=true')
 * // { key1: '100', key2: 'true' }
 *
 * parseQueryString('key1=100&key2=true')
 * // { key1: '100', key2: 'true' }
 * ```
 */
function parseQueryString(str: string, covert = false): Record<string, unknown> {
  return parseUrlParam(str, covert)
}

export default parseQueryString
````

---

## 三、性能优化建议

### 3.1 对比测试

```typescript
// test/bench/url-params.bench.ts
import { bench, describe } from 'vitest'
import parseUrlParam from '../src/parseUrlParam'

describe('parseUrlParam benchmark', () => {
  const testUrl = 'key1=value1&key2=value2&key3=value3&key4=value4&key5=value5'

  bench('current (regex)', () => {
    parseUrlParam(testUrl)
  })

  bench('URLSearchParams', () => {
    const params = new URLSearchParams(testUrl)
    const result: Record<string, string> = {}
    for (const [k, v] of params) {
      result[k] = v
    }
  })
})
```

### 3.2 性能对比预期

| 方法              | 实现         | 性能       |
| ----------------- | ------------ | ---------- |
| `parseUrlParam`   | 正则 replace | 基准       |
| `URLSearchParams` | 原生 API     | ~2-3x 更快 |

### 3.3 `getUrlParam` 单值获取优化

```typescript
// 当前：解析全部参数后取值
function getUrlParam(key: string, url?: string): string | undefined {
  return parseUrlParam(url)[key]
}

// 优化：直接获取单值
function getUrlParam(key: string, url?: string): string | undefined {
  if (!key) {
    console.info('key is required')
    return undefined
  }

  let searchStr: string
  if (!url) {
    if (typeof location === 'undefined') {
      console.info('url is required')
      return undefined
    }
    searchStr = location.search
  } else {
    searchStr = url.includes('#') ? url.slice(0, url.indexOf('#')) : url
    searchStr = searchStr.slice(searchStr.indexOf('?'))
  }

  // 使用 URLSearchParams.get() 直接获取
  if (typeof URLSearchParams !== 'undefined') {
    return new URLSearchParams(searchStr).get(key) ?? undefined
  }

  // 降级
  return parseUrlParam(searchStr)[key] as string | undefined
}
```

---

## 四、类型增强建议

### 4.1 增强类型定义

```typescript
// src/types/url.ts

export type UrlInput = string | URL

export interface ParseUrlOptions {
  /** 是否转换类型 (true/false/null/undefined/number) */
  covert?: boolean
  /** 是否解码 URI */
  decode?: boolean
}

export interface BuildUrlOptions {
  /** 是否编码 URI */
  encode?: boolean
  /** 是否包含 ? 前缀 */
  withQuestionMark?: boolean
  /** 跳过 null/undefined 值 */
  skipNullish?: boolean
}

export interface DirParamsResult {
  origin: string
  host: string
  pathname: string
  segments: string[]
  query: string
  hash: string
}
```

### 4.2 泛型支持

```typescript
// parseUrlParam 泛型版本
function parseUrlParam<T extends Record<string, unknown> = Record<string, string>>(
  url: string,
  covert?: boolean
): T {
  // ... 实现
  return result as T
}

// 使用
interface SearchParams {
  page: number
  size: number
  keyword: string
}

const params = parseUrlParam<SearchParams>('?page=1&size=20&keyword=test', true)
// params.page -> number (类型正确)
```

---

## 五、实施计划

### Phase 1: 新增功能（v6.1）

| 任务                         | 优先级 | 预估工时 | 状态      |
| ---------------------------- | ------ | -------- | --------- |
| 新增 `URLParams` 类          | P1     | 1 天     | 待处理    |
| 新增 `getDirParams` 方法     | P1     | 0.5 天   | ✅ 已完成 |
| 新增 `UrlBuilder` 类         | P2     | 0.5 天   | 待处理    |
| 支持 `URL` 对象输入          | P2     | 0.5 天   | 待处理    |
| 现有方法复用 `URLParams`     | P2     | 0.5 天   | 待处理    |

### Phase 2: 性能优化（v6.2）

| 任务                                     | 优先级 | 预估工时 | 状态   |
| ---------------------------------------- | ------ | -------- | ------ |
| 使用 `URLSearchParams` 优化 `parseUrlParam` | P1     | 1 天     | 待处理 |
| 单值获取方法优化                         | P2     | 0.5 天   | 待处理 |
| 性能基准测试                             | P3     | 0.5 天   | 待处理 |

### Phase 3: API 重命名（v7.0）

| 任务                                  | 优先级 | 预估工时 |
| ------------------------------------- | ------ | -------- |
| `parseUrlParam` → `parseQueryString`  | P2     | 0.5 天   |
| `spliceUrlParam` → `buildQueryString` | P2     | 0.5 天   |
| 移除 `getDirParam` 废弃方法           | P3     | 0.5 天   |
| 更新文档和迁移指南                    | P2     | 1 天     |

---

## 六、破坏性变更警告

### v7.0 计划移除

1. ~~`getDirParam` - 使用 `getDirParams` 替代~~ ✅ 已完成
2. `parseUrlParam` 别名 - 使用 `parseQueryString`
3. `spliceUrlParam` 别名 - 使用 `buildQueryString`

### 迁移示例

```typescript
// v6.x
import { getDirParam, parseUrlParam, spliceUrlParam } from 'js-cool'

// v7.x
import { getDirParams, parseQueryString, buildQueryString } from 'js-cool'

// getDirParam → getDirParams
const { host, path } = getDirParam(url) // 旧
const { origin, segments } = getDirParams(url) // 新

// parseUrlParam → parseQueryString
const params = parseUrlParam('?a=1&b=2') // 旧
const params = parseQueryString('?a=1&b=2') // 新

// spliceUrlParam → buildQueryString
const str = spliceUrlParam({ a: 1 }) // 旧
const str = buildQueryString({ a: 1 }) // 新
```

## 七、复杂 URL 场景处理（# 前后都有参数）

### 7.1 问题场景

**典型 URL**：`https://a.cn/?ss=1#/path?bb=343`

| 参数位置 | 示例 | 说明 |
|---------|------|------|
| search params（`#` 前） | `ss=1` | `location.search` 或 `URL.search` |
| hash params（`#` 后） | `bb=343` | hash 内部的查询参数 |

**当前方法行为**：

```typescript
// # 前参数
getUrlParams('https://a.cn/?ss=1#/path?bb=343')
// { ss: '1' } ✅

// # 后参数
getQueryParams('https://a.cn/?ss=1#/path?bb=343')
// { bb: '343' } ✅

// 问题：无法一次性获取所有参数
```

### 7.2 原生 URL 类分析

```javascript
const url = new URL('https://a.cn/?ss=1#/path?bb=343')

url.href         // 'https://a.cn/?ss=1#/path?bb=343'
url.origin       // 'https://a.cn'
url.pathname     // '/'
url.search       // '?ss=1'
url.searchParams // URLSearchParams { 'ss' → '1' }  ← 只能获取 # 前参数
url.hash         // '#/path?bb=343'  ← 原生无法解析 hash 内参数
```

**原生 URL 的局限**：无法直接获取 hash 内的查询参数。

### 7.3 推荐方案：URLParams 类

**设计理念**：参考原生 `URLSearchParams`，提供统一 API，通过 `scope` 参数区分参数来源。

````typescript
// src/URLParams.ts

type ParamScope = 'search' | 'hash' | 'all'

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
 */
class URLParams {
  private _search: URLSearchParams
  private _hash: URLSearchParams
  private _url: URL | null

  constructor(url?: string | URL) {
    // 无参数时使用当前页面 URL
    if (!url && typeof location !== 'undefined') {
      url = location.href
    }

    if (url instanceof URL) {
      this._url = url
      this._search = url.searchParams
      this._hash = this._parseHashParams(url.hash)
    } else if (typeof url === 'string') {
      this._url = this._createURL(url)
      this._search = this._url.searchParams
      this._hash = this._parseHashParams(this._url.hash)
    } else {
      this._search = new URLSearchParams()
      this._hash = new URLSearchParams()
      this._url = null
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
    if (scope !== 'all') {
      const params = scope === 'search' ? this._search : this._hash
      return [...params.values()]
    }
    return this.keys().map(k => this.get(k)!).filter(v => v !== null)
  }

  /**
   * 获取所有键值对
   */
  entries(scope?: ParamScope): [string, string][] {
    if (scope !== 'all') {
      const params = scope === 'search' ? this._search : this._hash
      return [...params.entries()]
    }
    return this.keys().map(k => [k, this.get(k)!] as [string, string])
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
    if (scope === 'hash' || scope === 'search') {
      const params = scope === 'hash' ? this._hash : this._search
      for (const key of params.keys()) {
        params.delete(key)
      }
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
    const hash = this._hash.toString()

    if (!this._url) {
      let result = '/'
      if (search) result += `?${search}`
      if (hash) result += `#${hash}`
      return result
    }

    // 提取 hash 路径（如果有）
    let hashPath = ''
    if (this._url.hash) {
      const hashContent = this._url.hash.slice(1)
      const idx = hashContent.indexOf('?')
      hashPath = idx > -1 ? hashContent.slice(0, idx) : hashContent
    }

    let result = this._url.origin + this._url.pathname
    if (search) result += `?${search}`
    if (hashPath || hash) {
      result += '#'
      if (hashPath) result += hashPath
      if (hash) result += `?${hash}`
    }

    return result
  }

  // ==================== 私有方法 ====================

  private _createURL(url: string): URL {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return new URL(url)
    }
    if (typeof location !== 'undefined') {
      return new URL(url, location.origin)
    }
    return new URL(`http://localhost${url.startsWith('/') ? '' : '/'}${url}`)
  }

  private _parseHashParams(hash: string): URLSearchParams {
    if (!hash || hash === '#') return new URLSearchParams()
    const content = hash.slice(1)
    const idx = content.indexOf('?')
    if (idx === -1) return new URLSearchParams()
    return new URLSearchParams(content.slice(idx + 1))
  }
}

export default URLParams
````

### 7.4 与原生 API 对比

| 功能 | 原生 URLSearchParams | URLParams |
|------|---------------------|-----------|
| 获取 search 参数 | `url.searchParams.get('key')` | `params.get('key', 'search')` |
| 获取 hash 参数 | ❌ 不支持 | `params.get('key', 'hash')` |
| 获取全部参数 | ❌ 不支持 | `params.get('key')` 或 `params.get('key', 'all')` |
| 区分参数来源 | ❌ 不支持 | `params.toDetailObject().source` |
| 链式调用 | ❌ 不支持 | `params.set('a', 1).set('b', 2)` |
| 构建完整 URL | ❌ 不支持 | `params.toURL()` |

### 7.5 现有方法复用 URLParams

现有方法可以基于 `URLParams` 简化实现：

```typescript
// getUrlParams.ts
import URLParams from './URLParams'

function getUrlParams(url?: string | boolean, covert?: boolean) {
  if (typeof url === 'boolean') {
    covert = url
    url = undefined
  }
  const params = new URLParams(url)
  return params.toObject('search')
}

// getQueryParams.ts
function getQueryParams(url?: string | boolean, covert?: boolean) {
  if (typeof url === 'boolean') {
    covert = url
    url = undefined
  }
  const params = new URLParams(url)
  return params.toObject('hash')
}

// getUrlParam.ts
function getUrlParam(key: string, url?: string) {
  return new URLParams(url).get(key, 'search') ?? undefined
}

// getQueryParam.ts
function getQueryParam(key: string, url?: string) {
  return new URLParams(url).get(key, 'hash') ?? undefined
}
```

### 7.6 API 总结

| 方法/类 | 功能 | 返回值 |
|---------|------|--------|
| `getUrlParams` | 获取 search 参数（# 前） | `{ key: value }` |
| `getQueryParams` | 获取 hash 参数（# 后） | `{ key: value }` |
| `URLParams` **新增** | 统一的参数处理器 | `URLParams` 实例 |

**URLParams 核心 API**：

| 方法 | 说明 |
|------|------|
| `get(name, scope?)` | 获取单个参数，scope 默认 'all' |
| `getAll(name, scope?)` | 获取所有同名参数 |
| `has(name, scope?)` | 检查参数是否存在 |
| `set(name, value, scope?)` | 设置参数，scope 默认 'search' |
| `append(name, value, scope?)` | 追加参数 |
| `delete(name, scope?)` | 删除参数 |
| `toObject(scope?)` | 转为对象 |
| `toDetailObject()` | 转为详细对象（含来源信息） |
| `toURL()` | 构建完整 URL |

---

> 文档生成时间：2025-03-23
>
> 最后更新：2026-03-25（新增 URLParams 类方案，参考原生 URLSearchParams 设计）
>
> 基于 js-cool v6.0.0 版本分析
