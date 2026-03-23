# Changelog

All notable changes to this project will be documented in this file.

## [6.0.0] - 2025-03-23

### ⚠️ BREAKING CHANGES

- **Build System**: Migrated from Rollup to Rolldown
  - Build output simplified from 7 files to 4 files
  - Removed `index.esm-browser.js`, `index.esm-browser.prod.js` (use `index.mjs` instead)
  - Removed `index.global.prod.js` (use `index.iife.min.js` instead)
  - Output files: `index.js` (CJS), `index.mjs` (ESM), `index.iife.js`, `index.iife.min.js`

- **Package Exports**: Updated exports configuration

  ```json
  {
    "exports": {
      ".": {
        "require": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
        "import": { "types": "./dist/index.d.mts", "default": "./dist/index.mjs" }
      }
    }
  }
  ```

- **Deprecated Functions Removed**:
  - `getAppVersion` - use `appVersion` instead
  - `getOsVersion` - use `osVersion` instead
  - `getDirParam` - use `getDirParams` instead
  - `isDigitals` - removed, use `/^\d*$/.test(str)` instead
  - `pattern` - use `patterns.validation` instead
  - `trim` - removed, use `String.prototype.trim()` instead

- **Patterns Module Refactoring**: Use `patterns.validation` instead of `pattern`
  - Old: `pattern.email.test('user@example.com')`
  - New: `patterns.validation.email.test('user@example.com')` or `validation.email.test('user@example.com')`

### 🚀 Features

- **New `patterns` Module**: Unified patterns module combining validation and UA patterns
  - `patterns.validation` - Validation patterns for common formats
  - `patterns.ua.device` - Device detection patterns
  - `patterns.ua.os` - OS detection patterns
  - `patterns.ua.browser` - Browser detection patterns
  - `patterns.ua.engine` - Engine detection patterns
  - `patterns.ua.env` - Environment detection patterns
  - `patterns.ua.getUserAgent()` - Get UA string safely
  - `patterns.ua.matchPattern()` - Check if pattern exists
  - `patterns.ua.extractVersion()` - Extract version from UA

- **New Validation Patterns**:
  - `validation.idCard` - Chinese ID card numbers (15 or 18 digits)
  - `validation.hexColor` - Hexadecimal color codes

- **Improved Patterns**:
  - `validation.mobile` - Updated to support new Chinese mobile number prefixes (1[3-9])
  - `validation.qq` - Updated to support 5-14 digit QQ numbers

- **Named Exports**: All pattern groups are now available as named exports
  - `validation`, `DEVICE_PATTERNS`, `OS_PATTERNS`, `BROWSER_PATTERNS`, `ENGINE_PATTERNS`, `ENV_PATTERNS`
  - Type exports: `ValidationPatternName`, `DevicePatternName`, `OSPatternName`, `BrowserPatternName`, `EnginePatternName`, `EnvPatternName`

- **Rolldown Migration**: Faster build times (~110ms vs ~6-8s)
- **Version Injection**: Clean version injection via virtual module
- **Type Declarations**: Separate `.d.ts` and `.d.mts` for CJS/ESM compatibility

### 🆕 New Functions

- New VitePress documentation site with bilingual support (English/Chinese)
- **Array**: `chunk`, `flatten`, `groupBy`, `keyBy`, `sample`, `sampleSize`
- **Number**: `sum`, `average`, `clamp`, `round`, `inRange`
- **String**: `kebabCase`, `snakeCase`, `truncate`
- **Object**: `omit`, `pick`, `isEmpty`, `isNil`
- **Validate**: `isEmail`, `isPhone`, `isURL`, `isIDCard`, `isCreditCard`
- **Color**: `isLightColor`, `hexToRGB`, `rgbToHSL`, `lighten`, `darken`
- **Date**: `isToday`, `formatDate`, `dateDiff`, `relativeTime`, `getDaysInMonth`
- **Async**: `debounce`, `throttle`, `retry`
- **URL**: `getDirParams` - Parse URL path info (replaces `getDirParam`)

### 📦 Build Output

