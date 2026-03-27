# URL 函数迁移指南

本文档说明旧的 URL 函数如何迁移到新的 `url` 命名空间和 `Url` 类。

## 快速对照表

| 旧函数           | 新替代                                  | 是否完全替代 | 说明            |
| ---------------- | --------------------------------------- | ------------ | --------------- |
| `parseUrlParam`  | `url.parse` / `Url.parse`               | ✅ 完全替代  | 功能相同        |
| `spliceUrlParam` | `url.stringify` / `Url.stringify`       | ✅ 完全替代  | 功能相同        |
| `getUrlParams`   | `url.parse` / `Url.parse`               | ✅ 完全替代  | 功能相同        |
| `getUrlParam`    | `url.parse` + 取值 或 `new Url().get()` | ✅ 完全替代  | 功能相同        |
| `getQueryParams` | `new Url().toObject('hash')`            | ✅ 完全替代  | hash 内参数解析 |
| `getQueryParam`  | `new Url().get(name, 'hash')`           | ✅ 完全替代  | hash 内参数解析 |
| `getDirParam`    | `getDirParams`                          | ✅ 已替代    | 返回结构更完善  |

---

## 详细迁移示例

### 1. `parseUrlParam` → `url.parse` ✅

```js
// 旧写法
import { parseUrlParam } from 'js-cool'

parseUrlParam('?key1=100&key2=true&key3=null')
// { key1: '100', key2: 'true', key3: 'null' }

parseUrlParam('?key1=100&key2=true', true)
// { key1: 100, key2: true }

// 新写法
import { url } from 'js-cool'

url.parse('?key1=100&key2=true&key3=null')
// { key1: '100', key2: 'true', key3: 'null' }

url.parse('?key1=100&key2=true', { convert: true })
// { key1: 100, key2: true }

// 或使用 Url 类静态方法
import { Url } from 'js-cool'
Url.parse('?key1=100&key2=true', { convert: true })
// { key1: 100, key2: true }
```

### 2. `spliceUrlParam` → `url.stringify` ✅

```js
// 旧写法
import { spliceUrlParam } from 'js-cool'

spliceUrlParam({ key1: '100', key2: true })
// '?key1=100&key2=true'

spliceUrlParam({ name: '测试' }, { encode: true })
// '?name=%E6%B5%8B%E8%AF%95'

spliceUrlParam({ key1: '100' }, { withQuestionsMark: false })
// 'key1=100'

// 新写法
import { url } from 'js-cool'

url.stringify({ key1: '100', key2: true })
// '?key1=100&key2=true'

url.stringify({ name: '测试' }, { encode: true })
// '?name=%E6%B5%8B%E8%AF%95'

url.stringify({ key1: '100' }, { withQuestionMark: false })
// 'key1=100'

// 或使用 Url 类静态方法
import { Url } from 'js-cool'
Url.stringify({ key1: '100' }, { withQuestionMark: false })
// 'key1=100'
```

### 3. `getUrlParams` → `url.parse` ✅

```js
// 旧写法
import { getUrlParams } from 'js-cool'

getUrlParams('https://test.com?key1=100#/home?key1=200')
// { key1: '100' }  ← 只取 # 前的参数

getUrlParams('https://test.com?id=100&active=true', true)
// { id: 100, active: true }

// 新写法
import { url } from 'js-cool'

url.parse('https://test.com?key1=100#/home?key1=200')
// { key1: '100' }  ← 只取 search 部分

url.parse('https://test.com?id=100&active=true', { convert: true })
// { id: 100, active: true }
```

### 4. `getUrlParam` → `new Url().get()` ✅

```js
// 旧写法
import { getUrlParam } from 'js-cool'

getUrlParam('key1', 'https://test.com?key1=100#/home?key1=200')
// '100'  ← 只取 # 前的参数

getUrlParam('token') // 使用当前页面 URL
// 'abc123'

// 新写法
import { Url } from 'js-cool'

new Url('https://test.com?key1=100#/home?key1=200').get('key1')
// '100'  ← 默认 hash 优先

new Url('https://test.com?key1=100#/home?key1=200').get('key1', 'search')
// '100'  ← 显式指定 search

// 使用当前页面 URL
Url.current()?.get('token')
// 'abc123'
```

### 5. `getQueryParams` / `getQueryParam` → `new Url()` ✅

新的 `Url` 类已支持 hash 内参数解析，不再需要单独的函数：

```js
// 旧写法 - 获取 hash 内参数
import { getQueryParams, getQueryParam } from 'js-cool'

getQueryParams('https://test.com?key1=100#/home?key2=200')
// { key2: '200' }  ← 取 # 后的参数

getQueryParam('key2', 'https://test.com?key1=100#/home?key2=200')
// '200'

// 新写法 - 使用 Url 类
import { Url } from 'js-cool'

const u = new Url('https://test.com?key1=100#/home?key2=200')

// 获取 hash 内单个参数
u.get('key2', 'hash')
// '200'

// 获取 hash 内所有参数
u.toObject('hash')
// { key2: '200' }

// 获取所有参数（区分来源）
u.toDetailObject()
// {
//   search: { key1: '100' },
//   hash: { key2: '200' },
//   all: { key1: '100', key2: '200' },
//   source: { key1: 'search', key2: 'hash' }
// }

// 获取所有参数（hash 优先）
u.toObject()
// { key1: '100', key2: '200' }
```

