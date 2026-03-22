# clamp <Badge type="info" text="v6.0.0" />

将数字限制在包含的下限和上限范围内。

## 用法

```js
import { clamp } from 'js-cool'
```

## 签名

```typescript
function clamp(number: number, lower: number, upper?: number): number
```

## 参数

| 参数     | 类型     | 描述                                                |
| -------- | -------- | --------------------------------------------------- |
| `number` | `number` | 要限制的数字                                        |
| `lower`  | `number` | 下限                                                |
| `upper`  | `number` | 上限（可选，默认为 `lower`，同时 `lower` 设为 `0`） |

## 返回值

`number` - 限制后的数字。

## 示例

```js
clamp(-10, -5, 5) // -5
clamp(10, -5, 5) // 5
clamp(3, -5, 5) // 3
clamp(10, 5) // 5 (下限为 0，上限为 5)
clamp(3, 5) // 3 (下限为 0，上限为 5)
```

## 相关

- [inRange](/api/number/in-range) - 检查数字是否在范围内
