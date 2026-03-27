# 存储工具

js-cool 提供统一的存储 API，支持过期时间、泛型类型和错误处理。

## 概览

`storage` 命名空间为 `localStorage`、`sessionStorage` 和 `Cookie` 提供一致的 API：

```js
import { storage } from 'js-cool'

// localStorage
storage.local.set('key', 'value', { expires: 3600 })
storage.local.get('key')

// sessionStorage
storage.session.set('key', 'value', { expires: 60 })
storage.session.get('key')

// Cookie
storage.cookie.set('key', 'value', { expires: 86400, sameSite: 'Strict' })
storage.cookie.get('key')
```

## 子路径导入

为了更好的 tree-shaking，可以从存储子路径导入：

```js
import { storage, local, session, cookie } from 'js-cool/storage'
import type { StorageOptions, CookieOptions } from 'js-cool/storage'
```

## LocalStorage

### 基础用法

```js
import { storage } from 'js-cool'

// 设置项
storage.local.set('name', 'John')

// 获取项（不存在返回 null）
const name = storage.local.get('name')

// 检查是否存在
storage.local.has('name') // true

// 删除项
storage.local.delete('name')

// 获取所有键名
storage.local.keys() // ['key1', 'key2', ...]

// 获取数量
storage.local.length // 2

// 清空所有
storage.local.clear()
```

### 带过期时间

```js
// 设置过期时间（秒）
storage.local.set('token', 'abc123', { expires: 3600 }) // 1小时

// 过期项自动返回 null
storage.local.get('token') // 过期后返回 null
```

### 泛型类型支持

```ts
interface User {
  id: number
  name: string
  email: string
}

// 设置时带类型
storage.local.set<User>('user', { id: 1, name: 'John', email: 'john@example.com' })

// 获取时带类型推断
const user = storage.local.get<User>('user')
// user: User | null
```

### 错误处理

```ts
import { storage, StorageQuotaError, StorageUnavailableError } from 'js-cool'

try {
  storage.local.set('key', largeData)
} catch (e) {
  if (e instanceof StorageQuotaError) {
    console.error('存储空间已满')
  } else if (e instanceof StorageUnavailableError) {
    console.error('存储不可用（SSR 或隐私模式）')
  }
}
```

## SessionStorage

API 与 localStorage 相同：

```js
import { storage } from 'js-cool'

// 设置项（可选过期时间）
storage.session.set('temp', 'value', { expires: 1800 }) // 30分钟

// 获取项
const temp = storage.session.get('temp')

// 删除项
storage.session.delete('temp')

// 清空所有
storage.session.clear()
```

## Cookie

### 基础用法

```js
import { storage } from 'js-cool'

// 设置 Cookie（默认1天过期）
storage.cookie.set('token', 'abc123')

// 获取 Cookie
const token = storage.cookie.get('token')

// 检查是否存在
storage.cookie.has('token') // true

// 获取所有 Cookie
const cookies = storage.cookie.getAll()
// { token: 'abc123', session: 'xyz' }

// 删除 Cookie
storage.cookie.delete('token')

// 清空所有 Cookie
storage.cookie.clear()
```

### Cookie 选项

```js
storage.cookie.set('session', 'xyz', {
  expires: 86400,       // 过期时间（秒），默认 86400（1天）
  path: '/',            // Cookie 路径，默认 '/'
  domain: '.example.com', // Cookie 域名
  secure: true,         // 仅 HTTPS 传输
  sameSite: 'Strict',   // 'Strict' | 'Lax' | 'None'
})
```

### 带选项删除 Cookie

删除 Cookie 时，`path` 和 `domain` 必须与设置时的值一致：

```js
// 设置时带路径和域名
storage.cookie.set('session', 'xyz', {
  expires: 86400,
  path: '/app',
  domain: '.example.com',
})

// 删除时需匹配路径和域名
storage.cookie.delete('session', {
  path: '/app',
  domain: '.example.com',
})
```

