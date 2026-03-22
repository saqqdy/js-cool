# sorter

Sort an array of objects by a key.

## Usage

```js
import { sorter } from 'js-cool'
```

## Signature

```typescript
function sorter<T>(arr: T[], key: keyof T, order?: 'asc' | 'desc'): T[]
```

## Parameters

| Parameter | Type              | Description                 |
| --------- | ----------------- | --------------------------- |
| `arr`     | `T[]`             | The array to sort           |
| `key`     | `keyof T`         | The key to sort by          |
| `order`   | `'asc' \| 'desc'` | Sort order (default: 'asc') |

## Returns

`T[]` - The sorted array.

## Examples

```js
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 },
]

sorter(users, 'age', 'asc')
// [{ name: 'Jane', age: 25 }, { name: 'John', age: 30 }, { name: 'Bob', age: 35 }]

sorter(users, 'name', 'desc')
// [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }, { name: 'Bob', age: 35 }]
```
