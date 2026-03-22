# setSession <Badge type="info" text="since v1.0.2" />

Set item in sessionStorage with expiration.

## Usage

```js
import { setSession } from 'js-cool'
```

## Signature

```typescript
function setSession(key: string, value: any, seconds?: number): void
```

## Parameters

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `key`     | `string` | Key to set                       |
| `value`   | `any`    | Value to store                   |
| `seconds` | `number` | Expiration in seconds (optional) |

## Examples

```js
// Without expiration
setSession('token', 'abc123')

// With 30 minute expiration
setSession('token', 'abc123', 1800)
```

## Related

- [getSession](/api/storage/get-session) - Get session item
- [delSession](/api/storage/del-session) - Delete session item
