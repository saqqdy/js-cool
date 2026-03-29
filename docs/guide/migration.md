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
6. **New `binary` module** - Unified binary data conversion API (recommended replacement for old convert functions)

### Quick Migration Checklist

- [ ] Update import paths (if using direct file imports)
- [ ] Update CDN links and global variable name (`JsCool` → `jsCool`)
- [ ] Replace `client` with `ua`
- [ ] Replace `pattern` with `validation`
- [ ] Replace deprecated functions
- [ ] Migrate to new `binary` module (recommended)
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

| v5.x (Deprecated)     | v6.x (Replacement)                         |
| --------------------- | ------------------------------------------ |
| `getAppVersion()`     | `appVersion()`                             |
| `getOsVersion()`      | `osVersion()`                              |
| `getScrollPosition()` | `scroll.getPosition()`                     |
| `getQueryParam()`     | `url.get()` or `new Url(url).get()`        |
| `getQueryParams()`    | `url.parse()` or `new Url(url).toObject()` |
| `getUrlParam()`       | `url.get()` or `new Url(url).get()`        |
| `getUrlParams()`      | `url.parse()` or `new Url(url).toObject()` |
| `parseUrlParam()`     | `url.parse()`                              |
| `spliceUrlParam()`    | `url.stringify()` or `new Url(url).set()`  |

```js
// v5.x
const version = getAppVersion('Chrome')
const os = getOsVersion()
const pos = getScrollPosition()
const id = getUrlParam('id', url)
const params = getUrlParams(url)

// v6.x
const version = appVersion('Chrome')
const os = osVersion()
const pos = scroll.getPosition()
const id = url.get('id', url) // or new Url(url).get('id')
const params = url.parse(url) // or new Url(url).toObject()
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

| Function         | Change                                            |
| ---------------- | ------------------------------------------------- |
| `base64ToFile()` | Return type changed from `File` to `File \| Blob` |
| All methods      | Now use internal compatibility layer              |

#### Functions with Graceful Degradation

| Function         | IE11 Behavior                   |
| ---------------- | ------------------------------- |
| `isURL()`        | Falls back to regex validation  |
| `getDirParams()` | Uses regex parsing              |
| `urlToBlob()`    | Uses XHR instead of fetch       |
| `isDarkMode()`   | Returns `false`                 |
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
| -                 | `UA` (new)  |

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

### Binary Conversion Utilities

The binary conversion functions have been unified into a new `binary` module with chainable API.

#### Function Mapping Table

| v5.x (Old Function)             | v6.x (`binary` Module)                                       |
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

#### Basic Migration

```js
// v5.x - Individual functions
import { encodeBase64, decodeBase64, blobToBase64, base64ToBlob, fileToBase64 } from 'js-cool'

const b64 = encodeBase64('Hello World')
const str = decodeBase64(b64)
const base64FromBlob = await blobToBase64(blob)
const blobFromBase64 = base64ToBlob(b64, 'image/png')

// v6.x - Unified binary module
import { binary } from 'js-cool'

const b64 = binary.base64.encode('Hello World')
const str = binary.base64.decode(b64)
const base64FromBlob = await binary.blob.toBase64(blob)
const blobFromBase64 = binary.base64.toBlob(b64, 'image/png')
```

#### Chainable Conversion (NEW)

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

#### New Features

**Hash Functions:**

```js
import { binary } from 'js-cool'

const md5 = await binary.hash.md5('Hello World')
const sha1 = await binary.hash.sha1('Hello World')
const sha256 = await binary.hash.sha256('Hello World')
const crc32 = binary.hash.crc32('Hello World')
```

**File Metadata:**

```js
import { binary } from 'js-cool'

const meta = binary.meta.get(file)
// { size, mime, name, extension, isImage, isVideo, isAudio, isText }
```

**Type Detection:**

```js
import { binary } from 'js-cool'

binary.isBlob(new Blob(['hello'])) // true
binary.isFile(new File(['hello'], 'test.txt')) // true
binary.isArrayBuffer(new ArrayBuffer(8)) // true
binary.isDataURL('data:text/plain;base64,SGVsbG8=') // true
binary.isBase64('SGVsbG8gV29ybGQ=') // true
```

### Date Utilities

The `date` namespace and `DateParser` class are new in v6.0.0, providing chainable API and rich date operations.

#### Existing Functions (Still Work)

```js
// v5.x (still works)
import { formatDate, dateDiff, relativeTime, isToday, getDaysInMonth } from 'js-cool'

