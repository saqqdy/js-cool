# inRange

检查数字是否在起始值和结束值之间（不包含结束值）。如果未指定结束值，则将其设为起始值，同时起始值设为 0。

## 用法

```js
import { inRange } from 'js-cool'
```

## 签名

```typescript
function inRange(number: number, start: number, end?: number): boolean
```

## 参数

| 参数     | 类型     | 描述                         |
| -------- | -------- | ---------------------------- |
| `number` | `number` | 要检查的数字                 |
| `start`  | `number` | 范围的起始值                 |
| `end`    | `number` | 范围的结束值（不包含，可选） |

## 返回值

`boolean` - 如果数字在范围内返回 `true`，否则返回 `false`。

## 示例

```js
inRange(3, 1, 5) // true
inRange(5, 1, 5) // false（结束值不包含在内）
inRange(1, 5) // true（起始值为 0，结束值为 5）
inRange(5, 2) // false（起始值为 0，结束值为 2）
inRange(-3, -5, 0) // true
```

## 注意事项

- `end` 值是不包含在内的（不包含在范围内）
- 如果省略 `end`，范围是从 `0` 到 `start`
- 正确处理负数范围
- 如果 `start > end`，会自动交换 `start` 和 `end`

## 相关

- [clamp](/api/number/clamp) - 将数字限制在范围内
