# isToday <Badge type="info" text="v6.0.0" />

检查日期是否为今天。

## 用法

```js
import { isToday } from 'js-cool'
```

## 签名

```typescript
function isToday(date: Date | string | number): boolean
```

## 参数

| 参数名 | 类型                       | 描述         |
| ------ | -------------------------- | ------------ |
| `date` | `Date \| string \| number` | 要检查的日期 |

## 返回值

`boolean` - 如果日期是今天返回 `true`，否则返回 `false`。

## 示例

```js
isToday(new Date())
// => true

isToday(new Date('2020-01-01'))
// => false（如果今天不是 2020-01-01）

isToday(Date.now())
// => true

isToday('2024-01-15')
// => false（如果今天不是 2024-01-15）
```

## 相关

- [formatDate](./format-date.md) - 格式化日期字符串
- [dateDiff](./date-diff.md) - 计算日期差值
- [relativeTime](./relative-time.md) - 获取相对时间字符串
