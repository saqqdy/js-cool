# isPhone <Badge type="info" text="v6.0.0" />

检查字符串是否为有效的手机号码（中国手机号）。

## 用法

```js
import { isPhone } from 'js-cool'
```

## 签名

```typescript
function isPhone(value: string): boolean
```

## 参数

| 参数名  | 类型     | 描述           |
| ------- | -------- | -------------- |
| `value` | `string` | 要检查的字符串 |

## 返回值

`boolean` - 如果字符串是有效的中国手机号码则返回 `true`，否则返回 `false`。

## 示例

```js
isPhone('13800138000') // true
isPhone('15912345678') // true
isPhone('12345678901') // false
isPhone('1380013800') // false (位数不足)
```

## 相关

- [isEmail](/api/validate/is-email) - 电子邮件验证
- [isIDCard](/api/validate/is-id-card) - 身份证验证
