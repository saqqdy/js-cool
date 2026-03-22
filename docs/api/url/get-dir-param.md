# getDirParam <Badge type="danger" text="deprecated" /> <Badge type="info" text="since v1.0.1" />

::: warning Deprecated
It will be refactored and renamed getDirParams in the next major release.
:::


Get directory-style URL parameters.

## Usage

```js
import { getDirParam } from 'js-cool'
```

## Signature

```typescript
function getDirParam(path: string): Record<string, string>
```

## Parameters

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| `path`    | `string` | Path pattern with `:paramName` |

## Returns

`Record<string, string>` - Extracted parameters.

## Examples

```js
// URL: /api/users/123/posts/456
getDirParam('/api/users/:userId/posts/:postId')
// { userId: '123', postId: '456' }

// Current location path
getDirParam('/products/:category/:id')
// { category: 'electronics', id: '123' }
```
