# Storage 模块重构建议

> **采用方案**: 方案 A - 统一命名空间（不保留旧 API）
>
> **目标**: 创建统一的 `storage` 命名空间，提供一致、类型安全的存储 API

---

## 一、当前实现分析

### 1.1 方法列表

| 方法 | 存储类型 | 功能 |
|------|----------|------|
| `setCache` | localStorage | 设置（支持过期） |
| `getCache` | localStorage | 获取（自动过期清理） |
| `delCache` | localStorage | 删除 |
| `setSession` | sessionStorage | 设置（支持过期） |
| `getSession` | sessionStorage | 获取（自动过期清理） |
| `delSession` | sessionStorage | 删除 |
| `setCookie` | Cookie | 设置 |
| `getCookie` | Cookie | 获取单个 |
| `getCookies` | Cookie | 获取所有 |
| `delCookie` | Cookie | 删除 |

### 1.2 现有问题

| 问题 | 描述 |
|------|------|
| API 不一致 | `setCache` 有错误类型，`setSession` 没有；参数风格不统一 |
| Cookie 功能缺失 | 缺少 `domain`、`secure` 选项 |
| 类型不完整 | `getSession` 返回 `any`，缺少泛型支持 |
| 缺少实用方法 | 没有 `has`、`clear`、`keys` 等 |
| 命名冗余 | `getCache`/`setCache` vs `getCookie`/`setCookie` 风格不一 |

---

## 二、新 API 设计

### 2.1 命名空间结构

```ts
import { storage } from 'js-cool'

// localStorage
storage.local.set('key', value)
storage.local.get('key')
storage.local.delete('key')

// sessionStorage
storage.session.set('key', value)
storage.session.get('key')
storage.session.delete('key')

// Cookie
storage.cookie.set('key', value)
storage.cookie.get('key')
storage.cookie.getAll()
storage.cookie.delete('key')
```

### 2.2 类型定义

```ts
// ==================== 选项类型 ====================

/** 存储选项（localStorage / sessionStorage） */
interface StorageOptions {
  /** 过期时间（秒） */
  expires?: number
}

/** Cookie 选项 */
interface CookieOptions {
  /** 过期时间（秒），默认 86400（1天） */
  expires?: number
  /** 路径，默认 '/' */
  path?: string
  /** 域名 */
  domain?: string
  /** 是否仅 HTTPS 传输 */
  secure?: boolean
  /** SameSite 策略 */
  sameSite?: 'Strict' | 'Lax' | 'None'
}

/** Cookie 删除选项 */
interface CookieDeleteOptions {
  path?: string
  domain?: string
}

// ==================== API 接口 ====================

/** 通用存储 API（localStorage / sessionStorage） */
interface StorageAPI {
  /**
   * 设置存储值
   * @param name 键名
   * @param value 值（任意类型，自动 JSON 序列化）
   * @param options 选项（expires: 过期秒数）
   */
  set<T = unknown>(name: string, value: T, options?: StorageOptions): void

  /**
   * 获取存储值
   * @param name 键名
   * @returns 值或 null（不存在/已过期/存储不可用）
   */
  get<T = unknown>(name: string): T | null

  /**
   * 删除存储值
   * @param name 键名
   */
  delete(name: string): void

  /**
   * 检查键是否存在
   * @param name 键名
   */
  has(name: string): boolean

  /**
   * 获取所有键名
   */
  keys(): string[]

  /**
   * 清空所有存储
   */
  clear(): void

  /**
   * 获取存储项数量
   */
  readonly length: number
}

/** Cookie 存储 API */
interface CookieAPI {
  /**
   * 设置 Cookie
   * @param name 键名
   * @param value 值（string | number | boolean）
   * @param options 选项
   */
  set(name: string, value: string | number | boolean, options?: CookieOptions): void

  /**
   * 获取单个 Cookie
   * @param name 键名
   * @returns 值或 null
   */
  get(name: string): string | null

  /**
   * 获取所有 Cookie
   * @returns 键值对对象
   */
  getAll(): Record<string, string>

  /**
   * 删除 Cookie
   * @param name 键名
   * @param options 选项（path/domain 需与设置时一致）
   */
  delete(name: string, options?: CookieDeleteOptions): void

  /**
   * 检查 Cookie 是否存在
   * @param name 键名
   */
  has(name: string): boolean

  /**
   * 清空所有 Cookie
   */
  clear(): void
}

// ==================== 命名空间 ====================

/** 存储命名空间 */
interface StorageNamespace {
  /** localStorage 存储 */
  readonly local: StorageAPI
  /** sessionStorage 存储 */
  readonly session: StorageAPI
  /** Cookie 存储 */
  readonly cookie: CookieAPI
}

// 导出
export const storage: StorageNamespace
export type { StorageOptions, CookieOptions, CookieDeleteOptions, StorageAPI, CookieAPI, StorageNamespace }
```

