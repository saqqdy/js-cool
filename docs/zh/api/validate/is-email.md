# isEmail <Badge type="info" text="v6.0.0" />

检查字符串是否为有效的电子邮件地址。

## 用法

```js
import { isEmail } from 'js-cool'
```

## 签名

```typescript
function isEmail(value: string): boolean
```

## 参数

| 参数名  | 类型     | 描述           |
| ------- | -------- | -------------- |
| `value` | `string` | 要检查的字符串 |

## 返回值

`boolean` - 如果字符串是有效的电子邮件地址则返回 `true`，否则返回 `false`。

## 示例

```js
isEmail('test@example.com') // true
isEmail('test.name@example.co.uk') // true
isEmail('invalid-email') // false
isEmail('test@') // false
```

## 相关

- [isPhone](/api/validate/is-phone) - 手机号码验证
- [isURL](/api/validate/is-url) - URL 验证
