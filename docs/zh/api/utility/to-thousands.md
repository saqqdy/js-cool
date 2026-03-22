# toThousands <Badge type="info" text="v3.0.0" />

格式化数字为千分位格式。

## 用法

```js
import { toThousands } from 'js-cool'
```

## 签名

```typescript
function toThousands(num: number | string): string
```

## 参数

| 参数  | 类型               | 描述           |
| ----- | ------------------ | -------------- |
| `num` | `number \| string` | 要格式化的数字 |

## 返回值

`string` - 格式化后的字符串。

## 示例

```js
toThousands(1234567) // '1,234,567'
toThousands('1234567.89') // '1,234,567.89'
toThousands(100) // '100'
```
