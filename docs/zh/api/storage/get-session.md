# getSession

从 sessionStorage 获取项。

## 用法

```js
import { getSession } from 'js-cool'
```

## 签名

```typescript
function getSession<T = any>(key: string): T | null
```

## 参数

| 参数  | 类型     | 描述     |
| ----- | -------- | -------- |
| `key` | `string` | 要获取的键 |

## 返回值

`T | null` - 存储的值，不存在或已过期则返回 `null`。

## 示例

```js
setSession('token', 'abc123', 1800)
getSession('token') // 'abc123'

// 过期后
getSession('token') // null
```

## 相关

- [setSession](/zh/api/storage/set-session) - 设置 session 项
- [delSession](/zh/api/storage/del-session) - 删除 session 项
