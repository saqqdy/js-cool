# throttle <Badge type="info" text="since v6.0.0" />

Throttle function that limits the rate at which the function can be invoked.

## Usage

```js
import { throttle } from 'js-cool'
```

## Signature

```typescript
function throttle<T extends AnyFunction>(
  fn: T,
  wait?: number,
  options?: ThrottleOptions
): T & { cancel: () => void; flush: () => void }

interface ThrottleOptions {
  leading?: boolean
  trailing?: boolean
}
```

## Parameters

| Parameter | Type              | Description                                           |
| --------- | ----------------- | ----------------------------------------------------- |
| `fn`      | `T`               | The function to throttle                              |
| `wait`    | `number`          | The number of milliseconds to throttle (default: `0`) |
| `options` | `ThrottleOptions` | The options object                                    |

### ThrottleOptions

| Property   | Type      | Description                                               |
| ---------- | --------- | --------------------------------------------------------- |
| `leading`  | `boolean` | Whether to execute on the leading edge (default: `true`)  |
| `trailing` | `boolean` | Whether to execute on the trailing edge (default: `true`) |

## Returns

`T & { cancel: () => void; flush: () => void }` - The throttled function with additional methods:

- `cancel()` - Cancel pending execution
- `flush()` - Flush immediately and execute

## Examples

```js
// Basic usage
const throttledFn = throttle(() => {
  console.log('Throttled!')
}, 300)

// With options
const throttledFn = throttle(fn, 300, { leading: true, trailing: true })

// Cancel pending execution
throttledFn.cancel()

// Flush immediately
throttledFn.flush()
```

## Related

- [debounce](/api/async/debounce) - Debounce function execution
