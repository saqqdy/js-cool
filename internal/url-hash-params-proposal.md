# URL Hash 参数解析方案

## 问题背景

当前 `url` 模块只能解析 **search 部分**（`#` 前的参数），无法直接解析 **hash 内的参数**。

### 典型 URL 结构

```
http://a.com/fae?id=10&bar=eee#/about?name=test&code=3
                    └──────┘           └────────────┘
                    search 部分         hash 内参数
                    (# 前)              (# 后)
```

### 当前能力

```js
import { url } from 'js-cool'

const fullUrl = 'http://a.com/fae?id=10&bar=eee#/about?name=test&code=3'

// ✅ search 部分可以解析
url.get('id', fullUrl)    // '10'
url.get('bar', fullUrl)   // 'eee'
url.parse(fullUrl)        // { id: '10', bar: 'eee' }

// ❌ hash 内参数无法直接解析
url.get('name', fullUrl)  // null
url.get('code', fullUrl)  // null
```

---

## 方案对比

| 方案 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| 方案一：新增 `getHashParams` / `getHashParam` | 简单直观，与现有 API 风格一致 | 新增方法较多 | ⭐⭐⭐⭐⭐ |
| 方案二：扩展 `parse` / `get` 支持 `part` 参数 | 不增加新方法，API 简洁 | 改变现有 API 语义，可能影响现有用户 | ⭐⭐⭐ |
| 方案三：新增 `hash` 命名空间 | 结构清晰，可扩展性强 | 需要新增命名空间 | ⭐⭐⭐⭐ |
| 方案四：`Url` 类新增 `hashParams` 属性 | 面向对象，链式调用友好 | 只在类实例上可用 | ⭐⭐⭐⭐ |

---

## 方案一：新增独立的 Hash 方法（推荐）

### API 设计

```ts
// 新增静态方法
url.getHashParam(name: string, url?: string): string | null
url.getHashParams(url?: string, covert?: boolean): Record<string, unknown>
url.hasHashParam(name: string, url?: string): boolean
url.setHashParam(name: string, value: string, url?: string): string
url.deleteHashParam(name: string, url?: string): string
```

### 使用示例

```js
import { url } from 'js-cool'

const fullUrl = 'http://a.com/fae?id=10&bar=eee#/about?name=test&code=3'

// 获取单个 hash 参数
url.getHashParam('name', fullUrl)  // 'test'
url.getHashParam('code', fullUrl)  // '3'

// 获取所有 hash 参数
url.getHashParams(fullUrl)
// { name: 'test', code: '3' }

// 带类型转换
url.getHashParams(fullUrl, true)
// { name: 'test', code: 3 }

// 检查存在
url.hasHashParam('name', fullUrl)  // true

// 设置 hash 参数
url.setHashParam('page', 2, fullUrl)
// 'http://a.com/fae?id=10&bar=eee#/about?name=test&code=3&page=2'

// 删除 hash 参数
url.deleteHashParam('code', fullUrl)
// 'http://a.com/fae?id=10&bar=eee#/about?name=test'
```

### 实现代码

