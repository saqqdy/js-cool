# camel2Dash

Converts camelCase strings to dash-case (kebab-case).

## Usage

```js
import { camel2Dash } from 'js-cool'
```

## Signature

```typescript
function camel2Dash(string: string): string
```

## Parameters

| Parameter | Type     | Description                     |
| --------- | -------- | ------------------------------- |
| `string`  | `string` | The camelCase string to convert |

## Returns

`string` - The converted dash-case string.

## Examples

```js
camel2Dash('fontSize')
// 'font-size'

camel2Dash('backgroundColor')
// 'background-color'

camel2Dash('marginTop')
// 'margin-top'

camel2Dash('borderTopLeftRadius')
// 'border-top-left-radius'
```

## Related

- [dash2Camel](/api/string/dash2-camel) - Convert dash-case to camelCase