### 6. `getDirParam` → `getDirParams` ✅

```js
// 旧写法
import { getDirParam } from 'js-cool'

const { host, path } = getDirParam('https://example.com/user/123')
// host: 'https://example.com'
// path: ['user', '123']

// 新写法
import { getDirParams } from 'js-cool'

const { origin, segments } = getDirParams('https://example.com/user/123')
// origin: 'https://example.com'
// segments: ['user', '123']
// 还额外提供: host, hostname, pathname, query, hash
```

---

## 新增功能

新的 `Url` 类提供了旧函数没有的功能：

### 链式 URL 构建

```js
import { Url } from 'js-cool'

// 链式构建 URL
const newUrl = new Url('https://api.example.com')
  .path('users', '123', 'profile')
  .set('fields', 'name,email')
  .setHashPath('section')
  .toString()
// 'https://api.example.com/users/123/profile?fields=name,email#section'

// 修改现有 URL
new Url('https://example.com?id=123').set('page', 2).delete('id').toString()
// 'https://example.com?page=2'
```

### URLSearchParams-like 方法

```js
import { Url } from 'js-cool'

const u = new Url('https://example.com?id=1&id=2&token=abc')

// 获取所有值（重复参数）
u.getAll('id')
// ['1', '2']

// 检查参数是否存在
u.has('token')
// true

// 追加参数（不覆盖）
u.append('id', '3').toString()
// 'https://example.com/?id=1&id=2&id=3&token=abc'

// 删除参数
u.delete('token').toString()
// 'https://example.com/?id=1&id=2'

// 获取所有参数名
u.keys()
// ['id', 'token']

// 获取所有参数值
u.values()
// ['1', '2', 'abc']

// 获取所有键值对
u.entries()
// [['id', '1'], ['id', '2'], ['token', 'abc']]

// 清空所有参数
u.clear().toString()
// 'https://example.com/'
```

### URL 属性访问

```js
import { Url, url } from 'js-cool'

const u = new Url('https://example.com:8080/api/users?id=1#section')

// 实例属性
u.origin // 'https://example.com:8080'
u.host // 'example.com:8080'
u.hostname // 'example.com'
u.pathname // '/api/users'
u.search // '?id=1'
u.hash // '#section'

// 静态方法（无需实例化）
url.getOrigin('https://example.com:8080/path')
// 'https://example.com:8080'

url.getHost('https://example.com:8080/path')
// 'example.com:8080'

url.getHostname('https://example.com:8080/path')
// 'example.com'

url.getPathname('https://example.com/api/users?id=1')
// '/api/users'

url.getSearch('https://example.com?key=value')
// '?key=value'

url.getHash('https://example.com/path#section')
// '#section'
```

### Hash 路径操作

```js
import { Url } from 'js-cool'

const u = new Url('https://example.com#/user/profile?tab=settings')

// 获取 hash 路径（# 后到 ? 之前的部分）
u.getHashPath()
// '/user/profile'

// 设置 hash 路径
u.setHashPath('/dashboard').toString()
// 'https://example.com#/dashboard?tab=settings'
```

### 工厂方法

```js
import { Url } from 'js-cool'

// 从当前页面 URL 创建
Url.current()
// Url 实例（浏览器环境）

// 从查询字符串创建
Url.fromQueryString('a=1&b=2').toObject()
// { a: '1', b: '2' }
```

---

## 直接导入 vs 命名空间导入

```js
// 方式 1: 命名空间导入
import { url, Url } from 'js-cool'

url.parse('?a=1')
url.stringify({ a: 1 })
url.getPathname('https://example.com/path')

// 方式 2: 直接导入静态方法
import { parse, stringify, getPathname } from 'js-cool/url'

parse('?a=1')
stringify({ a: 1 })
getPathname('https://example.com/path')

// 方式 3: 使用 Url 类
import { Url } from 'js-cool'

Url.parse('?a=1')
Url.stringify({ a: 1 })
new Url('https://example.com').get('id')
```

---

## 总结

| 场景                   | 推荐方案                                 |
| ---------------------- | ---------------------------------------- |
| 解析查询字符串         | `url.parse()` 或 `Url.parse()`           |
| 构建查询字符串         | `url.stringify()` 或 `Url.stringify()`   |
| 获取单个参数（search） | `new Url(url).get(name, 'search')`       |
| 获取单个参数（hash）   | `new Url(url).get(name, 'hash')`         |
| 获取所有参数（search） | `new Url(url).toObject('search')`        |
| 获取所有参数（hash）   | `new Url(url).toObject('hash')`          |
| 链式 URL 构建          | `new Url(url).set().delete().toString()` |
| URL 属性提取           | `url.getPathname()` 等静态方法           |
| 区分参数来源           | `new Url(url).toDetailObject()`          |

**推荐**：新的 `Url` 类功能更全面，支持 search 和 hash 两套参数系统，推荐统一使用 `Url` 类处理所有 URL 相关需求。
