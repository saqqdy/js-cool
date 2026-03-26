# Url <Badge type="tip" text="since v6.0.0" />

URL 工具，提供类 URLSearchParams API 和链式 `Url` 类。

## 安装

```bash
pnpm add js-cool
```

## 使用方式

```js
// 导入 Url 类
import { Url } from 'js-cool'

// 或直接导入静态函数
import {
  parse,
  stringify,
  getOrigin,
  getHost,
  getHostname,
  getPathname,
  getSearch,
  getHash,
} from 'js-cool'

// 或使用描述性别名
import { parse as parseQueryString, stringify as stringifyQueryString } from 'js-cool'
```

## 两种使用方式

### 1. Url 类（链式构建器）

`Url` 类提供链式 API 用于构建和操作 URL，同时支持 search 和 hash 参数。

```js
import { Url } from 'js-cool'

// 创建实例
const u = new Url('https://example.com?id=123')

// 获取参数值
u.get('id') // '123'

// 链式调用
u.set('page', 2).set('size', 10).delete('id').toString()
// 'https://example.com?page=2&size=10'

// URL 构建
new Url('https://api.example.com')
  .path('users', '123')
  .set('fields', 'name,email')
  .setHashPath('/profile')
  .toString()
// 'https://api.example.com/users/123?fields=name,email#/profile'
```

### 2. 静态函数

导入特定函数以获得更小的打包体积。

```js
import {
  parse,
  stringify,
  getOrigin,
  getHost,
  getHostname,
  getPathname,
  getSearch,
  getHash,
} from 'js-cool'

// 解析查询字符串
parse('?a=1&b=true', { convert: true }) // { a: 1, b: true }

// 构建查询字符串
stringify({ a: 1, b: 2 }) // '?a=1&b=2'

// 提取 URL 部分
getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
getHost('https://example.com:8080/path') // 'example.com:8080'
getHostname('https://example.com:8080/path') // 'example.com'
getPathname('https://example.com/api/users?id=1') // '/api/users'
getSearch('https://example.com?key=value') // '?key=value'
getHash('https://example.com/path#section') // '#section'
```

## Url 类 API

### 构造函数

```js
const u = new Url() // 在浏览器中使用当前页面 URL
const u = new Url('https://example.com?id=123') // 带 URL 字符串
const u = new Url(urlObject) // 带 URL 对象
```

### 参数范围

`Url` 类同时支持 search 参数（`#` 前）和 hash 参数（`#` 后）：

| 范围       | 说明                            |
| ---------- | ------------------------------- |
| `'search'` | 只处理 `#` 前的参数             |
| `'hash'`   | 只处理 `#` 后的参数（hash 内）  |
| `'all'`    | 处理所有参数，hash 优先（默认） |

### 类 URLSearchParams 方法

```js
const u = new Url('https://example.com?id=1&id=2&page=1#/path?token=abc')

// 获取单个值（默认从所有范围查找）
u.get('id') // '1'
u.get('id', 'search') // '1'（仅从 search）
u.get('token', 'hash') // 'abc'（仅从 hash）

// 获取所有值
u.getAll('id') // ['1', '2']

// 检查是否存在
u.has('id') // true
u.has('token') // true
u.has('missing') // false

// 设置（可链式）
u.set('page', 2) // 返回 this 以便链式调用
u.set('tab', 'info', 'hash') // 设置到 hash 范围

// 追加（可链式）
u.append('id', '3') // 添加 id=3

// 删除（可链式）
u.delete('token') // 从所有范围删除
u.delete('token', 'hash') // 仅从 hash 删除

// 清空所有参数
u.clear() // 清空所有
u.clear('hash') // 仅清空 hash 参数

// 迭代
u.keys() // ['id', 'page', 'token']
u.values() // ['1', 'page value', 'abc']
u.entries() // [['id', '1'], ['page', 'value'], ['token', 'abc']]
```

### URL 属性 Getter

```js
const u = new Url('https://example.com:8080/api/users?id=123#section')

u.origin // 'https://example.com:8080'
u.host // 'example.com:8080'（主机名 + 端口）
u.hostname // 'example.com'
u.pathname // '/api/users'
u.search // '?id=123'
u.hash // '#section'
```

### 路径操作

```js
const u = new Url('https://example.com')

// 设置路径段（可链式）
u.path('api', 'v1', 'users')
// URL 变为: 'https://example.com/api/v1/users'
```

### Hash 路径操作

```js
const u = new Url('https://example.com#/path/to/page?id=123')

// 获取 hash 路径（# 和 ? 之间的部分）
u.getHashPath() // '/path/to/page'

// 设置 hash 路径（可链式）
u.setHashPath('/new/path')
// URL 变为: 'https://example.com#/new/path?id=123'
```

### 转换方法