formatDate(new Date(), 'YYYY-MM-DD')
dateDiff('2024-01-01', '2024-01-03')
relativeTime(new Date(Date.now() - 3600000))
isToday(new Date())
getDaysInMonth(2024, 1) // 29
```

#### New Features

**Three usage patterns:**

```js
import { date, DateParser } from 'js-cool'

// 1. DateParser class - chainable API
const d = new DateParser('2024-01-15')
d.add(1, 'day').format('YYYY-MM-DD') // '2024-01-16'
d.startOf('month').format() // '2024-01-01 00:00:00'

// 2. date namespace - factory + static methods
date('2024-01-15').add(1, 'day').format()
date.format(new Date(), 'YYYY-MM-DD')
date.diff('2024-01-01', '2024-01-03')
date.isToday(new Date())
date.getDaysInMonth(2024, 1)

// 3. Direct function imports (tree-shaking friendly)
import { formatDate, isToday, isLeapYear, add, startOf } from 'js-cool'
```

#### New Functions

| Function                      | Description                        |
| ----------------------------- | ---------------------------------- |
| `isYesterday(date)`           | Check if date is yesterday         |
| `isTomorrow(date)`            | Check if date is tomorrow          |
| `isWeekend(date)`             | Check if date is weekend           |
| `isLeapYear(year)`            | Check if year is leap year         |
| `isBefore(date1, date2)`      | Check if date is before another    |
| `isAfter(date1, date2)`       | Check if date is after another     |
| `isSame(date1, date2, unit)`  | Check if two dates are same        |
| `isBetween(date, start, end)` | Check if date is in range          |
| `compare(date1, date2)`       | Compare two dates (returns -1/0/1) |
| `min(...dates)`               | Get minimum date                   |
| `max(...dates)`               | Get maximum date                   |
| `getQuarter(date)`            | Get quarter (1-4)                  |
| `getDayOfYear(date)`          | Get day of year (1-366)            |
| `getWeekOfYear(date)`         | Get week of year                   |
| `add(date, value, unit)`      | Add time to date                   |
| `subtract(date, value, unit)` | Subtract time from date            |
| `startOf(date, unit)`         | Get start of time period           |
| `endOf(date, unit)`           | Get end of time period             |

#### Subpath Import

```js
// Import from subpath for better tree-shaking
import { date, DateParser, formatDate, isToday } from 'js-cool/date'
```

#### DateParser Class Properties and Methods

```js
const d = new DateParser('2024-03-15T14:30:45')

// Properties
d.year // 2024
d.month // 3 (1-12)
d.day // 15
d.hours // 14
d.minutes // 30
d.seconds // 45
d.dayOfWeek // 5 (Friday)
d.timestamp // millisecond timestamp
d.isValid // if valid date

// Formatting
d.format('YYYY-MM-DD HH:mm:ss')
d.toISOString()
d.toDateString() // '2024-03-15'
d.toTimeString() // '14:30:45'

// Comparison
d.isBefore('2024-04-01')
d.isAfter('2024-03-01')
d.isSame('2024-03-15', 'day')
d.isToday()
d.isYesterday()
d.isTomorrow()
d.isWeekend()
d.isLeapYear()

// Manipulation (returns new instance)
d.add(1, 'day') // add one day
d.subtract(1, 'week') // subtract one week
d.startOf('month') // start of month
d.endOf('day') // end of day

// Other
d.diff('2024-03-20') // calculate difference
d.relativeTime() // relative time string
d.getQuarter() // quarter
d.getWeekOfYear() // week of year
d.getDayOfYear() // day of year
```

### Storage Utilities

The storage functions have been completely redesigned with a unified namespace API.

#### API Migration Table

| v5.x                       | v6.x                                             | Notes                    |
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

#### New Features

1. **Unified namespace API**:

```js
import { storage } from 'js-cool'

storage.local.set('key', 'value')
storage.session.set('key', 'value')
storage.cookie.set('key', 'value')
```

2. **Subpath import for tree-shaking**:

```js
import { storage, local, session, cookie } from 'js-cool/storage'
```

3. **Generic type support**:

```ts
interface User {
  id: number
  name: string
}
storage.local.set<User>('user', { id: 1, name: 'John' })
const user = storage.local.get<User>('user') // User | null
```

4. **Error handling**:

```ts
import { StorageQuotaError, StorageUnavailableError } from 'js-cool'

try {
  storage.local.set('key', largeData)
} catch (e) {
  if (e instanceof StorageQuotaError) {
    console.error('Storage full')
  }
}
```

5. **Full Cookie options**:

```js
storage.cookie.set('session', 'xyz', {
  expires: 86400,
  path: '/',
  domain: '.example.com',
  secure: true,
  sameSite: 'Strict',
})
```

#### Migration Example

```js
// v5.x
import { setCache, getCache, delCache, setCookie, getCookie } from 'js-cool'

