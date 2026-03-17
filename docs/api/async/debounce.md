# debounce

Debounce function that delays invoking the function until after the specified wait time has elapsed since the last call.

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
): T & { cancel: () => void; flush: () => void; pending: () => boolean }

interface DebounceOptions {
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}
```

## Parameters

| Parameter  | Type              | Description                                          |
| ---------- | ----------------- | ---------------------------------------------------- |
| `fn`       | `T`               | The function to debounce                             |
| `wait`     | `number`          | The number of milliseconds to delay (default: `0`)   |
| `options`  | `DebounceOptions` | The options object                                   |

### DebounceOptions

| Property   | Type      | Description                                      |
| ---------- | --------- | ------------------------------------------------ |
| `leading`  | `boolean` | Whether to execute on the leading edge (default: `false`) |
| `trailing` | `boolean` | Whether to execute on the trailing edge (default: `true`) |
| `maxWait`  | `number`  | Maximum waiting time                             |

## Returns

`T & { cancel: () => void; flush: () => void; pending: () => boolean }` - The debounced function with additional methods:
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