---

## 三、文件结构

### 3.1 目录结构

```
src/storage/
├── index.ts          # 导出入口，创建 storage 命名空间
├── types.ts          # 类型定义
├── errors.ts         # 错误类型
├── local.ts          # localStorage 实现
├── session.ts        # sessionStorage 实现
├── cookie.ts         # Cookie 实现
└── utils.ts          # 工具函数
```

### 3.2 文件职责

| 文件 | 职责 |
|------|------|
| `types.ts` | 所有类型定义 |
| `errors.ts` | `StorageQuotaError`、`StorageUnavailableError` |
| `utils.ts` | `isStorageAvailable`、`parseStorageData` 等工具函数 |
| `local.ts` | localStorage API 实现 |
| `session.ts` | sessionStorage API 实现 |
| `cookie.ts` | Cookie API 实现 |
| `index.ts` | 组装并导出 `storage` 命名空间 |

---

## 四、详细实现

### 4.1 types.ts - 类型定义

```ts
/**
 * Storage module types
 * @module storage/types
 */

/** 存储数据结构（内部使用） */
export interface StorageData<T = unknown> {
  expires?: number
  value: T
}

/** 存储选项（localStorage / sessionStorage） */
export interface StorageOptions {
  /** 过期时间（秒） */
  expires?: number
}

/** Cookie 选项 */
export interface CookieOptions {
  /** 过期时间（秒），默认 86400（1天） */
  expires?: number
  /** 路径，默认 '/' */
  path?: string
  /** 域名 */
  domain?: string
  /** 是否仅 HTTPS 传输 */
  secure?: boolean
  /** SameSite 策略 */
  sameSite?: 'Strict' | 'Lax' | 'None'
}

/** Cookie 删除选项 */
export interface CookieDeleteOptions {
  path?: string
  domain?: string
}

/** 通用存储 API */
export interface StorageAPI {
  set<T = unknown>(name: string, value: T, options?: StorageOptions): void
  get<T = unknown>(name: string): T | null
  delete(name: string): void
  has(name: string): boolean
  keys(): string[]
  clear(): void
  readonly length: number
}

/** Cookie 存储 API */
export interface CookieAPI {
  set(name: string, value: string | number | boolean, options?: CookieOptions): void
  get(name: string): string | null
  getAll(): Record<string, string>
  delete(name: string, options?: CookieDeleteOptions): void
  has(name: string): boolean
  clear(): void
}

/** 存储命名空间 */
export interface StorageNamespace {
  readonly local: StorageAPI
  readonly session: StorageAPI
  readonly cookie: CookieAPI
}
```

### 4.2 errors.ts - 错误类型

```ts
/**
 * Storage error types
 * @module storage/errors
 */

/**
 * 存储配额超出错误
 *
 * @example
 * ```ts
 * try {
 *   storage.local.set('key', largeData)
 * } catch (e) {
 *   if (e instanceof StorageQuotaError) {
 *     console.error('Storage quota exceeded')
 *   }
 * }
 * ```
 */
export class StorageQuotaError extends Error {
  constructor(message: string = 'Storage quota exceeded') {
    super(message)
    this.name = 'StorageQuotaError'
  }
}

/**
 * 存储不可用错误
 *
 * 当 localStorage/sessionStorage 不可用时抛出
 * （如：隐私模式、SSR 环境、存储被禁用）
 */
export class StorageUnavailableError extends Error {
  constructor(message: string = 'Storage is not available') {
    super(message)
    this.name = 'StorageUnavailableError'
  }
}
```

