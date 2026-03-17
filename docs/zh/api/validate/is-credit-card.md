# isCreditCard

使用 Luhn 算法检查字符串是否为有效的信用卡号码。

## 用法

```js
import { isCreditCard } from 'js-cool'
```

## 签名

```typescript
function isCreditCard(value: string): boolean
```

## 参数

| 参数名  | 类型     | 描述           |
| ------- | -------- | -------------- |
| `value` | `string` | 要检查的字符串 |

## 返回值

`boolean` - 如果字符串是有效的信用卡号码则返回 `true`，否则返回 `false`。

## 示例

```js
isCreditCard('4532015112830366') // true (Visa)
isCreditCard('5555555555554444') // true (MasterCard)
isCreditCard('378282246310005') // true (American Express)
isCreditCard('1234567890123456') // false
```

## 相关

- [isIDCard](/api/validate/is-id-card) - 身份证验证
- [isEmail](/api/validate/is-email) - 电子邮件验证
