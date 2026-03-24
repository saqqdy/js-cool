# isURL <Badge type="info" text="since v6.0.0" />

检查字符串是否为有效的 URL。

## 用法

```js
import { isURL } from 'js-cool'
```

## 签名

```typescript
function isURL(value: string): boolean
```

## 参数

| 参数名  | 类型     | 描述           |
| ------- | -------- | -------------- |
| `value` | `string` | 要检查的字符串 |

## 返回值

`boolean` - 如果字符串是有效的 URL 则返回 `true`，否则返回 `false`。

## 示例

```js
isURL('https://example.com') // true
isURL('http://localhost:3000/path?query=1') // true
isURL('ftp://ftp.example.com') // true
isURL('invalid-url') // false
isURL('example.com') // false (缺少协议)
```

## 相关

- [isEmail](/api/validate/is-email) - 电子邮件验证
- [isPhone](/api/validate/is-phone) - 手机号码验证
