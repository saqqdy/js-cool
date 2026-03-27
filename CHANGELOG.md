# Changelog

All notable changes to this project will be documented in this file.

## [6.0.0] - 2026-03-25

### ⚠️ BREAKING CHANGES

- **Build System**: Migrated from Rollup to Rolldown
  - Output files: `index.js` (CJS), `index.mjs` (ESM), `index.iife.js`, `index.iife.min.js`
  - CDN global variable changed from `JsCool` to `jsCool`

- **Deprecated Functions Removed**:
  - `getAppVersion` → `appVersion`
  - `getOsVersion` → `osVersion`
  - `getDirParam` → `getDirParams`
  - `getScrollPosition` → `scroll.getPosition`
  - `isDigitals` → use `/^\d*$/.test(str)`
  - `pattern` → `validation`
  - `trim` → `String.prototype.trim()`
  - `isExitsVariable` → `getGlobal(name) != null`
  - `getQueryParam` → `url.get()` or `new Url(url).get()`
  - `getQueryParams` → `url.parse()` or `new Url(url).toObject()`
  - `getUrlParam` → `url.get()` or `new Url(url).get()`
  - `getUrlParams` → `url.parse()` or `new Url(url).toObject()`
  - `parseUrlParam` → `url.parse()`
  - `spliceUrlParam` → `url.stringify()` or `new Url(url).set()`
  - `setCache` → `storage.local.set()`
  - `getCache` → `storage.local.get()`
  - `delCache` → `storage.local.delete()`
  - `setSession` → `storage.session.set()`
  - `getSession` → `storage.session.get()`
  - `delSession` → `storage.session.delete()`
  - `setCookie` → `storage.cookie.set()`
  - `getCookie` → `storage.cookie.get()`
  - `getCookies` → `storage.cookie.getAll()`
  - `delCookie` → `storage.cookie.delete()`

- **Module Renamed**: `client` → `ua`
- **Type Change**: `base64ToFile()` returns `File | Blob` (IE11 returns Blob)

### 🚀 Features

- **New `ua` Module**: Comprehensive User-Agent detection
  - Device, OS, browser, environment detection
  - Quick checks: `isMobile()`, `isWeChat()`, `isiOS()`, `isHarmonyOS()`, etc.
  - Type exports: `UA`, `UAInfo`, `DeviceInfo`, `OSInfo`, `BrowserInfo`, `EnvironmentInfo`

- **New `url` Module**: Chainable URL builder with URLSearchParams-like API
  - `Url` class: Enhanced URL builder that parses both search and hash parameters
  - Static methods: `get()`, `set()`, `parse()`, `stringify()`, etc.
  - Descriptive function aliases: `parseQueryString`, `stringifyQueryString`, `getQueryParamValue`, `setQueryParam`, etc.
  - URL property extraction: `getOrigin()`, `getHost()`, `getHostname()`, `getPathname()`, `getSearch()`, `getHash()`

- **New `scroll` Module**: `getPosition()`, `getProgress()`, `scrollTo()`, `lock()`, `unlock()`, etc.

- **New `storage` Module**: Unified storage namespace with consistent API
  - `storage.local`: localStorage with expiration, generic types, and error handling
  - `storage.session`: sessionStorage with same features as local
  - `storage.cookie`: Cookie with full options support (`path`, `domain`, `secure`, `sameSite`)
  - Methods: `set()`, `get()`, `delete()`, `has()`, `keys()`, `clear()`, `length`
  - Error classes: `StorageQuotaError`, `StorageUnavailableError`
  - Subpath import: `import { storage } from 'js-cool/storage'`

- **New `patterns` Module**: Unified validation and UA patterns
  - `validation.email`, `validation.mobile`, `validation.idCard`, etc.
  - `DEVICE_PATTERNS`, `OS_PATTERNS`, `BROWSER_PATTERNS`, `ENV_PATTERNS`

- **30+ New Functions**:
  - Array: `chunk`, `flatten`, `groupBy`, `keyBy`, `sample`, `sampleSize`
  - Number: `sum`, `average`, `clamp`, `round`, `inRange`
  - String: `kebabCase`, `snakeCase`, `truncate`
  - Object: `omit`, `pick`, `isEmpty`, `isNil`
  - Validate: `isEmail`, `isPhone`, `isURL`, `isIDCard`, `isCreditCard`
  - Color: `isLightColor`, `hexToRGB`, `rgbToHSL`, `lighten`, `darken`
  - Date: `isToday`, `formatDate`, `dateDiff`, `relativeTime`, `getDaysInMonth`
  - Async: `debounce`, `throttle`, `retry`

- **IE11 Compatibility**: Built-in support without external polyfills
  - New `hasOwn()` compatibility method for `Object.hasOwn()`
- **Rolldown Migration**: ~110ms build time (was ~6-8s)
- **VitePress Docs**: Bilingual documentation site

