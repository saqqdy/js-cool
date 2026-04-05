# debounce <Badge type="info" text="v6.0.0" />

防抖函数，延迟执行函数直到在最后一次调用后经过指定的等待时间。如果提供了 `maxWait`，则会同时进行节流，确保函数在 `maxWait` 时间内最多执行一次。

## 用法

```js
import { debounce } from 'js-cool'
```

## 签名

```typescript
function debounce<T extends AnyFunction>(
  fn: T,
  wait?: number,
  options?: DebounceOptions
): DebouncedFunction<T>

interface DebounceOptions {
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

interface DebouncedFunction<T extends AnyFunction> {
  (...args: Parameters<T>): ReturnType<T> | undefined
  cancel: () => void
  flush: () => ReturnType<T> | undefined
  pending: () => boolean
}
```

## 参数

| 参数名    | 类型              | 描述                        |
| --------- | ----------------- | --------------------------- |
| `fn`      | `T`               | 要防抖的函数                |
| `wait`    | `number`          | 延迟的毫秒数（默认值：`0`） |
| `options` | `DebounceOptions` | 选项对象                    |

### DebounceOptions

| 属性名     | 类型      | 描述                                    |
| ---------- | --------- | --------------------------------------- |
| `leading`  | `boolean` | 是否在延迟开始前执行（默认值：`false`） |
| `trailing` | `boolean` | 是否在延迟结束后执行（默认值：`true`）  |
| `maxWait`  | `number`  | 最大等待时间，用于实现节流效果          |

## 返回值

`DebouncedFunction<T>` - 返回防抖后的函数，带有以下附加方法：

- `cancel()` - 取消待执行的函数
- `flush()` - 立即执行并清空待执行的函数
- `pending()` - 检查是否有待执行的函数

## 示例

```js
// 基本用法
const debouncedFn = debounce(() => {
  console.log('防抖执行!')
}, 300)

// 带选项
const debouncedFn = debounce(fn, 300, { leading: true, trailing: true })

// 使用 maxWait 实现类似 throttle 的效果
const debouncedFn = debounce(fn, 300, { maxWait: 1000 })

// 取消待执行
debouncedFn.cancel()

// 立即执行
debouncedFn.flush()

// 检查是否有待执行
if (debouncedFn.pending()) {
  console.log('有待执行的函数')
}
```

## 相关

- [throttle](/api/async/throttle) - 节流函数执行
