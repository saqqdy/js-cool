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
5. **New `binary` module** - Unified binary data conversion API (recommended replacement for old convert functions)

---

## Quick Migration Checklist

- [ ] Update import paths (if using direct file imports)
- [ ] Update CDN links and global variable name
- [ ] Replace `client` with `ua`
- [ ] Replace deprecated functions
- [ ] Migrate to new `binary` module (recommended)
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

| Removed               | Replacement                                |
| --------------------- | ------------------------------------------ |
| `getAppVersion()`     | `appVersion()`                             |
| `getOsVersion()`      | `osVersion()`                              |
| `getDirParam()`       | `getDirParams()`                           |
| `getScrollPosition()` | `scroll.getPosition()`                     |
| `getQueryParam()`     | `url.get()` or `new Url(url).get()`        |
| `getQueryParams()`    | `url.parse()` or `new Url(url).toObject()` |
| `getUrlParam()`       | `url.get()` or `new Url(url).get()`        |
| `getUrlParams()`      | `url.parse()` or `new Url(url).toObject()` |
| `parseUrlParam()`     | `url.parse()`                              |
| `spliceUrlParam()`    | `url.stringify()` or `new Url(url).set()`  |
| `mapTemplate()`       | `template()` (enhanced version)            |
| `isExitsFunction()`   | `isFunctionExists()` (fixed typo)          |

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

### 6. Storage Functions Replaced with Namespace API

The individual storage functions have been replaced by a unified `storage` namespace:

| v5.x (Removed)             | v6.x                                             |
| -------------------------- | ------------------------------------------------ |
| `setCache(k, v)`           | `storage.local.set(k, v)`                        |
| `setCache(k, v, seconds)`  | `storage.local.set(k, v, { expires: seconds })`  |
| `getCache(k)`              | `storage.local.get(k)`                           |
| `delCache(k)`              | `storage.local.delete(k)`                        |
| `setSession(k, v)`         | `storage.session.set(k, v)`                      |
| `getSession(k)`            | `storage.session.get(k)`                         |
| `delSession(k)`            | `storage.session.delete(k)`                      |
| `setCookie(k, v, seconds)` | `storage.cookie.set(k, v, { expires: seconds })` |
| `getCookie(k)`             | `storage.cookie.get(k)`                          |
| `getCookies()`             | `storage.cookie.getAll()`                        |
| `delCookie(k)`             | `storage.cookie.delete(k)`                       |

---

## Build System Migration

v6.0 migrates from Rollup to Rolldown, resulting in simplified build outputs and faster build times.

### Build Performance

| Metric       | v5.x (Rollup) | v6.x (Rolldown) |
| ------------ | ------------- | --------------- |
| Build time   | ~6-8s         | ~110ms          |
| Config file  | ~190 lines    | ~65 lines       |
| Dependencies | 10+ plugins   | Built-in        |

---

## Scroll Utilities Migration

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

### Enhanced Features

| Method                       | Description                               |
| ---------------------------- | ----------------------------------------- |
| `getPosition(el, threshold)` | Now supports custom element and threshold |
| `getProgress(el)`            | New: Get scroll progress (0-100)          |
| `createDirectionTracker()`   | New: Track scroll direction               |
| `isInViewport(el, opts)`     | New: Check element visibility             |
| `scrollTo(target, opts)`     | New: Scroll to element/position           |
| `lock()` / `unlock()`        | New: Lock/unlock scroll                   |
| `getScrollbarWidth()`        | New: Get scrollbar width                  |

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
| `ClientDetector`            | `UAParser`              | Class renamed     |
| `IClientDetector`           | `IUAParser`             | Interface renamed |
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
import { UAParser } from 'js-cool'

// Create parser with custom UA string
const parser = new UAParser('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)')

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
import { ua, UAParser } from 'js-cool'

const info = ua()
const isMobile = ua.isMobile()
const parser = new UAParser()

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