setCache('user', userData, 3600)
const user = getCache('user')
delCache('user')

setCookie('token', 'abc', 86400, '/', true)
const token = getCookie('token')

// v6.x
import { storage } from 'js-cool'

storage.local.set('user', userData, { expires: 3600 })
const user = storage.local.get('user')
storage.local.delete('user')

storage.cookie.set('token', 'abc', { expires: 86400, path: '/', secure: true })
const token = storage.cookie.get('token')
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

#### New Features

**Three usage patterns:**

```js
import { url, Url } from 'js-cool'

// 1. Url class - chainable builder
const apiUrl = new Url('https://api.example.com')
  .path('users', '123')
  .set('fields', 'name')
  .setHash('section')
  .toString()
// 'https://api.example.com/users/123?fields=name#section'

// 2. url namespace - factory + static methods
url.from('https://example.com?id=123').get('id') // '123'
url.parse('?a=1&b=true', { convert: true }) // { a: 1, b: true }
url.stringify({ a: 1, b: 2 }) // '?a=1&b=2'

// 3. Direct function imports (tree-shaking friendly)
import { getQueryParamValue, setQueryParam, parseQueryString } from 'js-cool'
getQueryParamValue('id', 'https://example.com?id=123') // '123'
```

#### Descriptive Function Names

v6.0.0 provides descriptive aliases for better code readability:

| Alias Name               | Original      | Description                    |
| ------------------------ | ------------- | ------------------------------ |
| `parseQueryString`       | `parse`       | Parse query string to object   |
| `stringifyQueryString`   | `stringify`   | Build query string from object |
| `getQueryParamValue`     | `get`         | Get single parameter value     |
| `getAllQueryParamValues` | `getAll`      | Get all values for parameter   |
| `hasQueryParam`          | `has`         | Check if parameter exists      |
| `setQueryParam`          | `set`         | Set parameter value            |
| `appendQueryParam`       | `append`      | Append parameter value         |
| `deleteParam`            | `deleteParam` | Delete parameter               |
| `getQueryParamKeys`      | `keys`        | Get all parameter names        |
| `getQueryParamValues`    | `values`      | Get all parameter values       |
| `getQueryParamEntries`   | `entries`     | Get all key-value pairs        |

```js
// Using descriptive names
import { parseQueryString, getQueryParamValue, setQueryParam } from 'js-cool'

const params = parseQueryString('?page=1&size=20&active=true', { convert: true })
// { page: 1, size: 20, active: true }

const page = getQueryParamValue('page', 'https://example.com?page=2')
// '2'

const newUrl = setQueryParam('page', 3, 'https://example.com?page=1')
// 'https://example.com/?page=3'
```

#### URL Property Extraction

New functions to extract URL components:

```js
import { getOrigin, getHost, getHostname, getPathname, getSearch, getHash } from 'js-cool'

getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
getHost('https://example.com:8080/path') // 'example.com:8080'
getHostname('https://example.com:8080/path') // 'example.com'
getPathname('https://example.com/api/users?id=1') // '/api/users'
getSearch('https://example.com?key=value') // '?key=value'
getHash('https://example.com/path#section') // '#section'
```

#### Subpath Import

```js
// Import from subpath for better tree-shaking
import { url, Url, parseQueryString, stringifyQueryString } from 'js-cool/url'
```

### URL Parameter Methods Migration Guide

v6.0.0 introduces the new `url` namespace and `Url` class that can replace multiple existing URL parameter methods. Here's the complete migration guide.

::: warning Breaking Change in v6.0.0
The following functions have been **removed** in v6.0.0:

- `getUrlParams` - Use `url.parse()` or `new Url(url).toObject()`
- `getUrlParam` - Use `url.get()` or `new Url(url).get(name)`
- `parseUrlParam` - Use `url.parse()` with `{ convert: true }`
- `spliceUrlParam` - Use `url.stringify()`
- `getQueryParam` - Use `new Url(url).get(name, 'hash')`
- `getQueryParams` - Use `new Url(url).toObject('hash')`
  :::

#### Replacement Compatibility Table

