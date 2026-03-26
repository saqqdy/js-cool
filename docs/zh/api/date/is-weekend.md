# isWeekend <Badge type="info" text="since v6.0.0" />

检查日期是否为周末（周六或周日）。

## 用法

```js
import { isWeekend } from 'js-cool'
```

## 签名

```typescript
function isWeekend(date: Date | string | number): boolean
```

## 参数

| 参数   | 类型                       | 描述         |
| ------ | -------------------------- | ------------ |
| `date` | `Date \| string \| number` | 要检查的日期 |

## 返回值

`boolean` - 如果日期是周六或周日则返回 `true`，否则返回 `false`。

## 示例

```js
isWeekend(new Date('2024-01-06'))
// => true（周六）

isWeekend(new Date('2024-01-07'))
// => true（周日）

isWeekend(new Date('2024-01-08'))
// => false（周一）

isWeekend('2024-01-20')
// => true（周六）
```

## 相关

- [isToday](./is-today.md) - 检查是否为今天
- [isLeapYear](./is-leap-year.md) - 检查是否为闰年
