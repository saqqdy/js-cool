# punctualTimer

精准 setInterval - 一个补偿漂移以保持准确时间的计时器。

## 用法

```js
import { punctualTimer } from 'js-cool'
```

## 签名

```typescript
interface PunctualTimerReturns {
  clear: () => void
  count: number
  timer: number | null
}

function punctualTimer<TArgs extends any[]>(
  handler: (...args: TArgs) => void,
  delay: number,
  ...args: TArgs
): PunctualTimerReturns
```

## 参数

| 参数       | 类型       | 描述                                             |
| ---------- | ---------- | ------------------------------------------------ |
| `handler`  | `function` | 计时器到期后要执行的函数                         |
| `delay`    | `number`   | 计时器在执行指定函数前应等待的时间（毫秒）       |
| `...args`  | `any[]`    | 传递给 handler 函数的额外参数                    |

## 返回值

`PunctualTimerReturns` - 包含计时器控制属性的对象。

| 属性    | 类型       | 描述                         |
| ------- | ---------- | ---------------------------- |
| `clear` | `function` | 清除计时器                   |
| `count` | `number`   | handler 已执行的次数         |
| `timer` | `number`   | 计时器 ID（可用于 clearTimeout）|

## 示例

```js
const printDate = () => console.log(new Date())
const timer = punctualTimer(printDate, 1000)
console.log(timer.count) // 10

// 清除计时器
timer.clear()

// 或使用 clearTimeout
clearTimeout(timer.timer)
```

## 相关

- [delay](/api/utility/delay) - 延迟执行指定时间
- [waiting](/api/utility/waiting) - 基于 Promise 的等待
