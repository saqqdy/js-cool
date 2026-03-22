# mapTemplate <Badge type="info" text="since v5.9.0" />

Replace template placeholders with values.

## Usage

```js
import { mapTemplate } from 'js-cool'
```

## Signature

```typescript
function mapTemplate(template: string, data: Record<string, any> | ((key: string) => any)): string
```

## Parameters

| Parameter  | Type                              | Description                |
| ---------- | --------------------------------- | -------------------------- |
| `template` | `string`                          | Template with placeholders |
| `data`     | `Record<string, any> \| Function` | Values object or function  |

## Returns

`string` - The template with placeholders replaced.

## Examples

```js
// Using ${} syntax
mapTemplate('My name is ${name}', { name: 'John' })
// 'My name is John'

// Using {{}} syntax
mapTemplate('Hello {{name}}', { name: 'World' })
// 'Hello World'

// Using function
mapTemplate('Value: ${key}', key => key.toUpperCase())
// 'Value: KEY'
```
