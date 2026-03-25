# URLParams <Badge type="tip" text="v6.0.0" />

增强版 URLSearchParams，同时支持 search 和 hash 参数解析。

## 用法

```js
import { URLParams } from 'js-cool'
```

## 概述

`URLParams` 是一个增强版的 `URLSearchParams`，解决了原生 `URL` 类无法正确解析 hash 内参数的问题。

当一个 URL 同时包含 search 参数（`#` 前）和 hash 参数（`#` 后）时，例如 `https://a.cn/?ss=1#/path?bb=343`，`URLParams` 可以分别处理这两种参数。

## 签名

```typescript
type ParamScope = 'search' | 'hash' | 'all'

class URLParams {
  constructor(url?: string | URL)

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

  // 转换操作
  toObject(scope?: ParamScope): Record<string, string>
  toDetailObject(): {
    search: Record<string, string>
    hash: Record<string, string>
    all: Record<string, string>
    source: Record<string, 'search' | 'hash' | 'both'>
  }
  toString(scope?: 'search' | 'hash'): string
  toURL(): string

  // Hash 路径操作
  getHashPath(): string
  setHashPath(path: string): this

  // 迭代器
  [Symbol.iterator](): Iterator<[string, string]>

  // 静态方法
  static current(): URLParams | null
  static fromQueryString(queryString: string): URLParams
}
```

## 参数范围 (scope)

| 值         | 描述                                     |
| ---------- | ---------------------------------------- |
| `'search'` | 仅处理 `#` 前的参数（location.search）   |
| `'hash'`   | 仅处理 `#` 后的参数（hash 内的查询参数） |
| `'all'`    | 处理所有参数，读取时 hash 优先（默认）   |

## 示例

### 基础用法

```js
// 解析包含 search 和 hash 参数的 URL
const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')

// 自动从 search + hash 查找（hash 优先）
params.get('ss') // '1' (from search)
params.get('bb') // '343' (from hash)
params.has('ss') // true
params.keys() // ['ss', 'bb']
```

### 指定参数范围

```js
const params = new URLParams('https://example.com?token=old#/page?token=new')

// 仅从 search 获取
params.get('token', 'search') // 'old'

// 仅从 hash 获取
params.get('token', 'hash') // 'new'

// 默认（all），hash 优先
params.get('token') // 'new'
```

### 获取所有参数

```js
const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')

// 获取所有参数对象
params.toObject() // { ss: '1', bb: '343' }

// 仅获取 search 参数
params.toObject('search') // { ss: '1' }

// 仅获取 hash 参数
params.toObject('hash') // { bb: '343' }
```

### 详细信息（区分来源）

```js
const params = new URLParams('https://example.com?token=old#/page?token=new')
params.toDetailObject()
// {
//   search: { token: 'old' },
//   hash: { token: 'new' },
//   all: { token: 'new' },
//   source: { token: 'both' }
// }
```

### 链式修改

```js
const params = new URLParams('https://example.com')
params.set('token', 'abc').set('page', 1).set('id', 123, 'hash')

params.toString() // 'token=abc&page=1'
params.toString('hash') // 'id=123'
params.toURL() // 'https://example.com/?token=abc&page=1#?id=123'
```

### 删除参数

```js
const params = new URLParams('https://example.com?a=1#/path?a=2')

// 从所有范围删除
params.delete('a')

// 仅从 search 删除
params.delete('a', 'search')

// 仅从 hash 删除
params.delete('a', 'hash')
```

### Hash 路径操作

```js
const params = new URLParams('https://example.com#/path/to/page?id=123')

// 获取 hash 路径（# 后到 ? 之前的部分）
params.getHashPath() // '/path/to/page'

// 设置 hash 路径
params.setHashPath('/new/path')
params.toURL() // 'https://example.com/#/new/path?id=123'
```

### 静态方法

```js
// 从当前页面 URL 创建（浏览器环境）
const params = URLParams.current()

// 从 query string 创建
const params = URLParams.fromQueryString('a=1&b=2')
params.get('a', 'search') // '1'
```

### 迭代器支持

```js
const params = new URLParams('https://a.cn/?ss=1#/path?bb=343')

// 使用 for...of
for (const [key, value] of params) {
  console.log(key, value)
}

// 展开为数组
;[...params] // [['ss', '1'], ['bb', '343']]
```

## 特性

- **双参数区支持** - 同时处理 search 和 hash 参数
- **优先级控制** - 读取时 hash 优先，避免参数冲突
- **来源追踪** - `toDetailObject()` 可追踪参数来源
- **链式操作** - 所有写入方法返回 `this`
- **完整迭代器** - 支持 `for...of` 和展开运算符
- **原生兼容** - API 设计参考 `URLSearchParams`

## 与原生 URLSearchParams 对比

| 特性          | URLSearchParams | URLParams |
| ------------- | --------------- | --------- |
| search 参数   | ✅              | ✅        |
| hash 参数     | ❌              | ✅        |
| 参数范围区分  | ❌              | ✅        |
| 来源追踪      | ❌              | ✅        |
| Hash 路径操作 | ❌              | ✅        |
| 自动 URL 构建 | ❌              | ✅        |

## 相关

- [url](/zh/api/url/url) - URL 命名空间，提供 parse/stringify 方法
- [getDirParams](/zh/api/url/get-dir-params) - 获取 URL 路径段
