# getType <Badge type="info" text="since v1.0.2" />

Get the type of a value.

## Usage

```js
import { getType } from 'js-cool'
```

## Signature

```typescript
function getType(value: any): string
```

## Parameters

| Parameter | Type  | Description    |
| --------- | ----- | -------------- |
| `value`   | `any` | Value to check |

## Returns

`string` - The type name.

## Examples

```js
getType([1, 2, 3]) // 'array'
getType({}) // 'object'
getType(null) // 'null'
getType(undefined) // 'undefined'
getType(123) // 'number'
getType('hello') // 'string'
getType(true) // 'boolean'
getType(() => {}) // 'function'
getType(new Date()) // 'date'
getType(/test/) // 'regexp'
```