```ts
/**
 * Extract hash query string from URL
 */
function getHashSearchStr(url?: string): string {
  if (!url) {
    if (typeof location === 'undefined') return ''
    url = location.href
  }

  const hashIndex = url.indexOf('#')
  if (hashIndex === -1) return ''

  const hash = url.slice(hashIndex + 1)
  const queryIndex = hash.indexOf('?')
  if (queryIndex === -1) return ''

  return '?' + hash.slice(queryIndex + 1)
}

/**
 * Get hash parameter value
 */
export function getHashParam(name: string, url?: string): string | null {
  if (!name) return null
  const hashSearch = getHashSearchStr(url)
  if (!hashSearch) return null

  return new URLSearchParams(hashSearch.slice(1)).get(name)
}

/**
 * Get all hash parameters
 */
export function getHashParams(url?: string, covert?: boolean): Record<string, unknown> {
  const hashSearch = getHashSearchStr(url)
  if (!hashSearch) return {}

  return parse(hashSearch, covert)
}

/**
 * Check if hash parameter exists
 */
export function hasHashParam(name: string, url?: string): boolean {
  if (!name) return false
  const hashSearch = getHashSearchStr(url)
  if (!hashSearch) return false

  return new URLSearchParams(hashSearch.slice(1)).has(name)
}

/**
 * Set hash parameter
 */
export function setHashParam(name: string, value: string | number | boolean, url?: string): string {
  if (!name) return url ?? ''

  let baseUrl = url ?? (typeof location !== 'undefined' ? location.href : '')
  if (!baseUrl) return ''

  const hashIndex = baseUrl.indexOf('#')
  const beforeHash = hashIndex === -1 ? baseUrl : baseUrl.slice(0, hashIndex)
  const hash = hashIndex === -1 ? '' : baseUrl.slice(hashIndex + 1)

  const queryIndex = hash.indexOf('?')
  const hashPath = queryIndex === -1 ? hash : hash.slice(0, queryIndex)
  const hashQuery = queryIndex === -1 ? '' : hash.slice(queryIndex + 1)

  const params = new URLSearchParams(hashQuery)
  params.set(name, String(value))

  return `${beforeHash}#${hashPath}?${params.toString()}`
}

/**
 * Delete hash parameter
 */
export function deleteHashParam(name: string, url?: string): string {
  if (!name) return url ?? ''

  let baseUrl = url ?? (typeof location !== 'undefined' ? location.href : '')
  if (!baseUrl) return ''

  const hashIndex = baseUrl.indexOf('#')
  if (hashIndex === -1) return baseUrl

  const beforeHash = baseUrl.slice(0, hashIndex)
  const hash = baseUrl.slice(hashIndex + 1)

  const queryIndex = hash.indexOf('?')
  if (queryIndex === -1) return baseUrl

  const hashPath = hash.slice(0, queryIndex)
  const hashQuery = hash.slice(queryIndex + 1)

  const params = new URLSearchParams(hashQuery)
  params.delete(name)

  const newQuery = params.toString()
  return newQuery ? `${beforeHash}#${hashPath}?${newQuery}` : `${beforeHash}#${hashPath}`
}
```

---

## 方案二：扩展现有方法参数

### API 设计

```ts
// 扩展现有方法，增加 part 参数
url.get(name: string, url?: string, part?: 'search' | 'hash'): string | null
url.parse(url?: string, options?: { covert?: boolean, part?: 'search' | 'hash' | 'all' }): Record<string, unknown>
```

### 使用示例

```js
import { url } from 'js-cool'

const fullUrl = 'http://a.com/fae?id=10&bar=eee#/about?name=test&code=3'

// 默认行为不变（search 部分）
url.get('id', fullUrl)              // '10'
url.get('name', fullUrl)            // null

// 指定解析 hash 部分
url.get('name', fullUrl, 'hash')    // 'test'
url.get('code', fullUrl, 'hash')    // '3'

// 解析所有参数
url.parse(fullUrl, { part: 'all' })
// { id: '10', bar: 'eee', name: 'test', code: '3' }

// 只解析 hash
url.parse(fullUrl, { part: 'hash' })
// { name: 'test', code: '3' }
```

### 优缺点

**优点：**
- 不增加新方法名
- API 简洁

**缺点：**
- 改变现有方法签名，可能影响现有用户
- `part: 'all'` 时参数名可能冲突

---

## 方案三：新增 `hash` 命名空间

### API 设计

```ts
url.hash.get(name: string, url?: string): string | null
url.hash.getAll(name: string, url?: string): string[]
url.hash.has(name: string, url?: string): boolean
url.hash.parse(url?: string, covert?: boolean): Record<string, unknown>
url.hash.set(name: string, value: string, url?: string): string
url.hash.delete(name: string, url?: string): string
url.hash.stringify(params: object): string
```

### 使用示例

```js
import { url } from 'js-cool'

