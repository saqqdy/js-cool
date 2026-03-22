# searchObject <Badge type="info" text="since v5.0.0" />

Search in nested objects/arrays.

## Usage

```js
import { searchObject } from 'js-cool'
```

## Signature

```typescript
function searchObject(
  tree: any[],
  expression: string | number | ((item: any) => boolean),
  key?: string
): any
```

## Parameters

| Parameter    | Type                           | Description        |
| ------------ | ------------------------------ | ------------------ |
| `tree`       | `any[]`                        | The tree to search |
| `expression` | `string \| number \| Function` | Search expression  |
| `key`        | `string`                       | Key to match       |

## Returns

`any` - The found item or `undefined`.

## Examples

```js
const data = [{ id: 1, name: 'John', children: [{ id: 2, name: 'Jane' }] }]

searchObject(data, 'Jane', 'name') // { id: 2, name: 'Jane' }
searchObject(data, item => item.id === 2) // { id: 2, name: 'Jane' }
```
