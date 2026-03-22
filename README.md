<div align="center">

# js-cool

**Collection of common JavaScript / TypeScript utilities**

[![NPM version](https://img.shields.io/npm/v/js-cool.svg?style=flat-square)](https://npmjs.org/package/js-cool)
[![npm download](https://img.shields.io/npm/dm/js-cool.svg?style=flat-square)](https://npmjs.org/package/js-cool)
[![Test coverage](https://img.shields.io/codecov/c/github/saqqdy/js-cool.svg?style=flat-square)](https://codecov.io/github/saqqdy/js-cool)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
[![tree shaking](https://badgen.net/bundlephobia/tree-shaking/js-cool)](https://bundlephobia.com/package/js-cool)
[![gzip](http://img.badgesize.io/https://unpkg.com/js-cool/dist/index.iife.min.js?compression=gzip&label=gzip%20size:%20JS)](http://img.badgesize.io/https://unpkg.com/js-cool/dist/index.iife.min.js?compression=gzip&label=gzip%20size:%20JS)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**[Changelog](./CHANGELOG.md)** • **[简体中文](./README-zh_CN.md)**

</div>

---

## Installation

```bash
# pnpm
pnpm add js-cool

# npm
npm install js-cool

# yarn
yarn add js-cool
```

## Usage

```js
// ES Module
import { osVersion, copy, randomString } from 'js-cool'

// Node.js CommonJS
const { osVersion, copy, randomString } = require('js-cool')

// CDN (Browser)
<script src="https://unpkg.com/js-cool/dist/index.iife.min.js"></script>
<script>
  jsCool.browserVersion()
</script>

// Direct import (tree-shaking friendly)
import copy from 'js-cool/copy'
import { randomString } from 'js-cool'
```

---

## Migration from v5.x to v6.x

### Breaking Changes

#### 1. Build Output Files

| v5.x                             | v6.x                     | Description                         |
| -------------------------------- | ------------------------ | ----------------------------------- |
| `dist/index.cjs.js`              | `dist/index.js`          | CJS output renamed                  |
| `dist/index.mjs`                 | `dist/index.mjs`         | ESM output (unchanged)              |
| `dist/index.esm-browser.js`      | `dist/index.mjs`         | Use ESM output directly             |
| `dist/index.esm-browser.prod.js` | `dist/index.mjs`         | Use ESM output (build tools minify) |
| `dist/index.global.js`           | `dist/index.iife.js`     | IIFE output renamed                 |
| `dist/index.global.prod.js`      | `dist/index.iife.min.js` | IIFE minified renamed               |

#### 2. CDN Usage

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

#### 3. Deprecated Functions Removed

| Removed           | Replacement    |
| ----------------- | -------------- |
| `getAppVersion()` | `appVersion()` |
| `getOsVersion()`  | `osVersion()`  |

#### 4. Package.json Exports

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
    }
  }
}
```

### Migration Steps

1. **Update import paths** (if using direct file imports):

   ```js
   // v5.x
   import jsCool from 'js-cool/dist/index.esm-browser.js'

   // v6.x
   import jsCool from 'js-cool'
   ```

2. **Update CDN links**:

   ```html
   <!-- v5.x -->
   <script src="https://unpkg.com/js-cool/dist/index.global.prod.js"></script>

   <!-- v6.x -->
   <script src="https://unpkg.com/js-cool/dist/index.iife.min.js"></script>
   ```

3. **Update global variable** (CDN users):

   ```js
   // v5.x
   window.JsCool

   // v6.x
   window.jsCool
   ```

4. **Replace deprecated functions**:

   ```js
   // v5.x
   getAppVersion('Chrome')
   getOsVersion()

   // v6.x
   appVersion('Chrome')
   osVersion()
   ```

---

## Function Categories

js-cool provides **140+ utility functions** organized into **16 categories**:

| Category          | Description                       | Functions                                                                                                                                                                                          |
| ----------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **String**        | String manipulation               | `camel2Dash`, `dash2Camel`, `upperFirst`, `kebabCase`, `snakeCase`, `truncate`, `trim`, `clearHtml`, `clearAttr`, `cutCHSString`, `getCHSLength`, `mapTemplate`, `escape`, `unescape`              |
| **Array**         | Array processing                  | `unique`, `shuffle`, `sorter`, `sortPinyin`, `chunk`, `flatten`, `groupBy`, `keyBy`, `sample`, `sampleSize`, `intersect`, `union`, `minus`, `complement`, `contains`, `all`, `any`, `searchObject` |
| **Object**        | Object manipulation               | `clone`, `extend`, `getProperty`, `setProperty`, `omit`, `pick`, `cleanData`, `safeParse`, `safeStringify`, `arrayToCSV`, `CSVToArray`                                                             |
| **Type Check**    | Type checking                     | `getType`, `isArray`, `isObject`, `isPlainObject`, `isDate`, `isRegExp`, `isWindow`, `isIterable`, `isDigitals`, `isEqual`, `isEmpty`, `isNil`                                                     |
| **Validate**      | Validation functions              | `isEmail`, `isPhone`, `isURL`, `isIDCard`, `isCreditCard`                                                                                                                                          |
| **URL & Browser** | URL parsing and browser detection | `getUrlParams`, `getUrlParam`, `parseUrlParam`, `spliceUrlParam`, `getDirParam`, `client`, `appVersion`, `browserVersion`, `compareVersion`, `nextVersion`                                         |
| **DOM**           | DOM manipulation                  | `addEvent`, `removeEvent`, `stopBubble`, `stopDefault`, `copy`, `windowSize`                                                                                                                       |
| **Storage**       | Browser storage                   | `setCache`, `getCache`, `delCache`, `setSession`, `getSession`, `delSession`, `setCookie`, `getCookie`, `getCookies`, `delCookie`                                                                  |
| **Convert**       | Format conversion                 | `arrayBufferToBase64`, `arrayBufferToBlob`, `base64ToArrayBuffer`, `base64ToBlob`, `base64ToFile`, `blobToArrayBuffer`, `blobToBase64`, `blobToUrl`, `fileToBase64`, `svgToBlob`, `urlToBlob`      |
| **Number**        | Number processing                 | `clamp`, `round`, `sum`, `average`, `inRange`                                                                                                                                                      |
| **Date**          | Date processing                   | `formatDate`, `dateDiff`, `relativeTime`, `isToday`, `getDaysInMonth`                                                                                                                              |
| **Color**         | Color manipulation                | `hexToRGB`, `rgbToHSL`, `RGBToHex`, `lighten`, `darken`, `isLightColor`, `randomColor`                                                                                                             |
| **Utility**       | General utilities                 | `delay`, `uuid`, `randomString`, `randomNumber`, `randomNumbers`, `nextIndex`, `getFileType`, `getNumber`, `fixNumber`, `toThousands`, `openUrl`, `punctualTimer`, `waiting`, `fingerprint`        |
| **Async Flow**    | Async flow control                | `debounce`, `throttle`, `retry`, `awaitTo`                                                                                                                                                         |
| **Encode**        | Encoding/decoding                 | `encodeBase64`, `decodeBase64`, `encodeUtf8`, `decodeUtf8`                                                                                                                                         |
| **Network**       | Network utilities                 | `fillIPv6`                                                                                                                                                                                         |

---

## API Reference

### Global

#### client

Browser detection utility.

```js
import { client } from 'js-cool'

// Get all browser info
client.get(['device', 'browser', 'engine', 'os'])
// { device: 'Mobile', browser: 'Chrome', os: 'Android', engine: 'Blink' }

// Get single info
client.get('browser') // { browser: 'Chrome' }
client.get('device') // { device: 'Mobile' }
client.get('os') // { os: 'Android' }
client.get('engine') // { engine: 'Blink' }

// Get multiple info
client.get(['browser', 'os'])
// { browser: 'Chrome', os: 'Android' }

// Get language
client.getLanguage() // 'en-US'

// Get network info
client.getNetwork() // { effectiveType: '4g', downlink: 10 }

// Get orientation
client.getOrientationStatus() // 'vertical' | 'horizontal'
```

#### pattern

Common regex patterns collection.

```js
import { pattern } from 'js-cool'

// Email validation
pattern.email.test('test@example.com') // true
pattern.email.test('invalid-email') // false

// Chinese mobile phone
pattern.mobile.test('13800138000') // true
pattern.mobile.test('12345678901') // false

// URL validation
pattern.url.test('https://example.com') // true
pattern.url.test('ftp://files.server') // true

// Number validation
pattern.number.test('12345') // true
pattern.number.test('12.34') // true

// Chinese characters
pattern.chinese.test('中文测试') // true
pattern.chinese.test('test123') // false

// QQ number
pattern.qq.test('123456789') // true

// Telephone (landline)
pattern.tel.test('010-12345678') // true
pattern.tel.test('021-87654321') // true

// Postcode (China)
pattern.postcode.test('100000') // true

// Username (alphanumeric + underscore, 4-16 chars)
pattern.username.test('user_name') // true

// Password (at least 6 chars with letter and number)
pattern.pass.test('abc123') // true

// JSON string
pattern.json.test('{"a":1}') // true

// MAC address
pattern.mac.test('00:1A:2B:3C:4D:5E') // true

// IPv4 address
pattern.ip4.test('192.168.1.1') // true

// Private IPv4
pattern.ip4_pri.test('192.168.1.1') // true
pattern.ip4_pri.test('10.0.0.1') // true
pattern.ip4_pri.test('172.16.0.1') // true
```

---

### String

#### trim

Remove whitespace from string ends.

```js
import { trim } from 'js-cool'

trim('  hello  ') // 'hello'
trim('\nhello\n') // 'hello'
trim('\thello\t') // 'hello'
trim('  hello world  ') // 'hello world'
```

#### clearAttr

Remove all HTML tag attributes.

```js
import { clearAttr } from 'js-cool'

clearAttr('<div id="test" class="box">content</div>')
// '<div>content</div>'

clearAttr('<a href="url" target="_blank">link</a>')
// '<a>link</a>'

clearAttr('<input type="text" name="field" />')
// '<input />'

clearAttr('<img src="pic.jpg" alt="image" />')
// '<img />'
```

#### clearHtml

Remove HTML tags.

```js
import { clearHtml } from 'js-cool'

clearHtml('<div>test<br/>string</div>') // 'teststring'
clearHtml('<p>Hello <b>World</b></p>') // 'Hello World'
clearHtml('<a href="#">link</a>') // 'link'
clearHtml('plain text') // 'plain text'
```

#### escape / unescape

Escape/unescape HTML special characters.

```js
import { escape, unescape } from 'js-cool'

// Escape
escape('<div>test</div>') // '&lt;div&gt;test&lt;/div&gt;'
escape('a < b & c > d') // 'a &lt; b &amp; c &gt; d'
escape('"hello" & \'world\'') // '&quot;hello&quot; &amp; &#39;world&#39;'

// Unescape
unescape('&lt;div&gt;test&lt;/div&gt;') // '<div>test</div>'
unescape('&amp;lt;') // '&lt;'
unescape('&quot;hello&quot;') // '"hello"'
```

#### getNumber

Extract number from string.

```js
import { getNumber } from 'js-cool'

getNumber('Chrome123.45') // '123.45'
getNumber('price: $99.99') // '99.99'
getNumber('version 2.0.1') // '2.0.1'
getNumber('no numbers here') // ''
getNumber('123abc456') // '123456'
getNumber('-12.34') // '-12.34'
```

#### camel2Dash / dash2Camel

Convert between camelCase and kebab-case.

```js
import { camel2Dash, dash2Camel } from 'js-cool'

// camelCase to kebab-case
camel2Dash('jsCool') // 'js-cool'
camel2Dash('backgroundColor') // 'background-color'
camel2Dash('marginTop') // 'margin-top'
camel2Dash('XMLHttpRequest') // 'x-m-l-http-request'

// kebab-case to camelCase
dash2Camel('js-cool') // 'jsCool'
dash2Camel('background-color') // 'backgroundColor'
dash2Camel('margin-top') // 'marginTop'
dash2Camel('-webkit-transform') // 'WebkitTransform'
```

#### upperFirst

Capitalize first letter.

```js
import { upperFirst } from 'js-cool'

upperFirst('hello') // 'Hello'
upperFirst('HELLO') // 'HELLO'
upperFirst('h') // 'H'
upperFirst('') // ''
```

#### randomString

Generate random string with various options.

```js
import { randomString } from 'js-cool'

// Default: 32 chars with uppercase, lowercase, numbers
randomString() // 'aB3dE7fG9hJ2kL5mN8pQ1rS4tU6vW0xY'

// Specify length
randomString(8) // 'xY7mN2pQ'
randomString(16) // 'aB3dE7fG9hJ2kL5m'

// Using options object
randomString({ length: 16 })
// 'kL5mN8pQ1rS4tU6v'

// Only numbers
randomString({ length: 6, charTypes: 'number' })
// '847291'

// Only lowercase letters
randomString({ length: 8, charTypes: 'lowercase' })
// 'qwertyui'

// Only uppercase letters
randomString({ length: 8, charTypes: 'uppercase' })
// 'ASDFGHJK'

// Multiple char types
randomString({ length: 16, charTypes: ['uppercase', 'number'] })
// 'A3B7C9D2E5F8G1H4'

// Include special characters
randomString({ length: 16, charTypes: ['lowercase', 'number', 'special'] })
// 'a1@b2#c3$d4%e5^f6'

// All char types
randomString({
  length: 20,
  charTypes: ['uppercase', 'lowercase', 'number', 'special'],
})
// 'A1a@B2b#C3c$D4d%E5e^'

// Exclude confusing characters (o, O, 0, l, 1, I)
randomString({ length: 16, noConfuse: true })
// 'aB3dE7fG9hJ2kL5m' (no o, O, 0, l, 1, I)

// Strict mode: must include at least one of each char type
randomString({
  length: 16,
  charTypes: ['uppercase', 'lowercase', 'number'],
  strict: true,
})
// Guaranteed to have at least 1 uppercase, 1 lowercase, 1 number

// Old API style (still supported)
randomString(16, true) // 16 chars with special characters
randomString(true) // 32 chars with special characters
```

#### getCHSLength

Get string length (Chinese = 2 chars).

```js
import { getCHSLength } from 'js-cool'

getCHSLength('hello') // 5
getCHSLength('你好') // 4
getCHSLength('hello世界') // 9 (5 + 4)
getCHSLength('测试Test') // 8 (4 + 4)
getCHSLength('') // 0
```

#### cutCHSString

Truncate string (Chinese = 2 bytes).

```js
import { cutCHSString } from 'js-cool'

cutCHSString('hello世界', 6) // 'hello世'
cutCHSString('hello世界', 6, true) // 'hello世...'
cutCHSString('测试字符串', 4) // '测试'
cutCHSString('测试字符串', 4, true) // '测试...'
cutCHSString('abc', 10) // 'abc'
cutCHSString('abc', 10, true) // 'abc'
```

---

### Array

#### shuffle

Shuffle array or string.

```js
import { shuffle } from 'js-cool'

// Shuffle array
shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
shuffle(['a', 'b', 'c']) // ['c', 'a', 'b']

// Shuffle string
shuffle('hello') // 'lleho'
shuffle('abcdefg') // 'gfedcba'

// Shuffle with size limit
shuffle([1, 2, 3, 4, 5], 3) // [4, 1, 5] (3 random elements)
shuffle('hello', 3) // 'leh' (3 random chars)
```

#### unique

Remove duplicates from array.

```js
import { unique } from 'js-cool'

unique([1, 2, 2, 3, 3, 3]) // [1, 2, 3]
unique(['a', 'b', 'a', 'c']) // ['a', 'b', 'c']
unique([1, '1', 1]) // [1, '1']
unique([true, false, true]) // [true, false]
unique([null, null, undefined]) // [null, undefined]
```

#### intersect

Intersection of multiple arrays.

```js
import { intersect } from 'js-cool'

intersect([1, 2, 3], [2, 3, 4]) // [2, 3]
intersect([1, 2, 3], [2, 3, 4], [3, 4, 5]) // [3]
intersect(['a', 'b'], ['b', 'c']) // ['b']
intersect([1, 2], [3, 4]) // []
```

#### union

Union of multiple arrays.

```js
import { union } from 'js-cool'

union([1, 2], [3, 4]) // [1, 2, 3, 4]
union([1, 2], [2, 3]) // [1, 2, 3]
union([1, 2], [2, 3], [3, 4]) // [1, 2, 3, 4]
union(['a'], ['b'], ['c']) // ['a', 'b', 'c']
```

#### minus

Difference of multiple arrays (elements in first but not in others).

```js
import { minus } from 'js-cool'

minus([1, 2, 3], [2, 3, 4]) // [1]
minus([1, 2, 3, 4], [2, 3]) // [1, 4]
minus([1, 2, 3], [2], [3]) // [1]
minus(['a', 'b', 'c'], ['b']) // ['a', 'c']
```

#### complement

Complement of multiple arrays (elements not in all arrays combined).

```js
import { complement } from 'js-cool'

complement([1, 2], [2, 3]) // [1, 3]
complement([1, 2], [3, 4]) // [1, 2, 3, 4]
complement(['a', 'b'], ['b', 'c']) // ['a', 'c']
```

#### contains

Check if array contains element.

```js
import { contains } from 'js-cool'

contains([1, 2, 3], 2) // true
contains([1, 2, 3], 4) // false
contains(['a', 'b'], 'a') // true
contains([null], null) // true
contains([NaN], NaN) // true
```

#### all / any

Check array elements against predicate.

```js
import { all, any } from 'js-cool'

// all - check if all elements pass
all([1, 2, 3], x => x > 0) // true
all([1, 2, 3], x => x > 1) // false
all(['a', 'b'], x => x.length === 1) // true
all([], x => x > 0) // true (empty array)

// any - check if any element passes
any([1, 2, 3], x => x > 2) // true
any([1, 2, 3], x => x > 10) // false
any(['hello', 'world'], x => x.includes('o')) // true
any([], x => x > 0) // false (empty array)
```

---

### Object

#### extend

Deep merge objects.

```js
import { extend } from 'js-cool'

// Shallow copy
const result1 = extend({}, { a: 1 }, { b: 2 })
// { a: 1, b: 2 }

// Deep merge
const result2 = extend(true, {}, { a: { b: 1 } }, { a: { c: 2 } })
// { a: { b: 1, c: 2 } }

// Override values
const result3 = extend(true, {}, { a: 1, b: 2 }, { b: 3 })
// { a: 1, b: 3 }

// Merge arrays
const result4 = extend(true, {}, { arr: [1, 2] }, { arr: [3] })
// { arr: [3, 2] }

// Multiple sources
const result5 = extend(true, {}, { a: 1 }, { b: 2 }, { c: 3 })
// { a: 1, b: 2, c: 3 }
```

#### clone

Deep clone object.

```js
import { clone } from 'js-cool'

const obj = { a: { b: 1, c: [1, 2, 3] } }
const cloned = clone(obj)

cloned.a.b = 2
cloned.a.c.push(4)

obj.a.b // still 1
obj.a.c // still [1, 2, 3]

// Clone array
const arr = [{ a: 1 }, { b: 2 }]
const clonedArr = clone(arr)

// Clone Date
const date = new Date()
const clonedDate = clone(date)

// Clone RegExp
const regex = /test/gi
const clonedRegex = clone(regex)
```

#### isEqual

Deep equality comparison.

```js
import { isEqual } from 'js-cool'

isEqual({ a: 1 }, { a: 1 }) // true
isEqual({ a: 1, b: 2 }, { b: 2, a: 1 }) // true (order doesn't matter)
isEqual([1, 2, 3], [1, 2, 3]) // true
isEqual(NaN, NaN) // true
isEqual(null, null) // true
isEqual(undefined, undefined) // true

isEqual({ a: 1 }, { a: 2 }) // false
isEqual([1, 2], [2, 1]) // false (order matters)
isEqual({ a: 1 }, { a: 1, b: 2 }) // false

// Deep comparison
isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } }) // true
```

#### getProperty / setProperty

Get/set nested property by path.

```js
import { getProperty, setProperty } from 'js-cool'

const obj = {
  a: {
    b: [{ c: 1 }, { c: 2 }],
    d: { e: 'hello' },
  },
}

// Get property
getProperty(obj, 'a.b.0.c') // 1
getProperty(obj, 'a.b.1.c') // 2
getProperty(obj, 'a.d.e') // 'hello'
getProperty(obj, 'a.b') // [{ c: 1 }, { c: 2 }]

// With default value
getProperty(obj, 'a.b.5.c', 'default') // 'default'
getProperty(obj, 'x.y.z', null) // null

// Set property
setProperty(obj, 'a.b.0.c', 100)
// obj.a.b[0].c === 100

setProperty(obj, 'a.d.e', 'world')
// obj.a.d.e === 'world'

setProperty(obj, 'a.new', 'value')
// obj.a.new === 'value'
```

#### searchObject

Deep search in object tree.

```js
import { searchObject } from 'js-cool'

const tree = {
  id: 1,
  name: 'root',
  children: [
    { id: 2, name: 'child1', children: [] },
    { id: 3, name: 'child2', children: [{ id: 4, name: 'grandchild' }] },
  ],
}

// Search by predicate
searchObject(tree, item => item.id === 3, { children: 'children' })
// [{ id: 3, name: 'child2', ... }]

// Search by name
searchObject(tree, item => item.name.includes('child'), {
  children: 'children',
})
// [{ id: 2, ... }, { id: 3, ... }, { id: 4, ... }]

// Custom key set
searchObject(tree, item => item.id > 2, {
  children: 'children',
  id: 'id',
})
```

---

### Type Checking

```js
import {
  isArray,
  isDate,
  isDigitals,
  isIterable,
  isObject,
  isPlainObject,
  isRegExp,
  isWindow,
} from 'js-cool'

// isArray
isArray([1, 2, 3]) // true
isArray('array') // false
isArray(null) // false

// isObject
isObject({}) // true
isObject([]) // true (arrays are objects)
isObject(null) // false
isObject(function () {}) // true

// isPlainObject
isPlainObject({}) // true
isPlainObject(Object.create(null)) // true
isPlainObject([]) // false
isPlainObject(new Date()) // false

// isDate
isDate(new Date()) // true
isDate('2024-01-01') // false
isDate(1234567890000) // false

// isRegExp
isRegExp(/test/) // true
isRegExp(new RegExp('test')) // true
isRegExp('/test/') // false

// isWindow
isWindow(window) // true (in browser)
isWindow({}) // false

// isIterable
isIterable([1, 2, 3]) // true
isIterable('string') // true
isIterable(new Set()) // true
isIterable(new Map()) // true
isIterable({}) // false
isIterable(null) // false

// isDigitals
isDigitals('12345') // true
isDigitals('12.34') // true
isDigitals('-123') // true
isDigitals('12a34') // false
```

---

### Environment

```js
import { inBrowser, inNodeJs, isDarkMode, windowSize } from 'js-cool'

// inBrowser - check if running in browser
inBrowser() // true in browser, false in Node.js

// inNodeJs - check if running in Node.js
inNodeJs() // true in Node.js, false in browser

// isDarkMode - check if dark mode is enabled
isDarkMode() // true if user prefers dark mode

// windowSize - get window dimensions
windowSize() // { width: 1920, height: 1080 }
windowSize() // { width: 375, height: 667 } (mobile)
```

---

### Browser Detection

```js
import { appVersion, browserVersion, fingerprint, isNumberBrowser, osVersion } from 'js-cool'

// appVersion - get app version from UA
appVersion('Chrome') // '123.0.0.0'
appVersion('Safari') // '17.0'
appVersion('Firefox') // '123.0'
appVersion('MicroMessenger') // '8.0' (WeChat)

// With custom UA
appVersion('Chrome', 'Mozilla/5.0 Chrome/100.0.0.0')
// '100.0.0.0'

// osVersion - get OS name and version
osVersion()
// { name: 'Windows', version: '10.0' }
// { name: 'Mac OS', version: '10.15.7' }
// { name: 'Android', version: '13' }
// { name: 'iOS', version: '17.0' }
// { name: 'Harmony', version: '4.0' }

// browserVersion - get browser name and version
browserVersion()
// { name: 'Chrome', version: '123.0.0.0' }
// { name: 'Safari', version: '17.0' }
// { name: 'Firefox', version: '123.0' }
// { name: 'Edge', version: '123.0.0.0' }

// isNumberBrowser - check if 360 browser
isNumberBrowser() // true if 360 browser

// fingerprint - generate browser fingerprint
fingerprint() // 'wc7sWJJA8'
fingerprint('example.com') // 'xK9mN2pL5' (with custom domain)
```

---

### URL & Query

#### compareVersion

Compare version numbers.

```js
import { compareVersion } from 'js-cool'

compareVersion('1.2.3', '1.2.2') // 1 (greater)
compareVersion('1.2.3', '1.2.3') // 0 (equal)
compareVersion('1.2.3', '1.2.4') // -1 (less)
compareVersion('2.0.0', '1.9.9') // 1
compareVersion('1.10.0', '1.9.0') // 1

// With pre-release tags (priority: rc > beta > alpha)
compareVersion('1.0.0-rc.1', '1.0.0-beta.1') // 1
compareVersion('1.0.0-beta.1', '1.0.0-alpha.1') // 1
compareVersion('1.0.0-alpha.1', '1.0.0') // -1

// Practical usage
const needsUpdate = compareVersion(currentVersion, minVersion) < 0
```

#### parseUrlParam

Parse URL parameters string.

```js
import { parseUrlParam } from 'js-cool'

// Basic parsing
parseUrlParam('a=1&b=2&c=3')
// { a: '1', b: '2', c: '3' }

// With type conversion
parseUrlParam('a=1&b=2&c=true', true)
// { a: 1, b: 2, c: true }

// Complex values
parseUrlParam('name=hello%20world&list=1,2,3')
// { name: 'hello world', list: '1,2,3' }

// Empty string
parseUrlParam('') // {}

// Special values (not converted even with true)
parseUrlParam('hex=0xFF&bin=0b111&oct=0o77&exp=1e3', true)
// { hex: '0xFF', bin: '0b111', oct: '0o77', exp: '1e3' }
```

#### spliceUrlParam

Build URL parameters string.

```js
import { spliceUrlParam } from 'js-cool'

spliceUrlParam({ a: 1, b: 2 })
// 'a=1&b=2'

spliceUrlParam({ name: 'hello world' })
// 'name=hello%20world'

spliceUrlParam({ a: 1, b: null, c: undefined })
// 'a=1' (null and undefined are skipped)

// With options
spliceUrlParam({ a: 1, b: 2 }, { encode: true })
// 'a=1&b=2'

spliceUrlParam({ a: 1, b: 2 }, { encode: false })
// 'a=1&b=2'

// Complex values
spliceUrlParam({ arr: [1, 2, 3] })
// 'arr=1,2,3'
```

#### getUrlParam / getUrlParams

Get URL parameters (from location.search, before #).

```js
import { getUrlParam, getUrlParams } from 'js-cool'

// Get single param
getUrlParam('a', '?a=1&b=2') // '1'
getUrlParam('b', '?a=1&b=2') // '2'
getUrlParam('c', '?a=1&b=2') // null

// Get all params
getUrlParams('?a=1&b=2&c=3')
// { a: '1', b: '2', c: '3' }

// With type conversion
getUrlParams('?a=1&b=2', true)
// { a: 1, b: 2 }

// From full URL
getUrlParams('https://example.com?foo=bar')
// { foo: 'bar' }
```

#### getQueryParam / getQueryParams

Get query parameters (after #).

```js
import { getQueryParam, getQueryParams } from 'js-cool'

// Get single query param
getQueryParam('a', '#/?a=1&b=2') // '1'
getQueryParam('b', 'https://example.com#/page?a=1&b=2') // '1'

// Get all query params
getQueryParams('#/?a=1&b=2')
// { a: '1', b: '2' }

// With type conversion
getQueryParams('#/?a=1&b=true', true)
// { a: 1, b: true }
```

#### getDirParam

Get directory-style URL params.

```js
import { getDirParam } from 'js-cool'

getDirParam('https://example.com/a/b/c')
// { 0: 'a', 1: 'b', 2: 'c' }

getDirParam('/user/123/profile')
// { 0: 'user', 1: '123', 2: 'profile' }
```

---

### Storage

#### localStorage (getCache / setCache / delCache)

```js
import { delCache, getCache, setCache } from 'js-cool'

// Store string
setCache('name', 'value')

// Store object (auto JSON stringify/parse)
setCache('user', { id: 1, name: 'John' })
getCache('user') // { id: 1, name: 'John' }

// Store number
setCache('count', 100)
getCache('count') // 100

// Store boolean
setCache('flag', true)
getCache('flag') // true

// With expiration (in seconds)
setCache('session', 'data', 3600) // expires in 1 hour
setCache('token', 'abc123', 86400) // expires in 24 hours

// Get non-existent key
getCache('nonexistent') // null

// Delete
delCache('name')
delCache('user')
```

#### sessionStorage (getSession / setSession / delSession)

```js
import { delSession, getSession, setSession } from 'js-cool'

setSession('temp', 'data')
getSession('temp') // 'data'

setSession('list', [1, 2, 3])
getSession('list') // [1, 2, 3]

setSession('config', { theme: 'dark' }, 1800) // 30 min expiry
getSession('config') // { theme: 'dark' }

delSession('temp')
```

#### Cookie (getCookie / getCookies / setCookie / delCookie)

```js
import { delCookie, getCookie, getCookies, setCookie } from 'js-cool'

// Set cookie (default: 1 day)
setCookie('name', 'value')

// Set with options
setCookie('name', 'value', { days: 7 })
setCookie('name', 'value', { days: 30, path: '/' })
setCookie('name', 'value', {
  days: 7,
  path: '/',
  domain: '.example.com',
  secure: true,
  sameSite: 'Strict',
})

// Get single cookie
getCookie('name') // 'value'
getCookie('nonexistent') // null

// Get all cookies
getCookies() // { name: 'value', other: 'data' }

// Delete cookie
delCookie('name')
delCookie('name', { path: '/', domain: '.example.com' })
```

---

### Encoding

#### Base64

```js
import { decodeBase64, encodeBase64 } from 'js-cool'

// Encode
encodeBase64('hello') // 'aGVsbG8='
encodeBase64('你好') // '5L2g5aW9'
encodeBase64('{"a":1}') // 'eyJhIjoxfQ=='
encodeBase64(12345) // 'MTIzNDU='

// Decode
decodeBase64('aGVsbG8=') // 'hello'
decodeBase64('5L2g5aW9') // '你好'
decodeBase64('eyJhIjoxfQ==') // '{"a":1}'
```

#### UTF-8

```js
import { decodeUtf8, encodeUtf8 } from 'js-cool'

encodeUtf8('hello') // encoded string
encodeUtf8('你好') // encoded string
decodeUtf8(encoded) // original string
```

#### Safe JSON

```js
import { safeParse, safeStringify } from 'js-cool'

// safeParse - never throws
safeParse('{"a":1}') // { a: 1 }
safeParse('invalid json') // null (no error!)
safeParse('{"a":BigInt(1)}') // { a: BigInt(1) }
safeParse(null) // null
safeParse(undefined) // null

// safeStringify - handles BigInt, circular refs
safeStringify({ a: 1 }) // '{"a":1}'
safeStringify({ a: BigInt(9007199254740993n) }) // handles BigInt
safeStringify({ a: () => {} }) // '{"a":null}'
```

---

### Event

```js
import { addEvent, removeEvent, stopBubble, stopDefault } from 'js-cool'

// Stop bubbling
document.getElementById('btn').addEventListener('click', e => {
  stopBubble(e) // e.stopPropagation()
})

// Prevent default
document.getElementById('link').addEventListener('click', e => {
  stopDefault(e) // e.preventDefault()
})

// Event delegation
const handler = e => {
  console.log('clicked:', e.target)
}

// Add delegated event
addEvent(document, 'click', handler)

// Remove delegated event
removeEvent(document, 'click', handler)

// Delegate to specific container
addEvent(document.getElementById('list'), 'click', e => {
  if (e.target.tagName === 'LI') {
    console.log('List item clicked')
  }
})
```

---

### Utility

#### uuid

```js
import { uuid } from 'js-cool'

uuid() // '550e8400-e29b-41d4-a716-446655440000'
uuid() // '6ba7b810-9dad-11d1-80b4-00c04fd430c8'
uuid() // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
```

#### copy

```js
import { copy } from 'js-cool'

// Basic usage
await copy('text to copy') // true

// In async function
async function handleCopy() {
  const success = await copy('Copied text')
  if (success) {
    console.log('Copied!')
  } else {
    console.log('Copy failed')
  }
}

// Copy with fallback
const result = await copy('fallback text')
console.log(result ? 'Success' : 'Failed')
```

#### download

```js
import { download } from 'js-cool'

// Download with URL
download('https://example.com/file.pdf')

// Download with custom filename
download('https://example.com/file.pdf', 'document.pdf')

// Download data URL
download('data:text/plain,Hello World', 'hello.txt')
```

#### openUrl

```js
import { openUrl } from 'js-cool'

openUrl('https://example.com') // Opens in new tab
openUrl('https://example.com/file.pdf') // Downloads if can't parse
```

#### toThousands

```js
import { toThousands } from 'js-cool'

toThousands(1234567.89) // '1,234,567.89'
toThousands(1234567890) // '1,234,567,890'
toThousands(1234.567) // '1,234.567'
toThousands('1234567') // '1,234,567'
toThousands(null) // ''
toThousands(undefined) // ''
```

#### randomNumber / randomNumbers

```js
import { randomNumber, randomNumbers } from 'js-cool'

// Random integer
randomNumber() // random int between 1-10
randomNumber(1, 100) // random int between 1-100
randomNumber(0, 1) // 0 or 1
randomNumber(-10, 10) // random int between -10 and 10

// Random float
randomNumber(0.1, 0.9) // random float between 0.1 and 0.9

// Random numbers with fixed sum
randomNumbers(4, 100) // [25, 30, 20, 25] (sum = 100)
randomNumbers(3, 10) // [3, 4, 3] (sum = 10)
randomNumbers(5, 1) // [0, 0, 1, 0, 0] (sum = 1)

// Allow zeros (default: true)
randomNumbers(4, 100, true) // no zeros allowed
randomNumbers(4, 100, false) // zeros allowed
```

#### randomColor

```js
import { randomColor } from 'js-cool'

// Random color
randomColor() // '#bf444b'

// Lighter colors (higher minimum)
randomColor(200) // '#d6e9d7' (all channels >= 200)
randomColor(128) // '#a1b2c3' (all channels >= 128)

// Range for all channels
randomColor(200, 255) // '#d3f9e4' (200-255)

// Individual channel ranges
randomColor([0, 100, 0], [100, 255, 100])
// Red: 0-100, Green: 100-255, Blue: 0-100

// Warm colors (more red/yellow)
randomColor([200, 100, 0], [255, 200, 100])

// Cool colors (more blue/green)
randomColor([0, 100, 200], [100, 200, 255])

// Dark colors
randomColor(0, 100) // '#3a2b1c'

// Pastel colors
randomColor(150, 230) // '#c8e6c9'
```

#### nextIndex

```js
import { nextIndex } from 'js-cool'

nextIndex() // 1001
nextIndex() // 1002
nextIndex() // 1003

// Useful for modals, tooltips
modal.style.zIndex = nextIndex()
```

#### nextVersion

```js
import { nextVersion } from 'js-cool'

nextVersion('1.2.3', 'major') // '2.0.0'
nextVersion('1.2.3', 'minor') // '1.3.0'
nextVersion('1.2.3', 'patch') // '1.2.4'
nextVersion('1.2.3', 'premajor') // '2.0.0-0'
nextVersion('1.2.3', 'preminor') // '1.3.0-0'
nextVersion('1.2.3', 'prepatch') // '1.2.4-0'
nextVersion('1.2.3-alpha.1', 'prerelease') // '1.2.3-alpha.2'

// Default is patch
nextVersion('1.2.3') // '1.2.4'
```

#### getType

```js
import { getType } from 'js-cool'

getType([1, 2, 3]) // 'array'
getType({}) // 'object'
getType(null) // 'null'
getType(undefined) // 'undefined'
getType('string') // 'string'
getType(123) // 'number'
getType(true) // 'boolean'
getType(() => {}) // 'function'
getType(new Date()) // 'date'
getType(/regex/) // 'regexp'
getType(new Error()) // 'error'
getType(new Map()) // 'map'
getType(new Set()) // 'set'
getType(Symbol()) // 'symbol'
getType(BigInt(1)) // 'bigint'
```

#### getFileType

```js
import { getFileType } from 'js-cool'

getFileType('document.pdf') // 'pdf'
getFileType('image.png') // 'image'
getFileType('video.mp4') // 'video'
getFileType('audio.mp3') // 'audio'
getFileType('archive.zip') // 'archive'
getFileType('code.js') // 'code'
getFileType('https://example.com/file.pdf') // 'pdf'
```

#### fixNumber

```js
import { fixNumber } from 'js-cool'

fixNumber(3.14159) // '3.14' (default 2 decimal places)
fixNumber(3.14159, 2) // '3.14'
fixNumber(3.14159, 4) // '3.1416'
fixNumber(3.1, 4) // '3.1' (no trailing zeros)
fixNumber(100, 2) // '100'
```

#### delay

```js
import { delay } from 'js-cool'

const d = delay()

// Debounce mode (first trigger executes immediately)
d.register('search', () => console.log('search'), 300, true)

// Throttle mode (delayed execution)
d.register('scroll', () => console.log('scroll'), 300, false)

// Destroy specific handler
d.destroy('search')

// The delay object stores all registered handlers
```

#### waiting

```js
import { waiting } from 'js-cool'

// Basic wait
await waiting(1000) // wait 1 second

// With throw on timeout
await waiting(5000, true) // throws after 5 seconds

// In async function
async function example() {
  console.log('start')
  await waiting(1000)
  console.log('after 1 second')
}

// Practical usage
async function poll() {
  while (true) {
    const result = await checkStatus()
    if (result.done) break
    await waiting(1000) // wait before next poll
  }
}
```

#### mapTemplate

```js
import { mapTemplate } from 'js-cool'

// ${xxx} style
mapTemplate('Hello, ${name}!', { name: 'World' })
// 'Hello, World!'

// {{xxx}} style
mapTemplate('Hello, {{name}}!', { name: 'World' })
// 'Hello, World!'

// {xxx} style
mapTemplate('Hello, {name}!', { name: 'World' })
// 'Hello, World!'

// Multiple variables
mapTemplate('${greeting}, ${name}! You have ${count} messages.', {
  greeting: 'Hello',
  name: 'John',
  count: 5,
})
// 'Hello, John! You have 5 messages.'

// Nested object
mapTemplate('User: ${user.name}', { user: { name: 'John' } })
// 'User: John'
```

#### sorter

```js
import { sorter } from 'js-cool'

const users = [
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Charlie', age: 35 },
]

// Sort by string field
users.sort(sorter('name', 'asc'))
// [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }, ...]

users.sort(sorter('name', 'desc'))
// [{ name: 'Charlie', age: 35 }, { name: 'Bob', age: 30 }, ...]

// Sort by number field
users.sort(sorter('age', 'asc'))
// [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }, ...]

// With transform function
users.sort(sorter('name', 'asc', name => name.toLowerCase()))
```

#### sortPinyin

```js
import { sortPinyin } from 'js-cool'

sortPinyin(['张三', '李四', '王五'])
// ['李四', '王五', '张三']

sortPinyin(['北京', '上海', '广州', '深圳'])
// ['北京', '广州', '上海', '深圳']
```

#### punctualTimer

```js
import { punctualTimer } from 'js-cool'

// Create timer
const timer = punctualTimer(() => {
  console.log('Tick at:', new Date())
}, 1000)

// Stop timer
timer.stop()

// Restart timer
timer.start()

// Check if running
timer.isRunning // true/false
```

#### awaitTo

```js
import { awaitTo } from 'js-cool'

// Basic usage
const [err, data] = await awaitTo(fetch('/api/data'))
if (err) {
  console.error('Error:', err)
  return
}
console.log('Data:', data)

// With async function
async function getUser(id) {
  const [err, user] = await awaitTo(fetch(`/api/users/${id}`))
  if (err) return null
  return user.json()
}

// Multiple promises
const [err, results] = await awaitTo(Promise.all([fetch('/api/users'), fetch('/api/posts')]))
```

---

### Resource Loading

```js
import { loadSource, mountCss, mountImg, mountJs, mountStyle, preloader } from 'js-cool'

// Load JS file
await mountJs('https://example.com/script.js')
await mountJs('https://example.com/script.js', { async: true })

// Load CSS file
await mountCss('https://example.com/styles.css')

// Inject CSS styles
mountStyle('.modal { display: none; }')
mountStyle(`
  .container { max-width: 1200px; }
  .header { height: 60px; }
`)

// Load image
await mountImg('https://example.com/image.png')
const img = await mountImg('https://example.com/image.png', {
  crossOrigin: 'anonymous',
})

// Generic resource loader
await loadSource({ type: 'js', url: 'https://example.com/script.js' })
await loadSource({ type: 'css', url: 'https://example.com/styles.css' })
await loadSource({ type: 'img', url: 'https://example.com/image.png' })

// Preload images
await preloader(['image1.jpg', 'image2.jpg', 'image3.jpg'])
```

---

### Binary Conversion

```js
import {
  arrayBufferToBase64,
  arrayBufferToBlob,
  base64ToArrayBuffer,
  base64ToBlob,
  base64ToFile,
  blobToArrayBuffer,
  blobToBase64,
  blobToUrl,
  fileToBase64,
  svgToBlob,
  urlToBlob,
} from 'js-cool'

// ArrayBuffer conversions
const buffer = new ArrayBuffer(10)
const base64 = arrayBufferToBase64(buffer)
const base64WithMime = arrayBufferToBase64(buffer, 'image/png')
const blob = arrayBufferToBlob(buffer, 'image/png')

// Base64 conversions
const buffer = base64ToArrayBuffer('aGVsbG8=')
const blob = base64ToBlob('data:image/png;base64,...')
const file = base64ToFile('data:image/png;base64,...', 'image.png', 'image/png')

// Blob conversions
const buffer = await blobToArrayBuffer(blob)
const base64 = await blobToBase64(blob)
const url = blobToUrl(blob) // 'blob:origin/uuid'

// File conversions
const base64 = await fileToBase64(file) // 'data:image/png;base64,...'

// SVG conversion
const blob = svgToBlob('<svg viewBox="0 0 100 100">...</svg>')
// Blob with type 'image/svg+xml'

// URL to Blob
const blob = await urlToBlob('https://example.com/image.png')
```

---

### CSV Conversion

```js
import { CSVToArray, CSVToJSON, JSONToCSV, arrayToCSV } from 'js-cool'

const csv = 'name,age,city\nJohn,30,NYC\nJane,25,LA'

// CSV to 2D array
CSVToArray(csv)
// [['name', 'age', 'city'], ['John', '30', 'NYC'], ['Jane', '25', 'LA']]

// 2D array to CSV
arrayToCSV([
  ['name', 'age'],
  ['John', 30],
  ['Jane', 25],
])
// 'name,age\nJohn,30\nJane,25'

// CSV to JSON
CSVToJSON(csv)
// [
//   { name: 'John', age: '30', city: 'NYC' },
//   { name: 'Jane', age: '25', city: 'LA' }
// ]

// JSON to CSV
JSONToCSV(
  [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
  ],
  ['name', 'age']
)
// 'name,age\nJohn,30\nJane,25'
```

---

### Color

#### RGBToHex

```js
import { RGBToHex } from 'js-cool'

RGBToHex(255, 0, 0) // '#ff0000'
RGBToHex(0, 255, 0) // '#00ff00'
RGBToHex(0, 0, 255) // '#0000ff'
RGBToHex(255, 255, 255) // '#ffffff'
RGBToHex(0, 0, 0) // '#000000'
```

---

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/js-cool/issues).

## License

[MIT](LICENSE)
