# browserVersion

Get browser version information.

## Usage

```js
import { browserVersion } from 'js-cool'
```

## Signature

```typescript
function browserVersion(userAgent?: string): Record<string, string>
```

## Parameters

| Parameter   | Type     | Description          |
| ----------- | -------- | -------------------- |
| `userAgent` | `string` | Custom UA (optional) |

## Returns

`Record<string, string>` - Object with browser versions.

## Examples

```js
browserVersion()
// { chrome: '120.0.0.0', safari: '17.0', ... }
```
