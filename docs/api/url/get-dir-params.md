# getDirParams <Badge type="tip" text="since v6.0.0" />

Parse URL path information into structured components.

## Usage

```js
import { getDirParams } from 'js-cool'
```

## Signature

```typescript
interface DirParamsResult {
  /** Full origin, e.g. 'https://example.com' */
  origin: string
  /** Host with port, e.g. 'example.com:8080' */
  host: string
  /** Hostname without port, e.g. 'example.com' */
  hostname: string
  /** Full pathname, e.g. '/api/v1/users' */
  pathname: string
  /** Path segments array, e.g. ['api', 'v1', 'users'] */
  segments: string[]
  /** Query string without '?', e.g. 'id=123' */
  query: string
  /** Hash without '#', e.g. 'section' */
  hash: string
}

function getDirParams(url?: string): DirParamsResult
```

## Parameters

| Parameter | Type     | Description                                       |
| --------- | -------- | ------------------------------------------------- |
| `url`     | `string` | URL string. Uses current page URL if not provided |

## Returns

`DirParamsResult` - Parsed URL components.

## Examples

```js
// Full URL with all components
getDirParams('https://example.com:8080/api/v1/users?id=123#section')
// {
//   origin: 'https://example.com:8080',
//   host: 'example.com:8080',
//   hostname: 'example.com',
//   pathname: '/api/v1/users',
//   segments: ['api', 'v1', 'users'],
//   query: 'id=123',
//   hash: 'section'
// }

// Simple URL
getDirParams('https://example.com/media/video/test.mp4')
// {
//   origin: 'https://example.com',
//   host: 'example.com',
//   hostname: 'example.com',
//   pathname: '/media/video/test.mp4',
//   segments: ['media', 'video', 'test.mp4'],
//   query: '',
//   hash: ''
// }

// Current page URL (browser environment)
getDirParams()
// Returns parsed result of current page URL
```

## Features

- **Native URL API** - Uses browser's native URL API for best performance
- **IE11 Compatible** - Automatic fallback to regex implementation
- **Relative Path Support** - Handles both absolute and relative URLs
- **Query & Hash Separation** - Properly separates query string and hash from path

## Migration from `getDirParam`

::: warning Breaking Change
`getDirParam` has been **removed** in v6.0.0. Migrate to `getDirParams`.
:::

See the [Migration Guide](../../guide/migration.md#getdirparam--getdirparams) for complete migration details.
