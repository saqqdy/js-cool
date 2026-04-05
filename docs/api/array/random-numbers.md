# randomNumbers <Badge type="info" text="since v5.4.0" />

Generate n random integers that sum to a fixed total.

## Usage

```js
import { randomNumbers } from 'js-cool'
```

## Signature

```typescript
function randomNumbers(
  n?: number,
  sum?: number,
  noZero?: boolean
): number[]
```

## Parameters

| Parameter | Type      | Description                                          |
| --------- | --------- | ---------------------------------------------------- |
| `n`       | `number`  | Number of integers to generate (default: 1)          |
| `sum`     | `number`  | Sum of all generated integers (default: 100)         |
| `noZero`  | `boolean` | Disallow zero values (default: true)                 |

## Returns

`number[]` - Array of random integers that sum to the specified total.

## Examples

```js
// Default: single number that sums to 100
randomNumbers() // [100]

// 4 numbers summing to 5 (no zeros)
randomNumbers(4, 5) // [1, 1, 2, 1]

// Allow zeros
randomNumbers(4, 5, false) // [0, 1, 2, 2]

// Distribution
randomNumbers(3, 100) // [33, 34, 33]
```

## Errors

Throws an error when `noZero` is `true` and `sum < n`, since it's impossible to generate non-zero integers that sum to less than the count.
