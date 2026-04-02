# URL 参数方法升级建议

> ✅ **核心重构已完成** - 2026-04-02
>
> **已完成**：
> - `Url` 类实现（合并原 `URLParams` 功能）
> - 静态方法：`parse`、`stringify`、`getOrigin`、`getHost`、`getHostname`、`getPathname`、`getSearch`、`getHash`
> - 文件精简：3 文件 → 2 文件（`src/url/Url.ts` + `src/url/index.ts`）
>
> **待完成**：旧方法迁移、API 重命名

---

## 一、当前实现分析

### 1.1 方法概览

| 方法             | 位置                    | 功能                                | 状态                     |
| ---------------- | ----------------------- | ----------------------------------- | ------------------------ |
| `getUrlParams`   | `src/getUrlParams.ts`   | 获取所有 URL 参数（`?` 后，`#` 前） | ⏳ 待迁移至 Url          |
| `getUrlParam`    | `src/getUrlParam.ts`    | 获取单个 URL 参数                   | ⏳ 待迁移至 Url          |
| `parseUrlParam`  | `src/parseUrlParam.ts`  | 解析参数字符串为对象                | ⏳ 待迁移至 `Url.parse`  |
| `spliceUrlParam` | `src/spliceUrlParam.ts` | 对象转参数字符串                    | ⏳ 待迁移至 `Url.stringify` |
| `getQueryParams` | `src/getQueryParams.ts` | 获取所有 hash 参数（`#` 后）        | ⏳ 待迁移至 Url          |
| `getQueryParam`  | `src/getQueryParam.ts`  | 获取单个 hash 参数                  | ⏳ 待迁移至 Url          |
| `getDirParam`    | `src/getDirParam.ts`    | 获取目录路径参数                    | ✅ 已重构为 getDirParams |
| `Url`            | `src/url/Url.ts`        | 增强 URL 处理类                     | ✅ 已完成                |

### 1.2 依赖关系

```
getUrlParams ──┐
getUrlParam ───┼──► parseUrlParam
getQueryParams ─┤
getQueryParam ──┘

Url（已实现）──► URLSearchParams + URL API
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

### 2.3 ~~新增 `UrlBuilder` 类~~ ❌ 已取消

> **状态**：已取消，`Url` 类已涵盖链式构建能力

`Url` 类已实现链式构建功能：

```typescript
// 已实现的 Url 类链式用法
const url = new Url('https://api.example.com')
  .path('users', '123')
  .set('fields', 'name,email')
  .set('expand', 'profile')
  .setHashPath('section-1')
  .toString()
// https://api.example.com/users/123?fields=name,email&expand=profile#section-1
```

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

| 任务                     | 优先级 | 预估工时 | 状态      |
| ------------------------ | ------ | -------- | --------- |
| 新增 `Url` 类            | P1     | 1 天     | ✅ 已完成 |
| 新增 `getDirParams` 方法 | P1     | 0.5 天   | ✅ 已完成 |
| ~~新增 `UrlBuilder` 类~~ | P2     | 0.5 天   | ❌ 已取消（Url 类已涵盖） |
| 支持 `URL` 对象输入      | P2     | 0.5 天   | ✅ 已完成 |
| 现有方法复用 `Url`       | P2     | 0.5 天   | ⏳ 待处理 |

### Phase 2: 性能优化（v6.2）

| 任务                                        | 优先级 | 预估工时 | 状态      |
| ------------------------------------------- | ------ | -------- | --------- |
| 使用 `URLSearchParams` 优化 `parseUrlParam` | P1     | 1 天     | ✅ 已在 Url.parse 实现 |
| 单值获取方法优化                            | P2     | 0.5 天   | ⏳ 待处理 |
| 性能基准测试                                | P3     | 0.5 天   | 待处理    |

### Phase 3: API 重命名（v7.0）

| 任务                                  | 优先级 | 预估工时 | 状态   |
| ------------------------------------- | ------ | -------- | ------ |
| `parseUrlParam` → `parseQueryString`  | P2     | 0.5 天   | 待处理 |
| `spliceUrlParam` → `buildQueryString` | P2     | 0.5 天   | 待处理 |
| 移除 `getDirParam` 废弃方法           | P3     | 0.5 天   | 待处理 |
| 更新文档和迁移指南                    | P2     | 1 天     | 待处理 |

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

| 参数位置                | 示例     | 说明                              |
| ----------------------- | -------- | --------------------------------- |
| search params（`#` 前） | `ss=1`   | `location.search` 或 `URL.search` |
| hash params（`#` 后）   | `bb=343` | hash 内部的查询参数               |

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

url.href // 'https://a.cn/?ss=1#/path?bb=343'
url.origin // 'https://a.cn'
url.pathname // '/'
url.search // '?ss=1'
url.searchParams // URLSearchParams { 'ss' → '1' }  ← 只能获取 # 前参数
url.hash // '#/path?bb=343'  ← 原生无法解析 hash 内参数
```

**原生 URL 的局限**：无法直接获取 hash 内的查询参数。

### 7.3 实现方案：Url 类 ✅ 已完成

**设计理念**：参考原生 `URLSearchParams`，提供统一 API，通过 `scope` 参数区分参数来源。

> **实际实现**：参见 `src/url/Url.ts`

```typescript
// 使用示例
import { Url } from 'js-cool'

