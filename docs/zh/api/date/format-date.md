# formatDate

将日期格式化为字符串，支持自定义格式标记。

## 用法

```js
import { formatDate } from 'js-cool'
```

## 签名

```typescript
function formatDate(date: Date | string | number, format?: string): string
```

## 参数

| 参数名   | 类型                       | 描述                                      |
| -------- | -------------------------- | ----------------------------------------- |
| `date`   | `Date \| string \| number` | 要格式化的日期                            |
| `format` | `string`                   | 格式字符串（默认值：`'YYYY-MM-DD HH:mm:ss'`）|

## 返回值

`string` - 格式化后的日期字符串。如果日期无效，返回空字符串。

## 格式标记

| 标记   | 描述                     | 示例    |
| ------ | ------------------------ | ------- |
| `YYYY` | 4位数年份                | `2024`  |
| `YY`   | 2位数年份                | `24`    |
| `MM`   | 2位数月份（01-12）       | `01`    |
| `M`    | 月份（1-12）             | `1`     |
| `DD`   | 2位数日期（01-31）       | `15`    |
| `D`    | 日期（1-31）             | `15`    |
| `HH`   | 2位数小时，24小时制（00-23）| `14` |
| `H`    | 小时，24小时制（0-23）   | `14`    |
| `hh`   | 2位数小时，12小时制（01-12）| `02` |
| `h`    | 小时，12小时制（1-12）   | `2`     |
| `mm`   | 2位数分钟（00-59）       | `30`    |
| `m`    | 分钟（0-59）             | `30`    |
| `ss`   | 2位数秒（00-59）         | `45`    |
| `s`    | 秒（0-59）               | `45`    |
| `SSS`  | 3位数毫秒（000-999）     | `123`   |
| `A`    | AM/PM 大写               | `PM`    |
| `a`    | am/pm 小写               | `pm`    |

## 示例

```js
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
// => '2024-01-15 10:30:45'

formatDate(new Date(), 'YYYY/MM/DD')
// => '2024/01/15'

formatDate(new Date('2024-01-15'), 'YYYY年MM月DD日')
// => '2024年01月15日'

formatDate(new Date('2024-01-15 14:30:45'), 'hh:mm A')
// => '02:30 PM'
```

## 相关

- [dateDiff](./date-diff.md) - 计算日期差值
- [relativeTime](./relative-time.md) - 获取相对时间字符串
- [isToday](./is-today.md) - 检查日期是否为今天