| Old (`pattern`) | New (`validation`) | Notes                                        |
| --------------- | ------------------ | -------------------------------------------- |
| `any`           | `any`              | Unchanged                                    |
| `email`         | `email`            | Updated: more standard validation            |
| `mobile`        | `mobile`           | Updated: now supports 1[3-9]xxx...           |
| `url`           | `url`              | Updated: stricter validation                 |
| `number`        | `number`           | Unchanged                                    |
| `chinese`       | `chinese`          | Unchanged                                    |
| `ip4`           | `ipv4`             | Renamed                                      |
| `ip4_pri`       | `ipv4Private`      | Renamed                                      |
| `mac`           | `mac`              | Unchanged                                    |
| `qq`            | `qq`               | Updated: now supports 5-14 digits            |
| `pass`          | `password`         | Renamed                                      |
| `postcode`      | `postcode`         | Unchanged                                    |
| `username`      | `username`         | Updated: cannot start/end with special chars |
| `tel`           | `tel`              | Unchanged                                    |
| `json`          | `json`             | Unchanged                                    |
| `array`         | `array`            | Unchanged                                    |
| `arrjson`       | `arrjson`          | Unchanged                                    |
| `isjson`        | `jsonLike`         | Renamed                                      |
| `float`         | `float`            | Fixed: no longer matches `123.`              |
| `string`        | `string`           | Unchanged                                    |
| `textarea`      | `textarea`         | Unchanged                                    |
| -               | `idCard`           | **NEW**: Chinese ID card                     |
| -               | `hexColor`         | **NEW**: Hex color codes                     |
| -               | `ipv6`             | **NEW**: IPv6 addresses                      |
| -               | `uuid`             | **NEW**: UUID v1-v5                          |
| -               | `semver`           | **NEW**: Semantic versioning                 |
| -               | `base64`           | **NEW**: Base64 encoded strings              |
| -               | `slug`             | **NEW**: URL slug                            |
| -               | `bankCard`         | **NEW**: Bank card number                    |
| -               | `creditCard`       | **NEW**: Credit card number                  |
| -               | `date`             | **NEW**: Date format YYYY-MM-DD              |
| -               | `time`             | **NEW**: Time format HH:mm:ss                |
| -               | `datetime`         | **NEW**: Datetime format                     |

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
  URLPatternName,
} from 'js-cool'
```

---

## New: URL Utilities

URL utilities with URLSearchParams-like API and a new chainable `Url` class:

### Url Class

Enhanced URL builder that parses both search and hash parameters:

```js
import { Url } from 'js-cool'

// Basic usage - auto search from both scopes (hash priority)
const u = new Url('https://a.cn/?ss=1#/path?bb=343')

u.get('ss') // '1' (from search)
u.get('bb') // '343' (from hash)
u.has('ss') // true
u.keys() // ['ss', 'bb']

// Specify scope
u.get('ss', 'search') // '1'
u.get('ss', 'hash') // null
u.get('ss', 'all') // '1' (default, hash priority)

// Get all params
u.toObject() // { ss: '1', bb: '343' }
u.toObject('search') // { ss: '1' }
u.toObject('hash') // { bb: '343' }

// Detailed info (with source)
u.toDetailObject()
// {
//   search: { ss: '1' },
//   hash: { bb: '343' },
//   all: { ss: '1', bb: '343' },
//   source: { ss: 'search', bb: 'hash' }
// }

// Chainable modifications
u.set('token', 'abc').set('page', 1).delete('ss')
u.toString() // 'https://a.cn/?token=abc&page=1#/path?bb=343'

// Operate on hash params
u.set('bb', '999', 'hash')
u.toURL() // 'https://a.cn/?token=abc&page=1#/path?bb=999'

// URL building
new Url('https://api.example.com')
  .path('users', '123')
  .set('fields', 'name,email')
  .setHash('section')
  .toString()
// 'https://api.example.com/users/123?fields=name,email#section'

// Property getters
u.origin // 'https://example.com'
u.host // 'example.com:8080' (with port)
u.hostname // 'example.com'
u.pathname // '/api/users'
u.search // '?id=123'
u.hash // '#section'

