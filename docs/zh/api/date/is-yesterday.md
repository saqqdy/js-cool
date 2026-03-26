# isYesterday <Badge type="info" text="since v6.0.0" />

检查日期是否为昨天。

## 用法

```js
import { isYesterday } from 'js-cool'
```

## 签名

```typescript
function isYesterday(date: Date | string | number): boolean
```

## 参数

| 参数   | 类型                       | 描述         |
| ------ | -------------------------- | ------------ |
| `date` | `Date \| string \| number` | 要检查的日期 |

## 返回值

`boolean` - 如果日期是昨天则返回 `true`，否则返回 `false`。

## 示例

```js
const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
isYesterday(yesterday)
// => true

isYesterday(new Date())
// => false

isYesterday('2024-01-14')
// => false（如果今天不是 2024-01-15）
```

## 相关

- [isToday](./is-today.md) - 检查是否为今天
- [isTomorrow](./is-tomorrow.md) - 检查是否为明天
- [isWeekend](./is-weekend.md) - 检查是否为周末