### 4.3 utils.ts - 工具函数

```ts
/**
 * Storage utility functions
 * @module storage/utils
 */

import type { StorageData } from './types'

/**
 * 检查 Web Storage 是否可用
 * @param storage - localStorage 或 sessionStorage
 */
export function isStorageAvailable(storage: Storage): boolean {
  try {
    const testKey = '__storage_test__'
    storage.setItem(testKey, testKey)
    storage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

/**
 * 解析存储数据（处理过期逻辑）
 * @param data - 原始存储字符串
 * @param removeExpired - 过期时删除的回调
 */
export function parseStorageData<T>(
  data: string | null,
  removeExpired: () => void
): T | null {
  if (!data) return null

  try {
    const obj: StorageData<T> = JSON.parse(data)

    // 检查是否为 StorageData 结构
    if (typeof obj === 'object' && obj !== null && ('value' in obj || 'expires' in obj)) {
      // 检查过期
      if (!obj.expires || obj.expires > Date.now()) {
        return obj.value
      }
      // 已过期，删除并返回 null
      removeExpired()
      return null
    }

    // 兼容旧格式（直接存储的 JSON）
    return obj as T
  } catch {
    // 非 JSON，返回原始字符串
    return data as unknown as T
  }
}

/**
 * 创建存储数据结构
 */
export function createStorageData<T>(value: T, expires?: number): StorageData<T> {
  return {
    expires: expires ? Date.now() + expires * 1000 : undefined,
    value,
  }
}
```

### 4.4 local.ts - localStorage 实现

```ts
/**
 * localStorage API
 * @module storage/local
 */

import { StorageQuotaError, StorageUnavailableError } from './errors'
import type { StorageAPI, StorageOptions, StorageData } from './types'
import { isStorageAvailable, parseStorageData, createStorageData } from './utils'

/** localStorage 存储 API */
export const local: StorageAPI = {
  set<T = unknown>(name: string, value: T, options?: StorageOptions): void {
    if (!isStorageAvailable(localStorage)) {
      throw new StorageUnavailableError('localStorage is not available')
    }

    const data: StorageData<T> = createStorageData(value, options?.expires)

    try {
      localStorage.setItem(name, JSON.stringify(data))
    } catch (e) {
      if (
        e instanceof DOMException &&
        (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      ) {
        throw new StorageQuotaError(`localStorage quota exceeded for key "${name}"`)
      }
      throw e
    }
  },

  get<T = unknown>(name: string): T | null {
    try {
      const data = localStorage.getItem(name)
      return parseStorageData<T>(data, () => {
        try {
          localStorage.removeItem(name)
        } catch { /* ignore */ }
      })
    } catch {
      return null
    }
  },

  delete(name: string): void {
    try {
      localStorage.removeItem(name)
    } catch { /* ignore */ }
  },

  has(name: string): boolean {
    try {
      return localStorage.getItem(name) !== null
    } catch {
      return false
    }
  },

  keys(): string[] {
    try {
      return Object.keys(localStorage)
    } catch {
      return []
    }
  },

  clear(): void {
    try {
      localStorage.clear()
    } catch { /* ignore */ }
  },

  get length(): number {
    try {
      return localStorage.length
    } catch {
      return 0
    }
  },
}
```

### 4.5 session.ts - sessionStorage 实现

