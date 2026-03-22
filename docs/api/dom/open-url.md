# openUrl <Badge type="info" text="since v1.0.6" />

Open URL in new window/tab.

## Usage

```js
import { openUrl } from 'js-cool'
```

## Signature

```typescript
function openUrl(url: string): void
```

## Parameters

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| `url`     | `string` | URL to open |

## Examples

```js
openUrl('https://example.com')
// Opens in new tab

// Open download link
openUrl('/files/document.pdf')
```
