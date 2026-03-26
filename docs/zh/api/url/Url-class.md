# Url <Badge type="tip" text="v6.0.0" />

增强版 URL 构建器和参数管理器，同时支持 search 和 hash 参数。

## 用法

```js
import { Url } from 'js-cool'
```

## 概述

`Url` 是一个全面的 URL 处理器，解决了原生 `URL` 类无法正确解析 hash 内参数的问题。

当一个 URL 同时包含 search 参数（`#` 前）和 hash 参数（`#` 后）时，例如 `https://a.cn/?ss=1#/path?bb=343`，`Url` 可以分别处理这两种参数。

**核心功能：**

- URL 解析与构建
- 双参数支持（search + hash）
- 链式 API 修改
- URL 属性访问（origin、host、pathname 等）
- Hash 路径操作

## 类型定义

```typescript
type ParamScope = 'search' | 'hash' | 'all'

class Url {
  constructor(url?: string | URL)

  // URL 属性
  readonly origin: string
  readonly host: string
  readonly hostname: string
  readonly pathname: string
  readonly search: string
  readonly hash: string

  // 读取操作
  get(name: string, scope?: ParamScope): string | null
  getAll(name: string, scope?: ParamScope): string[]
  has(name: string, scope?: ParamScope): boolean
  keys(scope?: ParamScope): string[]
  values(scope?: ParamScope): string[]
  entries(scope?: ParamScope): [string, string][]

  // 写入操作
  set(name: string, value: string | number | boolean, scope?: 'search' | 'hash'): this
  append(name: string, value: string | number | boolean, scope?: 'search' | 'hash'): this
  delete(name: string, scope?: ParamScope): this
  clear(scope?: ParamScope): this

  // 路径操作
  path(...segments: string[]): this

  // Hash 路径操作
  getHashPath(): string
  setHashPath(path: string): this

  // 转换操作
  toObject(scope?: ParamScope): Record<string, string>
  toDetailObject(): {
    search: Record<string, string>
    hash: Record<string, string>
    all: Record<string, string>
    source: Record<string, 'search' | 'hash' | 'both'>
  }
  toString(): string
  toURL(): string

  // 迭代器
  [Symbol.iterator](): Iterator<[string, string]>

  // 静态方法
  static parse(str: string, options?: { convert?: boolean }): Record<string, unknown>
  static stringify(params: Record<string, unknown>, options?: { encode?: boolean; withQuestionMark?: boolean }): string
  static getOrigin(url: string): string
  static getHost(url: string): string
  static getHostname(url: string): string
  static getPathname(url: string): string
  static getSearch(url: string): string
  static getHash(url: string): string
  static current(): Url | null
  static fromQueryString(queryString: string): Url
}
```

## 参数范围 (scope)

| 值        | 说明                                        |
| --------- | ------------------------------------------ |
| `'search'` | 只处理 `#` 前的参数（location.search）      |
| `'hash'`   | 只处理 `#` 后的参数（hash 内的查询参数）     |
| `'all'`    | 处理所有参数，读取时 hash 优先（默认值）     |

## 示例

### 基础用法

```js
// 解析同时包含 search 和 hash 参数的 URL
const u = new Url('https://a.cn/?ss=1#/path?bb=343')

// 自动从 search + hash 查找（hash 优先）
u.get('ss') // '1' (来自 search)
u.get('bb') // '343' (来自 hash)
u.has('ss') // true
u.keys() // ['ss', 'bb']
```

### URL 属性访问

```js
const u = new Url('https://example.com:8080/api/users?id=1#section')

u.origin // 'https://example.com:8080'
u.host // 'example.com:8080'
u.hostname // 'example.com'
u.pathname // '/api/users'
u.search // '?id=1'
u.hash // '#section'
```

### 指定参数范围

```js
const u = new Url('https://example.com?token=old#/page?token=new')

// 只从 search 获取
u.get('token', 'search') // 'old'

// 只从 hash 获取
u.get('token', 'hash') // 'new'

// 默认（all），hash 优先
u.get('token') // 'new'
```

