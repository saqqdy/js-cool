# fingerprint

Generate browser fingerprint.

## Usage

```js
import { fingerprint } from 'js-cool'
```

## Signature

```typescript
function fingerprint(domain?: string): string | null
```

## Parameters

| Parameter | Type     | Description                         |
| --------- | -------- | ----------------------------------- |
| `domain`  | `string` | Domain key (default: location.host) |

## Returns

`string | null` - Fingerprint string, or `null` in non-browser.

## Examples

```js
const fp = fingerprint()
// 'a1b2c3d4e5f6'

// With custom domain
const fp = fingerprint('myapp.com')

// Use for device tracking
localStorage.setItem('deviceId', fingerprint())
```
