# getDaysInMonth

获取指定月份的天数。

## 用法

```js
import { getDaysInMonth } from 'js-cool'
```

## 签名

```typescript
function getDaysInMonth(year: number, month: number): number
```

## 参数

| 参数名  | 类型     | 描述                          |
| ------- | -------- | ----------------------------- |
| `year`  | `number` | 年份                          |
| `month` | `number` | 月份（0-11，其中 0 表示一月） |

## 返回值

`number` - 指定月份的天数。

## 示例

```js
getDaysInMonth(2024, 0)  // 2024年1月
// => 31

getDaysInMonth(2024, 1)  // 2024年2月（闰年）
// => 29

getDaysInMonth(2023, 1)  // 2023年2月
// => 28

getDaysInMonth(2024, 3)  // 2024年4月
// => 30

getDaysInMonth(2024, 11) // 2024年12月
// => 31
```

## 相关

- [isToday](./is-today.md) - 检查日期是否为今天
- [formatDate](./format-date.md) - 格式化日期字符串
- [dateDiff](./date-diff.md) - 计算日期差值