// 基础用法
const u = new Url('https://a.cn/?ss=1#/path?bb=343')

// 自动从 search + hash 查找（hash 优先）
u.get('ss')     // '1'  (from search)
u.get('bb')     // '343' (from hash)
u.has('ss')     // true
u.keys()        // ['ss', 'bb']

// 指定范围操作
u.get('ss', 'search')  // '1'
u.get('ss', 'hash')    // null
u.get('ss', 'all')     // '1' (默认，hash 优先)

// 获取所有参数
u.toObject()           // { ss: '1', bb: '343' }
u.toObject('search')   // { ss: '1' }
u.toObject('hash')     // { bb: '343' }

// 详细信息（区分来源）
u.toDetailObject()
// {
//   search: { ss: '1' },
//   hash: { bb: '343' },
//   all: { ss: '1', bb: '343' },
//   source: { ss: 'search', bb: 'hash' }
// }

// 链式修改
u.set('token', 'abc').set('page', 1).delete('ss')
u.toString()           // '?token=abc&page=1'

// 操作 hash 参数
u.set('bb', '999', 'hash')
u.toString()           // 包含 hash 参数

// 构建完整 URL
u.toURL()              // 'https://a.cn/?token=abc&page=1#/path?bb=999'
```

### 7.4 与原生 API 对比

| 功能             | 原生 URLSearchParams          | URLParams                                         |
| ---------------- | ----------------------------- | ------------------------------------------------- |
| 获取 search 参数 | `url.searchParams.get('key')` | `params.get('key', 'search')`                     |
| 获取 hash 参数   | ❌ 不支持                     | `params.get('key', 'hash')`                       |
| 获取全部参数     | ❌ 不支持                     | `params.get('key')` 或 `params.get('key', 'all')` |
| 区分参数来源     | ❌ 不支持                     | `params.toDetailObject().source`                  |
| 链式调用         | ❌ 不支持                     | `params.set('a', 1).set('b', 2)`                  |
| 构建完整 URL     | ❌ 不支持                     | `params.toURL()`                                  |

### 7.5 现有方法复用 Url ⏳ 待处理

现有方法可以基于 `Url` 简化实现：

```typescript
// getUrlParams.ts
import { Url } from './url'

function getUrlParams(url?: string | boolean, covert?: boolean) {
  if (typeof url === 'boolean') {
    covert = url
    url = undefined
  }
  const u = new Url(url)
  return u.toObject('search')
}

// getQueryParams.ts
function getQueryParams(url?: string | boolean, covert?: boolean) {
  if (typeof url === 'boolean') {
    covert = url
    url = undefined
  }
  const u = new Url(url)
  return u.toObject('hash')
}

// getUrlParam.ts
function getUrlParam(key: string, url?: string) {
  return new Url(url).get(key, 'search') ?? undefined
}

// getQueryParam.ts
function getQueryParam(key: string, url?: string) {
  return new Url(url).get(key, 'hash') ?? undefined
}
```

### 7.6 API 总结

| 方法/类         | 功能                     | 返回值      | 状态      |
| --------------- | ------------------------ | ----------- | --------- |
| `getUrlParams`  | 获取 search 参数（# 前） | `{ key: value }` | ⏳ 待迁移 |
| `getQueryParams`| 获取 hash 参数（# 后）   | `{ key: value }` | ⏳ 待迁移 |
| `Url`           | 统一的 URL 处理器        | `Url` 实例  | ✅ 已完成 |

**Url 核心 API**：

| 方法                          | 说明                           |
| ----------------------------- | ------------------------------ |
| `get(name, scope?)`           | 获取单个参数，scope 默认 'all' |
| `getAll(name, scope?)`        | 获取所有同名参数               |
| `has(name, scope?)`           | 检查参数是否存在               |
| `set(name, value, scope?)`    | 设置参数，scope 默认 'search'  |
| `append(name, value, scope?)` | 追加参数                       |
| `delete(name, scope?)`        | 删除参数                       |
| `toObject(scope?)`            | 转为对象                       |
| `toDetailObject()`            | 转为详细对象（含来源信息）     |
| `toURL()`                     | 构建完整 URL                   |
| `Url.parse()`                 | 解析查询字符串（静态方法）     |
| `Url.stringify()`             | 序列化为查询字符串（静态方法） |
| `Url.getOrigin()`             | 获取 origin（静态方法）        |
| `Url.getHost()`               | 获取 host（静态方法）          |

---

> 文档生成时间：2025-03-23
>
> 最后更新：2026-04-02（更新重构进度，Url 类已完成）
>
> 基于 js-cool v6.0.0 版本分析
