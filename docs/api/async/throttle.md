# throttle <Badge type="info" text="since v6.0.0" />

Throttle function that limits the function to execute at most once in a specified time period. Implemented using debounce with `maxWait` equal to the wait time.

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
): DebouncedFunction<T>

interface ThrottleOptions {
  leading?: boolean
  trailing?: boolean
}

interface DebouncedFunction<T extends AnyFunction> {
  (...args: Parameters<T>): ReturnType<T> | undefined
  cancel: () => void
  flush: () => ReturnType<T> | undefined
  pending: () => boolean
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

`DebouncedFunction<T>` - The throttled function with additional methods:

- `cancel()` - Cancel pending execution
- `flush()` - Flush immediately and execute
- `pending()` - Check if there is a pending execution

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

// Check if pending
if (throttledFn.pending()) {
  console.log('Execution is pending')
}
```

## Related

- [debounce](/api/async/debounce) - Debounce function execution
