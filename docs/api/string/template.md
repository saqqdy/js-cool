# template <Badge type="info" text="v6.0.0" />

Creates a template function that can interpolate data properties.

## Usage

```js
import { template } from 'js-cool'
```

## Signature

```typescript
function template(
  templateString: string,
  options?: TemplateOptions
): (data?: Record<string, unknown>) => string

interface TemplateSettings {
  open?: string    // Opening delimiter, default '{{'
  close?: string   // Closing delimiter, default '}}'
  escape?: boolean // Whether to escape HTML, default true
}

interface TemplateOptions extends TemplateSettings {
  data?: Record<string, unknown>
}
```

## Parameters

| Parameter         | Type               | Description           |
| ----------------- | ------------------ | --------------------- |
| `templateString`  | `string`           | The template string   |
| `options`         | `TemplateOptions`  | Template options      |

## Returns

`(data?: Record<string, unknown>) => string` - The compiled template function.

## Examples

```js
// Basic usage
const compiled = template('Hello, {{ name }}!')
compiled({ name: 'World' })
// 'Hello, World!'

// With HTML escaping (default)
const compiled = template('{{ content }}')
compiled({ content: '<script>alert("xss")</script>' })
// '&lt;script&gt;alert("xss")&lt;/script&gt;'

// Raw output (triple braces)
const compiled = template('{{{ html }}}')
compiled({ html: '<strong>bold</strong>' })
// '<strong>bold</strong>'

// With custom delimiters
const compiled = template('Hello, ${ name }!', { open: '${', close: '}' })
compiled({ name: 'World' })
// 'Hello, World!'

// Direct call with data
template('Hello, {{ name }}!', { data: { name: 'World' } })
// 'Hello, World!'

// Complex expressions (nested properties)
const compiled = template('{{ user.name }} is {{ user.age }} years old.')
compiled({ user: { name: 'John', age: 30 } })
// 'John is 30 years old.'
```

## Notes

- `{{ variable }}` - HTML escaped output
- `{{{ variable }}}` - Raw output (no escaping)
- Supports nested property access (e.g., `user.name`)
- Custom delimiters supported
