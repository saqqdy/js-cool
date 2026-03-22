# 安装

## 包管理器

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

你也可以通过 CDN 直接使用 js-cool：

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
</script>
```

:::

## 验证安装

```js
import { version } from 'js-cool'

console.log('js-cool 版本:', version)
```
