# client <Badge type="danger" text="deprecated" /> <Badge type="info" text="since v1.0.1" />

::: warning Deprecated
Will be refactored for the next major release
:::

Get browser/client information.

## Usage

```js
import { client } from 'js-cool'
```

## Signature

```typescript
function client(
  name?: string,
  userAgent?: string
): boolean | Record<string, boolean | RegExpMatchArray | null>
```

## Parameters

| Parameter   | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| `name`      | `string` | Check specific browser (optional)        |
| `userAgent` | `string` | Custom UA (default: navigator.userAgent) |

## Returns

`boolean | object` - Browser info object or match result.

## Examples

```js
// Get all browser info
client()
// {
//   IE: false,
//   GECKO: true,
//   WEBKIT: false,
//   OPERA: false,
//   TRIDENT: false,
//   MOBILE: true,
//   IOS: true,
//   ANDROID: false,
//   IPHONE: true,
//   IPAD: false,
//   WEIXIN: false,
//   QQBROWSER: false
// }

// Check specific browser
client('MicroMessenger') // true if WeChat browser
client('Chrome') // true if Chrome
```
