# setSession

在 sessionStorage 中设置项（支持过期时间）。

## 用法

```js
import { setSession } from 'js-cool'
```

## 签名

```typescript
function setSession(key: string, value: any, seconds?: number): void
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
setSession('token', 'abc123')

// 设置 30 分钟后过期
setSession('token', 'abc123', 1800)
```

## 相关

- [getSession](/zh/api/storage/get-session) - 获取 session 项
- [delSession](/zh/api/storage/del-session) - 删除 session 项
