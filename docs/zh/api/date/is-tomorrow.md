# isTomorrow <Badge type="info" text="since v6.0.0" />

检查日期是否为明天。

## 用法

```js
import { isTomorrow } from 'js-cool'
```

## 签名

```typescript
function isTomorrow(date: Date | string | number): boolean
```

## 参数

| 参数   | 类型                       | 描述         |
| ------ | -------------------------- | ------------ |
| `date` | `Date \| string \| number` | 要检查的日期 |

## 返回值

`boolean` - 如果日期是明天则返回 `true`，否则返回 `false`。

## 示例

```js
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
isTomorrow(tomorrow)
// => true

isTomorrow(new Date())
// => false

isTomorrow('2024-01-16')
// => false（如果今天不是 2024-01-15）
```

## 相关

- [isToday](./is-today.md) - 检查是否为今天
- [isYesterday](./is-yesterday.md) - 检查是否为昨天
- [isWeekend](./is-weekend.md) - 检查是否为周末
