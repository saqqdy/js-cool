# truncate <Badge type="info" text="since v6.0.0" />

Truncates string if it's longer than the given maximum string length. The last characters of the truncated string are replaced with the omission string.

## Usage

```js
import { truncate } from 'js-cool'
```

## Signature

```typescript
interface TruncateOptions {
  /**
   * The maximum string length (default: 30)
   */
  length?: number
  /**
   * The string to indicate text is omitted (default: '...')
   */
  omission?: string
  /**
   * The separator pattern to truncate to
   */
  separator?: string | RegExp
}

function truncate(str: string, options?: TruncateOptions): string
```

## Parameters

| Parameter | Type              | Description                   |
| --------- | ----------------- | ----------------------------- |
| `str`     | `string`          | The string to truncate        |
| `options` | `TruncateOptions` | The options object (optional) |

### TruncateOptions

| Property    | Type               | Default | Description                            |
| ----------- | ------------------ | ------- | -------------------------------------- |
| `length`    | `number`           | `30`    | The maximum string length              |
| `omission`  | `string`           | `'...'` | The string to indicate text is omitted |
| `separator` | `string \| RegExp` | -       | The separator pattern to truncate to   |

## Returns

`string` - The truncated string.

## Examples

```js
truncate('hi-diddly-ho there, neighborino')
// => 'hi-diddly-ho there, neighbo...'

truncate('hi-diddly-ho there, neighborino', { length: 24, separator: ' ' })
// => 'hi-diddly-ho there,...'

truncate('hi-diddly-ho there, neighborino', { omission: ' [...]' })
// => 'hi-diddly-ho there, neig [...]'

truncate('hi-diddly-ho there, neighborino', { length: 24, separator: /,? +/ })
// => 'hi-diddly-ho there...'
```