// Static methods
Url.parse('?a=1&b=true', { convert: true }) // { a: 1, b: true }
Url.stringify({ a: 1, b: 2 }) // '?a=1&b=2'
Url.getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
Url.getHost('https://example.com:8080/path') // 'example.com:8080'
Url.getPathname('https://example.com/api/users?id=1') // '/api/users'
Url.current() // From current page URL
Url.fromQueryString('a=1&b=2') // From query string
```

### url Namespace (Factory + Static)

```js
import { url } from 'js-cool'

// Static methods
url.parse('?a=1&b=true', { convert: true }) // { a: 1, b: true }
url.stringify({ a: 1, b: 2 }) // '?a=1&b=2'

// URLSearchParams-like (static)
url.get('id', 'https://example.com?id=123') // '123'
url.getAll('id', 'https://example.com?id=1&id=2') // ['1', '2']
url.has('token', 'https://example.com?token=abc') // true
url.set('page', 2, 'https://example.com') // 'https://example.com/?page=2'
url.append('id', 3, 'https://example.com?id=1') // 'https://example.com/?id=1&id=3'
url.delete('token', 'https://example.com?token=abc&id=1') // 'https://example.com/?id=1'

// Iteration
url.keys('https://example.com?a=1&b=2') // ['a', 'b']
url.values('https://example.com?a=1&b=2') // ['1', '2']
url.entries('https://example.com?a=1&b=2') // [['a', '1'], ['b', '2']]

// URL property extraction
url.getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
url.getHost('https://example.com:8080/path') // 'example.com:8080'
url.getHostname('https://example.com:8080/path') // 'example.com'
url.getPathname('https://example.com/api/users?id=1') // '/api/users'
url.getSearch('https://example.com?key=value') // '?key=value'
url.getHash('https://example.com/path#section') // '#section'
```

### Direct Function Imports

```js
import {
  get,
  getAll,
  has,
  set,
  append,
  deleteParam,
  keys,
  values,
  entries,
  getOrigin,
  getHost,
  getHostname,
  getPathname,
  getSearch,
  getHash,
  parse,
  stringify,
} from 'js-cool'

// Same as url.* static methods
get('id', 'https://example.com?id=123') // '123'
set('page', 2, 'https://example.com') // 'https://example.com/?page=2'
parse('?a=1&b=true', { convert: true }) // { a: 1, b: true }
stringify({ a: 1, b: 2 }) // '?a=1&b=2'
```

---

## Migration: Binary Conversion Functions → `binary` Module

### Why the Change?

The binary conversion functions have been unified into a new `binary` module with:

- **Chainable API** - Convert between any formats with a single entry point
- **Unified interface** - Consistent method names across all conversion types
- **More features** - Hash functions (MD5, SHA-1, SHA-256, CRC32), file metadata, hex encoding
- **Type detection** - `isBlob()`, `isFile()`, `isArrayBuffer()`, `isDataURL()`, `isBase64()`
- **Better TypeScript support** - Full type definitions for all methods
- **IE11 compatible** - Built-in compatibility layer

### Function Mapping Table

| Old Function (v5.x)             | New Module API (v6.x)                                        |
| ------------------------------- | ------------------------------------------------------------ |
| `encodeBase64(str)`             | `binary.base64.encode(str)` or `binary.text.toBase64(str)`   |
| `decodeBase64(str)`             | `binary.base64.decode(str)` or `binary.text.fromBase64(str)` |
| `arrayBufferToBase64(buf)`      | `binary.arrayBuffer.toBase64(buf)`                           |
| `base64ToArrayBuffer(b64)`      | `binary.base64.toArrayBuffer(b64)`                           |
| `base64ToBlob(b64, mime)`       | `binary.base64.toBlob(b64, mime)`                            |
| `base64ToFile(b64, name, mime)` | `binary.base64.toFile(b64, name, mime)`                      |
| `blobToArrayBuffer(blob)`       | `await binary.blob.toArrayBuffer(blob)`                      |
| `blobToBase64(blob)`            | `await binary.blob.toBase64(blob)`                           |
| `blobToUrl(blob)`               | `binary.blob.toURL(blob).url`                                |
| `fileToBase64(file)`            | `await binary.file.toBase64(file)`                           |
| `svgToBlob(svg)`                | `binary.svg.toBlob(svg)`                                     |
| `urlToBlob(url)`                | `await binary.url.toBlob(url)`                               |
| `arrayBufferToBlob(buf, mime)`  | `binary.arrayBuffer.toBlob(buf, mime)`                       |

### Basic Migration

```js
// v5.x - Individual functions
import { encodeBase64, decodeBase64, blobToBase64, base64ToBlob, fileToBase64 } from 'js-cool'