```ts
/**
 * sessionStorage API
 * @module storage/session
 */

import { StorageQuotaError, StorageUnavailableError } from './errors'
import type { StorageAPI, StorageOptions, StorageData } from './types'
import { isStorageAvailable, parseStorageData, createStorageData } from './utils'

/** sessionStorage 存储 API */
export const session: StorageAPI = {
  set<T = unknown>(name: string, value: T, options?: StorageOptions): void {
    if (!isStorageAvailable(sessionStorage)) {
      throw new StorageUnavailableError('sessionStorage is not available')
    }

    const data: StorageData<T> = createStorageData(value, options?.expires)

    try {
      sessionStorage.setItem(name, JSON.stringify(data))
    } catch (e) {
      if (
        e instanceof DOMException &&
        (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      ) {
        throw new StorageQuotaError(`sessionStorage quota exceeded for key "${name}"`)
      }
      throw e
    }
  },

  get<T = unknown>(name: string): T | null {
    try {
      const data = sessionStorage.getItem(name)
      return parseStorageData<T>(data, () => {
        try {
          sessionStorage.removeItem(name)
        } catch { /* ignore */ }
      })
    } catch {
      return null
    }
  },

  delete(name: string): void {
    try {
      sessionStorage.removeItem(name)
    } catch { /* ignore */ }
  },

  has(name: string): boolean {
    try {
      return sessionStorage.getItem(name) !== null
    } catch {
      return false
    }
  },

  keys(): string[] {
    try {
      return Object.keys(sessionStorage)
    } catch {
      return []
    }
  },

  clear(): void {
    try {
      sessionStorage.clear()
    } catch { /* ignore */ }
  },

  get length(): number {
    try {
      return sessionStorage.length
    } catch {
      return 0
    }
  },
}
```

### 4.6 cookie.ts - Cookie 实现

```ts
/**
 * Cookie API
 * @module storage/cookie
 */

import type { CookieAPI, CookieOptions, CookieDeleteOptions } from './types'

/**
 * Cookie 存储 API
 */
export const cookie: CookieAPI = {
  set(name: string, value: string | number | boolean, options?: CookieOptions): void {
    const {
      expires = 86400,
      path = '/',
      domain,
      secure = false,
      sameSite,
    } = options ?? {}

    const date = new Date(Date.now() + expires * 1000)
    let cookieStr = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=${path}`

    if (domain) {
      cookieStr += `;domain=${domain}`
    }

    // SameSite=None 必须配合 Secure
    if (secure || sameSite === 'None') {
      cookieStr += ';Secure'
    }

    if (sameSite) {
      cookieStr += `;SameSite=${sameSite}`
    }

    document.cookie = cookieStr
  },

  get(name: string): string | null {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
    const arr = document.cookie.match(reg)
    return arr ? decodeURIComponent(arr[2]) : null
  },

  getAll(): Record<string, string> {
    const cookies: Record<string, string> = {}
    const cookieArr = decodeURIComponent(document.cookie).split('; ')
    const nullValues = ['null', 'undefined', 'NaN']

    for (let i = cookieArr.length - 1; i >= 0; i--) {
      const valPair = cookieArr[i].split('=')
      if (valPair.length >= 2) {
        const [key, value] = valPair
        cookies[key] = nullValues.includes(value) ? '' : value
      }
    }

    return cookies
  },

  delete(name: string, options?: CookieDeleteOptions): void {
    const { path = '/', domain } = options ?? {}
    const value = this.get(name)

    if (value !== null) {
      const date = new Date(Date.now() - 1000)
      let cookieStr = `${name}=${value};expires=${date.toUTCString()};path=${path}`

      if (domain) {
        cookieStr += `;domain=${domain}`
      }

      document.cookie = cookieStr
    }
  },

  has(name: string): boolean {
    return this.get(name) !== null
  },

  clear(): void {
    const cookies = this.getAll()
    for (const name of Object.keys(cookies)) {
      this.delete(name)
    }
  },
}
```

### 4.7 index.ts - 入口文件

```ts
/**
 * Storage module - Unified storage API
 *
 * @module storage
 * @example
 * ```ts
 * import { storage } from 'js-cool'
 *
 * // localStorage
 * storage.local.set('user', { id: 1, name: 'John' })
 * storage.local.set('token', 'abc', { expires: 3600 })
 * const user = storage.local.get<{ id: number; name: string }>('user')
 * storage.local.has('token')  // true
 * storage.local.delete('token')
 *
 * // sessionStorage
 * storage.session.set('temp', 'value', { expires: 60 })
 * storage.session.get('temp')
 * storage.session.clear()
 *
 * // Cookie
 * storage.cookie.set('session', 'xyz', { expires: 86400, sameSite: 'Strict' })
 * storage.cookie.get('session')
 * storage.cookie.getAll()
 * storage.cookie.delete('session')
 * ```
 */

