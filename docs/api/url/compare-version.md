# compareVersion

Compare two version strings.

## Usage

```js
import { compareVersion } from 'js-cool'
```

## Signature

```typescript
function compareVersion(v1: string, v2: string): -1 | 0 | 1
```

## Parameters

| Parameter | Type     | Description       |
| --------- | -------- | ----------------- |
| `v1`      | `string` | First version     |
| `v2`      | `string` | Second version    |

## Returns

`-1 | 0 | 1` - `-1` if v1 < v2, `0` if equal, `1` if v1 > v2.

## Examples

```js
compareVersion('1.2.3', '1.2.4') // -1
compareVersion('1.2.4', '1.2.3') // 1
compareVersion('1.2.3', '1.2.3') // 0
compareVersion('2.0.0', '1.9.9') // 1
```

## Related

- [nextVersion](/api/url/next-version) - Get next version
