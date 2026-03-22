# pattern <Badge type="danger" text="已废弃" /> <Badge type="info" text="v1.0.1" />

::: warning 已废弃
将在下一个主要版本中重构并重命名为 patterns。
:::

常用正则表达式模式对象。

## 用法

```js
import { pattern } from 'js-cool'
```

## 签名

```typescript
const pattern: {
  email: RegExp
  phone: RegExp
  url: RegExp
  number: RegExp
  chinese: RegExp
  // ... 更多模式
}
```

## 示例

```js
// 邮箱验证
pattern.email.test('user@example.com') // true

// 手机号验证
pattern.phone.test('13800138000') // true

// URL 验证
pattern.url.test('https://example.com') // true

// 数字检查
pattern.number.test('123.45') // true

// 中文字符
pattern.chinese.test('你好') // true
```
