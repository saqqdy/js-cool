# relativeTime

获取相对时间字符串（例如："3分钟前"、"2小时后"）。

## 用法

```js
import { relativeTime } from 'js-cool'
```

## 签名

```typescript
function relativeTime(date: Date | string | number, now?: Date, locale?: string): string
```

## 参数

| 参数名   | 类型                       | 描述                             |
| -------- | -------------------------- | -------------------------------- |
| `date`   | `Date \| string \| number` | 要比较的日期                     |
| `now`    | `Date`                     | 当前日期（默认值：`new Date()`） |
| `locale` | `string`                   | 语言环境字符串（默认值：`'en'`） |

## 返回值

`string` - 相对时间字符串。如果日期无效，返回空字符串。

## 支持的语言

| 语言 | 代码 | 示例输出        |
| ---- | ---- | --------------- |
| 英语 | `en` | "5 minutes ago" |
| 中文 | `zh` | "5分钟前"       |

## 示例

```js
relativeTime(new Date(Date.now() - 1000 * 60 * 5))
// => '5 minutes ago'

relativeTime(new Date(Date.now() + 1000 * 60 * 60 * 2))
// => 'in 2 hours'

relativeTime(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7))
// => '7 days ago'

relativeTime(new Date(Date.now() - 1000 * 60 * 3), new Date(), 'zh')
// => '3分钟前'

relativeTime(new Date())
// => 'just now'
```

## 相关

- [formatDate](./format-date.md) - 格式化日期字符串
- [dateDiff](./date-diff.md) - 计算日期差值
- [isToday](./is-today.md) - 检查日期是否为今天
