# URL Hash 参数解析方案

> **状态**: ✅ 已实现（v6.0.0）
>
> 本方案已在 `Url` 类中实现，支持 search 和 hash 两套参数系统。

---

## 问题背景

URL 模块需要同时解析 **search 部分**（`#` 前的参数）和 **hash 内的参数**（`#` 后的参数）。

### 典型 URL 结构

```
http://a.com/fae?id=10&bar=eee#/about?name=test&code=3
                    └──────┘           └────────────┘
                    search 部分         hash 内参数
                    (# 前)              (# 后)
```

---

## 实现方案（已采用）

采用 **方案四**：`Url` 类内置双参数系统，通过 `scope` 参数区分操作范围。

### API 设计

```ts
class Url {
  // ============ 参数读取 ============

  /**
   * 获取参数值
   * @param name - 参数名
   * @param scope - 范围，默认 'all'（hash 优先）
   */
  get(name: string, scope?: 'search' | 'hash' | 'all'): string | null

  /**
   * 获取所有同名参数值
   */
  getAll(name: string, scope?: 'search' | 'hash' | 'all'): string[]

  /**
   * 检查参数是否存在
   */
  has(name: string, scope?: 'search' | 'hash' | 'all'): boolean

  /**
   * 获取所有参数名
   */
  keys(scope?: 'search' | 'hash' | 'all'): string[]

  /**
   * 获取所有参数值
   */
  values(scope?: 'search' | 'hash' | 'all'): string[]

  /**
   * 获取所有键值对
   */
  entries(scope?: 'search' | 'hash' | 'all'): [string, string][]

  /**
   * 转为对象
   */
  toObject(scope?: 'search' | 'hash' | 'all'): Record<string, string>

  // ============ 参数写入（链式） ============

  /**
   * 设置参数（覆盖）
   * @param scope - 默认 'search'
   */
  set(name: string, value: string | number | boolean, scope?: 'search' | 'hash'): this

  /**
   * 追加参数
   */
  append(name: string, value: string | number | boolean, scope?: 'search' | 'hash'): this

  /**
   * 删除参数
   */
  delete(name: string, scope?: 'search' | 'hash' | 'all'): this

  /**
   * 清空所有参数
   */
  clear(scope?: 'search' | 'hash' | 'all'): this

  // ============ Hash 路径操作 ============

  /**
   * 获取 hash 路径（# 后到 ? 之前的部分）
   */
  getHashPath(): string

  /**
   * 设置 hash 路径
   */
  setHashPath(path: string): this
}
```

### 使用示例

```js
import { Url } from 'js-cool'

const fullUrl = 'http://a.com/fae?id=10&bar=eee#/about?name=test&code=3'
const u = new Url(fullUrl)

// ============ 读取参数 ============

// 获取单个参数（默认 hash 优先）
u.get('id')    // '10' (search)
u.get('name')  // 'test' (hash)

// 显式指定范围
u.get('id', 'search')   // '10'
u.get('id', 'hash')     // null
u.get('name', 'hash')   // 'test'
u.get('name', 'search') // null

// 获取所有参数（合并，hash 优先）
u.toObject()
// { id: '10', bar: 'eee', name: 'test', code: '3' }

// 按范围获取
u.toObject('search')
// { id: '10', bar: 'eee' }

u.toObject('hash')
// { name: 'test', code: '3' }

// 详细信息（区分来源）
u.toDetailObject()
// {
//   search: { id: '10', bar: 'eee' },
//   hash: { name: 'test', code: '3' },
//   all: { id: '10', bar: 'eee', name: 'test', code: '3' },
//   source: { id: 'search', bar: 'search', name: 'hash', code: 'hash' }
// }

// ============ 写入参数 ============

// 设置 search 参数
u.set('token', 'abc', 'search').toString()
// 'http://a.com/fae?id=10&bar=eee&token=abc#/about?name=test&code=3'

// 设置 hash 参数
u.set('page', 2, 'hash').toString()
// 'http://a.com/fae?id=10&bar=eee#/about?name=test&code=3&page=2'

// 删除参数
u.delete('id', 'search').toString()  // 删除 search 参数
u.delete('name', 'hash').toString()  // 删除 hash 参数
u.delete('id').toString()            // 删除所有范围的参数

// ============ Hash 路径操作 ============

u.getHashPath()  // '/about'
u.setHashPath('/dashboard').toString()
// 'http://a.com/fae?id=10&bar=eee#/dashboard?name=test&code=3'
```

