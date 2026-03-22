# getNumber <Badge type="info" text="since v1.0.1" />

Get the number in the string.

## Usage

```js
import { getNumber } from 'js-cool'
```

## Signature

```typescript
function getNumber(string: string): string
```

## Parameters

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| `string`  | `string` | Pass in a string with a number |

## Returns

`string` - A pure numeric string.

## Examples

```js
// Version number
getNumber('Chrome123.33')
// '123.33'

// Mixed with letters
getNumber('234test.88')
// '234.88'

// Multiple numbers
getNumber('a1b2c3')
// '123'

// With decimal
getNumber('Price: $99.99')
// '99.99'

// No numbers
getNumber('hello world')
// ''
```

## Related

- [fixNumber](/api/utility/fix-number) - Fix number to specified decimals
- [randomNumber](/api/utility/random-number) - Generate random number