const fullUrl = 'http://a.com/fae?id=10#/about?name=test&code=3'

// search 参数（现有功能）
url.get('id', fullUrl)           // '10'

// hash 参数（新命名空间）
url.hash.get('name', fullUrl)    // 'test'
url.hash.parse(fullUrl)          // { name: 'test', code: '3' }
url.hash.has('code', fullUrl)    // true

// 链式操作
url.hash.set('page', 2, fullUrl)
// 'http://a.com/fae?id=10#/about?name=test&code=3&page=2'
```

### 实现代码

```ts
export const hash = {
  get: getHashParam,
  getAll: getHashAll,
  has: hasHashParam,
  parse: parseHashParams,
  set: setHashParam,
  delete: deleteHashParam,
  stringify: (params: Record<string, unknown>) => stringify(params).replace(/^\?/, ''),
} as const

// 添加到 url 对象
export const url = {
  // ... 现有方法
  hash,
}
```

---

## 方案四：`Url` 类新增属性

### API 设计

```ts
class Url {
  // 现有属性
  get origin(): string
  get search(): string
  get hash(): string

  // 新增属性
  get searchParams(): Record<string, string>
  get hashParams(): Record<string, string>

  // 新增方法
  getFromHash(name: string): string | null
  setHashParam(name: string, value: string): this
  deleteHashParam(name: string): this
}
```

### 使用示例

```js
import { Url } from 'js-cool'

const u = new Url('http://a.com/fae?id=10#/about?name=test&code=3')

// 现有功能
u.get('id')        // '10'
u.search           // '?id=10'
u.hash             // '#/about?name=test&code=3'

// 新增功能
u.searchParams     // { id: '10' }
u.hashParams       // { name: 'test', code: '3' }
u.getFromHash('name')  // 'test'

// 链式操作
u.setHashParam('page', 2)
 .delete('id')
 .toString()
// 'http://a.com/fae?#/about?name=test&code=3&page=2'
```

---

## 推荐方案

**推荐方案一 + 方案四的组合：**

1. **静态方法**：新增 `getHashParam`、`getHashParams` 等独立方法
2. **Url 类**：新增 `hashParams` 属性和 `getFromHash` 方法

这样既保持了 API 的清晰性，又提供了面向对象的链式操作支持。

### 最终 API

```ts
// 静态方法
url.getHashParam(name, url?)      // 获取单个 hash 参数
url.getHashParams(url?, covert?)  // 获取所有 hash 参数
url.hasHashParam(name, url?)      // 检查 hash 参数是否存在
url.setHashParam(name, value, url?) // 设置 hash 参数
url.deleteHashParam(name, url?)   // 删除 hash 参数

// Url 类
new Url(url).hashParams           // 获取所有 hash 参数
new Url(url).getFromHash(name)    // 获取单个 hash 参数
new Url(url).setHashParam(...)    // 链式设置
new Url(url).deleteHashParam(...) // 链式删除
```

---

## 与旧函数的关系

| 旧函数 | 功能 | 新替代方案 |
|--------|------|-----------|
| `getQueryParam` | 获取 hash 内单个参数 | `url.getHashParam()` |
| `getQueryParams` | 获取 hash 内所有参数 | `url.getHashParams()` |

迁移示例：

```js
// 旧写法
import { getQueryParam, getQueryParams } from 'js-cool'

getQueryParam('name', 'http://a.com#/about?name=test')
// 'test'

getQueryParams('http://a.com#/about?name=test&code=3', true)
// { name: 'test', code: 3 }

// 新写法
import { url } from 'js-cool'

url.getHashParam('name', 'http://a.com#/about?name=test')
// 'test'

url.getHashParams('http://a.com#/about?name=test&code=3', true)
// { name: 'test', code: 3 }
```