### 链式构建 URL

```js
const apiUrl = new Url('https://api.example.com')
  .path('users', '123')
  .set('fields', 'name,email')
  .setHash('profile')
  .toURL()
// 'https://api.example.com/users/123?fields=name%2Cemail#profile'
```

### 获取所有参数

```js
const u = new Url('https://a.cn/?ss=1#/path?bb=343')

// 获取所有参数对象
u.toObject() // { ss: '1', bb: '343' }

// 只获取 search 参数
u.toObject('search') // { ss: '1' }

// 只获取 hash 参数
u.toObject('hash') // { bb: '343' }
```

### 详细信息（追踪来源）

```js
const u = new Url('https://example.com?token=old#/page?token=new')
u.toDetailObject()
// {
//   search: { token: 'old' },
//   hash: { token: 'new' },
//   all: { token: 'new' },
//   source: { token: 'both' }
// }
```

### 链式修改

```js
const u = new Url('https://example.com')
u.set('token', 'abc').set('page', 1).set('id', 123, 'hash')

u.toURL() // 'https://example.com/?token=abc&page=1#?id=123'
```

### 删除参数

```js
const u = new Url('https://example.com?a=1#/path?a=2')

// 从所有范围删除
u.delete('a')

// 只从 search 删除
u.delete('a', 'search')

// 只从 hash 删除
u.delete('a', 'hash')
```

### Hash 路径操作

```js
const u = new Url('https://example.com#/path/to/page?id=123')

// 获取 hash 路径（# 和 ? 之间的部分）
u.getHashPath() // '/path/to/page'

// 设置 hash 路径
u.setHashPath('/new/path')
u.toURL() // 'https://example.com/#/new/path?id=123'
```

### 静态方法

```js
// 解析查询字符串
Url.parse('?a=1&b=true')
// { a: '1', b: 'true' }

Url.parse('?a=1&b=true', { convert: true })
// { a: 1, b: true }

// 序列化为查询字符串
Url.stringify({ a: 1, b: true })
// '?a=1&b=true'

// 提取 URL 部分
Url.getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
Url.getHost('https://example.com:8080/path') // 'example.com:8080'
Url.getPathname('https://example.com/api/users') // '/api/users'

// 从当前页面 URL 创建（浏览器环境）
const u = Url.current()

// 从查询字符串创建
const u = Url.fromQueryString('a=1&b=2')
u.get('a') // '1'
```

### 迭代器支持

```js
const u = new Url('https://a.cn/?ss=1#/path?bb=343')

// 使用 for...of
for (const [key, value] of u) {
  console.log(key, value)
}

// 展开为数组
;[...u] // [['ss', '1'], ['bb', '343']]
```

## 特性

- **URL 属性** - 直接访问 origin、host、hostname、pathname、search、hash
- **双参数支持** - 同时处理 search 和 hash 参数
- **优先级控制** - 读取时 hash 优先，避免冲突
- **来源追踪** - `toDetailObject()` 追踪参数来源
- **链式 API** - 所有写入方法返回 `this`
- **路径构建** - `path()` 方法用于构建路径
- **完整迭代器支持** - 支持 `for...of` 和展开运算符
- **原生兼容** - API 设计遵循 `URLSearchParams`

## 与原生 URLSearchParams 对比

| 特性           | URLSearchParams | Url   |
| -------------- | --------------- | ----- |
| search 参数    | ✅              | ✅    |
| hash 参数      | ❌              | ✅    |
| URL 属性       | ❌              | ✅    |
| 参数范围区分   | ❌              | ✅    |
| 来源追踪       | ❌              | ✅    |
| Hash 路径操作  | ❌              | ✅    |
| 自动 URL 构建  | ❌              | ✅    |
| 链式 API       | ❌              | ✅    |

## 相关

- [url](/zh/api/url/url) - URL 命名空间，包含 parse/stringify 方法
- [getDirParams](/zh/api/url/get-dir-params) - 获取 URL 路径段
