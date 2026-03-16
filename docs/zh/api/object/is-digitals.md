# isDigitals

检查字符串是否只包含数字。

## 用法

```js
import { isDigitals } from 'js-cool'
```

## 签名

```typescript
function isDigitals(value: string): boolean
```

## 参数

| 参数    | 类型     | 描述       |
| ------- | -------- | ---------- |
| `value` | `string` | 要检查的字符串 |

## 返回值

`boolean` - 如果字符串全是数字则返回 `true`。

## 示例

```js
isDigitals('12345') // true
isDigitals('123.45') // false
isDigitals('abc') // false
isDigitals('') // false
```
