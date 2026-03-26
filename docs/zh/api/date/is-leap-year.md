# isLeapYear <Badge type="info" text="since v6.0.0" />

检查年份是否为闰年。

## 用法

```js
import { isLeapYear } from 'js-cool'
```

## 签名

```typescript
function isLeapYear(year: number): boolean
```

## 参数

| 参数   | 类型     | 描述         |
| ------ | -------- | ------------ |
| `year` | `number` | 要检查的年份 |

## 返回值

`boolean` - 如果年份是闰年则返回 `true`，否则返回 `false`。

## 示例

```js
isLeapYear(2024)
// => true

isLeapYear(2023)
// => false

isLeapYear(2000)
// => true（能被 400 整除）

isLeapYear(1900)
// => false（能被 100 整除但不能被 400 整除）
```

## 相关

- [getDaysInMonth](./get-days-in-month.md) - 获取月份天数
- [isWeekend](./is-weekend.md) - 检查是否为周末
