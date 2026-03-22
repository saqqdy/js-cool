# retry

重试函数，直到成功或达到重试限制。

## 用法

```js
import { retry } from 'js-cool'
```

## 签名

```typescript
async function retry<T>(fn: () => T | Promise<T>, options?: RetryOptions): Promise<T>

interface RetryOptions {
  times?: number
  delay?: number
  shouldRetry?: (error: Error, attempt: number) => boolean
  onRetry?: (error: Error, attempt: number) => void
}
```

## 参数

| 参数名    | 类型                    | 描述         |
| --------- | ----------------------- | ------------ |
| `fn`      | `() => T \| Promise<T>` | 要重试的函数 |
| `options` | `RetryOptions`          | 重试选项     |

### RetryOptions

| 属性名        | 类型                                         | 描述                                |
| ------------- | -------------------------------------------- | ----------------------------------- |
| `times`       | `number`                                     | 重试次数（默认值：`3`）             |
| `delay`       | `number`                                     | 重试之间的延迟毫秒数（默认值：`0`） |
| `shouldRetry` | `(error: Error, attempt: number) => boolean` | 判断是否应该重试的函数              |
| `onRetry`     | `(error: Error, attempt: number) => void`    | 每次重试时的回调函数                |

## 返回值

`Promise<T>` - 返回一个 Promise，成功时解析为函数的结果。

## 示例

```js
// 基本用法
const result = await retry(() => fetchData(), { times: 3, delay: 1000 })

// 带 shouldRetry
const result = await retry(() => fetchData(), {
  times: 5,
  shouldRetry: error => error.message.includes('network'),
})

// 带 onRetry 回调
const result = await retry(() => fetchData(), {
  times: 3,
  onRetry: (error, attempt) => console.log(`第 ${attempt} 次重试: ${error.message}`),
})
```

## 相关

- [debounce](/api/async/debounce) - 防抖函数执行
- [throttle](/api/async/throttle) - 节流函数执行