| File                | Format          | Size   |
| ------------------- | --------------- | ------ |
| `index.js`          | CJS             | ~159KB |
| `index.mjs`         | ESM             | ~154KB |
| `index.iife.js`     | IIFE            | ~175KB |
| `index.iife.min.js` | IIFE (minified) | ~47KB  |

### 🧹 Chores

- **Dependencies Removed**:
  - `rollup` (replaced by `rolldown`)
  - `@rollup/plugin-commonjs`, `@rollup/plugin-json`, `@rollup/plugin-node-resolve`, `@rollup/plugin-typescript` (rolldown built-in)
  - `@rollup/plugin-replace`, `@rollup/plugin-alias`, `@rollup/plugin-sucrase` (unused)
  - `rollup-plugin-cleanup`, `rollup-plugin-polyfill-node` (unused)
  - `@babel/core`, `@babel/plugin-transform-runtime`, `@babel/preset-env`, `@babel/preset-typescript`, `babel-loader` (removed)
  - `core-js` (removed from devDependencies)

### 🔄 Changed

- Reorganized all 140+ functions into 16 categories
- Updated documentation site from TypeDoc to VitePress
- Improved test coverage with comprehensive unit tests

### 🐛 Fixed

- Fixed ESLint errors in source files
- Fixed `isNaN` usage to `Number.isNaN`
- Fixed missing return type annotations

### 📖 Migration Guide

```js
// Before (v5.x)
import jsCool from 'js-cool/dist/index.esm-browser.js'
import { pattern } from 'js-cool'
pattern.email.test('user@example.com')

// After (v6.x)
import jsCool from 'js-cool'
import { patterns, validation } from 'js-cool'
patterns.validation.email.test('user@example.com')
validation.email.test('user@example.com')

// UA patterns
import { DEVICE_PATTERNS, BROWSER_PATTERNS } from 'js-cool'
DEVICE_PATTERNS.mobile.test(navigator.userAgent)
```

```html
<!-- Before (v5.x) -->
<script src="https://unpkg.com/js-cool/dist/index.global.prod.js"></script>
<!-- After (v6.x) -->
<script src="https://unpkg.com/js-cool/dist/index.iife.min.js"></script>
```

## [5.23.2] - 2026-03-14

### Added

- Add vitest testing framework with comprehensive unit tests for all functions

### Fixed

- Fix bugs in `browserVersion`, `compareVersion`, `nextVersion`, `randomString`, `safeStringify`
- Fix JSDoc garbled characters in `decodeUtf8`

### Docs

- Rewrite README-zh_CN.md with comprehensive API documentation
- Optimize JSDoc for all functions in src directory with comprehensive `@example` tags
- Add multiple usage examples covering various scenarios for each function
- Improve parameter and return value documentation

## [5.23.1] - 2025-01-17

### Docs

- Documentation improvements

### Dependencies

- Upgrade all packages

## [5.23.0] - 2024-11-18

### Changed

- `punctualTimer` now returns `PunctualTimerReturns` type

## [5.22.1] - 2024-11-15

### Fixed

- Fix bugs in `nextVersion`

## [5.22.0] - 2024-10-16

### Added

- New `isNumberBrowser` function - detect 360 browser

### Changed

- Default value of agent string for `getOsVersion` and `getAppVersion` changed to `navigator.appVersion`

## [5.21.2] - 2024-08-27

### Added

- `pattern` now supports `mac`, `ip4`, `ip4_pri` regex patterns

## [5.21.1] - 2024-08-12

### Added

- `osVersion` now supports Harmony OS detection

## [5.21.0] - 2024-08-09

### Changed

- **BREAKING**: `spliceUrlParam` options changed to `SpliceUrlParamOptions`

## [5.20.0] - 2024-08-09

### Changed

- **BREAKING**: `spliceUrlParam` removes automatic `encodeURIComponent`

## [5.19.2] - 2024-05-30

### Dependencies

- Upgrade `await-to-done`, fix types

## [5.19.1] - 2024-04-29

### Changed

- Remove default params from `arrayBufferToBase64`

## [5.19.0] - 2024-04-27

