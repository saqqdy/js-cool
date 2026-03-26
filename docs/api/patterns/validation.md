# validation <Badge type="info" text="since v6.0.0" />

Validation regex patterns for common string formats.

## Usage

```js
import { validation } from 'js-cool'
```

## Available Patterns

### Contact & Identity

| Pattern | Description | Example |
|---------|-------------|---------|
| `email` | Email address | `user@example.com` |
| `mobile` | Chinese mobile phone (1 + 3-9 + 8 digits) | `13800138000` |
| `tel` | Chinese telephone (with optional area code) | `010-12345678` |
| `idCard` | Chinese ID card (15 or 18 digits) | `11010519491231002X` |
| `qq` | QQ number (5-14 digits) | `12345678` |

### Network

| Pattern | Description | Example |
|---------|-------------|---------|
| `url` | URL (with or without protocol) | `https://example.com` |
| `ipv4` | IPv4 address | `192.168.1.1` |
| `ipv6` | IPv6 address | `2001:db8::1` |
| `ipv4Private` | Private IPv4 (10.x, 172.16-31.x, 192.168.x) | `192.168.1.1` |
| `mac` | MAC address (colon or hyphen) | `00:1A:2B:3C:4D:5E` |

### Financial

| Pattern | Description | Example |
|---------|-------------|---------|
| `bankCard` | Bank card number (16-19 digits) | `6222021234567890123` |
| `creditCard` | Credit card (Visa, MasterCard, Amex, Discover) | `4111111111111111` |

### Identification

| Pattern | Description | Example |
|---------|-------------|---------|
| `uuid` | UUID v1-v5 | `550e8400-e29b-41d4-a716-446655440000` |
| `semver` | Semantic versioning | `1.2.3-beta.1` |
| `base64` | Base64 encoded string | `SGVsbG8gV29ybGQ=` |

### Color

| Pattern | Description | Example |
|---------|-------------|---------|
| `hexColor` | Hex color code (3 or 6 digits) | `#fff`, `#ffffff` |

### Date & Time

| Pattern | Description | Example |
|---------|-------------|---------|
| `date` | Date format YYYY-MM-DD | `2024-01-15` |
| `time` | Time format HH:mm:ss | `23:59:59` |
| `datetime` | Datetime YYYY-MM-DD HH:mm:ss | `2024-01-15 12:30:00` |

### Numbers

| Pattern | Description | Example |
|---------|-------------|---------|
| `number` | Number (int, decimal, with sign) | `-123.45` |
| `float` | Decimal (up to 2 places) | `123.45` |

### Text

| Pattern | Description | Example |
|---------|-------------|---------|
| `any` | Any non-empty string | `hello` |
| `string` | Chinese, letters, numbers, basic punctuation | `hello 世界` |
| `chinese` | Single Chinese character | `中` |
| `textarea` | Textarea content | `Hello, world!` |

### User Input

| Pattern | Description | Example |
|---------|-------------|---------|
| `username` | Username (3-15 chars, alphanumeric, underscore, hyphen, dot) | `user_name` |
| `password` | Password (6-16 chars, letter + number required) | `abc123` |
| `slug` | URL slug (lowercase, numbers, hyphens) | `hello-world-123` |

### Location

| Pattern | Description | Example |
|---------|-------------|---------|
| `postcode` | Chinese postal code (6 digits) | `100000` |

### JSON

| Pattern | Description | Example |
|---------|-------------|---------|
| `json` | JSON object string | `{"key":"value"}` |
| `jsonLike` | String containing JSON object | `text {"key":"value"} text` |
| `array` | JSON array string | `[1, 2, 3]` |
| `arrjson` | JSON array of objects | `[{"key":"value"}]` |

## Examples

### Form Validation

```js
import { validation } from 'js-cool'

const form = {
  email: 'user@example.com',
  phone: '13800138000',
  idCard: '11010519491231002X'
}

// Validate email
if (!validation.email.test(form.email)) {
  throw new Error('Invalid email')
}

// Validate phone
if (!validation.mobile.test(form.phone)) {
  throw new Error('Invalid phone number')
}

// Validate ID card
if (!validation.idCard.test(form.idCard)) {
  throw new Error('Invalid ID card')
}
```

### Real-time Input Validation

```js
import { validation } from 'js-cool'

const validators = {
  email: validation.email,
  phone: validation.mobile,
  url: validation.url,
}

function validateInput(name, value) {
  const pattern = validators[name]
  if (pattern) {
    return pattern.test(value)
  }
  return true
}
```

## Related

- [patterns](./index.md) - Unified patterns module
- [ua](./ua.md) - User Agent patterns
