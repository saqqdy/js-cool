# Storage 模块 <Badge type="info" text="v6.0.0+" />

`storage` 模块提供统一的浏览器存储 API，支持过期时间、泛型类型和错误处理。

## 导入

```ts
// 从主包导入
import { storage, local, session, cookie } from 'js-cool'

// 从子路径导入（推荐，更好的 tree-shaking）
import { storage, local, session, cookie } from 'js-cool/storage'

// 导入类型
import type {
  StorageOptions,
  CookieOptions,
  CookieDeleteOptions,
  StorageAPI,
  CookieAPI,
  StorageNamespace,
} from 'js-cool/storage'

// 导入错误类
import { StorageQuotaError, StorageUnavailableError } from 'js-cool/storage'
```

## 概览

```ts
const storage: StorageNamespace = {
  local: StorageAPI, // localStorage
  session: StorageAPI, // sessionStorage
  cookie: CookieAPI, // Cookie
}
```

## storage.local

localStorage API，支持过期时间和泛型类型。

### 方法

#### set\<T\>(key, value, options?)

设置 localStorage 项。

```ts
storage.local.set('name', 'John')
storage.local.set('token', 'abc', { expires: 3600 }) // 1小时过期

interface User {
  id: number
  name: string
}
storage.local.set<User>('user', { id: 1, name: 'John' })
```

**参数：**

| 参数      | 类型             | 描述                               |
| --------- | ---------------- | ---------------------------------- |
| `key`     | `string`         | 存储键名                           |
| `value`   | `T`              | 存储值（可 JSON 序列化）           |
| `options` | `StorageOptions` | 可选：`{ expires?: number }`（秒） |

**异常：**

| 错误                      | 条件                                 |
| ------------------------- | ------------------------------------ |
| `StorageUnavailableError` | localStorage 不可用（SSR、隐私模式） |
| `StorageQuotaError`       | 存储空间已满                         |

#### get\<T\>(key): T | null

获取 localStorage 项。

```ts
const name = storage.local.get('name')
const user = storage.local.get<User>('user')
```

**返回值：** `T | null` - 存储的值，不存在或已过期返回 `null`。

#### delete(key): void

删除 localStorage 项。

```ts
storage.local.delete('name')
```

#### has(key): boolean

检查键是否存在。

```ts
storage.local.has('name') // true
```

#### keys(): string[]

获取所有存储键名。

```ts
storage.local.keys() // ['user', 'token', ...]
```

#### clear(): void

清空所有 localStorage 项。

```ts
storage.local.clear()
```

#### length（只读）

获取存储项数量。

```ts
storage.local.length // 3
```

## storage.session

sessionStorage API，接口与 `storage.local` 相同。

```ts
storage.session.set('temp', 'value', { expires: 1800 })
const temp = storage.session.get('temp')
storage.session.delete('temp')
storage.session.has('temp')
storage.session.keys()
storage.session.clear()
storage.session.length
```

## storage.cookie

Cookie API，支持完整选项。

### 方法

#### set(name, value, options?)

设置 Cookie。

```ts
// 基础用法（默认1天过期）
storage.cookie.set('token', 'abc123')

// 带选项
storage.cookie.set('session', 'xyz', {
  expires: 86400, // 1天（秒）
  path: '/', // Cookie 路径
  domain: '.example.com', // Cookie 域名
  secure: true, // 仅 HTTPS
  sameSite: 'Strict', // SameSite 策略
})
```

**参数：**

| 参数      | 类型                          | 描述        |
| --------- | ----------------------------- | ----------- |
| `name`    | `string`                      | Cookie 名称 |
| `value`   | `string \| number \| boolean` | Cookie 值   |
| `options` | `CookieOptions`               | Cookie 选项 |

**CookieOptions：**

