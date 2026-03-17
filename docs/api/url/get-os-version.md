# getOsVersion

Get the phone system version.

> **Deprecated**: Please use `osVersion` instead.

## Usage

```js
import { getOsVersion } from 'js-cool'
```

## Signature

```typescript
function getOsVersion(
  osName: string,
  withOS?: boolean,
  userAgent?: string
): string | boolean | null
```

## Parameters

| Parameter   | Type      | Description                                                      |
| ----------- | --------- | ---------------------------------------------------------------- |
| `osName`    | `string`  | System type: Android, iPod, iWatch, iPhone, iPad, etc.           |
| `withOS`    | `boolean` | Whether to include the OS name in the result                     |
| `userAgent` | `string`  | Custom user agent string (optional, defaults to navigator.userAgent) |

## Returns

`string | boolean | null` - Version string, `false` if OS detected but version unknown, or `null` if not the specified OS.

## Examples

```js
// Get iOS version
getOsVersion('iPhone') // '13.2.3'

// Include OS name
getOsVersion('iPhone', true) // 'iPhone/13.2.3'

// Android device
getOsVersion('Android') // '14'

// iPad
getOsVersion('iPad') // '16.5'
```

## Related

- [osVersion](/api/url/os-version) - Modern replacement for this function
- [getAppVersion](/api/url/get-app-version) - Get app version
- [client](/api/url/client) - Get client information
