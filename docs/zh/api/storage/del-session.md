# delSession <Badge type="info" text="v1.0.2" />

从 sessionStorage 删除项。

## 用法

```js
import { delSession } from 'js-cool'
```

## 签名

```typescript
function delSession(key: string): void
```

## 参数

| 参数  | 类型     | 描述       |
| ----- | -------- | ---------- |
| `key` | `string` | 要删除的键 |

## 示例

```js
setSession('token', 'abc123')
delSession('token')
getSession('token') // null
```

## 相关

- [setSession](/zh/api/storage/set-session) - 设置 session 项
- [getSession](/zh/api/storage/get-session) - 获取 session 项
