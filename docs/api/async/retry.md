# retry <Badge type="info" text="since v6.0.0" />

Retry a function until it succeeds or the retry limit is reached.

## Usage

```js
import { retry } from 'js-cool'
```

## Signature

```typescript
async function retry<T>(fn: () => T | Promise<T>, options?: RetryOptions): Promise<T>

interface RetryOptions {
  times?: number
  delay?: number
  shouldRetry?: (error: Error, attempt: number) => boolean
  onRetry?: (error: Error, attempt: number) => void
}
```

## Parameters

| Parameter | Type                    | Description           |
| --------- | ----------------------- | --------------------- |
| `fn`      | `() => T \| Promise<T>` | The function to retry |
| `options` | `RetryOptions`          | The retry options     |

### RetryOptions

| Property      | Type                                         | Description                                                      |
| ------------- | -------------------------------------------- | ---------------------------------------------------------------- |
| `times`       | `number`                                     | The number of times to retry (default: `3`)                      |
| `delay`       | `number`                                     | The delay between retries in milliseconds (default: `0`)         |
| `shouldRetry` | `(error: Error, attempt: number) => boolean` | A function that returns true if the error should trigger a retry |
| `onRetry`     | `(error: Error, attempt: number) => void`    | Callback for each retry attempt                                  |

## Returns

`Promise<T>` - A promise that resolves with the result of the function.

## Examples

```js
// Basic usage
const result = await retry(() => fetchData(), { times: 3, delay: 1000 })

// With shouldRetry
const result = await retry(() => fetchData(), {
  times: 5,
  shouldRetry: error => error.message.includes('network'),
})

// With onRetry callback
const result = await retry(() => fetchData(), {
  times: 3,
  onRetry: (error, attempt) => console.log(`Retry ${attempt}: ${error.message}`),
})
```

## Related

- [debounce](/api/async/debounce) - Debounce function execution
- [throttle](/api/async/throttle) - Throttle function execution
