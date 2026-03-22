# cleanData <Badge type="info" text="since v1.0.2" />

Extract specific keys from an object.

## Usage

```js
import { cleanData } from 'js-cool'
```

## Signature

```typescript
function cleanData(data: any, map: string[] | Record<string, string>, nullFix?: any): any
```

## Parameters

| Parameter | Type                                 | Description                    |
| --------- | ------------------------------------ | ------------------------------ |
| `data`    | `any`                                | Source object                  |
| `map`     | `string[] \| Record<string, string>` | Keys to extract or rename map  |
| `nullFix` | `any`                                | Default value for missing keys |

## Returns

`any` - Object with extracted keys.

## Examples

```js
// Extract specific keys
cleanData({ name: 'John', password: '123' }, ['name'])
// { name: 'John' }

// Rename keys
cleanData({ name: 'John' }, { userName: 'name' })
// { userName: 'John' }

// With default values
cleanData({ name: 'John' }, ['name', 'phone'], 'N/A')
// { name: 'John', phone: 'N/A' }
```
