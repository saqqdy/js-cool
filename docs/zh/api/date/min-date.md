# minDate <Badge type="info" text="since v6.0.0" />

从列表中获取最小（最早）的日期。

## 用法

```js
import { minDate } from 'js-cool'
```

## 签名

```typescript
function minDate(...dates: (Date | string | number)[]): Date
```

## 参数

| 参数      | 类型                         | 描述       |
| --------- | ---------------------------- | ---------- |
| `...dates`| `(Date \| string \| number)[]` | 日期列表   |

## 返回值

`Date` - 列表中最早的日期。如果所有日期都无效则返回当前日期。

## 示例

```js
minDate('2024-01-03', '2024-01-01', '2024-01-02')
// => 2024-01-01 的 Date 对象

minDate(new Date('2024-01-01'), new Date('2024-01-02'))
// => 2024-01-01 的 Date 对象

minDate('2024-06-01', '2024-01-15', '2024-12-31')
// => 2024-01-15 的 Date 对象
```

## 相关

- [maxDate](./max-date.md) - 获取最大日期
- [compareDate](./compare-date.md) - 比较两个日期
