# pattern <Badge type="danger" text="deprecated" /> <Badge type="info" text="since v1.0.1" />

::: warning Deprecated
It will be refactored and renamed patterns in the next major release.
:::

Common regex patterns object.

## Usage

```js
import { pattern } from 'js-cool'
```

## Signature

```typescript
const pattern: {
  email: RegExp
  phone: RegExp
  url: RegExp
  number: RegExp
  chinese: RegExp
  // ... more patterns
}
```

## Examples

```js
// Email validation
pattern.email.test('user@example.com') // true

// Phone validation
pattern.phone.test('13800138000') // true

// URL validation
pattern.url.test('https://example.com') // true

// Number check
pattern.number.test('123.45') // true

// Chinese characters
pattern.chinese.test('你好') // true
```
