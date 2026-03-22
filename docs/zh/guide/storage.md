# 存储工具

js-cool 提供了支持过期时间的浏览器存储工具。

## LocalStorage

### setCache

设置 localStorage 项（支持过期时间）。

```js
import { setCache } from 'js-cool'

// 设置过期时间（秒）
setCache('user', { name: 'John' }, 3600) // 1小时后过期
```

### getCache

获取 localStorage 项。

```js
import { getCache } from 'js-cool'

getCache('user') // { name: 'John' }
// 已过期或不存在则返回 null
```

### delCache

删除 localStorage 项。

```js
import { delCache } from 'js-cool'

delCache('user')
```

## SessionStorage

### setSession

设置 sessionStorage 项（支持过期时间）。

```js
import { setSession } from 'js-cool'

setSession('token', 'abc123', 1800) // 30分钟后过期
```

### getSession

获取 sessionStorage 项。

```js
import { getSession } from 'js-cool'

getSession('token') // 'abc123'
```

### delSession

删除 sessionStorage 项。

```js
import { delSession } from 'js-cool'

delSession('token')
```

## Cookie

### setCookie

设置 Cookie。

```js
import { setCookie } from 'js-cool'

// 基本用法（1天后过期）
setCookie('token', 'xxxxxx')

// 自定义过期时间（秒）
setCookie('session', 'abc123', 20)

// 指定路径
setCookie('token', 'xxxxxx', 86400, '/app')

// 禁用 SameSite（用于跨站请求）
setCookie('data', 'value', 86400, '/', false)
```

### getCookie

获取 Cookie 值。

```js
import { getCookie } from 'js-cool'

getCookie('token') // 'xxxxxx'
```

### getCookies

获取所有 Cookie 为对象。

```js
import { getCookies } from 'js-cool'

getCookies()
// { token: 'xxxxxx', session: 'abc123' }
```

### delCookie

删除 Cookie。

```js
import { delCookie } from 'js-cool'

delCookie('token')
```

## 最佳实践

### 如何选择存储方式？

| 存储方式       | 容量 | 过期时间   | 适用场景           |
| -------------- | ---- | ---------- | ------------------ |
| localStorage   | ~5MB | 手动管理   | 用户偏好、缓存数据 |
| sessionStorage | ~5MB | 关闭标签页 | 临时会话数据       |
| Cookie         | ~4KB | 自定义     | 身份认证、追踪     |

### 示例：用户会话

```js
import { setCache, getCache, delCache, setCookie, getCookie } from 'js-cool'

// 存储用户数据到 localStorage
setCache('userData', userObject, 86400)

// 存储认证令牌到 Cookie
setCookie('authToken', token, 86400)

// 检查是否已登录
function isLoggedIn() {
  return !!getCookie('authToken') && !!getCache('userData')
}

// 退出登录
function logout() {
  delCache('userData')
  delCookie('authToken')
}
```

## 相关

- [存储 API 参考](/zh/api/)