### Added

- `getProperty` now supports `defaultValue` parameter

### Fixed

- Fix type definitions

### Dependencies

- Upgrade all packages

## [5.18.1] - 2024-03-11

### Fixed

- Fix type definitions
- Fix export errors

## [5.18.0] - 2024-03-07

### Added

- New `punctualTimer` function - precise setInterval

## [5.17.1] - 2024-01-21

### Changed

- `safeParse` and `safeStringify` now support BigInt conversion

## [5.17.0] - 2024-01-22

### Added

- `randomColor` now supports custom color value ranges for generating dark, light, warm colors

## [5.16.0] - 2024-01-21

### Added

- New `safeParse` function - safely parse JSON strings
- New `safeStringify` function - safely stringify JSON objects

### Dependencies

- Upgrade all packages

## [5.15.2] - 2023-11-13

### Changed

- Move `awaitTo` to standalone package `await-to-done`

### Fixed

- Fix circular require issues

## [5.15.0] - 2023-11-06

### Added

- New `clone` function - deep clone
- New `isDate` function - check if value is Date
- New `isRegExp` function - check if value is RegExp

## [5.14.1] - 2023-11-01

### Docs

- Documentation improvements

## [5.14.0] - 2023-10-31

### Added

- New `sorter` function - sorting factory function
- New `sortPinyin` function - sort Chinese by pinyin

### Dependencies

- Upgrade all packages

## [5.13.0] - 2023-10-27

### Added

- New `arrayBufferToBase64` function
- New `arrayBufferToBlob` function
- New `base64ToArrayBuffer` function
- New `base64ToBlob` function
- New `base64ToFile` function
- New `blobToArrayBuffer` function
- New `blobToBase64` function
- New `blobToUrl` function
- New `fileToBase64` function
- New `svgToBlob` function
- New `urlToBlob` function
- New `inNodeJs` function

## [5.12.0] - 2023-10-09

### Added

- New `isEqual` function - deep equality comparison

### Dependencies

- Upgrade all packages

## [5.11.0] - 2023-10-09

### Added

- New `getFileType` function - determine file type by extension

### Dependencies

- Upgrade all packages

## [5.10.0] - 2023-09-23

### Added

- New `nextVersion` function - calculate next version number
- New `promiseFactory` function - convert object to promise-like API

## [5.9.0] - 2023-09-20

### Added

- New `mapTemplate` function - template string replacement

## [5.8.1] - 2023-09-16

### Changed

- `waiting` now supports `throwOnTimeout` option

## [5.8.0] - 2023-09-11

### Changed

- `compareVersion` now supports tag versions (`rc` > `beta` > `alpha`)

## [5.7.2] - 2023-09-06

### Fixed

- Fix regexp bug in `appVersion`

## [5.7.1] - 2023-09-01

### Fixed

- Revert `nextIndex` function changes

## [5.7.0] - 2023-08-22

### Added

- New `isIterable` function
- `awaitTo` now supports multiple promises

### Fixed

- Fix type definitions

### Dependencies

- Upgrade all packages

## [5.6.0] - 2023-08-18

### Added

- New `getCookies` function
- New `pattern.number` regex
- New `nextIndex` function

### Changed

- Improvements to `getType`, `getSession`, `getCache`, `fixNumber`

### Fixed

- Fix bugs in `toThousands`, `parseUrlParam`

### Deprecated

- `getScrollPosition` will be removed in next major version

## [5.5.0] - 2023-08-10

### Added

- New `preloader` function - image preloading
- New `escape` function - escape HTML special characters
- New `unescape` function - unescape HTML special characters
- New `randomColor` function - generate random hex colors
- New `isDarkMode` function - detect dark mode
- New `waiting` function - wait for specified time

## [5.4.0] - 2023-08-05

### Added

- New `shuffle` function - shuffle array or string
- New `randomNumbers` function - generate n random integers with fixed sum
- Brand new `randomString` function with more options

## [5.3.2] - 2023-08-02

### Changed

- Optimize `getQueryParams` and `getUrlParams` usage

### Dependencies

