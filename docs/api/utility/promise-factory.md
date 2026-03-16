# promiseFactory

Create a promise with accessible value.

## Usage

```js
import { promiseFactory } from 'js-cool'
```

## Signature

```typescript
function promiseFactory<T>(
  value: T,
  resolver: () => Promise<T>
): T & Promise<T>
```

## Parameters

| Parameter  | Type              | Description           |
| ---------- | ----------------- | --------------------- |
| `value`    | `T`               | Initial value         |
| `resolver` | `() => Promise<T>` | Promise resolver     |

## Returns

`T & Promise<T>` - Value that is both sync and async.

## Examples

```js
const stats = { value: 100 }
const result = promiseFactory(stats, () =>
  new Promise(resolve => {
    stats.value = 200
    resolve(stats)
  })
)

console.log(result.value) // 100 (sync)
const awaited = await result
console.log(awaited.value) // 200 (async)
```
