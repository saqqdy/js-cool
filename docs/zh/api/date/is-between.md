# isBetween <Badge type="info" text="since v6.0.0" />

检查日期是否在两个日期之间。

## 用法

```js
import { isBetween } from 'js-cool'
```

## 签名

```typescript
function isBetween(
  date: Date | string | number,
  start: Date | string | number,
  end: Date | string | number,
  inclusive?: boolean
): boolean
```

## 参数

| 参数        | 类型                       | 描述                         |
| ----------- | -------------------------- | ---------------------------- |
| `date`      | `Date \| string \| number` | 要检查的日期                 |
| `start`     | `Date \| string \| number` | 开始日期                     |
| `end`       | `Date \| string \| number` | 结束日期                     |
| `inclusive` | `boolean`                  | 是否包含边界（默认：`true`） |

## 返回值

`boolean` - 如果日期在开始和结束日期之间则返回 `true`，否则返回 `false`。

## 示例

```js
isBetween('2024-01-15', '2024-01-01', '2024-01-31')
// => true

isBetween('2024-01-01', '2024-01-01', '2024-01-31')
// => true（默认包含边界）

isBetween('2024-01-01', '2024-01-01', '2024-01-31', false)
// => false（不包含边界）

isBetween('2024-01-15', '2024-01-01', '2024-01-10')
// => false
```

## 相关

- [isBefore](./is-before.md) - 检查日期是否在另一个日期之前
- [isAfter](./is-after.md) - 检查日期是否在另一个日期之后
- [isSame](./is-same.md) - 检查两个日期是否相同
