# preloader

Preload resources (images, scripts, etc.).

## Usage

```js
import { preloader } from 'js-cool'
```

## Signature

```typescript
function preloader(resources: string[]): Promise<void>
```

## Parameters

| Parameter   | Type       | Description          |
| ----------- | ---------- | -------------------- |
| `resources` | `string[]` | URLs to preload      |

## Returns

`Promise<void>` - Resolves when all loaded.

## Examples

```js
// Preload images
preloader([
  'image1.jpg',
  'image2.jpg',
  'image3.jpg'
]).then(() => {
  console.log('All images loaded')
})

// Preload scripts
preloader([
  'script1.js',
  'script2.js'
])
```
