# maxDate <Badge type="info" text="since v6.0.0" />

从列表中获取最大（最晚）的日期。

## 用法

```js
import { maxDate } from 'js-cool'
```

## 签名

```typescript
function maxDate(...dates: (Date | string | number)[]): Date
```

## 参数

| 参数      | 类型                         | 描述       |
| --------- | ---------------------------- | ---------- |
| `...dates`| `(Date \| string \| number)[]` | 日期列表   |

## 返回值

`Date` - 列表中最晚的日期。如果所有日期都无效则返回当前日期。

## 示例

```js
maxDate('2024-01-01', '2024-01-03', '2024-01-02')
// => 2024-01-03 的 Date 对象

maxDate(new Date('2024-01-01'), new Date('2024-01-02'))
// => 2024-01-02 的 Date 对象

maxDate('2024-06-01', '2024-01-15', '2024-12-31')
// => 2024-12-31 的 Date 对象
```

## 相关

- [minDate](./min-date.md) - 获取最小日期
- [compareDate](./compare-date.md) - 比较两个日期