---

## 与旧函数的关系

| 旧函数           | 功能                 | 新替代方案                        |
| ---------------- | -------------------- | --------------------------------- |
| `getQueryParam`  | 获取 hash 内单个参数 | `new Url(url).get(name, 'hash')`  |
| `getQueryParams` | 获取 hash 内所有参数 | `new Url(url).toObject('hash')`   |
| `getUrlParam`    | 获取 search 单个参数 | `new Url(url).get(name, 'search')`|
| `getUrlParams`   | 获取 search 所有参数 | `new Url(url).toObject('search')` |

### 迁移示例

```js
// 旧写法
import { getQueryParam, getQueryParams, getUrlParam, getUrlParams } from 'js-cool'

// 获取 hash 参数
getQueryParam('name', 'http://a.com#/about?name=test')
// 'test'

getQueryParams('http://a.com#/about?name=test&code=3', true)
// { name: 'test', code: 3 }

// 获取 search 参数
getUrlParam('id', 'http://a.com?id=10#/about')
// '10'

getUrlParams('http://a.com?id=10&bar=eee', true)
// { id: 10, bar: 'eee' }

// 新写法
import { Url } from 'js-cool'

// 获取 hash 参数
new Url('http://a.com#/about?name=test').get('name', 'hash')
// 'test'

new Url('http://a.com#/about?name=test&code=3').toObject('hash')
// { name: 'test', code: '3' }

// 获取 search 参数
new Url('http://a.com?id=10#/about').get('id', 'search')
// '10'

new Url('http://a.com?id=10&bar=eee').toObject('search')
// { id: '10', bar: 'eee' }

// 获取所有参数（hash 优先）
new Url('http://a.com?id=10#/about?name=test').toObject()
// { id: '10', name: 'test' }
```

---

## 设计优势

### 1. 统一的 API

- 不需要记忆 `getUrlParam` vs `getQueryParam` 的区别
- 通过 `scope` 参数统一控制范围

### 2. 链式操作

```js
new Url(url)
  .set('token', 'abc', 'search')
  .set('page', 1, 'hash')
  .delete('id', 'search')
  .toString()
```

### 3. 类型安全

```ts
const u = new Url(url)
const value: string | null = u.get('id', 'search')
const params: Record<string, string> = u.toObject('hash')
```

### 4. 与静态方法配合

```js
import { url, Url } from 'js-cool'

// 静态方法用于简单场景
url.parse('?a=1')           // { a: '1' }
url.stringify({ a: 1 })     // '?a=1'
url.getPathname(fullUrl)    // '/fae'

// Url 类用于复杂场景
const u = new Url(fullUrl)
u.get('id', 'search')
u.toObject('hash')
```

---

## 历史方案对比

| 方案                                          | 优点                          | 缺点                                | 状态   |
| --------------------------------------------- | ----------------------------- | ----------------------------------- | ------ |
| 方案一：新增 `getHashParams` / `getHashParam` | 简单直观，与现有 API 风格一致 | 新增方法较多                        | ❌ 未采用 |
| 方案二：扩展 `parse` / `get` 支持 `part` 参数 | 不增加新方法，API 简洁        | 改变现有 API 语义，可能影响现有用户 | ❌ 未采用 |
| 方案三：新增 `hash` 命名空间                  | 结构清晰，可扩展性强          | 需要新增命名空间                    | ❌ 未采用 |
| **方案四：`Url` 类内置双参数系统**            | 面向对象，链式调用友好，API 统一 | 需要实例化                       | ✅ 已采用 |

---

> 文档更新时间：2026-03-27
>
> 实现版本：v6.0.0