const b64 = encodeBase64('Hello World')
const str = decodeBase64(b64)
const base64FromBlob = await blobToBase64(blob)
const blobFromBase64 = base64ToBlob(b64, 'image/png')
const base64FromFile = await fileToBase64(file)

// v6.x - Unified binary module
import { binary } from 'js-cool'

const b64 = binary.base64.encode('Hello World')
const str = binary.base64.decode(b64)
const base64FromBlob = await binary.blob.toBase64(blob)
const blobFromBase64 = binary.base64.toBlob(b64, 'image/png')
const base64FromFile = await binary.file.toBase64(file)
```

### Chainable Conversion (NEW)

The new `binary.from()` method provides a chainable API for conversions:

```js
import { binary } from 'js-cool'

// Convert from any input type to any output type
const base64 = await binary.from(blob).toBase64()
const arrayBuffer = await binary.from(file).toArrayBuffer()
const dataURL = await binary.from(base64String).toDataURL('image/png')
const { url, revoke } = await binary.from(arrayBuffer).toURL()

// Get metadata
const mime = binary.from(blob).getMime()
const size = binary.from(file).getSize()
```

### New Features

#### Hash Functions

```js
import { binary } from 'js-cool'

// Calculate hashes
const md5 = await binary.hash.md5('Hello World')
// 'b10a8db164e0754105b7a99be72e3fe5'

const sha1 = await binary.hash.sha1('Hello World')
// '0a4d55a8d778e5022fab701977c5d840bbc486d0'

const sha256 = await binary.hash.sha256('Hello World')
// 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'

const crc32 = binary.hash.crc32('Hello World')
// 2346237359
```

#### Hex Encoding

```js
import { binary } from 'js-cool'

// Encode/decode hex
const buffer = binary.text.encode('Hello')
const hex = binary.hex.encode(buffer) // '48656c6c6f'

const decoded = binary.hex.decode('48656c6c6f')
const text = binary.text.decode(decoded) // 'Hello'
```

#### File Metadata

```js
import { binary } from 'js-cool'

const meta = binary.meta.get(file)
// {
//   size: 1024,
//   mime: 'image/png',
//   name: 'image.png',
//   extension: 'png',
//   isImage: true,
//   isVideo: false,
//   isAudio: false,
//   isText: false,
//   lastModified: 1640000000000
// }
```

#### Type Detection

```js
import { binary } from 'js-cool'

binary.isBlob(new Blob(['hello'])) // true
binary.isFile(new File(['hello'], 'test.txt')) // true
binary.isArrayBuffer(new ArrayBuffer(8)) // true
binary.isDataURL('data:text/plain;base64,SGVsbG8=') // true
binary.isBase64('SGVsbG8gV29ybGQ=') // true
```

#### Binary Comparison & Cloning

```js
import { binary } from 'js-cool'

// Compare binary data
const same = await binary.compare(blob1, blob2) // true/false

// Clone binary data
const cloned = binary.clone(blob) // new Blob with same content

// Download binary data
binary.download(blob, 'file.txt')
```

### Sub-module APIs

The `binary` module exports several sub-modules:

```js
import { binary } from 'js-cool'

// base64 module
binary.base64.encode(str)
binary.base64.decode(b64)
binary.base64.toBlob(b64, mime?)
binary.base64.toArrayBuffer(b64)
binary.base64.toDataURL(b64, mime)
binary.base64.toFile(b64, filename, mime?)

