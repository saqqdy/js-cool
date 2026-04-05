# randomString <Badge type="info" text="since v5.0.0" />

Generate a random string with customizable character types and security options.

## Usage

```js
import { randomString } from 'js-cool'
```

## Signature

```typescript
function randomString(length?: number): string
function randomString(length: number, includeSpecial: boolean): string
function randomString(options: RandomStringOptions): string

type RandomStringCharType = 'uppercase' | 'lowercase' | 'number' | 'special'

interface RandomStringOptions {
  length?: number
  charTypes?: RandomStringCharType | RandomStringCharType[]
  noConfuse?: boolean
  strict?: boolean
  secure?: boolean
}
```

## Parameters

### Options Object

| Property    | Type                               | Description                                              |
| ----------- | ---------------------------------- | -------------------------------------------------------- |
| `length`    | `number`                           | String length (default: 32)                              |
| `charTypes` | `string \| string[]`               | Character types to include (default: uppercase, lowercase, number) |
| `noConfuse` | `boolean`                          | Remove confusing characters: I,L,O,U,V,i,l,o,u,v,0,1,9   |
| `strict`    | `boolean`                          | Ensure at least 1 character of each type                 |
| `secure`    | `boolean`                          | Use cryptographically secure random generator            |

### Character Types

- `'uppercase'` - A-Z
- `'lowercase'` - a-z
- `'number'` - 0-9
- `'special'` - ~!@#$%^&*_+|:-=[];,.

## Returns

`string` - Random string.

## Examples

```js
// Default: 32-char string with uppercase, lowercase, numbers
randomString() // 'PVSjz902EqYbmxaLtvDnggtnlvt5uFTZ'

// Specific length
randomString(16) // 'coTgZy0mqqMJ1sMM'

// With options object
randomString({ length: 16 }) // 'ngCI5aPqJm84t90d'

// Include special characters (legacy boolean syntax)
randomString(true) // '0Uby@op3B-sK5]dHl4S|15As.OlHiNXd'

// Include special characters (recommended)
randomString({ charTypes: ['uppercase', 'lowercase', 'number', 'special'] })

// Numeric string
randomString({ length: 16, charTypes: 'number' }) // '7450026301030286'

// Remove confusing characters
randomString({ length: 16, noConfuse: true }) // '8DEGna8ppC4mqyew'

// Strict mode: must contain each character type
randomString({ length: 16, strict: true }) // 'PFYAPD5KFqOHIADL'

// Cryptographically secure (for passwords, tokens)
randomString({ length: 32, secure: true }) // 'xK9mP2vN8qR4wT7y...'

// Secure password with all options
randomString({
  length: 20,
  charTypes: ['uppercase', 'lowercase', 'number', 'special'],
  noConfuse: true,
  strict: true,
  secure: true
})
```

## Security Notes

When generating strings for security-sensitive purposes (passwords, tokens, API keys), use `secure: true` to ensure cryptographically secure randomness. This uses:

- `crypto.getRandomValues()` in browser environments
- `crypto.randomBytes()` in Node.js environments
