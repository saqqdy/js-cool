# fillIPv6

Expands compressed IPv6 notation to full form with all 8 groups of 4 hex digits.

## Usage

```js
import { fillIPv6 } from 'js-cool'
```

## Signature

```typescript
function fillIPv6(ip: string): string
```

## Parameters

| Parameter | Type     | Description                   |
| --------- | -------- | ----------------------------- |
| `ip`      | `string` | IPv6 address string to expand |

## Returns

`string` - The full IPv6 string with all groups expanded to 4 hex digits.

## Examples

```js
// Basic usage
fillIPv6('2409:8005:800::2')
// '2409:8005:0800:0000:0000:0000:0000:0002'

// With hex digits
fillIPv6('2409:8005:800::1c')
// '2409:8005:0800:0000:0000:0000:0000:001c'

// Loopback address
fillIPv6('::1')
// '0000:0000:0000:0000:0000:0000:0000:0001'

// All zeros
fillIPv6('::')
// '0000:0000:0000:0000:0000:0000:0000:0000'
```