// blob module
await binary.blob.toBase64(blob)
await binary.blob.toArrayBuffer(blob)
await binary.blob.toDataURL(blob)
binary.blob.toFile(blob, filename)
binary.blob.toURL(blob) // { url, revoke }
binary.blob.concat([blob1, blob2], mime?)
binary.blob.slice(blob, start, end, mime?)

// arrayBuffer module
binary.arrayBuffer.toBase64(buffer, mime?)
binary.arrayBuffer.toDataURL(buffer, mime)
binary.arrayBuffer.toBlob(buffer, mime?)
binary.arrayBuffer.toString(buffer, encoding?)
binary.arrayBuffer.toHex(buffer)

// file module
await binary.file.toBase64(file)
await binary.file.toArrayBuffer(file)
binary.file.toBlob(file)

// text module
binary.text.encode(str, encoding?)
binary.text.decode(buffer, encoding?)
binary.text.toBase64(str)
binary.text.fromBase64(b64)

// hex module
binary.hex.encode(buffer)
binary.hex.decode(hex)

// dataURL module
binary.dataURL.parse(dataURL) // { mime, base64, data }
binary.dataURL.build(b64, mime)
binary.dataURL.isValid(str)

// svg module
binary.svg.toBlob(svg)
binary.svg.toDataURL(svg)
binary.svg.toURL(svg) // { url, revoke }

// url module
await binary.url.toBlob(url)
await binary.url.toDataURL(url)

// hash module
await binary.hash.md5(data)
await binary.hash.sha1(data)
await binary.hash.sha256(data)
binary.hash.crc32(data)

// meta module
binary.meta.get(file)
```

### Migration Examples

```js
// v5.x - Base64 encoding
import { encodeBase64, decodeBase64 } from 'js-cool'
const encoded = encodeBase64('Hello 世界')
const decoded = decodeBase64(encoded)

// v6.x - Use binary module
import { binary } from 'js-cool'
const encoded = binary.base64.encode('Hello 世界')
const decoded = binary.base64.decode(encoded)

// v5.x - Blob conversion
import { blobToBase64, blobToUrl } from 'js-cool'
const b64 = await blobToBase64(blob)
const url = blobToUrl(blob)

// v6.x - Use binary module
import { binary } from 'js-cool'
const b64 = await binary.blob.toBase64(blob)
const { url } = binary.blob.toURL(blob)

// v5.x - File handling
import { fileToBase64 } from 'js-cool'
const b64 = await fileToBase64(file)

// v6.x - Use binary module with chainable API
import { binary } from 'js-cool'
const b64 = await binary.from(file).toBase64()
const meta = binary.meta.get(file)

// v5.x - Multiple conversions
import { blobToArrayBuffer, arrayBufferToBase64 } from 'js-cool'
const buffer = await blobToArrayBuffer(blob)
const b64 = arrayBufferToBase64(buffer)

// v6.x - Single chainable call
import { binary } from 'js-cool'
const b64 = await binary.from(blob).toBase64()
```

---

## Migration: Storage Functions → `storage` Namespace

### Why the Change?

The storage functions have been completely redesigned with a unified namespace API:

- **Unified API** - Consistent interface for `localStorage`, `sessionStorage`, and `Cookie`
- **Generic type support** - Type-safe storage with `storage.local.get<T>()`
- **Error handling** - `StorageQuotaError` and `StorageUnavailableError` classes
- **More methods** - `has()`, `keys()`, `clear()`, `length` for all storage types
- **Better cookie options** - Full control over `path`, `domain`, `secure`, `sameSite`
- **Tree-shaking** - Subpath import via `js-cool/storage`

### Basic Migration

```js
// v5.x (deprecated)
import { setCache, getCache, delCache } from 'js-cool'

setCache('user', { id: 1 })
setCache('token', 'abc', 3600)
const user = getCache('user')
delCache('token')

// v6.x
import { storage } from 'js-cool'