### SameSite 和 Secure

`SameSite=None` 需要 `Secure` 为 true：

```js
// 跨站请求使用
storage.cookie.set('crossSite', 'value', {
  sameSite: 'None',
  secure: true, // SameSite=None 必须设置
})
```

## 直接导入

为方便使用，也可以直接导入存储模块：

```js
import { local, session, cookie } from 'js-cool'

// 直接使用
local.set('key', 'value')
session.set('key', 'value')
cookie.set('key', 'value')
```

## 从 v5.x 迁移

旧的独立函数已被统一命名空间取代：

| v5.x（已移除） | v6.x |
| -------------- | ---- |
| `setCache(key, value)` | `storage.local.set(key, value)` |
| `setCache(key, value, seconds)` | `storage.local.set(key, value, { expires: seconds })` |
| `getCache(key)` | `storage.local.get(key)` |
| `delCache(key)` | `storage.local.delete(key)` |
| `setSession(key, value)` | `storage.session.set(key, value)` |
| `getSession(key)` | `storage.session.get(key)` |
| `delSession(key)` | `storage.session.delete(key)` |
| `setCookie(key, value, seconds)` | `storage.cookie.set(key, value, { expires: seconds })` |
| `setCookie(key, value, seconds, path)` | `storage.cookie.set(key, value, { expires: seconds, path })` |
| `getCookie(key)` | `storage.cookie.get(key)` |
| `getCookies()` | `storage.cookie.getAll()` |
| `delCookie(key)` | `storage.cookie.delete(key)` |
| - | `storage.local.has(key)` |
| - | `storage.local.keys()` |
| - | `storage.local.clear()` |
| - | `storage.cookie.has(key)` |
| - | `storage.cookie.clear()` |

### 迁移示例

```js
// ========== v5.x ==========
import { setCache, getCache, delCache, setCookie, getCookie } from 'js-cool'

setCache('user', { id: 1, name: 'John' })
setCache('token', 'abc', 3600)
const user = getCache('user')
delCache('token')

setCookie('session', 'xyz', 86400, '/', true)
const session = getCookie('session')

// ========== v6.x ==========
import { storage } from 'js-cool'

storage.local.set('user', { id: 1, name: 'John' })
storage.local.set('token', 'abc', { expires: 3600 })
const user = storage.local.get<{ id: number; name: string }>('user')
storage.local.delete('token')

storage.cookie.set('session', 'xyz', {
  expires: 86400,
  path: '/',
  secure: true,
})
const session = storage.cookie.get('session')
```

## 最佳实践

### 何时使用哪种存储？

| 存储 | 容量 | 过期方式 | 使用场景 |
| ---- | ---- | -------- | -------- |
| localStorage | ~5MB | 手动 | 用户偏好、缓存数据 |
| sessionStorage | ~5MB | 关闭标签页 | 临时会话数据 |
| Cookie | ~4KB | 自定义 | 认证、跟踪 |

### 示例：用户会话

```js
import { storage } from 'js-cool'

// 在 localStorage 存储用户数据
storage.local.set('userData', userObject, { expires: 86400 })

// 在 Cookie 存储认证令牌
storage.cookie.set('authToken', token, {
  expires: 86400,
  secure: true,
  sameSite: 'Strict',
})

// 检查是否已登录
function isLoggedIn() {
  return storage.cookie.has('authToken') && storage.local.has('userData')
}

// 登出
function logout() {
  storage.local.delete('userData')
  storage.cookie.delete('authToken')
}
```

### SSR 兼容性

所有存储方法都能优雅处理 SSR 环境：

```js
// 在 SSR（Node.js）环境中，这些返回 null/空值而不会报错
storage.local.get('key') // null
storage.local.keys() // []
storage.local.length // 0
storage.cookie.get('key') // null
storage.cookie.getAll() // {}
```

## 相关链接

- [存储 API 参考](/zh/api/storage/)
- [迁移指南](/zh/guide/migration)