import { local } from './local'
import { session } from './session'
import { cookie } from './cookie'

export { local } from './local'
export { session } from './session'
export { cookie } from './cookie'
export { StorageQuotaError, StorageUnavailableError } from './errors'
export type {
  StorageOptions,
  CookieOptions,
  CookieDeleteOptions,
  StorageAPI,
  CookieAPI,
  StorageNamespace,
} from './types'

/**
 * 统一存储命名空间
 */
export const storage = {
  local,
  session,
  cookie,
} as const

export default storage
```

---

## 五、主入口导出

### 5.1 src/index.ts 更新

```ts
// ==================== Storage 存储操作 ====================
export {
  storage,
  local,
  session,
  cookie,
  StorageQuotaError,
  StorageUnavailableError,
  type StorageOptions,
  type CookieOptions,
  type CookieDeleteOptions,
  type StorageAPI,
  type CookieAPI,
  type StorageNamespace,
} from './storage/index'

// 删除旧的导出：
// - setCache, getCache, delCache
// - setSession, getSession, delSession
// - setCookie, getCookie, getCookies, delCookie
```

---

## 六、使用示例

### 6.1 localStorage

```ts
import { storage } from 'js-cool'

// 基础用法
storage.local.set('name', 'John')
storage.local.get('name')  // 'John'
storage.local.has('name')  // true
storage.local.delete('name')
storage.local.get('name')  // null

// 存储对象
interface User { id: number; name: string }
storage.local.set<User>('user', { id: 1, name: 'John' })
const user = storage.local.get<User>('user')  // { id: 1, name: 'John' }

// 带过期时间
storage.local.set('token', 'abc123', { expires: 3600 })  // 1小时过期

// 批量操作
storage.local.keys()      // ['user', 'token']
storage.local.length      // 2
storage.local.clear()     // 清空所有

// 错误处理
try {
  storage.local.set('large', hugeData)
} catch (e) {
  if (e instanceof StorageQuotaError) {
    console.error('存储空间不足')
  }
}
```

### 6.2 sessionStorage

```ts
import { storage } from 'js-cool'

// 表单临时数据
storage.session.set('formData', { name: 'test', email: 'test@example.com' })
storage.session.get('formData')

// 向导步骤数据（带过期）
storage.session.set('wizard', { step: 2, data: {...} }, { expires: 1800 })  // 30分钟

// 清空当前会话
storage.session.clear()
```

### 6.3 Cookie

```ts
import { storage } from 'js-cool'

// 基础用法
storage.cookie.set('token', 'abc123')
storage.cookie.get('token')  // 'abc123'
storage.cookie.has('token')  // true

// 带选项
storage.cookie.set('session', 'xyz', {
  expires: 86400,       // 1天
  path: '/',
  domain: '.example.com',
  secure: true,
  sameSite: 'Strict'
})

// 获取所有
storage.cookie.getAll()  // { token: 'abc123', session: 'xyz' }

// 删除（需匹配 path/domain）
storage.cookie.delete('session', { path: '/', domain: '.example.com' })

