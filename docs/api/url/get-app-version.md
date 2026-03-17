# getAppVersion

Get the APP version number from user agent.

> **Deprecated**: Please use `appVersion` instead.

## Usage

```js
import { getAppVersion } from 'js-cool'
```

## Signature

```typescript
function getAppVersion(
  appName: string,
  withApp?: boolean,
  userAgent?: string
): string | boolean | null
```

## Parameters

| Parameter   | Type      | Description                                            |
| ----------- | --------- | ------------------------------------------------------ |
| `appName`   | `string`  | App name to search for                                 |
| `withApp`   | `boolean` | Whether to include the app name in the result          |
| `userAgent` | `string`  | Custom user agent string (optional, defaults to navigator.userAgent) |

## Returns

`string | boolean | null` - Version string, `false` if app detected but version unknown, or `null` if not the specified client.

## Examples

```js
// Get version only
getAppVersion('Chrome') // '120.0.0.0'

// Include app name
getAppVersion('Chrome', true) // 'Chrome/120.0.0.0'

// Custom user agent
getAppVersion('MicroMessenger', false, 'MicroMessenger/8.0.0')
// '8.0.0'

// App detected but version unknown
getAppVersion('SomeApp') // false (app exists but no version)

// Not the specified client
getAppVersion('NonExistent') // null
```

## Related

- [appVersion](/api/url/app-version) - Modern replacement for this function
- [getOsVersion](/api/url/get-os-version) - Get OS version
