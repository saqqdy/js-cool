# Migration Guide: v5.x → v6.x

This guide helps you migrate from js-cool v5.x to v6.x.

> **[Changelog](./CHANGELOG.md)** • **[中文版](./MIGRATION-v5-to-v6-zh_CN.md)**

---

## Overview

v6.0.0 is a major release with breaking changes. The key changes are:

1. **Build output restructuring** - New file names and ESM-first approach
2. **Package exports** - Proper `exports` field with conditional exports
3. **`client` module removed** - Replaced by the new `ua` module
4. **Deprecated functions removed** - `getAppVersion`, `getOsVersion`

---

## Quick Migration Checklist

- [ ] Update import paths (if using direct file imports)
- [ ] Update CDN links and global variable name
- [ ] Replace `client` with `ua`
- [ ] Replace deprecated functions
- [ ] Update TypeScript types

---

## Breaking Changes

### 1. Build Output Files

The build output files have been renamed:

| v5.x                             | v6.x                     | Description                         |
| -------------------------------- | ------------------------ | ----------------------------------- |
| `dist/index.cjs.js`              | `dist/index.js`          | CJS output renamed                  |
| `dist/index.mjs`                 | `dist/index.mjs`         | ESM output (unchanged)              |
| `dist/index.esm-browser.js`      | `dist/index.mjs`         | Use ESM output directly             |
| `dist/index.esm-browser.prod.js` | `dist/index.mjs`         | Use ESM output (build tools minify) |
| `dist/index.global.js`           | `dist/index.iife.js`     | IIFE output renamed                 |
| `dist/index.global.prod.js`      | `dist/index.iife.min.js` | IIFE minified renamed               |

### 2. CDN Usage

The CDN usage has changed:

```html
<!-- v5.x -->
<script src="https://unpkg.com/js-cool/dist/index.global.prod.js"></script>
<script>
  const { copy } = window.JsCool
</script>

<!-- v6.x -->
<script src="https://unpkg.com/js-cool/dist/index.iife.min.js"></script>
<script>
  const { copy } = window.jsCool // Note: lowercase 'jsCool'
</script>
```

### 3. Package.json Exports

v6.x uses proper conditional exports:

```json
// v5.x
{
  "main": "dist/index.cjs.js",
  "module": "dist/index.mjs"
}

// v6.x
{
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "exports": {
    ".": {
      "require": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
      "import": { "types": "./dist/index.d.mts", "default": "./dist/index.mjs" }
    },
    "./ua": {
      "require": { "types": "./dist/ua/index.d.ts", "default": "./dist/ua/index.js" },
      "import": { "types": "./dist/ua/index.d.mts", "default": "./dist/ua/index.mjs" }
    }
  }
}
```

### 4. Deprecated Functions Removed

| Removed           | Replacement      |
| ----------------- | ---------------- |
| `getAppVersion()` | `appVersion()`   |
| `getOsVersion()`  | `osVersion()`    |
| `getDirParam()`   | `getDirParams()` |

### 5. `pattern` Object Removed

The `pattern` object has been removed and replaced with the new `patterns` module.

```js
// v5.x (removed)
import { pattern } from 'js-cool'
pattern.email.test('user@example.com')

// v6.x
import { patterns, validation } from 'js-cool'
patterns.validation.email.test('user@example.com')
// or
validation.email.test('user@example.com')
```

