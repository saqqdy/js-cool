# waiting

Wait for a specified time.

## Usage

```js
import { waiting } from 'js-cool'
```

## Signature

```typescript
function waiting(ms: number): Promise<void>
```

## Parameters

| Parameter | Type     | Description         |
| --------- | -------- | ------------------- |
| `ms`      | `number` | Milliseconds to wait |

## Returns

`Promise<void>` - Resolves after waiting.

## Examples

```js
await waiting(1000) // Wait 1 second
console.log('Done waiting')

// Chain with other operations
waiting(500).then(() => console.log('Half second passed'))
```

## Related

- [delay](/api/utility/delay) - Delay execution