```js
const u = new Url('https://example.com?a=1&b=true&page=2#/path?token=abc')

// 获取参数对象
u.toObject() // { a: '1', b: 'true', page: '2', token: 'abc' }
u.toObject('search') // { a: '1', b: 'true', page: '2' }
u.toObject('hash') // { token: 'abc' }

// 获取详细信息（带来源追踪）
u.toDetailObject()
// {
//   search: { a: '1', b: 'true', page: '2' },
//   hash: { token: 'abc' },
//   all: { a: '1', b: 'true', page: '2', token: 'abc' },
//   source: { a: 'search', b: 'search', page: 'search', token: 'hash' }
// }

// 转换为字符串
u.toString() // 完整 URL 字符串
u.toURL() // 同 toString()
```

### 迭代器支持

```js
const u = new Url('https://example.com?a=1&b=2')

// 使用 for...of
for (const [key, value] of u) {
  console.log(key, value)
}

// 展开为数组
;[...u] // [['a', '1'], ['b', '2']]
```

## 静态方法

### parse(str, options?)

解析查询字符串为对象。

```js
import { parse } from 'js-cool'

parse('?a=1&b=true')
// { a: '1', b: 'true' }

parse('?a=1&b=true', { convert: true })
// { a: 1, b: true }
```

### stringify(params, options?)

从对象构建查询字符串。

```js
import { stringify } from 'js-cool'

stringify({ a: 1, b: 2 }) // '?a=1&b=2'

stringify({ a: 1 }, { withQuestionMark: false }) // 'a=1'

stringify({ name: 'hello world' }, { encode: true }) // '?name=hello%20world'
```

### URL 属性提取

```js
import { getOrigin, getHost, getHostname, getPathname, getSearch, getHash } from 'js-cool'

getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
getHost('https://example.com:8080/path') // 'example.com:8080'
getHostname('https://example.com:8080/path') // 'example.com'
getPathname('https://example.com/api/users?id=1') // '/api/users'
getSearch('https://example.com?key=value') // '?key=value'
getHash('https://example.com/path#section') // '#section'
```

### Url.current()

从当前页面 URL 创建实例（仅浏览器）。

```js
const u = Url.current()
```

### Url.fromQueryString(queryString)

从查询字符串创建实例。

```js
const u = Url.fromQueryString('a=1&b=2')
u.toObject() // { a: '1', b: '2' }
```

## 类型定义

```ts
import type { ParamScope, ParseOptions, StringifyOptions } from 'js-cool'

type ParamScope = 'search' | 'hash' | 'all'

interface ParseOptions {
  /** 转换特殊值（true/false/null/undefined/数字） */
  convert?: boolean
}

interface StringifyOptions {
  /** 将 null/undefined 转换为空字符串 */
  convert?: boolean
  /** URI 编码值 */
  encode?: boolean
  /** 包含 ? 前缀 */
  withQuestionMark?: boolean
}
```

## 示例

### 构建 API URL

```js
import { Url } from 'js-cool'

const apiUrl = new Url('https://api.example.com')
  .path('v2', 'users', '123')
  .set('fields', 'name,email,avatar')
  .set('include', 'posts,comments')
  .toString()
// 'https://api.example.com/v2/users/123?fields=name,email,avatar&include=posts,comments'
```

### 处理 Hash 参数

```js
import { Url } from 'js-cool'

const u = new Url('https://example.com?token=old#/page?token=new')

// 区分参数来源
u.get('token', 'search') // 'old' - search 参数
u.get('token', 'hash') // 'new' - hash 参数
u.get('token') // 'new' - 默认 hash 优先

// 获取详细来源信息
u.toDetailObject()
// { search: { token: 'old' }, hash: { token: 'new' }, all: { token: 'new' }, source: { token: 'both' } }
```

### SPA Hash 路由

```js
import { Url } from 'js-cool'

// 解析 hash 路由和参数
const u = new Url(window.location.href)
const route = u.getHashPath() // '/user/profile'
const params = u.toObject('hash') // { tab: 'settings', id: '123' }
```

## 从 v5.x 迁移

URL 工具是 v6.0.0 新增功能。以下废弃函数已被移除：

| 已移除             | 替代方案                               |
| ------------------ | -------------------------------------- |
| `getUrlParam()`    | `parse()` 或 `new Url(url).get()`      |
| `getUrlParams()`   | `parse()` 或 `new Url(url).toObject()` |
| `parseUrlParam()`  | `parse()` 并使用 `{ convert: true }`   |
| `spliceUrlParam()` | `stringify()`                          |
| `getQueryParam()`  | `new Url(url).get(name, 'hash')`       |
| `getQueryParams()` | `new Url(url).toObject('hash')`        |

完整说明请参考 [迁移指南](../../guide/migration.md#url-工具)。

## 相关

- [Url 类](/zh/api/url/Url-class) - Url 类详细文档
- [getDirParams](/zh/api/url/get-dir-params) - 获取 URL 路径段
