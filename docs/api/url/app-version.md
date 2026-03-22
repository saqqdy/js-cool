# appVersion

Get app version from user agent.

## Usage

```js
import { appVersion } from 'js-cool'
```

## Signature

```typescript
function appVersion(appName: string, userAgent?: string): string | null
```

## Parameters

| Parameter   | Type     | Description          |
| ----------- | -------- | -------------------- |
| `appName`   | `string` | App name to find     |
| `userAgent` | `string` | Custom UA (optional) |

## Returns

`string | null` - Version string or `null`.

## Examples

```js
appVersion('Chrome') // '120.0.0.0'
appVersion('Safari') // '17.0'
appVersion('NonExistent') // null
```