| 选项       | 类型                          | 默认值  | 描述           |
| ---------- | ----------------------------- | ------- | -------------- |
| `expires`  | `number`                      | `86400` | 过期时间（秒） |
| `path`     | `string`                      | `'/'`   | Cookie 路径    |
| `domain`   | `string`                      | -       | Cookie 域名    |
| `secure`   | `boolean`                     | `false` | 仅 HTTPS       |
| `sameSite` | `'Strict' \| 'Lax' \| 'None'` | -       | SameSite 策略  |

::: warning SameSite=None
`SameSite=None` 需要 `secure: true` 才能生效。
:::

#### get(name): string | null

获取 Cookie 值。

```ts
const token = storage.cookie.get('token')
```

#### getAll(): Record\<string, string\>

获取所有 Cookie。

```ts
storage.cookie.getAll()
// { token: 'abc123', session: 'xyz' }
```

#### delete(name, options?): void

删除 Cookie。

```ts
storage.cookie.delete('token')

// 需要匹配 path/domain
storage.cookie.delete('session', {
  path: '/app',
  domain: '.example.com',
})
```

::: warning 删除选项
删除 Cookie 时，`path` 和 `domain` 必须与设置时的值一致。
:::

#### has(name): boolean

检查 Cookie 是否存在。

```ts
storage.cookie.has('token') // true
```

#### clear(): void

清空所有 Cookie。

```ts
storage.cookie.clear()
```

## 错误类

### StorageQuotaError

存储空间超出时抛出。

```ts
import { StorageQuotaError } from 'js-cool/storage'

try {
  storage.local.set('key', largeData)
} catch (e) {
  if (e instanceof StorageQuotaError) {
    console.error('存储空间已满')
  }
}
```

### StorageUnavailableError

存储不可用时抛出（SSR、隐私模式、被禁用）。

```ts
import { StorageUnavailableError } from 'js-cool/storage'

try {
  storage.local.set('key', 'value')
} catch (e) {
  if (e instanceof StorageUnavailableError) {
    console.error('存储不可用')
  }
}
```

## 类型定义

```ts
interface StorageOptions {
  /** 过期时间（秒） */
  expires?: number
}

interface CookieOptions {
  /** 过期时间（秒），默认 86400（1天） */
  expires?: number
  /** Cookie 路径，默认 '/' */
  path?: string
  /** Cookie 域名 */
  domain?: string
  /** 仅 HTTPS */
  secure?: boolean
  /** SameSite 策略 */
  sameSite?: 'Strict' | 'Lax' | 'None'
}

interface CookieDeleteOptions {
  path?: string
  domain?: string
}

interface StorageAPI {
  set<T>(name: string, value: T, options?: StorageOptions): void
  get<T>(name: string): T | null
  delete(name: string): void
  has(name: string): boolean
  keys(): string[]
  clear(): void
  readonly length: number
}

interface CookieAPI {
  set(name: string, value: string | number | boolean, options?: CookieOptions): void
  get(name: string): string | null
  getAll(): Record<string, string>
  delete(name: string, options?: CookieDeleteOptions): void
  has(name: string): boolean
  clear(): void
}

interface StorageNamespace {
  readonly local: StorageAPI
  readonly session: StorageAPI
  readonly cookie: CookieAPI
}
```

## 从 v5.x 迁移

| v5.x                 | v6.x                                       |
| -------------------- | ------------------------------------------ |
| `setCache(k, v)`     | `storage.local.set(k, v)`                  |
| `setCache(k, v, s)`  | `storage.local.set(k, v, { expires: s })`  |
| `getCache(k)`        | `storage.local.get(k)`                     |
| `delCache(k)`        | `storage.local.delete(k)`                  |
| `setSession(k, v)`   | `storage.session.set(k, v)`                |
| `getSession(k)`      | `storage.session.get(k)`                   |
| `delSession(k)`      | `storage.session.delete(k)`                |
| `setCookie(k, v, s)` | `storage.cookie.set(k, v, { expires: s })` |
| `getCookie(k)`       | `storage.cookie.get(k)`                    |
| `getCookies()`       | `storage.cookie.getAll()`                  |
| `delCookie(k)`       | `storage.cookie.delete(k)`                 |
