# setCache <Badge type="info" text="since v1.0.2" />

Set an item in localStorage with optional expiration.

## Usage

```ts
import { setCache, StorageQuotaError, StorageUnavailableError } from 'js-cool'
```

## Signature

```typescript
function setCache<T>(key: string, value: T, seconds?: number | string): void
```

## Parameters

| Parameter | Type               | Description                            |
| --------- | ------------------ | -------------------------------------- |
| `key`     | `string`           | The key to set                         |
| `value`   | `T`                | The value to store (JSON serializable) |
| `seconds` | `number \| string` | Expiration time in seconds (optional)  |

## Examples

### Basic Usage

```ts
// Set without expiration
setCache('user', { name: 'John', age: 30 })

// Set with expiration (1 hour)
setCache('token', 'abc123', 3600)

// Set with type inference
interface User {
  name: string
  age: number
}
setCache<User>('user', { name: 'John', age: 30 })
```

### Error Handling

```ts
import { setCache, StorageQuotaError, StorageUnavailableError } from 'js-cool'

try {
  setCache('key', largeData)
} catch (e) {
  if (e instanceof StorageQuotaError) {
    console.warn('Storage is full')
  } else if (e instanceof StorageUnavailableError) {
    console.warn('localStorage not available')
  }
}
```

## Throws

| Error                     | Condition                     |
| ------------------------- | ----------------------------- |
| `StorageUnavailableError` | localStorage is not available |
| `StorageQuotaError`       | Storage quota is exceeded     |

## Notes

- Value is serialized as JSON
- Expiration time is stored alongside the value
- Overwrites existing values
- String seconds parameter is supported for legacy compatibility

## Related

- [getCache](/api/storage/get-cache) - Get cached item
- [delCache](/api/storage/del-cache) - Delete cached item