- Upgrade all packages

## [5.3.1] - 2023-07-31

### Fixed

- Fix `appVersion` bug

## [5.3.0] - 2023-07-18

### Added

- New `spliceUrlParam` function

### Deprecated

- `isDigitals` will be removed in next major version

### Fixed

- Fix type definitions and bugs

### Docs

- Documentation improvements

## [5.2.0] - 2023-07-17

### Added

- New `awaitTo` function - async error handling wrapper
- New `fingerprint` function - generate browser fingerprint
- New `browserVersion` function - get browser name and version

### Fixed

- Fix bugs in `osVersion`

### Deprecated

- `trim` will be removed in next major version
- `pattern` will be renamed to `patterns`
- `getDirParam` will be renamed to `getDirParams`

### Docs

- Documentation improvements

## [5.1.0] - 2023-07-07

### Added

- New `appVersion` function
- New `osVersion` function

### Deprecated

- `getAppVersion` - use `appVersion` instead
- `getOsVersion` - use `osVersion` instead

## [5.0.0] - 2023-07-05

### Added

- New `copy` function - copy to clipboard
- New `getQueryParam` function - get single query param
- New `getQueryParams` function - get all query params
- New `getUrlParams` function - get all URL params
- New `isWindow` function
- New `isObject` function
- New `isArray` function

### Changed

- **BREAKING**: `getUrlParam` parameters changed

### Removed

- `getRandomStrWidthSpecialChar` - use `randomString` instead
- `getParameter` - use `getUrlParam` instead
- `getIsAppVersionLatest` - use `compareVersion` instead

### Renamed

- `searchTreeObject` → `searchObject`
- `getRandomNum` → `randomNumber`
- `getRandomStr` → `randomString`

### Dependencies

- Upgrade all packages

## [4.7.0] - 2023-06-14

### Added

- New `compareVersion` function

### Dependencies

- Upgrade all packages

## [4.6.0] - 2023-06-06

### Removed