// 清空所有
storage.cookie.clear()
```

---

## 七、迁移指南

### 7.1 对照表

| 旧 API | 新 API |
|--------|--------|
| `setCache('key', value)` | `storage.local.set('key', value)` |
| `setCache('key', value, 60)` | `storage.local.set('key', value, { expires: 60 })` |
| `getCache('key')` | `storage.local.get('key')` |
| `delCache('key')` | `storage.local.delete('key')` |
| - | `storage.local.has('key')` |
| - | `storage.local.keys()` |
| - | `storage.local.clear()` |
| `setSession('key', value)` | `storage.session.set('key', value)` |
| `setSession('key', value, 60)` | `storage.session.set('key', value, { expires: 60 })` |
| `getSession('key')` | `storage.session.get('key')` |
| `delSession('key')` | `storage.session.delete('key')` |
| - | `storage.session.has('key')` |
| - | `storage.session.clear()` |
| `setCookie('key', value, 60)` | `storage.cookie.set('key', value, { expires: 60 })` |
| `setCookie('key', value, 60, '/')` | `storage.cookie.set('key', value, { expires: 60, path: '/' })` |
| `getCookie('key')` | `storage.cookie.get('key')` |
| `getCookies()` | `storage.cookie.getAll()` |
| `delCookie('key')` | `storage.cookie.delete('key')` |
| - | `storage.cookie.has('key')` |
| - | `storage.cookie.clear()` |

### 7.2 迁移示例

```ts
// ========== 旧代码 ==========
import { setCache, getCache, delCache, setCookie, getCookie } from 'js-cool'

setCache('user', { id: 1, name: 'John' })
setCache('token', 'abc', 3600)
const user = getCache('user')
delCache('token')

setCookie('session', 'xyz', 86400, '/', true)
const session = getCookie('session')

// ========== 新代码 ==========
import { storage } from 'js-cool'

storage.local.set('user', { id: 1, name: 'John' })
storage.local.set('token', 'abc', { expires: 3600 })
const user = storage.local.get<{ id: number; name: string }>('user')
storage.local.delete('token')

storage.cookie.set('session', 'xyz', {
  expires: 86400,
  path: '/',
  secure: true
})
const session = storage.cookie.get('session')
```

---

## 八、破坏性变更

### 8.1 删除的 API

以下旧 API 将被移除：

```
setCache    → storage.local.set
getCache    → storage.local.get
delCache    → storage.local.delete

setSession  → storage.session.set
getSession  → storage.session.get
delSession  → storage.session.delete

setCookie   → storage.cookie.set
getCookie   → storage.cookie.get
getCookies  → storage.cookie.getAll
delCookie   → storage.cookie.delete
```

### 8.2 参数变更

| 变更 | 旧 | 新 |
|------|----|----|
| 过期参数位置 | `setCache(k, v, 60)` | `storage.local.set(k, v, { expires: 60 })` |
| Cookie 参数 | `setCookie(k, v, seconds, path, samesite)` | `storage.cookie.set(k, v, { expires, path, sameSite })` |
| 删除方法名 | `delCache` | `storage.local.delete` |

### 8.3 类型变更

| 变更 | 旧 | 新 |
|------|----|----|
| getSession 返回类型 | `any` | `T \| null` |
| getCache 返回类型 | `unknown \| null` | `T \| null` |

---

## 九、实施计划

### Phase 1: 创建新模块

1. 创建 `src/storage/` 目录
2. 实现所有文件（types.ts, errors.ts, utils.ts, local.ts, session.ts, cookie.ts, index.ts）
3. 编写单元测试

### Phase 2: 更新主入口

1. 在 `src/index.ts` 中导出新 API
2. 移除旧 API 导出
3. 更新文档

### Phase 3: 发布

1. 更新版本号（考虑 semver：major 或 minor）
2. 更新 CHANGELOG
3. 更新 README 和 API 文档

---

## 十、注意事项

1. **SSR 兼容**: 所有方法在 SSR 环境下安全返回 `null` 或空数组
2. **隐私模式**: 检测存储可用性，不可用时抛出 `StorageUnavailableError`
3. **过期清理**: 读取时自动清理过期数据
4. **类型安全**: 所有 `get` 方法支持泛型
5. **Cookie 删除**: `delete` 时 `path`/`domain` 需与设置时一致才能删除成功
