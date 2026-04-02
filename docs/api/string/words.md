# words <Badge type="info" text="v6.0.0" />

Splits string into an array of its words.

## Usage

```js
import { words } from 'js-cool'
```

## Signature

```typescript
function words(string: string, pattern?: RegExp | string): string[]
```

## Parameters

| Parameter | Type               | Description                    |
| --------- | ------------------ | ------------------------------ |
| `string`  | `string`           | The string to split            |
| `pattern` | `RegExp \| string` | The pattern to match words (optional) |

## Returns

`string[]` - Array of words.

## Examples

```js
// Basic usage
words('fred, barney, & pebbles')
// ['fred', 'barney', 'pebbles']

// CamelCase splitting
words('camelCaseHTML')
// ['camel', 'Case', 'HTML']

// Using custom pattern
words('camelCaseHTML', /[A-Z]{2,}/g)
// ['HTML']

words('hello world', /\w+/g)
// ['hello', 'world']

// Empty string
words('')
// []
```

## Notes

- Supports camelCase, PascalCase, snake_case, kebab-case naming styles by default
- Consecutive uppercase letters are recognized as a word (e.g., HTML)
- Custom regex pattern can be provided for specific matching