| Original Method  | `url` Module | `Url` Class | Status  | Notes                             |
| ---------------- | ------------ | ----------- | ------- | --------------------------------- |
| `getUrlParams`   | ✅           | ✅          | Removed | Both handle search params only    |
| `getUrlParam`    | ✅           | ✅          | Removed | Both handle search params only    |
| `parseUrlParam`  | ✅           | ✅          | Removed | Both handle search params only    |
| `spliceUrlParam` | ✅           | ✅          | Removed | Parameter building                |
| `getQueryParam`  | ❌           | ✅          | Removed | `url` module doesn't support hash |
| `getQueryParams` | ❌           | ✅          | Removed | `url` module doesn't support hash |

#### `getUrlParams` Migration

```js
// Original method
import { getUrlParams } from 'js-cool'
getUrlParams('https://example.com?a=1&b=2')
// { a: '1', b: '2' }

// Alternative 1: url.parse
import { url } from 'js-cool'
url.parse('?a=1&b=2')
// { a: '1', b: '2' }

// Alternative 2: url.from().toParams()
url.from('https://example.com?a=1&b=2').toParams()
// { a: '1', b: '2' }

// Alternative 3: Url
import { Url } from 'js-cool'
new Url('https://example.com?a=1&b=2').toObject()
// { a: '1', b: '2' }
```

#### `getUrlParam` Migration

```js
// Original method
import { getUrlParam } from 'js-cool'
getUrlParam('id', 'https://example.com?id=123')
// '123'

// Alternative 1: url.get
import { url } from 'js-cool'
url.get('id', 'https://example.com?id=123')
// '123'

// Alternative 2: url.from().get()
url.from('https://example.com?id=123').get('id')
// '123'

// Alternative 3: Url
import { Url } from 'js-cool'
new Url('https://example.com?id=123').get('id')
// '123'
```

#### `parseUrlParam` Migration

```js
// Original method
import { parseUrlParam } from 'js-cool'
parseUrlParam('?count=100&active=true', true)
// { count: 100, active: true }

// Alternative: url.parse (with covert option)
import { url } from 'js-cool'
url.parse('?count=100&active=true', { convert: true })
// { count: 100, active: true }
```

#### `spliceUrlParam` Migration

```js
// Original method
import { spliceUrlParam } from 'js-cool'
spliceUrlParam({ a: 1, b: true })
// '?a=1&b=true'
spliceUrlParam({ a: 1, name: 'test' }, { encode: true })
// '?a=1&name=test'

// Alternative: url.stringify
import { url } from 'js-cool'
url.stringify({ a: 1, b: true })
// '?a=1&b=true'
url.stringify({ a: 1, name: 'test' }, { encode: true })
// '?a=1&name=test'
```

#### `getQueryParam` / `getQueryParams` Migration

::: warning Important
The `url` module **does not support** hash parameters. You must use the `Url` class instead.
:::

```js
// Original methods (handle hash params)
import { getQueryParam, getQueryParams } from 'js-cool'
getQueryParam('id', 'https://example.com?id=100#/home?id=200')
// '200' (from hash)

getQueryParams('https://example.com?id=100#/home?id=200')
// { id: '200' }

// Alternative: Url (specify scope='hash')
import { Url } from 'js-cool'
new Url('https://example.com?id=100#/home?id=200').get('id', 'hash')
// '200'

new Url('https://example.com?id=100#/home?id=200').toObject('hash')
// { id: '200' }

// Note: url module only gets search params
url.get('id', 'https://example.com?id=100#/home?id=200')
// '100' (only gets search param, not what you want)
```

#### `Url` Advanced Usage

`Url` is the most complete solution, supporting both search and hash parameters:

```js
import { Url } from 'js-cool'

const params = new Url('https://example.com?token=old#/page?token=new')

// Distinguish parameter sources
params.get('token', 'search') // 'old' - search param
params.get('token', 'hash') // 'new' - hash param
params.get('token') // 'new' - hash priority by default

// Get detailed source information
params.toDetailObject()
// {
//   search: { token: 'old' },
//   hash: { token: 'new' },
//   all: { token: 'new' },
//   source: { token: 'both' }
// }

// Chaining operations
params.set('page', 1).set('id', 123, 'hash').delete('token', 'search')
params.toURL()
// 'https://example.com/?page=1#/page?token=new&id=123'
```

#### Selection Recommendations

| Scenario                          | Recommended                    |
| --------------------------------- | ------------------------------ |
| Only search params (simple cases) | `url` module (simpler API)     |
| Need to handle hash params        | `Url` class (only option)      |
| Handle both search and hash       | `Url` class                    |
| Need URL property extraction      | `url` module or `getDirParams` |
| Need URL path segments            | `getDirParams`                 |
| Need chainable URL building       | `Url` class                    |

## TypeScript Migration

### Type Renames