storage.local.set('user', { id: 1 })
storage.local.set('token', 'abc', { expires: 3600 })
const user = storage.local.get('user')
storage.local.delete('token')
```

### API Mapping Table

| Old API                    | New API                                          | Notes                    |
| -------------------------- | ------------------------------------------------ | ------------------------ |
| `setCache(k, v)`           | `storage.local.set(k, v)`                        | Unified namespace        |
| `setCache(k, v, seconds)`  | `storage.local.set(k, v, { expires: seconds })`  | Options object           |
| `getCache(k)`              | `storage.local.get(k)`                           | Returns `T \| null`      |
| `delCache(k)`              | `storage.local.delete(k)`                        | Method renamed           |
| -                          | `storage.local.has(k)`                           | **NEW**: Check existence |
| -                          | `storage.local.keys()`                           | **NEW**: Get all keys    |
| -                          | `storage.local.clear()`                          | **NEW**: Clear all       |
| -                          | `storage.local.length`                           | **NEW**: Item count      |
| `setSession(k, v)`         | `storage.session.set(k, v)`                      | Same as local            |
| `getSession(k)`            | `storage.session.get(k)`                         | Same as local            |
| `delSession(k)`            | `storage.session.delete(k)`                      | Same as local            |
| `setCookie(k, v, seconds)` | `storage.cookie.set(k, v, { expires: seconds })` | Options object           |
| `setCookie(k, v, s, path)` | `storage.cookie.set(k, v, { expires: s, path })` | Options object           |
| `getCookie(k)`             | `storage.cookie.get(k)`                          | Returns `string \| null` |
| `getCookies()`             | `storage.cookie.getAll()`                        | Method renamed           |
| `delCookie(k)`             | `storage.cookie.delete(k)`                       | Method renamed           |
| -                          | `storage.cookie.has(k)`                          | **NEW**: Check existence |
| -                          | `storage.cookie.clear()`                         | **NEW**: Clear all       |

### Cookie Options

v6.x provides full cookie options support:

```js
// v5.x - Limited options
setCookie('session', 'xyz', 86400, '/app')

// v6.x - Full options
storage.cookie.set('session', 'xyz', {
  expires: 86400, // Expiration in seconds
  path: '/app', // Cookie path
  domain: '.example.com', // Cookie domain
  secure: true, // HTTPS only
  sameSite: 'Strict', // 'Strict' | 'Lax' | 'None'
})
```

### Generic Type Support

```ts
// v6.x - Type-safe storage
interface User {
  id: number
  name: string
}

storage.local.set<User>('user', { id: 1, name: 'John' })
const user = storage.local.get<User>('user') // User | null
```

### Error Handling

```ts
// v6.x - Proper error handling
import { storage, StorageQuotaError, StorageUnavailableError } from 'js-cool'

try {
  storage.local.set('key', largeData)
} catch (e) {
  if (e instanceof StorageQuotaError) {
    console.error('Storage quota exceeded')
  } else if (e instanceof StorageUnavailableError) {
    console.error('Storage not available (SSR or private mode)')
  }
}
```

### Subpath Import

```js
// v6.x - Tree-shaking friendly
import { storage, local, session, cookie } from 'js-cool/storage'
import type { StorageOptions, CookieOptions } from 'js-cool/storage'
```

---

## Migration: `mapTemplate` → `template`

### Why the Change?

The `mapTemplate` function has been removed and replaced by an enhanced `template` function with:

- **Multiple delimiter support** - `{{ }}`, `${ }`, and custom delimiters
- **HTML escaping** - Automatic XSS protection
- **Nested properties** - Access deep object properties
- **Function resolver** - Dynamic value resolution
- **Raw output** - Triple braces for unescaped content

### API Comparison

```js
// v5.x (removed)
import { mapTemplate } from 'js-cool'

mapTemplate('Hello, ${name}!', { name: 'World' })
// 'Hello, World!'

mapTemplate('Hello, {{name}}!', { name: 'World' })
// 'Hello, World!'

