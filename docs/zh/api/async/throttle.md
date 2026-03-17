# throttle

节流函数，限制函数在一定时间内只能执行一次。

## 用法

```js
import { throttle } from 'js-cool'
```

## 签名

```typescript
function throttle<T extends AnyFunction>(
  fn: T,
  wait?: number,
  options?: ThrottleOptions
): T & { cancel: () => void; flush: () => void }

interface ThrottleOptions {
  leading?: boolean
  trailing?: boolean
}
```

## 参数

| 参数名     | 类型              | 描述                               |
| ---------- | ----------------- | ---------------------------------- |
| `fn`       | `T`               | 要节流的函数                       |
| `wait`     | `number`          | 节流的毫秒数（默认值：`0`）        |
| `options`  | `ThrottleOptions` | 选项对象                           |

### ThrottleOptions

| 属性名     | 类型      | 描述                                     |
| ---------- | --------- | ---------------------------------------- |
| `leading`  | `boolean` | 是否在延迟开始前执行（默认值：`true`）   |
| `trailing` | `boolean` | 是否在延迟结束后执行（默认值：`true`）   |

## 返回值

`T & { cancel: () => void; flush: () => void }` - 返回节流后的函数，带有以下附加方法：
- `cancel()` - 取消待执行的函数
- `flush()` - 立即执行并清空待执行的函数

## 示例

```js
// 基本用法
const throttledFn = throttle(() => {
  console.log('节流执行!')
}, 300)

// 带选项
const throttledFn = throttle(fn, 300, { leading: true, trailing: true })

// 取消待执行
throttledFn.cancel()

// 立即执行
throttledFn.flush()
```

## 相关

- [debounce](/api/async/debounce) - 防抖函数执行
