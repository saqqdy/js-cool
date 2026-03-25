# retry <Badge type="info" text="since v6.0.0" />

Retry a function until it succeeds or the retry limit is reached.

## Usage

```ts
import { retry, RetryTimeoutError, RetryAbortError } from 'js-cool'
```

## Signature

```typescript
async function retry<T>(fn: () => T | Promise<T>, options?: RetryOptions): Promise<T>

interface RetryOptions {
  times?: number
  delay?: number
  timeout?: number
  onRetry?: (error: Error, attempt: number) => void
  shouldRetry?: (error: Error, attempt: number) => boolean
  signal?: AbortSignal
}
```

## Parameters

| Parameter | Type                    | Description           |
| --------- | ----------------------- | --------------------- |
| `fn`      | `() => T \| Promise<T>` | The function to retry |
| `options` | `RetryOptions`          | The retry options     |

### RetryOptions

| Property      | Type                                         | Default | Description                                                      |
| ------------- | -------------------------------------------- | ------- | ---------------------------------------------------------------- |
| `times`       | `number`                                     | `3`     | Number of retry attempts                                         |
| `delay`       | `number`                                     | `0`     | Delay between retries in milliseconds                            |
| `timeout`     | `number`                                     | -       | Timeout for each attempt in milliseconds                         |
| `onRetry`     | `(error: Error, attempt: number) => void`    | -       | Callback for each retry attempt                                  |
| `shouldRetry` | `(error: Error, attempt: number) => boolean` | -       | Predicate to determine if retry should continue                  |
| `signal`      | `AbortSignal`                                | -       | AbortSignal to cancel the retry operation                        |

## Returns

`Promise<T>` - A promise that resolves with the result of the function.

## Throws

| Error                | Condition                           |
| -------------------- | ----------------------------------- |
| `RetryTimeoutError`  | Timeout is reached for an attempt   |
| `RetryAbortError`    | Operation is aborted via signal     |
| `Error`              | The last error if all retries fail  |

## Examples

### Basic Usage

```ts
// Retry up to 3 times
const data = await retry(() => fetchData())

// With custom retry count and delay
const data = await retry(() => fetchData(), {
  times: 5,
  delay: 1000, // 1 second between retries
})
```

### Conditional Retry

```ts
// Only retry on network errors
const data = await retry(() => fetchData(), {
  times: 5,
  shouldRetry: (error) => error.message.includes('network'),
})
```

### With Callback

```ts
// Log each retry attempt
const data = await retry(() => fetchData(), {
  times: 3,
  onRetry: (error, attempt) => {
    console.log(`Attempt ${attempt} failed: ${error.message}`)
  },
})
```

### With Timeout

```ts
// 5 second timeout per attempt
const data = await retry(() => fetchData(), {
  times: 3,
  timeout: 5000,
})
```

### With Cancellation

```ts
const controller = new AbortController()

const data = await retry(() => fetchData(), {
  times: 3,
  signal: controller.signal,
})

// Cancel the retry operation
controller.abort()
```

### Error Handling

```ts
import { retry, RetryTimeoutError, RetryAbortError } from 'js-cool'

try {
  const data = await retry(() => fetchData(), { timeout: 5000 })
} catch (e) {
  if (e instanceof RetryTimeoutError) {
    console.log('Request timed out')
  } else if (e instanceof RetryAbortError) {
    console.log('Request was cancelled')
  } else {
    console.log('All retries failed:', e.message)
  }
}
```

## Notes

- Works with both sync and async functions
- The `delay` is applied between retries, not before the first attempt
- If `shouldRetry` returns `false`, the last error is thrown immediately
- `AbortSignal` is checked before each attempt

## Related

- [debounce](/api/async/debounce) - Debounce function execution
- [throttle](/api/async/throttle) - Throttle function execution
