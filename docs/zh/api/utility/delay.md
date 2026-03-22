# delay

延迟执行指定时间。

## 用法

```js
import { delay } from 'js-cool'
```

## 签名

```typescript
function delay(ms: number): Promise<void>
```

## 参数

| 参数 | 类型     | 描述       |
| ---- | -------- | ---------- |
| `ms` | `number` | 延迟毫秒数 |

## 返回值

`Promise<void>` - 延迟后 resolve。

## 示例

```js
await delay(1000) // 等待 1 秒
console.log('1 秒后执行')

// 在异步函数中使用
async function loadData() {
  await delay(500)
  return fetch('/api/data')
}
```

## 相关

- [waiting](/zh/api/utility/waiting) - 基于 Promise 的等待