See [Migration: `pattern` → `patterns`](#migration-pattern--patterns) for details.

### 5. `client` Module Removed

The `client` module has been completely removed and replaced with `ua`.

---

## Migration: `client` → `ua`

### Why the Change?

The `client` module has been rewritten as `ua` (User Agent) with:

- **Better tree-shaking** - Import only what you need via `js-cool/ua`
- **More features** - Device detection, OS detection, Chinese app detection
- **Cleaner API** - More intuitive method names and structure
- **TypeScript support** - Full type definitions

### Basic Migration

```js
// v5.x (deprecated)
import { client } from 'js-cool'

client.isMobile()
client.info
client.get('browser')

// v6.x
import { ua } from 'js-cool'

ua.isMobile()
ua.info
ua.get('browser')
```

### Tree-shaking with Subpath Imports

For smaller bundle sizes, import only what you need:

```js
// v6.x - Tree-shaking friendly
import { isMobile, isTablet, isWeChat, isiOS } from 'js-cool/ua'
import { getBrowserInfo, getDeviceInfo, getOSInfo } from 'js-cool/ua'
import { getNetworkInfo, getScreenInfo } from 'js-cool/ua'
import type { UAInfo, DeviceInfo, OSInfo, BrowserInfo } from 'js-cool/ua'
```

### API Mapping Table

| Old API (`client`)          | New API (`ua`)          | Notes             |
| --------------------------- | ----------------------- | ----------------- |
| `client`                    | `ua`                    | Module renamed    |
| `client()`                  | `ua()` or `ua.info`     | Returns full info |
| `client.info`               | `ua.info`               | Unchanged         |
| `client.get('browser')`     | `ua.get('browser')`     | Unchanged         |
| `client.get('device')`      | `ua.get('device')`      | Unchanged         |
| `client.get('os')`          | `ua.get('os')`          | Unchanged         |
| `client.get('engine')`      | `ua.get('engine')`      | Unchanged         |
| `client.getMultiple([...])` | `ua.getMultiple([...])` | Unchanged         |
| `client.isMobile()`         | `ua.isMobile()`         | Unchanged         |
| `client.isWeChat()`         | `ua.isWeChat()`         | Unchanged         |
| `client.isQQ()`             | `ua.isQQ()`             | Unchanged         |
| `ClientDetector`            | `UADetector`            | Class renamed     |
| `IClientDetector`           | `IUADetector`           | Interface renamed |
| `ClientInfo`                | `UAInfo`                | Type renamed      |
| `ClientGetType`             | `UAGetType`             | Type renamed      |

### New Features in `ua`

The `ua` module includes new features not available in the old `client` module:

#### Device Detection

```js
import { ua } from 'js-cool'

ua.device.phone // Is phone device
ua.device.tablet // Is tablet
ua.device.desktop // Is desktop
ua.device.mobile // Is mobile (phone or tablet)
ua.device.touch // Has touch support
ua.device.ipad // Is iPad
ua.device.iphone // Is iPhone
ua.device.androidPhone // Is Android phone
ua.device.androidTablet // Is Android tablet
```

#### OS Detection

```js
ua.os.name // 'Windows', 'macOS', 'iOS', 'Android', 'HarmonyOS', etc.
ua.os.version // OS version string
ua.isiOS() // Is iOS
ua.isiPadOS() // Is iPadOS (NEW!)
ua.isAndroid() // Is Android
ua.isHarmonyOS() // Is HarmonyOS (NEW!)
```

#### Browser Detection

```js
ua.browser.name // 'Chrome', 'Firefox', 'Safari', 'Edge', etc.
ua.browser.version // Browser version
ua.browser.engine // 'Blink', 'WebKit', 'Gecko', etc.
```

#### Environment Detection (Chinese Apps)

```js
ua.environment.wechat // WeChat
ua.environment.qq // QQ
ua.environment.wxwork // WeChat Work (NEW!)
ua.environment.dingtalk // DingTalk (NEW!)
ua.environment.douyin // Douyin/TikTok (NEW!)
ua.environment.kuaishou // Kuaishou (NEW!)
ua.environment.baidu // Baidu App (NEW!)
ua.environment.xiaomi // Xiaomi Browser (NEW!)
ua.environment.huawei // Huawei Browser (NEW!)
ua.environment.miniProgram // Mini Program
ua.environment.miniGame // Mini Game (NEW!)
```

#### Quick Check Methods

```js
ua.isMobile() // Is mobile device
ua.isTablet() // Is tablet
ua.isDesktop() // Is desktop
ua.isTouch() // Has touch support
ua.isiOS() // Is iOS/iPadOS
ua.isAndroid() // Is Android
ua.isHarmonyOS() // Is HarmonyOS
ua.isWeChat() // Is WeChat
ua.isQQ() // Is QQ
ua.isMiniProgram() // Is Mini Program
ua.isDarkMode() // Dark mode enabled (NEW!)
```

#### Utility Methods

```js
ua.getNetwork() // Network info: { online, type, effectiveType, downlink, rtt, saveData }
ua.getScreen() // Screen info: { width, height, pixelRatio, orientation, colorDepth }
ua.getLanguage() // Browser language: 'en-US'
ua.getTimezone() // Timezone: 'Asia/Shanghai'
ua.getOrientationStatus() // 'portrait' or 'landscape'
ua.isDarkMode() // Dark mode preferred
ua.has('Chrome') // Check if string exists in UA
```

#### Custom UA Detection

```js
import { UADetector } from 'js-cool'

// Create detector with custom UA string
const detector = new UADetector('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)')

detector.isMobile() // true
detector.isiOS() // true
detector.browser.name // 'Safari'
```

### Standalone Functions (Tree-shakeable)

```js
// Import from subpath for tree-shaking
import {
  isMobile,
  isTablet,
  isWeChat,
  isQQ,
  isiOS,
  isAndroid,
  isHarmonyOS,
  isDarkMode,
  getDeviceInfo,
  getOSInfo,
  getBrowserInfo,
  getNetworkInfo,
  getScreenInfo,
} from 'js-cool/ua'

// Use directly
if (isMobile()) {
  // Mobile-specific logic
}

if (isWeChat()) {
  // WeChat-specific logic
}

const device = getDeviceInfo()
// { type, mobile, tablet, desktop, touch, phone, ipad, iphone, ... }
```

---

## TypeScript Migration

### Type Renames

```ts
// v5.x
import type { ClientInfo, ClientGetType, IClientDetector } from 'js-cool'

// v6.x
import type { UAInfo, UAGetType, IUADetector } from 'js-cool'
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

---

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
const detector = new ClientDetector()

// v6.x
import { ua, UADetector } from 'js-cool'

const info = ua()
const isMobile = ua.isMobile()
const detector = new UADetector()

// Or use tree-shaking
import { isMobile, getDeviceInfo } from 'js-cool/ua'
```

### Step 7: Update TypeScript Types

```ts
// v5.x
import type { ClientInfo } from 'js-cool'

// v6.x
import type { UAInfo } from 'js-cool'
// or
import type { UAInfo, DeviceInfo } from 'js-cool/ua'
```

---

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

---

## Migration: `getDirParam` → `getDirParams`

### Why the Change?

The `getDirParam` function has been completely rewritten as `getDirParams` with:

- **Better structure** - Returns structured URL components instead of indexed object
- **More information** - Includes origin, host, hostname, pathname, query, hash
- **Correct query/hash handling** - Properly separates query string and hash from path
- **IE11 compatible** - Uses native URL API with regex fallback

### API Comparison

```js
// v5.x (deprecated)
import { getDirParam } from 'js-cool'

const result = getDirParam('https://example.com/user/123/profile')
// { host: 'https://example.com', path: ['user', '123', 'profile'] }

// v6.x
import { getDirParams } from 'js-cool'

const result = getDirParams('https://example.com/user/123/profile')
// {
//   origin: 'https://example.com',
//   host: 'example.com',
//   hostname: 'example.com',
//   pathname: '/user/123/profile',
//   segments: ['user', '123', 'profile'],
//   query: '',
//   hash: ''
// }
```

### Return Value Mapping

| Old (`getDirParam`) | New (`getDirParams`) | Notes                      |
| ------------------- | -------------------- | -------------------------- |
| `host`              | `origin`             | Now includes protocol      |
| -                   | `host`               | New: hostname + port       |
| -                   | `hostname`           | New: hostname only         |
| -                   | `pathname`           | New: full path string      |
| `path`              | `segments`           | Renamed                    |
| -                   | `query`              | New: query string (no `?`) |
| -                   | `hash`               | New: hash value (no `#`)   |

### Migration Examples

```js
// v5.x - Getting path segments
const { path } = getDirParam(url)
const firstSegment = path[0]

// v6.x - Getting path segments
const { segments } = getDirParams(url)
const firstSegment = segments[0]

// v5.x - Getting host
const { host } = getDirParam(url)

// v6.x - Getting origin (includes protocol)
const { origin } = getDirParams(url)

// v6.x - New features
const { query, hash, hostname, pathname } = getDirParams(url)
```

### Fixed Issues

The old `getDirParam` incorrectly included query string in the last path segment:

```js
// v5.x - Bug: query string mixed into path
getDirParam('https://example.com/api/users?id=123')
// { host: 'https://example.com', path: ['api', 'users?id=123'] }

// v6.x - Fixed: query string properly separated
getDirParams('https://example.com/api/users?id=123')
// { origin: 'https://example.com', segments: ['api', 'users'], query: 'id=123', ... }
```

---

## Migration: `pattern` → `patterns`

### Why the Change?

The `pattern` object has been removed and replaced with a new unified `patterns` module with:

- **Better organization** - Separated into `validation` and `ua` categories
- **More patterns** - Added `idCard`, `hexColor`, and improved `mobile`, `qq`
- **UA patterns** - Direct access to device, browser, OS detection patterns
- **Utility functions** - `getUserAgent`, `matchPattern`, `extractVersion`
- **TypeScript support** - Full type definitions for all pattern names

### API Comparison

```js
// v5.x (removed)
import { pattern } from 'js-cool'

pattern.email.test('user@example.com')
pattern.mobile.test('13800138000')
pattern.url.test('https://example.com')

// v6.x
import { patterns, validation } from 'js-cool'

// Using patterns object
patterns.validation.email.test('user@example.com')
patterns.validation.mobile.test('13800138000')
patterns.validation.url.test('https://example.com')

// Or import directly
validation.email.test('user@example.com')
validation.mobile.test('13800138000')
```

### Pattern Name Mapping

| Old (`pattern`) | New (`validation`) | Notes                              |
| --------------- | ------------------ | ---------------------------------- |
| `any`           | `any`              | Unchanged                          |
| `email`         | `email`            | Unchanged                          |
| `mobile`        | `mobile`           | Updated: now supports 1[3-9]xxx... |
| `url`           | `url`              | Unchanged                          |
| `number`        | `number`           | Unchanged                          |
| `chinese`       | `chinese`          | Unchanged                          |
| `ip4`           | `ipv4`             | Renamed                            |
| `ip4_pri`       | `ipv4Private`      | Renamed                            |
| `mac`           | `mac`              | Unchanged                          |
| `qq`            | `qq`               | Updated: now supports 5-14 digits  |
| `pass`          | `password`         | Renamed                            |
| `postcode`      | `postcode`         | Unchanged                          |
| `username`      | `username`         | Unchanged                          |
| `tel`           | `tel`              | Unchanged                          |
| `json`          | `json`             | Unchanged                          |
| `array`         | `array`            | Unchanged                          |
| `arrjson`       | `arrjson`          | Unchanged                          |
| `isjson`        | `jsonLike`         | Renamed                            |
| `float`         | `float`            | Unchanged                          |
| `string`        | `string`           | Unchanged                          |
| `textarea`      | `textarea`         | Unchanged                          |
| -               | `idCard`           | **NEW**: Chinese ID card           |
| -               | `hexColor`         | **NEW**: Hex color codes           |

### New Features

#### UA Detection Patterns

```js
import { DEVICE_PATTERNS, BROWSER_PATTERNS, OS_PATTERNS, ENV_PATTERNS } from 'js-cool'

// Device detection
DEVICE_PATTERNS.mobile.test(navigator.userAgent)
DEVICE_PATTERNS.tablet.test(navigator.userAgent)
DEVICE_PATTERNS.iphone.test(navigator.userAgent)

// Browser detection
BROWSER_PATTERNS.chrome.test(navigator.userAgent)
BROWSER_PATTERNS.firefox.test(navigator.userAgent)
BROWSER_PATTERNS.safari.test(navigator.userAgent)

// OS detection
OS_PATTERNS.windows.test(navigator.userAgent)
OS_PATTERNS.macOS.test(navigator.userAgent)
OS_PATTERNS.harmonyOS.test(navigator.userAgent)

// Environment detection (Chinese apps)
ENV_PATTERNS.wechat.test(navigator.userAgent)
ENV_PATTERNS.dingtalk.test(navigator.userAgent)
ENV_PATTERNS.miniProgram.test(navigator.userAgent)
```

#### Utility Functions

```js
import { getUA, matchPattern, extractVersion } from 'js-cool'

// Get UA string safely
const ua = getUA()

// Check if pattern exists
matchPattern(ua, /Chrome/i) // true/false

// Extract version
extractVersion(ua, /Chrome\/(\d+\.?\d*)/i) // '91.0'
```

### Migration Examples

```js
// v5.x - Email validation
if (pattern.email.test(email)) {
  /* ... */
}

// v6.x - Email validation
if (validation.email.test(email)) {
  /* ... */
}

// v5.x - Chinese mobile
if (pattern.mobile.test(phone)) {
  /* ... */
}

// v6.x - Chinese mobile (improved pattern)
if (validation.mobile.test(phone)) {
  /* ... */
}

// v5.x - IPv4
if (pattern.ip4.test(ip)) {
  /* ... */
}

// v6.x - IPv4 (renamed)
if (validation.ipv4.test(ip)) {
  /* ... */
}

// v5.x - Password
if (pattern.pass.test(password)) {
  /* ... */
}

// v6.x - Password (renamed)
if (validation.password.test(password)) {
  /* ... */
}
```

### TypeScript Types

```ts
// v6.x - New type exports
import type {
  ValidationPatternName,
  DevicePatternName,
  OSPatternName,
  BrowserPatternName,
  EnginePatternName,
  EnvPatternName,
} from 'js-cool'
```

---

## Need Help?

- **GitHub Issues:** [https://github.com/saqqdy/js-cool/issues](https://github.com/saqqdy/js-cool/issues)
- **Changelog:** [CHANGELOG.md](./CHANGELOG.md)
- **Documentation:** [README.md](./README.md)
