# getCache <Badge type="info" text="v1.0.2" />

从 localStorage 获取项。

## 用法

```js
import { getCache } from 'js-cool'
```

## 签名

```typescript
function getCache<T = any>(key: string): T | null
```

## 参数

| 参数  | 类型     | 描述 |
| ----- | -------- | ---- |
| `key` | `string` | 键名 |

## 返回值

`T | null` - 缓存的值，不存在或已过期则返回 `null`。

## 示例

```js
// 获取缓存值
const user = getCache('user') // { name: 'John' }

// 带类型获取
interface User {
  name: string
  age: number
}
const typedUser = getCache<User>('user')

// 过期则返回 null
setCache('token', 'abc', 1) // 1秒后过期
setTimeout(() => {
  getCache('token') // null（已过期）
}, 2000)
```

## 注意

- 键不存在时返回 `null`
- 已过期时返回 `null` 并自动删除
- 自动解析 JSON

## 相关

- [setCache](/zh/api/storage/set-cache) - 设置缓存项
- [delCache](/zh/api/storage/del-cache) - 删除缓存项
