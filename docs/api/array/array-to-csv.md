# arrayToCSV

Convert a 2D array to CSV string.

## Usage

```js
import { arrayToCSV } from 'js-cool'
```

## Signature

```typescript
function arrayToCSV<T extends unknown[][]>(arr: T, delimiter?: string): string
```

## Parameters

| Parameter   | Type     | Description                     |
| ----------- | -------- | ------------------------------- |
| `arr`       | `T`      | 2D array to convert             |
| `delimiter` | `string` | Column delimiter (default: ',') |

## Returns

`string` - CSV formatted string.

## Examples

```js
arrayToCSV([
  ['name', 'age'],
  ['John', 30],
])
// 'name,age\n"John",30'

arrayToCSV(
  [
    ['a', 'b'],
    ['1', '2'],
  ],
  ';'
)
// 'a;b\n1;2'
```

## Related

- [CSVToArray](/api/array/csv-to-array) - Convert CSV to array