mapTemplate('Hello, {name}!', { name: 'World' })
// 'Hello, World!'

// v6.x
import { template } from 'js-cool'

// Compile first, then render
const compiled = template('Hello, {{ name }}!')
compiled({ name: 'World' }) // 'Hello, World!'

// Or with options
template('Hello, {{ name }}!', { data: { name: 'World' } })()
// 'Hello, World!'

// Function resolver (NEW in v6.x)
compiled((path) => ({ name: 'World' }[path]))
// 'Hello, World!'

// Custom delimiters
const custom = template('Hello, ${ name }!', { open: '${', close: '}' })
custom({ name: 'World' }) // 'Hello, World!'
```

### New Features

```js
import { template } from 'js-cool'

// HTML escaping (default, NEW in v6.x)
const safe = template('{{ content }}')
safe({ content: '<script>alert("xss")</script>' })
// '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'

// Raw output (triple braces)
const raw = template('{{{ html }}}')
raw({ html: '<strong>bold</strong>' }) // '<strong>bold</strong>'

// Nested properties (NEW in v6.x)
const nested = template('{{ user.name }} is {{ user.age }} years old.')
nested({ user: { name: 'John', age: 30 } }) // 'John is 30 years old.'

// Function resolver (NEW in v6.x)
template('Hello, {{ name }}!', {
  data: (path) => ({ name: 'World' }[path])
})()
// 'Hello, World!'
```

---

## New Functions in v6.0.0

### String Functions

| Function          | Description                                    |
| ----------------- | ---------------------------------------------- |
| `changeCase`      | Unified case conversion API                    |
| `constantCase`    | Convert to CONSTANT_CASE                       |
| `dotCase`         | Convert to dot.case                            |
| `pascalCase`      | Convert to PascalCase                          |
| `titleCase`       | Convert to Title Case                          |
| `swapCase`        | Swap case of each character                    |
| `reverse`         | Reverse string (Unicode aware)                 |
| `count`           | Count substring occurrences                    |
| `words`           | Split string into array of words               |

### Object Functions

| Function          | Description                                    |
| ----------------- | ---------------------------------------------- |
| `mergeWith`       | Merge objects with custom strategy function    |
| `transform`       | Transform object to new accumulator            |
| `invert`          | Invert object keys and values                  |
| `mapKeys`         | Transform object keys                          |
| `mapValues`       | Transform object values                        |

### Type Check Functions

| Function            | Description                                    |
| ------------------- | ---------------------------------------------- |
| `isFunctionExists`  | Check if a function exists (replaces typo)     |

### Enhanced Functions

#### `getNumber` Options

```js
import { getNumber } from 'js-cool'

// New options in v6.x
getNumber('Price: $99.99', { type: 'number' }) // 99.99
getNumber('a1b2c3', { multiple: true }) // ['1', '2', '3']
getNumber('Temperature: 36.567°', { decimals: 1 }) // '36.6'
```

#### `toThousands` Options

```js
import { toThousands } from 'js-cool'

// New options in v6.x
toThousands(1234567.89, { separator: ' ' }) // '1 234 567.89'
toThousands(1234.5678, { decimals: 2 }) // '1,234.57'
toThousands(1234.56, { prefix: '$' }) // '$1,234.56'
toThousands(98.5, { suffix: '%' }) // '98.5%'
```

### Extract Patterns

New extract patterns for data extraction:

```js
import { extract } from 'js-cool'

'Price: $99.99'.match(extract.number) // ['99.99']
'Chrome/120.0.6099.109'.match(extract.version) // ['120.0.6099.109']
'abc123def456'.match(extract.integer) // ['123', '456']
'Price $9.99, Tax 1.50'.match(extract.decimal) // ['9.99', '1.50']
```

---

## Need Help?

- **GitHub Issues:** [https://github.com/saqqdy/js-cool/issues](https://github.com/saqqdy/js-cool/issues)
- **Changelog:** [CHANGELOG.md](./CHANGELOG.md)
- **Documentation:** [README.md](./README.md)
