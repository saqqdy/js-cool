# osVersion

Get the system name and version.

## Usage

```js
import { osVersion } from 'js-cool'
```

## Signature

```typescript
interface OsVersion {
  name: 'Windows' | 'MacOS' | 'Android' | 'iOS' | 'WindowsPhone' | 'Debian' | 'WebOS' | 'Harmony'
  version: string
}

function osVersion(ua?: string): OsVersion | null
```

## Parameters

| Parameter | Type     | Description                                      |
| --------- | -------- | ------------------------------------------------ |
| `ua`      | `string` | User agent string (optional, uses navigator.userAgent if not provided) |

## Returns

`OsVersion | null` - Object with `name` and `version` properties, or `null`.

## Examples

```js
// iPad
osVersion() // { name: 'iOS', version: '13.3' }

// iPhone
osVersion() // { name: 'iOS', version: '13.2.3' }

// Mac OS
osVersion() // { name: 'MacOS', version: '10.15.7' }

// Windows
osVersion() // { name: 'Windows', version: '10.0' }

// Windows XP
osVersion() // { name: 'Windows', version: 'XP' }

// Windows Phone
osVersion() // { name: 'WindowsPhone', version: '10.0' }

// Android
osVersion() // { name: 'Android', version: '14' }

// HarmonyOS
osVersion() // { name: 'Harmony', version: '4.0.0' }
```

## Related

- [getOsVersion](/api/url/get-os-version) - Get specific OS version (deprecated)
- [client](/api/url/client) - Get client information
