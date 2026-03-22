# setCache

在 localStorage 中设置项（支持过期时间）。

## 用法

```js
import { setCache } from 'js-cool'
```

## 签名

```typescript
function setCache(key: string, value: any, seconds?: number): void
```

## 参数

| 参数      | 类型     | 描述                 |
| --------- | -------- | -------------------- |
| `key`     | `string` | 键名                 |
| `value`   | `any`    | 要存储的值           |
| `seconds` | `number` | 过期时间（秒），可选 |

## 示例

```js
// 不设置过期时间
setCache('user', { name: 'John' })

// 设置 1 小时后过期
setCache('token', 'abc123', 3600)

// 设置 24 小时后过期
setCache('settings', { theme: 'dark' }, 86400)
```

## 注意

- 值会被序列化为 JSON 存储
- 过期时间与值一起存储
- 会覆盖已存在的值

## 相关

- [getCache](/zh/api/storage/get-cache) - 获取缓存项
- [delCache](/zh/api/storage/del-cache) - 删除缓存项
