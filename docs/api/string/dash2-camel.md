# dash2Camel

Convert dash-case (kebab-case) string to camelCase.

## Usage

```js
import { dash2Camel } from 'js-cool'
```

## Signature

```typescript
function dash2Camel(string: string): string
```

## Parameters

| Parameter | Type     | Description                     |
| --------- | -------- | ------------------------------- |
| `string`  | `string` | The dash-case string to convert |

## Returns

`string` - The converted camelCase string.

## Examples

```js
dash2Camel('font-size') // 'fontSize'
dash2Camel('background-color') // 'backgroundColor'
dash2Camel('margin-top') // 'marginTop'
dash2Camel('border-top-left-radius') // 'borderTopLeftRadius'
```

## Related

- [camel2Dash](/api/string/camel2-dash) - Convert camelCase to dash-case
