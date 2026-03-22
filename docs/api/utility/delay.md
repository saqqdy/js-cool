# delay

Delay execution for a specified time.

## Usage

```js
import { delay } from 'js-cool'
```

## Signature

```typescript
function delay(ms: number): Promise<void>
```

## Parameters

| Parameter | Type     | Description          |
| --------- | -------- | -------------------- |
| `ms`      | `number` | Milliseconds to wait |

## Returns

`Promise<void>` - Resolves after delay.

## Examples

```js
await delay(1000) // Wait 1 second
console.log('After 1 second')

// In async function
async function loadData() {
  await delay(500)
  return fetch('/api/data')
}
```

## Related

- [waiting](/api/utility/waiting) - Promise-based waiting
