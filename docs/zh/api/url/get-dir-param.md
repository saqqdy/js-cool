# getDirParam

获取目录风格的 URL 参数。

## 用法

```js
import { getDirParam } from 'js-cool'
```

## 签名

```typescript
function getDirParam(path: string): Record<string, string>
```

## 参数

| 参数   | 类型     | 描述                         |
| ------ | -------- | ---------------------------- |
| `path` | `string` | 带有 `:paramName` 的路径模式 |

## 返回值

`Record<string, string>` - 提取的参数对象。

## 示例

```js
// URL: /api/users/123/posts/456
getDirParam('/api/users/:userId/posts/:postId')
// { userId: '123', postId: '456' }

// 当前路径
getDirParam('/products/:category/:id')
// { category: 'electronics', id: '123' }
```
