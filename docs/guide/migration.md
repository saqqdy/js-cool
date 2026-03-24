# Migration Guide

## From v5.x to v6.x

> **[Changelog](https://github.com/saqqdy/js-cool/blob/master/CHANGELOG.md)** • **[中文版](https://github.com/saqqdy/js-cool/blob/master/MIGRATION-v5-to-v6-zh_CN.md)**

### Overview

v6.0.0 is a major release with breaking changes. The key changes are:

1. **Build output restructuring** - New file names and ESM-first approach
2. **Package exports** - Proper `exports` field with conditional exports
3. **`client` module removed** - Replaced by the new `ua` module
4. **Deprecated functions removed** - `getAppVersion`, `getOsVersion`, `getDirParam`
5. **`pattern` object removed** - Replaced by `patterns` / `validation`

### Quick Migration Checklist

- [ ] Update import paths (if using direct file imports)
- [ ] Update CDN links and global variable name (`JsCool` → `jsCool`)
- [ ] Replace `client` with `ua`
- [ ] Replace `pattern` with `validation`
- [ ] Replace deprecated functions
- [ ] Update TypeScript types

### Build System Migration

v6.0 migrates from Rollup to Rolldown, resulting in simplified build outputs and faster build times.

### Output Files Mapping

| v5.x                             | v6.x                     | Format                   |
| -------------------------------- | ------------------------ | ------------------------ |
| `dist/index.cjs.js`              | `dist/index.js`          | CJS                      |
| `dist/index.mjs`                 | `dist/index.mjs`         | ESM                      |
| `dist/index.esm-browser.js`      | `dist/index.mjs`         | ESM (use directly)       |
| `dist/index.esm-browser.prod.js` | `dist/index.mjs`         | ESM (let bundler minify) |
| `dist/index.global.js`           | `dist/index.iife.js`     | IIFE                     |
| `dist/index.global.prod.js`      | `dist/index.iife.min.js` | IIFE (minified)          |

### CDN Migration

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
The global variable name changed from `JsCool` (PascalCase) to `jsCool` (camelCase).
:::

### Import Path Migration

```js
// v5.x - Direct file import
import jsCool from 'js-cool/dist/index.esm-browser.js'

// v6.x - Use package export
import jsCool from 'js-cool'
```

### Deprecated Functions

| v5.x (Deprecated)     | v6.x (Replacement)     |
| --------------------- | ---------------------- |
| `getAppVersion()`     | `appVersion()`         |
| `getOsVersion()`      | `osVersion()`          |
| `getScrollPosition()` | `scroll.getPosition()` |

```js
// v5.x
const version = getAppVersion('Chrome')
const os = getOsVersion()
const pos = getScrollPosition()

// v6.x
const version = appVersion('Chrome')
const os = osVersion()
const pos = scroll.getPosition()
```

### Removed Functions

The following functions have been removed due to bugs or lack of usefulness:

| Function            | Reason                                           | Alternative                   |
| ------------------- | ------------------------------------------------ | ----------------------------- |
| `isExitsVariable()` | Always returned `true` due to implementation bug | Use `getGlobal(name) != null` |

```js
// v5.x (removed - was broken)
isExitsVariable('someVar') // always returned true

// v6.x - use getGlobal instead
import { getGlobal } from 'js-cool'
getGlobal('someVar') !== undefined // check if global variable exists
```

### Scroll Utilities Migration

The `getScrollPosition` function has been replaced by a comprehensive `scroll` utility module:

```js
// v5.x
import { getScrollPosition } from 'js-cool'
const pos = getScrollPosition() // 'top' | 'bottom' | undefined

// v6.x
import { scroll } from 'js-cool'
// or import scrollUtils from 'js-cool/scroll'

scroll.getPosition() // 'top' | 'bottom' | undefined
scroll.getProgress() // 0-100 (scroll progress percentage)
scroll.createDirectionTracker() // Track scroll direction ('up' | 'down')
scroll.isInViewport(el) // Check if element is in viewport
scroll.scrollTo('#section') // Scroll to element
scroll.scrollToTop() // Scroll to top
scroll.scrollToBottom() // Scroll to bottom
scroll.lock() // Lock scroll (for modals)
scroll.unlock() // Unlock scroll
scroll.getScrollbarWidth() // Get scrollbar width
```

#### Enhanced Features

| Method                       | Description                               |
| ---------------------------- | ----------------------------------------- |
| `getPosition(el, threshold)` | Now supports custom element and threshold |
| `getProgress(el)`            | New: Get scroll progress (0-100)          |
| `createDirectionTracker()`   | New: Track scroll direction               |
| `isInViewport(el, opts)`     | New: Check element visibility             |
| `scrollTo(target, opts)`     | New: Scroll to element/position           |
| `lock()` / `unlock()`        | New: Lock/unlock scroll                   |
| `getScrollbarWidth()`        | New: Get scrollbar width                  |

### Package Exports

v6.x uses conditional exports for better module resolution:

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

This ensures:

- Correct type declarations for CJS and ESM
- Proper module resolution in different environments
- Better tree-shaking support

### Build Performance

| Metric       | v5.x (Rollup) | v6.x (Rolldown) |
| ------------ | ------------- | --------------- |
| Build time   | ~6-8s         | ~110ms          |
| Config file  | ~190 lines    | ~65 lines       |
| Dependencies | 10+ plugins   | Built-in        |

### IE11 Compatibility

v6.x includes built-in IE11 compatibility without requiring external polyfills. This is achieved through an internal `_compat.ts` module that provides IE11-compatible alternatives to ES6+ features.

#### Key Changes for IE11

| Function | Change |
|----------|--------|
| `base64ToFile()` | Return type changed from `File` to `File \| Blob` |
| All methods | Now use internal compatibility layer |

#### Functions with Graceful Degradation

| Function | IE11 Behavior |
|----------|---------------|
| `isURL()` | Falls back to regex validation |
| `getDirParams()` | Uses regex parsing |
| `urlToBlob()` | Uses XHR instead of fetch |
| `isDarkMode()` | Returns `false` |
| `base64ToFile()` | Returns Blob with name property |

## Module Migrations

### `client` → `ua`

::: warning
The `client` module has been **removed** in v6.0.0. You must migrate to `ua`.
:::

#### Import Changes

```js
// Before (v5.x)
import { client, ClientDetector } from 'js-cool'

// After (v6.x)
import { ua, UAParser } from 'js-cool'

// Or tree-shakeable imports (recommended)
import { isMobile, isWeChat, isiOS } from 'js-cool/ua'
```

#### API Migration Table

| Before (`client`)           | After (`ua`)            | Notes                |
| --------------------------- | ----------------------- | -------------------- |
| `client()`                  | `ua()` or `ua.info`     | Get all info         |
| `client.info`               | `ua.info`               | Same property access |
| `client.get('browser')`     | `ua.get('browser')`     | Same method          |
| `client.getMultiple([...])` | `ua.getMultiple([...])` | Same method          |
| `client.isMobile()`         | `ua.isMobile()`         | Same method          |
| `client.isWeChat()`         | `ua.isWeChat()`         | Same method          |
| `client.has('Chrome')`      | `ua.has('Chrome')`      | Same method          |
| `client.getNetwork()`       | `ua.getNetwork()`       | Same method          |
| `client.getScreen()`        | `ua.getScreen()`        | Same method          |
| `new ClientDetector(ua)`    | `new UAParser(ua)`      | Class renamed        |

#### Legacy Properties Migration

| Before (`client`) | After (`ua`)                                   | Notes                   |
| ----------------- | ---------------------------------------------- | ----------------------- |
| `client.mobile`   | `ua.isMobile()` or `ua.device.mobile`          | Method call or property |
| `client.ios`      | `ua.isiOS()` or `ua.os.name === 'iOS'`         | Method call recommended |
| `client.android`  | `ua.isAndroid()` or `ua.os.name === 'Android'` | Method call recommended |
| `client.weixin`   | `ua.isWeChat()` or `ua.environment.wechat`     | Method call recommended |
| `client.qq`       | `ua.isQQ()` or `ua.environment.qq`             | Method call recommended |
| `client.iPad`     | `ua.device.ipad`                               | Property access         |
| `client.iPhone`   | `ua.device.iphone`                             | Property access         |

#### Code Example

```js
// Before (v5.x)
import { client, ClientDetector } from 'js-cool'
const info = client()
if (client.mobile) {
  /* ... */
}
if (client.weixin) {
  /* ... */
}
const detector = new ClientDetector(customUA)

// After (v6.x)
import { ua, UAParser } from 'js-cool'
const info = ua.info // or ua()
if (ua.isMobile()) {
  /* ... */
}
if (ua.isWeChat()) {
  /* ... */
}
const detector = new UAParser(customUA)
```

#### New Features in `ua`

```js
// New device detection
ua.device.phone // Is phone device
ua.device.ipad // Is iPad
ua.device.iphone // Is iPhone
ua.device.androidPhone // Is Android phone
ua.device.androidTablet // Is Android tablet

// New OS detection
ua.isHarmonyOS() // Detect HarmonyOS (鸿蒙)
ua.isiPadOS() // Detect iPadOS

// New environment detection (Chinese apps)
ua.environment.wxwork // WeChat Work (企业微信)
ua.environment.dingtalk // DingTalk (钉钉)
ua.environment.douyin // Douyin (抖音)
ua.environment.kuaishou // Kuaishou (快手)
ua.environment.baidu // Baidu App (百度App)
ua.environment.xiaomi // Xiaomi Browser (小米浏览器)
ua.environment.huawei // Huawei Browser (华为浏览器)
ua.environment.miniProgram // Mini Program (小程序)
ua.environment.miniGame // Mini Game (小游戏)
```

#### Type Migration

```ts
// Before (v5.x)
import type { ClientInfo, IClientDetector } from 'js-cool'

// After (v6.x)
import type { UAInfo, IUAParser } from 'js-cool'
```

| Old Type          | New Type    |
| ----------------- | ----------- |
| `ClientInfo`      | `UAInfo`    |
| `IClientDetector` | `IUAParser` |
| `ClientGetType`   | `UAGetType` |
| `ClientDetector`  | `UAParser`  |

### `pattern` → `patterns` / `validation`

::: warning Breaking Change
The `pattern` object from v5.x has been **removed** in v6.0.0. You must migrate to the new `patterns` module.
:::

#### Quick Migration

```js
// v5.x (REMOVED)
import { pattern } from 'js-cool'
pattern.email.test('user@example.com')
pattern.ip4.test('192.168.1.1')
pattern.pass.test('abc123')

// v6.x
import { validation } from 'js-cool'
validation.email.test('user@example.com')
validation.ipv4.test('192.168.1.1') // renamed: ip4 → ipv4
validation.password.test('abc123') // renamed: pass → password
```

#### Pattern Name Changes

| v5.x (`pattern`) | v6.x (`validation`) | Notes                             |
| ---------------- | ------------------- | --------------------------------- |
| `ip4`            | `ipv4`              | Renamed                           |
| `ip4_pri`        | `ipv4Private`       | Renamed                           |
| `pass`           | `password`          | Renamed                           |
| `isjson`         | `jsonLike`          | Renamed                           |
| `mobile`         | `mobile`            | Updated: now supports 1[3-9]      |
| `qq`             | `qq`                | Updated: now supports 5-14 digits |
| -                | `idCard`            | **NEW**: Chinese ID card          |
| -                | `hexColor`          | **NEW**: Hex color codes          |

### `getDirParam` → `getDirParams`

::: warning Breaking Change
`getDirParam` has been **removed** in v6.0.0. Migrate to `getDirParams`.
:::

#### Return Value Mapping

| `getDirParam` (v5.x) | `getDirParams` (v6.x) | Notes                      |
| -------------------- | --------------------- | -------------------------- |
| `host`               | `origin`              | Now includes protocol      |
| -                    | `host`                | New: hostname + port       |
| -                    | `hostname`            | New: hostname only         |
| -                    | `pathname`            | New: full path string      |
| `path`               | `segments`            | Renamed                    |
| -                    | `query`               | New: query string (no `?`) |
| -                    | `hash`                | New: hash value (no `#`)   |

#### Migration Example

```js
// v5.x (deprecated)
import { getDirParam } from 'js-cool'
const { host, path } = getDirParam('https://example.com/user/123')
// host: 'https://example.com'
// path: ['user', '123']

// v6.x
import { getDirParams } from 'js-cool'
const { origin, segments } = getDirParams('https://example.com/user/123')
// origin: 'https://example.com'
// segments: ['user', '123']
```

#### Fixed Issue

The old `getDirParam` incorrectly included query string in the last path segment:

```js
// v5.x - Bug: query mixed into path
getDirParam('https://example.com/api/users?id=123')
// { host: 'https://example.com', path: ['api', 'users?id=123'] }

// v6.x - Fixed: query properly separated
getDirParams('https://example.com/api/users?id=123')
// { origin: 'https://example.com', segments: ['api', 'users'], query: 'id=123', ... }
```

### URL Utilities

The `url` namespace and `Url` class are new in v6.0.0. No migration needed for existing functions like `getUrlParam`, `parseUrlParam`, etc. - they continue to work as before.

```js
// v5.x (still works)
import { getUrlParam, parseUrlParam } from 'js-cool'
getUrlParam('id', '?id=123')

// v6.x (new chainable API)
import { url, Url } from 'js-cool'
url.get('id', '?id=123')
new Url('?id=123').get('id')
```

## TypeScript Migration

### Type Renames

```ts
// v5.x
import type { ClientInfo, ClientGetType, IClientDetector } from 'js-cool'

// v6.x
import type { UAInfo, UAGetType, IUAParser } from 'js-cool'
// or from subpath
import type { UAInfo, DeviceInfo, OSInfo, BrowserInfo } from 'js-cool/ua'
```

### New Types

```ts
// Device info type
interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop'
  mobile: boolean
  tablet: boolean
  desktop: boolean
  touch: boolean
  phone: boolean
  ipad: boolean
  iphone: boolean
  androidPhone: boolean
  androidTablet: boolean
  model: string
}

// OS info type
interface OSInfo {
  name: OSName
  version: string
}

// Browser info type
interface BrowserInfo {
  name: BrowserName
  version: string
  engine: EngineName
  major: string
}

// Environment info type
interface EnvironmentInfo {
  wechat: boolean
  qq: boolean
  weibo: boolean
  alipay: boolean
  wxwork: boolean
  dingtalk: boolean
  douyin: boolean
  kuaishou: boolean
  baidu: boolean
  xiaomi: boolean
  huawei: boolean
  miniProgram: boolean
  miniGame: boolean
}

// Full UA info type
interface UAInfo {
  device: DeviceInfo
  os: OSInfo
  browser: BrowserInfo
  environment: EnvironmentInfo
  userAgent: string
}
```

## Step-by-Step Migration

### Step 1: Update Dependencies

```bash
# Update to v6.x
pnpm add js-cool@^6.0.0

# or
npm install js-cool@^6.0.0
```

### Step 2: Update Import Paths

If you were using direct file imports:

```js
// v5.x
import jsCool from 'js-cool/dist/index.esm-browser.js'

// v6.x
import jsCool from 'js-cool'
```

### Step 3: Update CDN Links

```html
<!-- v5.x -->
<script src="https://unpkg.com/js-cool/dist/index.global.prod.js"></script>

<!-- v6.x -->
<script src="https://unpkg.com/js-cool/dist/index.iife.min.js"></script>
```

### Step 4: Update Global Variable

```js
// v5.x
const { copy } = window.JsCool

// v6.x
const { copy } = window.jsCool
```

### Step 5: Replace Deprecated Functions

```js
// v5.x
const version = getAppVersion('Chrome')
const os = getOsVersion()

// v6.x
const version = appVersion('Chrome')
const os = osVersion()
```

### Step 6: Replace `client` with `ua`

```js
// v5.x
import { client, ClientDetector } from 'js-cool'
const info = client()
const isMobile = client.isMobile()

// v6.x
import { ua, UAParser } from 'js-cool'
const info = ua.info // or ua()
const isMobile = ua.isMobile()

// Or use tree-shaking
import { isMobile, getDeviceInfo } from 'js-cool/ua'
```

### Step 7: Replace `pattern` with `validation`

```js
// v5.x
import { pattern } from 'js-cool'
pattern.email.test('user@example.com')
pattern.ip4.test('192.168.1.1')

// v6.x
import { validation } from 'js-cool'
validation.email.test('user@example.com')
validation.ipv4.test('192.168.1.1')
```

### Step 8: Update TypeScript Types

```ts
// v5.x
import type { ClientInfo } from 'js-cool'

// v6.x
import type { UAInfo } from 'js-cool'
// or
import type { UAInfo, DeviceInfo } from 'js-cool/ua'
```

## Common Issues

### Issue: `window.JsCool is undefined`

**Solution:** The global variable name changed from `JsCool` to `jsCool` (lowercase).

```html
<!-- Before -->
<script>
  const { copy } = window.JsCool
</script>

<!-- After -->
<script>
  const { copy } = window.jsCool
</script>
```

### Issue: `client is not exported from 'js-cool'`

**Solution:** Replace `client` with `ua`.

```js
// Before
import { client } from 'js-cool'

// After
import { ua } from 'js-cool'
```

### Issue: `getAppVersion is not a function`

**Solution:** Use `appVersion` instead.

```js
// Before
getAppVersion('Chrome')

// After
appVersion('Chrome')
```

### Issue: `ClientInfo type not found`

**Solution:** Use `UAInfo` instead.

```ts
// Before
import type { ClientInfo } from 'js-cool'

// After
import type { UAInfo } from 'js-cool'
```

### Issue: `pattern is not defined`

**Solution:** Use `validation` instead.

```js
// Before
import { pattern } from 'js-cool'
pattern.email.test(email)

// After
import { validation } from 'js-cool'
validation.email.test(email)
```

## Need Help?

- **GitHub Issues:** [https://github.com/saqqdy/js-cool/issues](https://github.com/saqqdy/js-cool/issues)
- **Changelog:** [CHANGELOG.md](https://github.com/saqqdy/js-cool/blob/master/CHANGELOG.md)
- **Documentation:** [README.md](https://github.com/saqqdy/js-cool/blob/master/README.md)
