# JSONToCSV

Converts an array of objects to a comma-separated value (CSV) string containing only the specified columns.

## Usage

```js
import { JSONToCSV } from 'js-cool'
```

## Signature

```typescript
function JSONToCSV(arr: any[], columns: any[], delimiter?: string): string
```

## Parameters

| Parameter   | Type     | Description                          |
| ----------- | -------- | ------------------------------------ |
| `arr`       | `any[]`  | Array of objects                     |
| `columns`   | `any[]`  | The specified columns to include     |
| `delimiter` | `string` | Delimiter, defaults to ','           |

## Returns

`string` - CSV string.

## Examples

```js
// Basic usage
JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4 }], ['a', 'b'])
// 'a,b\n"1","2"\n"3","4"'

// With custom delimiter
JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4 }], ['a', 'b'], ';')
// 'a;b\n"1";"2"\n"3";"4"'

// Missing values become empty strings
JSONToCSV([{ a: 1 }, { b: 2 }], ['a', 'b'])
// 'a,b\n"1",""\n"","2"'

// With special characters
JSONToCSV([{ name: 'test', value: '"quoted"' }], ['name', 'value'])
// 'name,value\n"test","""quoted"""'
```

## Related

- [CSVToJSON](/api/convert/csv-to-json) - Convert CSV to JSON
- [arrayToCSV](/api/array/array-to-csv) - Convert array to CSV
