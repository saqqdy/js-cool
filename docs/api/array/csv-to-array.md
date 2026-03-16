# CSVToArray

Convert CSV string to 2D array.

## Usage

```js
import { CSVToArray } from 'js-cool'
```

## Signature

```typescript
function CSVToArray(csv: string, delimiter?: string): string[][]
```

## Parameters

| Parameter   | Type     | Description                |
| ----------- | -------- | -------------------------- |
| `csv`       | `string` | CSV string to convert      |
| `delimiter` | `string` | Column delimiter (default: ',') |

## Returns

`string[][]` - 2D array.

## Examples

```js
CSVToArray('name,age\nJohn,30')
// [['name', 'age'], ['John', '30']]

CSVToArray('a;b\n1;2', ';')
// [['a', 'b'], ['1', '2']]
```

## Related

- [arrayToCSV](/api/array/array-to-csv) - Convert array to CSV
