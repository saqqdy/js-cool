# 迁移指南

## 从 v5.x 升级到 v6.x

### 构建系统迁移

v6.0 从 Rollup 迁移到 Rolldown，简化了构建产物并提升了构建速度。

### 输出文件映射

| v5.x                             | v6.x                     | 格式                  |
| -------------------------------- | ------------------------ | --------------------- |
| `dist/index.cjs.js`              | `dist/index.js`          | CJS                   |
| `dist/index.mjs`                 | `dist/index.mjs`         | ESM                   |
| `dist/index.esm-browser.js`      | `dist/index.mjs`         | ESM（直接使用）       |
| `dist/index.esm-browser.prod.js` | `dist/index.mjs`         | ESM（让打包工具压缩） |
| `dist/index.global.js`           | `dist/index.iife.js`     | IIFE                  |
| `dist/index.global.prod.js`      | `dist/index.iife.min.js` | IIFE（压缩版）        |

### CDN 迁移

```html
<!-- v5.x -->
<script src="https://unpkg.com/js-cool/dist/index.global.prod.js"></script>
<script>
  const { copy, randomString } = window.JsCool
</script>

<!-- v6.x -->
<script src="https://unpkg.com/js-cool/dist/index.iife.min.js"></script>
<script>
  const { copy, randomString } = window.jsCool
</script>
```

::: warning
全局变量名从 `JsCool`（帕斯卡命名）改为 `jsCool`（驼峰命名）。
:::

### 导入路径迁移

```js
// v5.x - 直接文件导入
import jsCool from 'js-cool/dist/index.esm-browser.js'

// v6.x - 使用包导出
import jsCool from 'js-cool'
```

### 废弃函数替换

| v5.x（已废弃）    | v6.x（替代方案） |
| ----------------- | ---------------- |
| `getAppVersion()` | `appVersion()`   |
| `getOsVersion()`  | `osVersion()`    |

```js
// v5.x
const version = getAppVersion('Chrome')
const os = getOsVersion()

// v6.x
const version = appVersion('Chrome')
const os = osVersion()
```

### 包导出配置

v6.x 使用条件导出以提供更好的模块解析：

```json
{
  "exports": {
    ".": {
      "require": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "import": {
        "types": "./dist/index.d.mts",
        "default": "./dist/index.mjs"
      }
    }
  }
}
```

这确保了：

- CJS 和 ESM 的正确类型声明
- 不同环境下的正确模块解析
- 更好的 tree-shaking 支持

### 构建性能对比

| 指标     | v5.x (Rollup) | v6.x (Rolldown) |
| -------- | ------------- | --------------- |
| 构建时间 | ~6-8s         | ~110ms          |
| 配置文件 | ~190 行       | ~65 行          |
| 依赖     | 10+ 插件      | 内置            |
