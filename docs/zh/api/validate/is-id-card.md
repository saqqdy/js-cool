# isIDCard

检查字符串是否为有效的中国身份证号码（18位）。

## 用法

```js
import { isIDCard } from 'js-cool'
```

## 签名

```typescript
function isIDCard(value: string): boolean
```

## 参数

| 参数名  | 类型     | 描述           |
| ------- | -------- | -------------- |
| `value` | `string` | 要检查的字符串 |

## 返回值

`boolean` - 如果字符串是有效的中国身份证号码则返回 `true`，否则返回 `false`。

## 示例

```js
isIDCard('11010519491231002X') // true
isIDCard('11010519491231002x') // true (小写 x 也有效)
isIDCard('123456789012345678') // false (校验码无效)
isIDCard('1234567890') // false (长度错误)
```

## 相关

- [isPhone](/api/validate/is-phone) - 手机号码验证
- [isCreditCard](/api/validate/is-credit-card) - 信用卡验证