### 📦 Build Output

| File                | Format          | Size   |
| ------------------- | --------------- | ------ |
| `index.js`          | CJS             | ~159KB |
| `index.mjs`         | ESM             | ~154KB |
| `index.iife.min.js` | IIFE (minified) | ~47KB  |

### 📖 Quick Migration

```js
// v5.x
import { client, pattern } from 'js-cool'
client.isMobile()
pattern.email.test('user@example.com')

// v6.x
import { ua, validation } from 'js-cool'
ua.isMobile()
validation.email.test('user@example.com')
```

---

## [5.23.2] - 2026-03-14

- Add vitest testing framework with comprehensive unit tests
- Fix bugs in `browserVersion`, `compareVersion`, `nextVersion`, `randomString`, `safeStringify`
- Rewrite README-zh_CN.md with comprehensive API documentation

## [5.22.0] - 2024-10-16

- New `isNumberBrowser` function - detect 360 browser

## [5.21.0] - 2024-08-09

- **BREAKING**: `spliceUrlParam` options changed

## [5.20.0] - 2024-08-09

- **BREAKING**: `spliceUrlParam` removes automatic `encodeURIComponent`

## [5.19.0] - 2024-04-27

- `getProperty` now supports `defaultValue` parameter

## [5.18.0] - 2024-03-07

- New `punctualTimer` function - precise setInterval

## [5.17.0] - 2024-01-22

- `randomColor` supports custom color value ranges

## [5.16.0] - 2024-01-21

- New `safeParse`, `safeStringify` functions

## [5.15.0] - 2023-11-06

- New `clone`, `isDate`, `isRegExp` functions
- Move `awaitTo` to standalone package `await-to-done`

## [5.14.0] - 2023-10-31

- New `sorter`, `sortPinyin` functions

## [5.13.0] - 2023-10-27

- New binary conversion functions: `arrayBufferToBase64`, `base64ToArrayBuffer`, `base64ToBlob`, `base64ToFile`, `blobToArrayBuffer`, `blobToBase64`, `blobToUrl`, `fileToBase64`, `svgToBlob`, `urlToBlob`
- New `inNodeJs` function

## [5.12.0] - 2023-10-09

- New `isEqual` function - deep equality comparison

## [5.11.0] - 2023-10-09

- New `getFileType` function

## [5.10.0] - 2023-09-23

- New `nextVersion`, `promiseFactory` functions

## [5.9.0] - 2023-09-20

- New `mapTemplate` function

## [5.8.0] - 2023-09-11

- `compareVersion` supports tag versions (`rc` > `beta` > `alpha`)

## [5.7.0] - 2023-08-22

- New `isIterable` function

## [5.6.0] - 2023-08-18

- New `getCookies`, `nextIndex` functions
- New `pattern.number` regex

## [5.5.0] - 2023-08-10

- New `preloader`, `escape`, `unescape`, `randomColor`, `isDarkMode`, `waiting` functions

## [5.4.0] - 2023-08-05

- New `shuffle`, `randomNumbers` functions
- Rewritten `randomString` with more options

## [5.3.0] - 2023-07-18

- New `spliceUrlParam` function

## [5.2.0] - 2023-07-17

- New `awaitTo`, `fingerprint`, `browserVersion` functions

## [5.1.0] - 2023-07-07

- New `appVersion`, `osVersion` functions (replace `getAppVersion`, `getOsVersion`)

## [5.0.0] - 2023-07-05

- New `copy`, `getQueryParam`, `getQueryParams`, `getUrlParams`, `isWindow`, `isObject`, `isArray` functions
- **BREAKING**: `getUrlParam` parameters changed
- Removed: `getRandomStrWidthSpecialChar`, `getParameter`, `getIsAppVersionLatest`
- Renamed: `searchTreeObject` → `searchObject`, `getRandomNum` → `randomNumber`, `getRandomStr` → `randomString`

## [4.0.0] - 2023-05-18

- **BREAKING**: Split `csv` into `arrayToCSV`, `CSVToArray`, `CSVToJSON`, `JSONToCSV`
- **BREAKING**: Split `cache` into `setCache`, `getCache`, `delCache`
- **BREAKING**: Split `session` into `setSession`, `getSession`, `delSession`
- **BREAKING**: Split `cookie` into `setCookie`, `getCookie`, `delCookie`

## [3.0.0] - 2023-04-06

- Removed: `imgAdapt`, `imgChoose`, `throttle`, `debounce`, `enWxJumpLink`, `deWxJumpLink`, `clearHtmlTag`, `formatTime`, etc.
- Renamed: `splitThousand` → `toThousands`, `getWindowSize` → `windowSize`
- Support direct import: `require('js-cool/addEvent')`

## [2.0.0] - 2021-08-26

- **BREAKING**: Refactor all code to TypeScript

## [1.0.1] - 2020-12-14

- Initial release
