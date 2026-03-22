# nextVersion <Badge type="info" text="since v5.10.0" />

Get the next version number.

## Usage

```js
import { nextVersion } from 'js-cool'
```

## Signature

```typescript
function nextVersion(version: string, type?: 'major' | 'minor' | 'patch'): string
```

## Parameters

| Parameter | Type                            | Description                       |
| --------- | ------------------------------- | --------------------------------- |
| `version` | `string`                        | Current version                   |
| `type`    | `'major' \| 'minor' \| 'patch'` | Increment type (default: 'patch') |

## Returns

`string` - Next version string.

## Examples

```js
nextVersion('1.2.3') // '1.2.4' (patch)
nextVersion('1.2.9', 'patch') // '1.2.10'
nextVersion('1.2.9', 'minor') // '1.3.0'
nextVersion('1.2.9', 'major') // '2.0.0'
```

## Related

- [compareVersion](/api/url/compare-version) - Compare versions