- `textareaInsertText` and `textareaMoveToEnd` - use [grace-textarea](https://github.com/saqqdy/grace-textarea) instead

## [4.5.0] - 2023-06-05

### Added

- New `inBrowser` function

### Docs

- Translation improvements

### Dependencies

- Upgrade all packages

## [4.4.1] - 2023-05-31

### Fixed

- Fix ESM module

## [4.4.0] - 2023-05-23

### Fixed

- Fix outputs and exports

## [4.3.0] - 2023-05-22

### Fixed

- Fix export default
- Fix type definitions

### Dependencies

- Upgrade all packages

## [4.2.0] - 2023-05-21

### Changed

- Use `use-downloads` package

### Docs

- Translation improvements

## [4.1.0] - 2023-05-20

### Changed

- Use standalone packages: `load-source`, `mount-css`, `mount-image`, `mount-script`, `mount-style`

### Docs

- Translation improvements

## [4.0.0] - 2023-05-18

### Changed

- **BREAKING**: Split `csv` into `arrayToCSV`, `CSVToArray`, `CSVToJSON`, `JSONToCSV`
- **BREAKING**: Split `cache` into `setCache`, `getCache`, `delCache`
- **BREAKING**: Split `session` into `setSession`, `getSession`, `delSession`
- **BREAKING**: Split `cookie` into `setCookie`, `getCookie`, `delCookie`

### Removed

- `tslib` package dependency

### Changed

- New build scripts and output format

## [3.1.0] - 2023-04-07

### Changed

- Optimize build output by removing `tslib`

## [3.0.0] - 2023-04-06

### Removed

- `imgAdapt`, `imgChoose`, `throttle`, `debounce`, `enWxJumpLink`, `enWxJumpLinkOld`, `deWxJumpLink`, `deWxJumpLinkOld`, `clearHtmlExpSN`, `clearHtmlN`, `clearHtmlNS`, `clearHtmlTag`, `formatTime`, `formatTimeStr`, `getFileType`, `clearBr`

### Changed

- Move CSV functions to `csv` module
- Move cache functions to `cache` module
- Move session functions to `session` module
- Move cookie functions to `cookie` module
- `splitThousand` → `toThousands`
- `getWindowSize` → `windowSize`

### Added

- New `isPlainObject` function
- New `extend` function
- Support direct import: `require('js-cool/addEvent')`
- Build output now differentiates between esnext and es5

## [2.8.0] - 2022-12-13

### Changed

- `loadSource`, `mountCss`, `mountImg`, `mountJs`, `mountStyle` now support custom properties
- Improved TypeScript types
- Fixed IE compatibility issues

### Dependencies

- Upgrade packages

## [2.7.1] - 2022-12-07

### Changed

- Extend types supported by `getType` method

## [2.7.0] - 2022-12-04

### Added

- New `setProperty` function

### Fixed

- Fix `getProperty` bug

## [2.6.0] - 2022-12-04

### Added

- New `loadSource` function
- New `mountCss` function
- New `mountImg` function
- New `mountJs` function
- New `mountStyle` function

### Dependencies

- Upgrade packages

## [2.5.0] - 2022-09-10

### Changed

- Adjust exports to support Node ESM mode
- Optimize build scripts

### Dependencies

- Upgrade packages

## [2.4.0] - 2022-08-23

### Dependencies

- Upgrade packages

### Changed

- Optimize build process

## [2.3.2] - 2022-03-12

### Dependencies

- Upgrade packages

### Docs

- Optimize documentation

## [2.3.1] - 2022-02-25

### Fixed

- Fix `tslib` package issue

## [2.3.0] - 2021-11-11

### Changed

- Export module keeps default

### Dependencies

- Upgrade packages

## [2.2.4] - 2021-10-23

### Added

- New `getProperty` function

## [2.2.3] - 2021-10-19

### Changed

- Improve `fillIPv6` function

## [2.2.2] - 2021-10-18

### Added

- New `fillIPv6` function

## [2.2.1] - 2021-10-15

### Added

- New `intersect` function - find intersection of arrays
- New `union` function - find union of arrays
- New `minus` function - find difference of arrays
- New `complement` function - find complement of arrays
- New `contains` function - check if array contains element
- New `unique` function - array deduplication

## [2.1.3] - 2021-09-21

### Changed

- Add build output banner

## [2.1.2] - 2021-09-10

### Changed

- Improve TypeScript types

### Dependencies

- Upgrade packages

## [2.1.1] - 2021-09-02

### Changed

- Refine TypeScript types

## [2.1.0] - 2021-08-29

### Added

- Build ES module output

## [2.0.1] - 2021-08-28

### Fixed

- Fix several issues

### Docs

- Optimize code and documentation

## [2.0.0] - 2021-08-26

### Changed

- **BREAKING**: Refactor all code to TypeScript
- Rewrite method comments according to TSDoc specification

## [1.1.0] - 2021-07-26

### Changed

- Use webpack to build UMD package

## [1.0.9] - 2021-03-03

### Added

- New `all` function
- New `any` function
- New `RGBToHex` function
- New `uuid` function
- New `arrayToCSV` function
- New `CSVToArray` function
- New `CSVToJSON` function
- New `JSONToCSV` function

## [1.0.8] - 2021-03-02

### Added

- New `splitThousand` function

## [1.0.7] - 2021-03-01

### Fixed

- Fix `nextIndex` bug

## [1.0.6] - 2021-02-18

### Added

- New `openUrl` function

## [1.0.5] - 2021-02-18

### Added

- New `download` function
- New `searchTreeObject` function

## [1.0.4] - 2021-02-08

### Changed

- Update `getCookie` and `setCookie` methods

## [1.0.3] - 2021-02-01

### Fixed

- Handle bugs

## [1.0.2] - 2021-01-23

### Added

- New `nextIndex` function
- New `fixNumber` function
- New `delay` function
- New `extend` function
- New `getType` function
- New `isArray` function
- New `cleanData` function
- New `getCache` function
- New `setCache` function
- New `delCache` function

### Removed

- `getLocal`, `setLocal`, `delLocal`

## [1.0.1] - 2020-12-14

### Added

- Initial release
