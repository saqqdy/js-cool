# URL 函数迁移指南

本文档说明旧的 URL 函数如何迁移到新的 `url` 命名空间。

## 快速对照表

| 旧函数           | 新 `url` 替代   | 是否完全替代  | 说明            |
| ---------------- | --------------- | ------------- | --------------- |
| `parseUrlParam`  | `url.parse`     | ✅ 完全替代   | 功能相同        |
| `spliceUrlParam` | `url.stringify` | ✅ 完全替代   | 功能相同        |
| `getUrlParams`   | `url.parse`     | ✅ 完全替代   | 功能相同        |
| `getUrlParam`    | `url.get`       | ✅ 完全替代   | 功能相同        |
| `getQueryParams` | ❌ 无直接替代   | ⚠️ 需手动处理 | hash 内参数解析 |
| `getQueryParam`  | ❌ 无直接替代   | ⚠️ 需手动处理 | hash 内参数解析 |
| `getDirParam`    | `getDirParams`  | ✅ 已替代     | 返回结构更完善  |

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

url.parse('?key1=100&key2=true', { covert: true })
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

url.parse('https://test.com?id=100&active=true', { covert: true })
// { id: 100, active: true }
```

### 4. `getUrlParam` → `url.get` ✅

```js
// 旧写法
import { getUrlParam } from 'js-cool'

getUrlParam('key1', 'https://test.com?key1=100#/home?key1=200')
// '100'  ← 只取 # 前的参数

getUrlParam('token') // 使用当前页面 URL
// 'abc123'

// 新写法
import { url } from 'js-cool'

url.get('key1', 'https://test.com?key1=100#/home?key1=200')
// '100'  ← 只取 search 部分

url.get('token') // 使用当前页面 URL
// 'abc123'
```

### 5. `getQueryParams` / `getQueryParam` ⚠️ 无直接替代

这两个函数处理的是 **hash 内的参数**（`#` 后面的参数），新的 `url` 命名空间只处理 **search 参数**（`?` 后面的参数）。

```js
// 旧写法 - 获取 hash 内参数
import { getQueryParams, getQueryParam } from 'js-cool'

getQueryParams('https://test.com?key1=100#/home?key2=200')
// { key2: '200' }  ← 取 # 后的参数

getQueryParam('key2', 'https://test.com?key1=100#/home?key2=200')
// '200'

// 新写法 - 需要手动处理
import { url, Url } from 'js-cool'

const u = new Url('https://test.com?key1=100#/home?key2=200')
const hashParams = url.parse(u.hash.replace(/^#/, '').replace(/^[^?]*/, ''))
// { key2: '200' }

// 或者提取 hash 中的查询字符串
const hash = 'https://test.com#/home?key2=200'.split('#')[1] || ''
const hashSearch = hash.includes('?') ? '?' + hash.split('?')[1] : ''
url.parse(hashSearch)
// { key2: '200' }
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

新的 `url` 命名空间提供了旧函数没有的功能：

### 链式 URL 构建

```js
import { Url, url } from 'js-cool'

// 使用 Url 类
const newUrl = new Url('https://api.example.com')
  .path('users', '123', 'profile')
  .set('fields', 'name,email')
  .setHash('section')
  .toString()
// 'https://api.example.com/users/123/profile?fields=name,email#section'

// 使用 url.from 工厂方法
url.from('https://example.com?id=123').set('page', 2).delete('id').toString()
// 'https://example.com?page=2'
```

### URLSearchParams-like 方法

```js
import { url } from 'js-cool'

// 获取所有值（重复参数）
url.getAll('id', 'https://example.com?id=1&id=2&id=3')
// ['1', '2', '3']

// 检查参数是否存在
url.has('token', 'https://example.com?token=abc')
// true

// 追加参数（不覆盖）
url.append('id', 2, 'https://example.com?id=1')
// 'https://example.com/?id=1&id=2'

// 删除参数
url.delete('token', 'https://example.com?token=abc&id=1')
// 'https://example.com/?id=1'

// 迭代
url.keys('https://example.com?a=1&b=2')
// ['a', 'b']

url.values('https://example.com?a=1&b=2')
// ['1', '2']

url.entries('https://example.com?a=1&b=2')
// [['a', '1'], ['b', '2']]
```

### URL 属性提取

```js
import { url } from 'js-cool'

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

---

## 总结

| 场景                   | 推荐方案                                              |
| ---------------------- | ----------------------------------------------------- |
| 解析查询字符串         | `url.parse()` 替代 `parseUrlParam()`                  |
| 构建查询字符串         | `url.stringify()` 替代 `spliceUrlParam()`             |
| 获取单个参数（search） | `url.get()` 替代 `getUrlParam()`                      |
| 获取所有参数（search） | `url.parse()` 替代 `getUrlParams()`                   |
| 获取 hash 内参数       | 保留 `getQueryParams()`/`getQueryParam()`，或手动处理 |
| 链式 URL 构建          | 使用 `new Url()` 或 `url.from()`                      |

**注意**：`getQueryParams` 和 `getQueryParam` 两个函数建议保留使用，因为新的 `url` 模块不支持 hash 内参数解析。其他函数都可以用新的 `url` 命名空间替代。
