# randomString

Generate a random string.

## Usage

```js
import { randomString } from 'js-cool'
```

## Signature

```typescript
function randomString(length?: number, chars?: string): string
```

## Parameters

| Parameter | Type     | Description                           |
| --------- | -------- | ------------------------------------- |
| `length`  | `number` | String length (default: 32)           |
| `chars`   | `string` | Character set (default: alphanumeric) |

## Returns

`string` - Random string.

## Examples

```js
randomString() // 32 character random string
randomString(8) // 8 character random string
randomString(6, '0123456789') // 6 digit numeric code
randomString(10, 'ABCDEF') // 10 character hex-like string
```
