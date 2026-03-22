# delCache <Badge type="info" text="v1.0.2" />

从 localStorage 删除项。

## 用法

```js
import { delCache } from 'js-cool'
```

## 签名

```typescript
function delCache(key: string): void
```

## 参数

| 参数  | 类型     | 描述       |
| ----- | -------- | ---------- |
| `key` | `string` | 要删除的键 |

## 示例

```js
setCache('user', { name: 'John' })
delCache('user')
getCache('user') // null
```

## 相关

- [setCache](/zh/api/storage/set-cache) - 设置缓存项
- [getCache](/zh/api/storage/get-cache) - 获取缓存项
