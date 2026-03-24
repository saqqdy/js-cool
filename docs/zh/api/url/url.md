# url & Url <Badge type="tip" text="since v6.0.0" />

链式 URL 构建器和类 URLSearchParams API，用于 URL 解析和操作。

## 安装

```bash
pnpm add js-cool
```

## 使用方式

```js
// 从主入口完整导入
import { url, Url } from 'js-cool'

// 或导入特定函数（使用描述性名称）
import {
  parseQueryString,
  stringifyQueryString,
  getQueryParamValue,
  setQueryParam,
  getOrigin
} from 'js-cool'
```

## 三种使用方式

### 1. Url 类（链式构建器）

`Url` 类提供链式 API 用于构建和操作 URL。

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
  .path('users', '123', 'profile')
  .set('fields', 'name,email')
  .setHash('section')
  .toString()
// 'https://api.example.com/users/123/profile?fields=name,email#section'
```

### 2. url 命名空间（工厂 + 静态方法）

`url` 命名空间提供工厂方法和静态工具函数。

```js
import { url } from 'js-cool'

// 工厂方法 - 创建 Url 实例
url.from('https://example.com?id=123').get('id') // '123'

url.from('https://example.com').set('page', 1).set('size', 10).toString()
// 'https://example.com?page=1&size=10'

// 静态工具方法
url.parse('?a=1&b=true', { covert: true }) // { a: 1, b: true }
url.stringify({ a: 1, b: 2 }) // '?a=1&b=2'
url.getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
```

### 3. 直接导入函数

导入特定函数以获得更小的打包体积。

```js
import {
  getQueryParamValue,
  setQueryParam,
  hasQueryParam,
  appendQueryParam,
  deleteParam,
  parseQueryString,
  stringifyQueryString,
  getOrigin,
  getHost,
  getHostname,
} from 'js-cool'

getQueryParamValue('id', 'https://example.com?id=123') // '123'
setQueryParam('page', 2, 'https://example.com') // 'https://example.com/?page=2'
```

## Url 类 API

### 构造函数

```js
const u = new Url() // 空实例
const u = new Url('https://example.com?id=123') // 带 URL 字符串
```

### 类 URLSearchParams 方法

```js
const u = new Url('https://example.com?id=1&id=2&page=1')

// 获取单个值
u.get('id') // '1'（第一个值）

// 获取所有值
u.getAll('id') // ['1', '2']

// 检查是否存在
u.has('id') // true
u.has('token') // false

// 设置（可链式）
u.set('page', 2) // 返回 this 以便链式调用

// 追加（可链式）
u.append('id', '3') // 添加 id=3

// 删除（可链式）
u.delete('token') // 返回 this 以便链式调用

// 迭代
u.keys() // ['id', 'page']
u.values() // ['1', '2']
u.entries() // [['id', '1'], ['id', '2'], ['page', '1']]
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

// 保留 search 和 hash
u.set('key', 'value').setHash('section').path('api', 'users')
// 'https://example.com/api/users?key=value#section'
```

### Hash 操作

```js
const u = new Url('https://example.com')

// 设置 hash（可链式）
u.setHash('section') // 'https://example.com#section'

// 替换现有 hash
u.setHash('new-section') // 'https://example.com#new-section'
```

### 解析与转换

```js
const u = new Url('https://example.com?a=1&b=true&page=2')

// 解析查询字符串
u.parse() // { a: '1', b: 'true', page: '2' }
u.parse({ covert: true }) // { a: 1, b: true, page: 2 }

// 获取参数对象
u.toParams() // { a: '1', b: 'true', page: '2' }

// 转换为字符串
u.toString() // 'https://example.com?a=1&b=true&page=2'
```

## url 命名空间 API

### 工厂方法

```js
// 创建 Url 实例
const u = url.from('https://example.com?id=123')
u.get('id') // '123'
```

### 类 URLSearchParams 方法（静态）

```js
// 获取单个值
url.get('id', 'https://example.com?id=123') // '123'
url.get('missing', 'https://example.com?id=123') // null

// 获取所有值
url.getAll('id', 'https://example.com?id=1&id=2') // ['1', '2']

// 检查是否存在
url.has('token', 'https://example.com?token=abc') // true

