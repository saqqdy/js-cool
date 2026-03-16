# promiseFactory

创建一个可访问值的 Promise。

## 用法

```js
import { promiseFactory } from 'js-cool'
```

## 签名

```typescript
function promiseFactory<T>(
  value: T,
  resolver: () => Promise<T>
): T & Promise<T>
```

## 参数

| 参数       | 类型                | 描述              |
| ---------- | ------------------- | ----------------- |
| `value`    | `T`                 | 初始值            |
| `resolver` | `() => Promise<T>`  | Promise 解析器    |

## 返回值

`T & Promise<T>` - 同时支持同步和异步的值。

## 示例

```js
const stats = { value: 100 }
const result = promiseFactory(stats, () =>
  new Promise(resolve => {
    stats.value = 200
    resolve(stats)
  })
)

console.log(result.value) // 100（同步）
const awaited = await result
console.log(awaited.value) // 200（异步）
```
