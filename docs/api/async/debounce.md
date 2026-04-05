# debounce <Badge type="info" text="since v6.0.0" />

Debounce function that delays invoking the function until after the specified wait time has elapsed since the last call. If `maxWait` is provided, it will also throttle to ensure the function is called at most once within the `maxWait` period.

## Usage

```js
import { debounce } from 'js-cool'
```

## Signature

```typescript
function debounce<T extends AnyFunction>(
  fn: T,
  wait?: number,
  options?: DebounceOptions
): DebouncedFunction<T>

interface DebounceOptions {
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

interface DebouncedFunction<T extends AnyFunction> {
  (...args: Parameters<T>): ReturnType<T> | undefined
  cancel: () => void
  flush: () => ReturnType<T> | undefined
  pending: () => boolean
}
```

## Parameters

| Parameter | Type              | Description                                        |
| --------- | ----------------- | -------------------------------------------------- |
| `fn`      | `T`               | The function to debounce                           |
| `wait`    | `number`          | The number of milliseconds to delay (default: `0`) |
| `options` | `DebounceOptions` | The options object                                 |

### DebounceOptions

| Property   | Type      | Description                                               |
| ---------- | --------- | --------------------------------------------------------- |
| `leading`  | `boolean` | Whether to execute on the leading edge (default: `false`) |
| `trailing` | `boolean` | Whether to execute on the trailing edge (default: `true`) |
| `maxWait`  | `number`  | Maximum waiting time for throttling behavior              |

## Returns

`DebouncedFunction<T>` - The debounced function with additional methods:

- `cancel()` - Cancel pending execution
- `flush()` - Flush immediately and execute
- `pending()` - Check if there is a pending execution

## Examples

```js
// Basic usage
const debouncedFn = debounce(() => {
  console.log('Debounced!')
}, 300)

// With options
const debouncedFn = debounce(fn, 300, { leading: true, trailing: true })

// Using maxWait for throttle-like behavior
const debouncedFn = debounce(fn, 300, { maxWait: 1000 })

// Cancel pending execution
debouncedFn.cancel()

// Flush immediately
debouncedFn.flush()

// Check if pending
if (debouncedFn.pending()) {
  console.log('Execution is pending')
}
```

## Related

- [throttle](/api/async/throttle) - Throttle function execution