// 设置参数（返回新 URL 字符串）
url.set('page', 2, 'https://example.com') // 'https://example.com/?page=2'
url.set('page', 3, 'https://example.com?page=1') // 'https://example.com/?page=3'

// 追加参数
url.append('id', 2, 'https://example.com?id=1') // 'https://example.com/?id=1&id=2'

// 删除参数
url.delete('token', 'https://example.com?token=abc&id=1') // 'https://example.com/?id=1'

// 迭代
url.keys('https://example.com?a=1&b=2') // ['a', 'b']
url.values('https://example.com?a=1&b=2') // ['1', '2']
url.entries('https://example.com?a=1&b=2') // [['a', '1'], ['b', '2']]
```

### URL 属性提取（静态）

```js
// Origin（协议 + 主机）
url.getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
url.getOrigin('/relative/path') // ''（相对路径返回空）

// Host（主机名 + 端口）
url.getHost('https://example.com:8080/path') // 'example.com:8080'

// Hostname（不含端口）
url.getHostname('https://example.com:8080/path') // 'example.com'

// Pathname
url.getPathname('https://example.com/api/users?id=1') // '/api/users'

// Search（查询字符串，含 ?）
url.getSearch('https://example.com?key=value') // '?key=value'

// Hash（含 #）
url.getHash('https://example.com/path#section') // '#section'
```

### 解析与构建

```js
// 解析查询字符串为对象
url.parse('?a=1&b=2&c=true')
// { a: '1', b: '2', c: 'true' }

// 带类型转换
url.parse('?a=1&b=true&c=null', { covert: true })
// { a: 1, b: true, c: null }

// 从对象构建查询字符串
url.stringify({ a: 1, b: 2 }) // '?a=1&b=2'

// 不含 ? 前缀
url.stringify({ a: 1 }, { withQuestionMark: false }) // 'a=1'

// URI 编码
url.stringify({ name: 'hello world' }, { encode: true }) // '?name=hello%20world'
```

### 常量

```js
// URL 解析模式
url.PATTERNS // URL_PATTERNS 对象

// 值转换映射
url.VALUE_MAP // { 'true': true, 'false': false, 'null': null, ... }
```

## 类型定义

```ts
import type { URLPatternName, URLInput, ParseOptions, StringifyOptions } from 'js-cool'

// 解析选项
interface ParseOptions {
  /** 转换特殊值（true/false/null/undefined/数字） */
  covert?: boolean
}

// 构建选项
interface StringifyOptions {
  /** 将 null/undefined 转换为空字符串 */
  covert?: boolean
  /** URI 编码值 */
  encode?: boolean
  /** 包含 ? 前缀 */
  withQuestionMark?: boolean
}

// URL 输入类型
type URLInput = string | URL
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

### 分页助手

```js
import { url } from 'js-cool'

function buildPaginationUrl(baseUrl, page, size, filters = {}) {
  return url
    .from(baseUrl)
    .set('page', page)
    .set('size', size)
    .set('filters', JSON.stringify(filters))
    .toString()
}

buildPaginationUrl('https://api.example.com/users', 1, 20, { status: 'active' })
```

### 查询字符串解析

```js
import { url } from 'js-cool'

// 从当前页面 URL
const params = url.parse(location.search, { covert: true })
// { page: 1, size: 20, active: true }

// 从任意 URL
const { page, size } = url.parse('?page=2&size=10', { covert: true })
```

### URL 操作

```js
import { url } from 'js-cool'

// 移除追踪参数
let cleanUrl = 'https://example.com/page?id=123&utm_source=google&utm_campaign=ads'
cleanUrl = url.delete('utm_source', cleanUrl)
cleanUrl = url.delete('utm_campaign', cleanUrl)
// 'https://example.com/page?id=123'

// 添加参数
const newUrl = url.set('ref', 'email', cleanUrl)
// 'https://example.com/page?id=123&ref=email'
```

## 从 v5.x 迁移

URL 工具是 v6.0.0 新增功能。现有函数如 `getUrlParam`、`parseUrlParam` 等无需迁移，继续正常工作。

完整说明请参考 [迁移指南](../../guide/migration.md#url-工具)。
