# Installation

## Package Manager

::: code-group

```bash [pnpm]
pnpm add js-cool
```

```bash [npm]
npm install js-cool
```

```bash [bun]
bun add js-cool
```

:::

## CDN

You can also use js-cool directly via CDN:

::: code-group

```html [jsdelivr]
<script src="https://cdn.jsdelivr.net/npm/js-cool/dist/index.iife.min.js"></script>
<script>
  const { camel2Dash, unique } = window.jsCool
</script>
```

```html [unpkg]
<script src="https://unpkg.com/js-cool/dist/index.iife.min.js"></script>
<script>
  const { camel2Dash, unique } = window.jsCool
```

:::

## Verify Installation

```js
import { version } from 'js-cool'

console.log('js-cool version:', version)
```
