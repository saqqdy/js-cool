# CSVToJSON

Converts a comma-separated string of values (CSV) to an array of 2D objects. The first line of the string is used as the header line.

## Usage

```js
import { CSVToJSON } from 'js-cool'
```

## Signature

```typescript
function CSVToJSON(data: string, delimiter?: string): Record<string, string>[]
```

## Parameters

| Parameter   | Type     | Description                |
| ----------- | -------- | -------------------------- |
| `data`      | `string` | CSV data string            |
| `delimiter` | `string` | Delimiter, defaults to ',' |

## Returns

`Record<string, string>[]` - Array of objects with keys from the header row.

## Examples

```js
// Basic usage
CSVToJSON('col1,col2\na,b\nc,d')
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]

// With custom delimiter
CSVToJSON('col1;col2\na;b\nc;d', ';')
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]

// With numbers (as strings)
CSVToJSON('name,age\nJohn,30\nJane,25')
// [{'name': 'John', 'age': '30'}, {'name': 'Jane', 'age': '25'}]

// Empty values
CSVToJSON('a,b\n1,\n,2')
// [{'a': '1', 'b': ''}, {'a': '', 'b': '2'}]
```

## Related

- [JSONToCSV](/api/convert/json-to-csv) - Convert JSON to CSV
- [arrayToCSV](/api/array/array-to-csv) - Convert array to CSV