```ts
// v5.x
import type { ClientInfo, ClientGetType, IClientDetector } from 'js-cool'

// v6.x
import type { UA, UAInfo, UAGetType, IUAParser } from 'js-cool'
// or from subpath
import type { UA, UAInfo, DeviceInfo, OSInfo, BrowserInfo } from 'js-cool/ua'
```

### New Types

```ts
// UA utility type (the callable function with properties)
interface UA {
  (): UAInfo
  get: (type: UAGetType) => any
  getMultiple: (types: UAGetType[]) => Record<string, any>
  has: (name: string) => boolean
  getNetwork: () => NetworkInfo
  getScreen: () => ScreenInfo
  getLanguage: () => string
  getTimezone: () => string
  getOrientationStatus: () => 'portrait' | 'landscape'
  isDarkMode: () => boolean
  isMobile: () => boolean
  isTablet: () => boolean
  isDesktop: () => boolean
  isTouch: () => boolean
  isiOS: () => boolean
  isiPadOS: () => boolean
  isAndroid: () => boolean
  isHarmonyOS: () => boolean
  isWeChat: () => boolean
  isQQ: () => boolean
  isMiniProgram: () => boolean
  readonly info: UAInfo
  readonly device: DeviceInfo
  readonly os: OSInfo
  readonly browser: BrowserInfo
  readonly environment: EnvironmentInfo
  readonly userAgent: string
  UAParser: typeof UAParser
}

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

## New Features in v6.x

### Date Utilities

v6.x introduces comprehensive date manipulation functions with three usage patterns:

```js
// 1. DateParser class - chainable API
import { DateParser } from 'js-cool'
const d = new DateParser('2024-01-15')
d.add(1, 'day').format('YYYY-MM-DD') // '2024-01-16'
d.startOf('month').format() // '2024-01-01 00:00:00'

// 2. date namespace - factory + static methods
import { date } from 'js-cool'
date('2024-01-15').add(1, 'day').format()
date.format(new Date(), 'YYYY-MM-DD')
date.diff('2024-01-01', '2024-12-31')
date.isToday(new Date())

// 3. Direct function imports
import {
  formatDate,
  dateDiff,
  relativeTime,
  isToday,
  isYesterday,
  isTomorrow,
  isWeekend,
  isLeapYear,
  isBefore,
  isAfter,
  isSame,
  isBetween,
  getDaysInMonth,
  getQuarter,
  getDayOfYear,
  getWeekOfYear,
  add,
  subtract,
  startOf,
  endOf,
} from 'js-cool'

// Format date
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
formatDate(new Date(), 'YYYY年MM月DD日')

// Date comparison
isBefore('2024-01-01', '2024-12-31') // true
isAfter('2024-12-31', '2024-01-01') // true
isBetween('2024-06-15', '2024-01-01', '2024-12-31') // true

// Date info
getQuarter(new Date()) // 1-4
getDayOfYear(new Date()) // 1-366
getWeekOfYear(new Date()) // 1-53

// Date manipulation
add(new Date(), 1, 'day') // tomorrow
subtract(new Date(), 1, 'week') // last week
startOf(new Date(), 'month') // first day of month
endOf(new Date(), 'day') // end of today
```

### Async Utilities

New async utilities for better control flow:

```js
import { delay, waiting, promiseFactory, punctualTimer } from 'js-cool'

// Delay execution
await delay(1000) // Wait 1 second

// Wait for condition
await waiting(() => document.querySelector('#element'), { interval: 100, timeout: 5000 })

// External promise control
const promise = promiseFactory((resolve, reject) => {
  // Resolve from outside
  setTimeout(() => resolve('done'), 1000)
})

// Precise timer
const timer = punctualTimer('second', () => {
  console.log('Executed at second boundary')
})
timer.stop() // Stop the timer
```

### Object Utilities

New object manipulation functions:

```js
import { cleanData, searchObject } from 'js-cool'

// Clean object
const obj = { a: 1, b: null, c: '', d: undefined, password: 'secret' }
cleanData(obj, ['password'])
// { a: 1 }

// Search object
const data = {
  user: { name: 'John', email: 'john@example.com' },
  orders: [{ id: 1, product: 'Laptop' }],
}
searchObject(data, 'john')
// [{ key: 'user.name', value: 'John' }, { key: 'user.email', value: 'john@example.com' }]
```

### Type Check Utilities

New type checking functions:

```js
import { isWindow, isExitsFunction } from 'js-cool'

// Check if Window object
isWindow(window) // true in browser

// Check if function exists
isExitsFunction('JSON.parse') // true
isExitsFunction('nonExistent.function') // false
```
