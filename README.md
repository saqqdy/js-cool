<div style="text-align: center;" align="center">

# js-cool

Collection of common JavaScript / TypeScript utilities

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![tree shaking][tree-shaking-image]][tree-shaking-url]
![typescript][typescript-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![gzip][gzip-image]][gzip-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

<div style="text-align: center; margin-bottom: 20px;" align="center">

### **[Documentation](https://www.saqqdy.com/js-cool)** • **[Change Log](./CHANGELOG.md)**

**Read this in other languages: English | [简体中文](./README-zh_CN.md)**

</div>

- [Installation](#installation)
- [Usage](#usage)
  - [Es6 module](#es6-module)
  - [Node.js require](#nodejs-require)
  - [Using unpkg CDN](#using-unpkg-cdn)
- [API Reference](#api-reference)
  - [Global Parameters](#global-parameters)
    - [client](#client) - The client method returns a browser result object
    - [pattern](#pattern) - Collection of common regular expressions
  - [Extras for String & Array & Object & Function](#extras-for-string--array--object--function)
    - [clearAttr](#clearattr) - Remove all attributes of HTML tags
    - [clearHtml](#clearhtml) - Removing HTML tags
    - [escape](#escape) - Escaping HTML Special Characters
    - [unescape](#unescape) - Restore HTML Special Characters
    - [getNumber](#getnumber) - Get the number in the string
    - [camel2Dash](#camel2dash) - Converts humped strings to -spaced and all lowercase Dash pattern
    - [dash2Camel](#dash2camel) - Converts -spaced and all lowercase Dash patterns to humped strings
    - [randomColor](#randomcolor) - Generate random hexadecimal colors
    - [randomNumber](#randomnumber) - Get a random number
    - [randomNumbers](#randomnumbers) - Generate n random integers that sum to a fixed sum
    - [randomString](#randomstring) - Get a random string
    - [shuffle](#shuffle) - shuffling algorithm, Reordering arrays or strings
    - [fingerprint](#fingerprint) - Generating Browser Fingerprints
    - [getCHSLength](#getchslength) - Get the length of the string, Chinese counts as 2 characters
    - [cutCHSString](#cutchsstring) - Intercept string, Chinese counts as 2 bytes
    - [upperFirst](#upperfirst) - First letter capitalized
  - [Determine](#determine)
    - [isDigitals](#isdigitals) - Determine if a string is a number
    - [isExitsFunction](#isexitsfunction) - Determine if a function is defined
    - [isExitsVariable](#isexitsvariable) - Determine if a variable is defined
    - [isEqual](#isequal) - Determine if 2 objects are equal
    - [isWindow](#iswindow) - Determine if window object
    - [isPlainObject](#isplainobject) - Determine if target is an plain object
    - [isDarkMode](#isdarkmode) - Determine if dark color mode
    - [isObject](#isobject) - Determine if target is an object
    - [isDate](#isdate) - Determine if target is Date
    - [isRegExp](#isregexp) - Determine if target is RegExp
    - [isArray](#isarray) - Determine if it is an array
    - [isIterable](#isiterable) - Determine if it is iterable
    - [inBrowser](#inbrowser) - Determine if it is running on the browser side
    - [inNodeJs](#innodejs) - Determine if it is running on node.js
    - [windowSize](#windowsize) - Get the window size
    - [getAppVersion](#getappversion) - Get the APP version number
    - [appVersion](#appversion) - Get the app version number
    - [getOsVersion](#getosversion) - Get the phone system version
    - [osVersion](#osversion) - get the system version
    - [browserVersion](#browserversion) - Get the browser name and version
    - [compareVersion](#compareversion) - Version number size comparison, tag version: `rc` > `beta` > `alpha` > `other`
    - [parseUrlParam](#parseurlparam) - parse url params. (If covert is passed true: Scientific notation, binary, octal and hexadecimal types of data are not converted, like: 0b111, 0o13, 0xFF, 1e3, -1e-2)
    - [spliceUrlParam](#spliceurlparam) - Splice URL parameters (single layer only)
    - [safeParse](#safeparse) - Secure parsing of JSON strings
    - [safeStringify](#safestringify) - Secure stringify of JSON Object
    - [getDirParam](#getdirparam) - Get the URL parameter in the form of a directory
    - [getQueryParam](#getqueryparam) - Get a single query parameter (behind "#")
    - [getQueryParams](#getqueryparams) - Get all query parameters (behind "#"). (If covert is passed true: Scientific notation, binary, octal and hexadecimal types of data are not converted, like: 0b111, 0o13, 0xFF, 1e3, -1e-2)
    - [getUrlParam](#geturlparam) - Get a single URL parameter (from the "location.search", before "#")
    - [getUrlParams](#geturlparams) - Get all URL parameters (from the "location.search", before "#"). (If covert is passed true: Scientific notation, binary, octal and hexadecimal types of data are not converted, like: 0b111, 0o13, 0xFF, 1e3, -1e-2)
  - [localStorage & sessionStorage & Cookie](#localstorage--sessionstorage--cookie)
    - [getCache](#getcache) - Get the cache, if the deposited is Object, the retrieved is also Object, no need to convert again
    - [setCache](#setcache) - Set the cache, if the deposited is Object, the retrieved is also Object, no need to convert again
    - [delCache](#delcache) - Delete localStorage
    - [getSession](#getsession) - Get the session, if the deposited is Object, the retrieved is also Object, no need to convert again
    - [setSession](#setsession) - Set the session, if the deposited is Object, the retrieved is also Object, no need to convert again
    - [delSession](#delsession) - Delete sessionStorage
    - [getCookie](#getcookie) - Get cookie by name
    - [getCookies](#getcookies) - Get all cookies
    - [setCookie](#setcookie) - Set cookie
    - [delCookie](#delcookie) - Delete cookie
  - [Base64 & UTF8](#base64--utf8)
    - [encodeBase64](#encodebase64) - convert strings, numbers to base64
    - [decodeBase64](#decodebase64) - base64 decoding
    - [encodeUtf8](#encodeutf8) - convert strings, numbers to utf8
    - [decodeUtf8](#decodeutf8) - utf8 decoding
  - [Events](#events)
    - [stopBubble](#stopbubble) - stop bubbling
    - [stopDefault](#stopdefault) - stop default events
    - [addEvent](#addevent) - event delegate, support multiple delegates
    - [removeEvent](#removeevent) - removeEvent removes the event delegate created by addEvent
    - [getScrollPosition](#getscrollposition) - Get slide to top and bottom return 'top' 'bottom', recommend using limit flow
  - [Utilities](#utilities)
    - [nextIndex](#nextindex) - return the next zIndex value
    - [nextVersion](#nextversion) - return the next version, **Only version types with no more than 3 digits are supported**. (Follow the npm version rules)
    - [punctualTimer](#punctualtimer) - punctual setInterval
    - [promiseFactory](#promisefactory) - Convert an object to a promise like api
    - [fixNumber](#fixnumber) - truncate a few decimal places, not 0 for shortage
    - [mapTemplate](#maptemplate) - Replacing specific data in a template string, support `${xxxx}` `{{xxxx}}` and `{xxxx}`
    - [extend](#extend) - deep copy & merge objects
    - [clone](#clone) - deep copy (Buffer, Promise, Set, Map are not supported)
    - [delay](#delay) - anti-dither throttling
    - [getType](#gettype) - Get the target type
    - [getFileType](#getfiletype) - Determine file type based on link suffix
    - [sorter](#sorter) - Sorter factory function
    - [sortPinyin](#sortpinyin) - Sort Chinese by Chinese phonetic alphabet
    - [cleanData](#cleandata) - Data cleaning methods
    - [download](#download) - Several ways of file downloading
    - [searchObject](#searchobject) - tree object depth lookup
    - [openUrl](#openurl) - Open link in new tab (file jump download if browser can't parse)
    - [copy](#copy) - copy to clipboard
    - [toThousands](#tothousands) - Digital thousandths division
    - [all](#all) - return true if the provided predicate function returns true for all elements in a set, otherwise return false
    - [any](#any) - Returns true if the provided predicate function returns true for at least one element of a set, false otherwise
    - [uuid](#uuid) - generate uuid on browser side, use v4 method
    - [CSVToArray](#csvtoarray) - Converts a comma-separated string of values (CSV) to a 2D array.
    - [arrayToCSV](#arraytocsv) - Converts a two-dimensional array to a comma-separated string of values (CSV).
    - [CSVToJSON](#csvtojson) - Converts a comma-separated string of values (CSV) to an array of 2D objects. The first line of the string is used as the header line.
    - [JSONToCSV](#jsontocsv) - Converts an array of objects to a comma-separated value (CSV) string containing only the specified columns.
    - [RGBToHex](#rgbtohex) - Converts RGB component values to color codes.
    - [intersect](#intersect) - Find the intersection of multiple arrays
    - [union](#union) - Find the concatenation of multiple arrays
    - [minus](#minus) - Find the set of differences of multiple arrays that belong to A but not to B/C/D... of the elements of
    - [complement](#complement) - Find the complement of multiple arrays
    - [contains](#contains) - Whether the array contains the specified element
    - [unique](#unique) - Array de-duplication
    - [fillIPv6](#fillipv6) - ipv6 address completion
    - [getProperty](#getproperty) - Get array, object property values based on path string
    - [setProperty](#setproperty) - Set array, object property values based on path string
    - [loadSource](#loadsource) - load resources dynamically, support js, images, css links, css style strings
    - [mountCss](#mountcss) - dynamically load css link resources
    - [mountImg](#mountimg) - load image resource dynamically
    - [mountJs](#mountjs) - load js link resources dynamically
    - [mountStyle](#mountstyle) - load css styles dynamically
    - [preloader](#preloader) - Image preloading
    - [waiting](#waiting) - waiting for a while
    - [awaitTo](#awaitto) - Async await wrapper for easy error handling
  - [Blob arrayBuffer base64 file blobUrl](#blob-arraybuffer-base64-file-bloburl)
    - [arrayBufferToBase64](#arraybuffertobase64) - arrayBuffer to base64
    - [arrayBufferToBlob](#arraybuffertoblob) - arrayBuffer to blob
    - [base64ToArrayBuffer](#base64toarraybuffer) - base64 to arrayBuffer
    - [base64ToBlob](#base64toblob) - base64 to blob
    - [base64ToFile](#base64tofile) - base64 to file
    - [blobToArrayBuffer](#blobtoarraybuffer) - blob to arrayBuffer
    - [blobToBase64](#blobtobase64) - blob to base64
    - [blobToUrl](#blobtourl) - blob to url
    - [fileToBase64](#filetobase64) - file to base64
    - [svgToBlob](#svgtoblob) - svg to blob
    - [urlToBlob](#urltoblob) - url to blob
- [Support & Issues](#support--issues)
- [License](#license)

## Installation

```bash
# use pnpm
pnpm install js-cool

## use npm
npm install --save js-cool
```

## Usage

### ES6 module

```js
import { osVersion } from 'js-cool'

osVersion()
```

### Node.js require

```js
const { osVersion } = require('js-cool')

osVersion()
```

### Using unpkg CDN

```html
<script src="https://unpkg.com/js-cool@latest/dist/index.global.prod.js"></script>
<script>
  jsCool.browserVersion()
</script>
```

## API Reference

### Global Parameters

#### client

The client method returns a browser result object

- Since: `1.0.1`

- Arguments: `none`

- Returns: `object`

- Example:

```ts
import { client } from 'js-cool'

client.get(['device', 'browser', 'engine', 'os']) // { device: 'xxx', browser: 'xxx', os: 'xxx', engine: 'xxx' }
client.get('device') // { device: 'xxx' }
```

- Types:

```ts
declare class Client {
  matchMap: Record<InfoKeys, boolean>
  root: Window & typeof globalThis
  navigator: Navigator
  constructor(options: ClientOptions)

  get(names?: InfoTypes | InfoTypes[]): Partial<{
    device: InfoKeys | undefined
    os: InfoKeys | undefined
    browser: InfoKeys | undefined
    engine: InfoKeys | undefined
    language: any
    network: any
    orientation: string | undefined
  }>

  getInfoByType(infoKey: InfoKey): InfoKeys | undefined
  getOrientationStatus(): 'vertical' | 'horizontal' | undefined
  getNetwork(): any
  getLanguage(): any
}
```

#### pattern

Collection of common regular expressions

- Since: `1.0.1`

- Arguments: `none`

- Returns: `none`

- Example:

```ts
pattern.number.test('333') // true
```

- Types:

```ts
declare const pattern: {
  any: RegExp
  number: RegExp
  string: RegExp
  postcode: RegExp
  url: RegExp
  username: RegExp
  float: RegExp
  email: RegExp
  mobile: RegExp
  chinese: RegExp
  tel: RegExp
  qq: RegExp
  pass: RegExp
  json: RegExp
  arrjson: RegExp
  array: RegExp
  isjson: RegExp
  textarea: RegExp
}
```

### Extras for String & Array & Object & Function

#### clearAttr

Remove all attributes of HTML tags

- Since: `1.0.1`

- Arguments:

| Parameters | Description           | Type     | Optional | Required | Default |
| ---------- | --------------------- | -------- | -------- | -------- | ------- |
| string     | string with html tags | `string` | -        | `true`   | -       |

- Returns: `string`

- Example:

```ts
clearAttr('<div id="testID">test</div>')
// '<div>test</div>'
```

- Types:

```ts
declare function clearAttr(string: string): string
```

#### clearHtml

Remove HTML tags

- Since: `1.0.1`

- Arguments:

| Parameters | Description           | Type     | Optional | Required | Default |
| ---------- | --------------------- | -------- | -------- | -------- | ------- |
| string     | string with html tags | `string` | -        | `true`   | -       |

- Returns: `string`

- Example:

```ts
clearHtml('<div>test<br />string</div>')
// 'teststring'
```

- Types:

```ts
declare function clearHtml(string: string): string
```

#### escape

Escaping HTML Special Characters

- Since: `5.5.0`

- Arguments:

| Parameters | Description           | Type     | Optional | Required | Default |
| ---------- | --------------------- | -------- | -------- | -------- | ------- |
| string     | string with html tags | `string` | -        | `true`   | -       |

- Returns: `string`

- Example:

```ts
escape('<div>test<br />string</div>')
// '&lt;div&gt;test&lt;br /&gt;string&lt;/div&gt;'
```

- Types:

```ts
declare function escape(string: string): string
```

#### unescape

Restore HTML Special Characters

- Since: `5.5.0`

- Arguments:

| Parameters | Description | Type     | Optional | Required | Default |
| ---------- | ----------- | -------- | -------- | -------- | ------- |
| string     | string      | `string` | -        | `true`   | -       |

- Returns: `string`

- Example:

```ts
unescape('&lt;div&gt;test&lt;br /&gt;string&lt;/div&gt;')
// '<div>test<br />string</div>'
```

- Types:

```ts
declare function unescape(string: string): string
```

#### getNumber

Get the number in the string

- Since: `1.0.1`

- Arguments:

| Parameters | Description                    | Type     | Optional | Required | Default |
| ---------- | ------------------------------ | -------- | -------- | -------- | ------- |
| string     | pass in a string with a number | `string` | -        | `true`   | -       |

- Returns: `string`

- Example:

```ts
getNumber('Chrome123.33')
// '123.33'

getNumber('234test.88')
// '234.88'
```

- Types:

```ts
declare function getNumber(string: string): string
```

#### camel2Dash

Converts humped strings to -spaced and all lowercase Dash pattern

- Since: `1.0.1`

- Arguments:

| Parameters | Description                | Type     | Optional | Required | Default |
| ---------- | -------------------------- | -------- | -------- | -------- | ------- |
| string     | the string to be converted | `string` | -        | `true`   | -       |

- Returns: `string`

- Example:

```ts
camel2Dash('jsCool') // js-cool
```

- Types:

```ts
declare function camel2Dash(string: string): string
```

#### dash2Camel

Converts -spaced and all lowercase Dash patterns to humped strings

- Since: `1.0.1`

- Arguments:

| Parameters | Description                | Type     | Optional | Required | Default |
| ---------- | -------------------------- | -------- | -------- | -------- | ------- |
| string     | the string to be converted | `string` | -        | `true`   | -       |

- Returns: `string`

- Example:

```ts
dash2Camel('js-cool') // jsCool
```

- Types:

```ts
declare function dash2Camel(string: string): string
```

#### randomColor

Generate random hexadecimal colors

> Support for custom color value ranges starting with version 5.17.0, which can be used to customize the generation of darker, lighter, warmer colors, etc.

- Since: `5.5.0`

- Arguments:

| Parameters | Description                             | Type                                   | Optional | Required | Default |
| ---------- | --------------------------------------- | -------------------------------------- | -------- | -------- | ------- |
| min        | the minimum value of the random numbers | `number` \/ `[number, number, number]` | -        | `false`  | -       |
| max        | the maximum value of the random numbers | `number` \/ `[number, number, number]` | -        | `false`  | -       |

- Returns: `string`

- Example:

```ts
randomColor()
// #bf444b

randomColor(200)
// #d6e9d7

randomColor(200, 255)
// #d3f9e4

randomColor([0, 0, 0], [255, 255, 255])
// #e2f2f3
```

- Types:

```ts
declare function randomColor(
  min?: number | [number, number, number],
  max?: number | [number, number, number]
): string
```

#### randomNumber

Get a random number

- Since: `5.0.0`

- Arguments:

| Parameters | Description                            | Type     | Optional | Required | Default |
| ---------- | -------------------------------------- | -------- | -------- | -------- | ------- |
| min        | the minimum value of the random number | `number` | -        | `false`  | 1       |
| max        | the maximum value of the random number | `number` | -        | `false`  | 10      |

- Returns: `number`

- Example:

```ts
randomNumber() // 8
randomNumber(0.1, 0.9) // 0.8
```

- Types:

```ts
declare function randomNumber(min?: number, max?: number): number
```

#### randomNumbers

Generate n random integers that sum to a fixed sum

- Since: `5.4.0`

- Arguments:

| Parameters | Description                         | Type      | Optional | Required | Default |
| ---------- | ----------------------------------- | --------- | -------- | -------- | ------- |
| n          | Number of generated integers        | `number`  | -        | `false`  | 1       |
| sum        | Sum of generated integers           | `number`  | -        | `false`  | 100     |
| noZero     | Generate integers that are not zero | `boolean` | -        | `false`  | `true`  |

- Returns: `Array<number>`

- Example:

```ts
randomNumbers()
// [8]

randomNumbers(4, 5)
// [1, 1, 2, 1]

randomNumbers(4, 5, false)
// [0, 1, 2, 2]
```

- Types:

```ts
declare function randomNumbers(n?: number, sum?: number): number[]
```

#### randomString

Get a random string

> v5.4.0 `widthSpecialChar` changed to `options`, still compatible with old usage, widthSpecialChar=true equivalent to { charTypes: ['uppercase', 'lowercase', 'number', 'special'] }

- Since: `5.0.0`

- Arguments:

| Parameters | Description                                               | Type                            | Optional | Required | Default                                               |
| ---------- | --------------------------------------------------------- | ------------------------------- | -------- | -------- | ----------------------------------------------------- |
| len        | the length of the random string that needs to be obtained | `number`                        | -        | `false`  | 32                                                    |
| options    | randomString options                                      | `RandomStringOptions` `boolean` | -        | `false`  | `{ charTypes: ['uppercase', 'lowercase', 'number'] }` |

- Returns: `string`

- Example:

```ts
// 1. No parameters are passed, a 32-bit (possibly) string containing upper and lower case letters and numbers is generated by default
randomString()
// PVSjz902EqYbmxaLtvDnggtnlvt5uFTZ

// 2. Generate a 16-bit random string
randomString(16)
// coTgZy0mqqMJ1sMM

// 3. Same effect as #2 above
randomString({
  length: 16
})
// ngCI5aPqJm84t90d

// 4. Generate containing special characters (old way of passing values, not recommended)
randomString(true)
// 0Uby@op3B-sK5]dHl4S|15As.OlHiNXd

// 5. Same effect as #4 above (recommended)
randomString({
  charTypes: ['uppercase', 'lowercase', 'number', 'special']
})
// m,2^vpkrE,F,DbcSFk0=vr&@DJ27j9XK

// 6. Same effect as #4 above, Limit string length to 16 bits
randomString(16, true)
// dXz[J_sYM^3d8fnA

// 7. Generate a 16-bit random number
randomString({
  length: 16,
  charTypes: 'number'
})
// 7450026301030286

// 8. Elimination of confusing characters: oOLl,9gq,Vv,Uu,I1
randomString({
  length: 16,
  noConfuse: true
})
// 8DEGna8ppC4mqyew

// 9. The generated random string must contain at least 1 character of each type of character specified, e.g. to generate a 16-bit password that must contain upper and lower case letters, numbers, and special characters.
randomString({
  length: 16,
  strict: true
})
// PFYAPD5KFqOHIADL
```

- Types:

```ts
declare function randomString(len?: number, options?: RandomStringOptions | boolean): string

declare function randomString(
  len?: RandomStringOptions | boolean,
  options?: RandomStringOptions | boolean
): string

declare type RandomStringCharType = 'uppercase' | 'lowercase' | 'number' | 'special'

declare interface RandomStringOptions {
  length?: number
  charTypes?: RandomStringCharType | ArrayOneMore<RandomStringCharType>
  /**
   * Elimination of confusing characters: oOLl,9gq,Vv,Uu,I1
   */
  noConfuse?: boolean
  /**
   * The generated random string must contain each of the listed character types
   */
  strict?: boolean
}
```

#### shuffle

shuffling algorithm, Reordering arrays or strings

- Since: `5.4.0`

- Arguments:

| Parameters | Description                | Type             | Optional | Required | Default |
| ---------- | -------------------------- | ---------------- | -------- | -------- | ------- |
| value      | arrays or strings          | `array` `string` | -        | `true`   | -       |
| size       | new array or string length | `number`         | -        | `false`  | -       |

- Returns: `array | string`

- Example:

```ts
const str = 'abcde'
const arr = [1, 2, 3]

shuffle(str)
// cdbse

shuffle(arr)
// [3, 1, 2]

shuffle(arr, 2)
// [3, 2]
```

- Types:

```ts
declare function shuffle(value: string, size?: number): string

declare function shuffle<T extends unknown[] = unknown[]>(value: T, size?: number): T
```

#### fingerprint

Generating Browser Fingerprints

- Since: `5.2.0`

- Arguments:

| Parameters | Description | Type     | Optional | Required | Default       |
| ---------- | ----------- | -------- | -------- | -------- | ------------- |
| domain     | key string  | `string` | -        | `false`  | location.host |

- Returns: `string`

- Example:

```ts
fingerprint('www.saqqdy.com') // wc7sWJJA8
```

- Types:

```ts
declare function fingerprint(domain?: string): string | null
```

#### getCHSLength

Get the length of the string, Chinese counts as 2 characters

- Since: `1.0.1`

- Arguments:

| Parameters | Description  | Type     | Optional | Required | Default |
| ---------- | ------------ | -------- | -------- | -------- | ------- |
| str        | input string | `string` | -        | `true`   | -       |

- Returns: `number`

- Example:

```ts
getCHSLength('测试') // 2
```

- Types:

```ts
declare function getCHSLength(str: string): number
```

#### cutCHSString

Intercept string, Chinese counts as 2 bytes

- Since: `1.0.1`

- Arguments:

| Parameters | Description                  | Type      | Optional | Required | Default |
| ---------- | ---------------------------- | --------- | -------- | -------- | ------- |
| str        | the string to be intercepted | `string`  | -        | `true`   | -       |
| len        | length                       | `number`  | -        | `false`  | -       |
| hasDot     | output with dot              | `boolean` | -        | `false`  | `false` |

- Returns: `string`

- Example:

```ts
cutCHSString('测试', 1) // 测
cutCHSString('测试', 1, true) // 测...
```

- Types:

```ts
declare function cutCHSString(str: string, len?: number, hasDot?: boolean): string
```

#### upperFirst

First letter capitalized

- Since: `1.0.1`

- Arguments:

| Parameters | Description                | Type     | Optional | Required | Default |
| ---------- | -------------------------- | -------- | -------- | -------- | ------- |
| string     | the string to be converted | `string` | -        | `true`   | -       |

- Returns: `string`

- Example:

```ts
upperFirst('saqqdy') // Saqqdy
```

- Types:

```ts
declare function upperFirst(string: string): string
```

### Determine

#### isDigitals

Determine if a string is a number

- Since: `1.0.1`

- Arguments:

| Parameters | Description             | Type     | Optional | Required | Default |
| ---------- | ----------------------- | -------- | -------- | -------- | ------- |
| str        | the string to be tested | `string` | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
isDigitals('2.11') // true
isDigitals('2.3x') // false
```

- Types:

```ts
declare function isDigitals(str: string): boolean
```

#### isExitsFunction

Determine if a function is defined

- Since: `1.0.1`

- Arguments:

| Parameters | Description   | Type     | Optional | Required | Default |
| ---------- | ------------- | -------- | -------- | -------- | ------- |
| name       | function name | `string` | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
isExitsFunction('test') // false
isExitsFunction('console.log') // true
```

- Types:

```ts
declare function isExitsFunction(name: string): boolean
```

#### isExitsVariable

Determine if a variable is defined

- Since: `1.0.1`

- Arguments:

| Parameters | Description   | Type     | Optional | Required | Default |
| ---------- | ------------- | -------- | -------- | -------- | ------- |
| name       | variable name | `string` | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
isExitsVariable('test') // false
isExitsVariable('window') // true
```

- Types:

```ts
declare function isExitsVariable(name: string): boolean
```

#### isEqual

Determine if 2 objects are equal

- Since: `5.12.0`

- Arguments:

| Parameters | Description | Type  | Optional | Required | Default |
| ---------- | ----------- | ----- | -------- | -------- | ------- |
| a          | source      | `any` | -        | `true`   | -       |
| b          | compare     | `any` | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
isEqual({ a: 22, b: {} }, { b: {}, a: 22 })
// true

isEqual([1, 2], [2, 1])
// false

isEqual(NaN, NaN)
// true
```

- Types:

```ts
declare function isEqual<T, P>(a: T, b: P): boolean
```

#### isWindow

Determine if window object

- Since: `5.0.0`

- Arguments:

| Parameters | Description | Type  | Optional | Required | Default |
| ---------- | ----------- | ----- | -------- | -------- | ------- |
| target     | any target  | `any` | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
isWindow({}) // false
isWindow(window) // true
```

- Types:

```ts
declare function isWindow<T = any>(target: T): target is Window
```

#### isPlainObject

Determine if target is an plain object

- Since: `5.0.0`

- Arguments:

| Parameters | Description | Type  | Optional | Required | Default |
| ---------- | ----------- | ----- | -------- | -------- | ------- |
| target     | any target  | `any` | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
isPlainObject({}) // true
isPlainObject(window) // false
```

- Types:

```ts
type Primitive = bigint | boolean | null | number | string | symbol | undefined

type JSONValue = Primitive | PlainObject | JSONArray

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface PlainObject {
  [key: string]: JSONValue
}

interface JSONArray extends Array<JSONValue> {}

declare function isPlainObject(target: unknown): target is PlainObject
```

#### isDarkMode

Determine if dark color mode

- Since: `5.5.0`

- Arguments: none

- Returns: `boolean`

- Example:

```ts
isDarkMode() // false
```

- Types:

```ts
declare function isDarkMode(): boolean
```

#### isObject

Determine if target is an object

- Since: `5.0.0`

- Arguments:

| Parameters | Description | Type  | Optional | Required | Default |
| ---------- | ----------- | ----- | -------- | -------- | ------- |
| target     | any target  | `any` | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
isObject({}) // true
```

- Types:

```ts
declare function isObject<T = any>(target: T): target is Object
```

#### isDate

Determine if target is Date

- Since: `5.15.0`

- Arguments:

| Parameters | Description | Type  | Optional | Required | Default |
| ---------- | ----------- | ----- | -------- | -------- | ------- |
| target     | any target  | `any` | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
const now = new Date()

isDate(now)
// true
```

- Types:

```ts
declare function isDate<T = any>(target: T): target is Date
```

#### isRegExp

Determine if target is RegExp

- Since: `5.15.0`

- Arguments:

| Parameters | Description | Type  | Optional | Required | Default |
| ---------- | ----------- | ----- | -------- | -------- | ------- |
| target     | any target  | `any` | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
isRegExp(/\d/) // true
```

- Types:

```ts
declare function isRegExp<T = any>(target: T): target is RegExp
```

#### isArray

Determine if it is an array

- Since: `1.0.2`

- Arguments:

| Parameters | Description | Type  | Optional | Required | Default |
| ---------- | ----------- | ----- | -------- | -------- | ------- |
| target     | any target  | `any` | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
isArray([]) // true
```

- Types:

```ts
declare function isIterable(target: any): target is any[]
```

#### isIterable

Determine if it is iterable

- Since: `5.7.0`

- Arguments:

| Parameters | Description | Type  | Optional | Required | Default |
| ---------- | ----------- | ----- | -------- | -------- | ------- |
| target     | any target  | `any` | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
isIterable([]) // true
```

- Types:

```ts
declare function isIterable<T = any>(target: T | Iterable<T>): target is Iterable<T>
```

#### inBrowser

Determine if it is running on the browser side

- Since: `4.5.0`

- Arguments: `none`

- Returns: `boolean`

- Example:

```ts
function test() {
  if (!inBrowser) return null
  // ...
}
```

- Types:

```ts
declare const inBrowser: boolean
```

#### inNodeJs

Determine if it is running on node.js

- Since: `5.13.0`

- Arguments: `none`

- Returns: `boolean`

- Example:

```ts
if (inNodeJs) {
  //
}
```

- Types:

```ts
declare const inNodeJs: boolean
```

#### windowSize

Get the window size

- Since: `1.0.1`

- Arguments: `none`

- Returns: `{ width, height }`

- Example:

```ts
windowSize()
// { width: 1280, height: 800 }
```

- Types:

```ts
declare interface WindowSizeObj {
  width: number
  height: number
}

declare function windowSize(): WindowSizeObj
```

#### getAppVersion

Get the APP version number

> deprecated please use 'appVersion' instead

- Since: `1.0.1`

- Arguments:

| Parameters | Description                                 | Type      | Optional | Required | Default               |
| ---------- | ------------------------------------------- | --------- | -------- | -------- | --------------------- |
| appName    | app name                                    | `string`  | -        | `true`   | -                     |
| withApp    | whether to bring the name                   | `boolean` | -        | `false`  | -                     |
| userAgent  | ua or any ua like string, may not be passed | `string`  | -        | `false`  | `navigator.userAgent` |

- Returns: `string | boolean | null`

- Example:

```ts
// navigator.userAgent => '5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 AppName/1.0.0-beta.8'

getAppVersion('Chrome') // 114.0.0.0
getAppVersion('Safari', true) // Safari/537.36
```

- Types:

```ts
declare function getAppVersion(
  appName: string,
  withApp?: boolean,
  userAgent?: string
): string | boolean | null
```

#### appVersion

Get the app version number

- Since: `5.1.0`

- Arguments:

| Parameters | Description                                 | Type      | Optional       | Required | Default             |
| ---------- | ------------------------------------------- | --------- | -------------- | -------- | ------------------- |
| appName    | app name                                    | `string`  | -              | `true`   | -                   |
| ua         | ua or any ua like string, may not be passed | `string`  | -              | `false`  | navigator.userAgent |
| ignoreCase | whether to ignore case                      | `boolean` | `true`/`false` | `false`  | `true`              |

- Returns: `string | null`

- Example:

```ts
// navigator.userAgent => '5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 AppName/1.0.0-beta.8'

appVersion('Chrome') // 114.0.0.0
appVersion('Safari') // 537.36
appVersion('appname', false) // null
appVersion('appname') // 1.0.0-beta.8
```

- Types:

```ts
declare function appVersion(appName: string): string | null
declare function appVersion(appName: string, ua: string): string | null
declare function appVersion(appName: string, ua: boolean): string | null
declare function appVersion(appName: string, ua: string, ignoreCase: boolean): string | null
```

#### getOsVersion

Get the phone system version

> deprecated: please use 'osVersion' instead

- Since: `1.0.1`

- Arguments:

| Parameters | Description                                        | Type     | Optional | Required | Default               |
| ---------- | -------------------------------------------------- | -------- | -------- | -------- | --------------------- |
| osName     | system type string Android, iPod, iWatch or iPhone | `string` | -        | `true`   | -                     |
| withOS     | whether to bring the name                          | `string` | -        | `false`  | -                     |
| userAgent  | ua or any ua like string, may not be passed        | `string` | -        | `false`  | `navigator.userAgent` |

- Returns: `string | boolean | null`

- Example:

```ts
getOsVersion('iPhone')
// '13.2.3'

getOsVersion('iPhone', true)
// 'iPhone/13.2.3'
```

- Types:

```ts
declare function getOsVersion(
  osName: string,
  withOS?: boolean,
  userAgent?: string
): string | boolean | null
```

#### osVersion

get the system version

- Since: `5.1.0`

- Arguments:

| Parameters | Description                                 | Type     | Optional | Required | Default             |
| ---------- | ------------------------------------------- | -------- | -------- | -------- | ------------------- |
| ua         | ua or any ua like string, may not be passed | `string` | -        | `false`  | navigator.userAgent |

- Returns: `OsVersion | null`

- Example:

```ts
// ipad => 'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1'
osVersion() // \{ name: 'iOS', version: '13.3' \}
// iphone => 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
osVersion() // \{ name: 'iOS', version: '13.2.3' \}
//  mac os => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
osVersion() // \{ name: 'MacOS', version: '10.15.7' \}
// windows => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
osVersion() // \{ name: 'Windows', version: '10.0' \}
// windows xp => 'Mozilla/5.0 (Windows NT 5.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
osVersion() // \{ name: 'Windows', version: 'XP' \}
// windows phone => 'Mozilla/5.0 (Windows Phone OS 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36'
osVersion() // \{ name: 'WindowsPhone', version: '10.0' \}
```

- Types:

```ts
declare interface OsVersion {
  name: 'Windows' | 'MacOS' | 'Android' | 'iOS' | 'WindowsPhone' | 'Debian' | 'WebOS'
  version: string
}

declare function osVersion(ua?: string): OsVersion | null
```

#### browserVersion

Get the browser name and version

- Since: `5.2.0`

- Arguments:

| Parameters | Description                                 | Type     | Optional | Required | Default             |
| ---------- | ------------------------------------------- | -------- | -------- | -------- | ------------------- |
| ua         | ua or any ua like string, may not be passed | `string` | -        | `false`  | navigator.userAgent |

- Returns: `BrowserVersion | null`

- Example:

```ts
// Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36
browserVersion() // \{ name: 'Chrome', version: '114.0.0.0' \}
```

- Types:

```ts
declare interface BrowserVersion {
  name: 'Windows' | 'MacOS' | 'Android' | 'iOS' | 'WindowsPhone' | 'Debian' | 'WebOS'
  version: string
}

declare function browserVersion(ua?: string): BrowserVersion | null
```

#### compareVersion

> v5.8.0 support compare tag version

Version number size comparison, tag version: `rc` > `beta` > `alpha` > `other`

- Since: `4.7.0`

- Arguments:

| Parameters | Description     | Type     | Optional | Required | Default |
| ---------- | --------------- | -------- | -------- | -------- | ------- |
| input      | input version   | `string` | -        | `true`   | -       |
| compare    | compare version | `string` | -        | `true`   | -       |

- Returns: `0 | 1 | -1`

- Example:

```ts
compareVersion('1.11.0', '1.9.9')
// => 1: 1=Version 1.11.0 is newer than 1.9.9

compareVersion('1.11.0', '1.11.0')
// => 0: 0=Versions 1.11.0 and 1.11.0 are the same

compareVersion('1.11.0', '1.99.0')
// => -1: -1=Version 1.11.0 is older than 1.99.0

compareVersion('1.0.0.0.0.10', '1.0')
// => -1

// compare tag version: rc > beta > alpha > other
compareVersion('1.11.0', '1.11.0-beta.1')
// => -1

compareVersion('1.11.0-beta.1', '1.11.0')
// => -1

compareVersion('1.11.0-beta.10', '1.11.0-beta.10')
// => 0

compareVersion('1.11.0-alpha.10', '1.11.0-beta.1')
// => -1

compareVersion('1.11.0-alpha.10', '1.11.0-rc.1')
// => -1

compareVersion('1.11.0-tag.10', '1.11.0-alpha.1')
// => -1

compareVersion('1.11.0-tag.10', '1.11.0-tag.1')
// => 1

compareVersion('1.11.0-release.10', '1.11.0-tag.1')
// => 1
```

- Types:

```ts
declare function compareVersion(input: string, compare: string): 0 | 1 | -1
```

#### parseUrlParam

parse url params. (If covert is passed true: Scientific notation, binary, octal and hexadecimal types of data are not converted, like: 0b111, 0o13, 0xFF, 1e3, -1e-2)

- Since: `5.0.0`

- Arguments:

| Parameters | Description                                         | Type      | Optional       | Required | Default |
| ---------- | --------------------------------------------------- | --------- | -------------- | -------- | ------- |
| url        | url string (like: ?key1=value1&key2=value2)         | `string`  | -              | `true`   | -       |
| covert     | Converts a specific string to a corresponding value | `boolean` | `true`/`false` | `false`  | `false` |

- Returns: `object`

- Example:

```ts
parseUrlParam(
  '?key1=100&key2=true&key3=null&key4=undefined&key5=NaN&key6=10.888&key7=Infinity&key8=test'
)
// \{"key1":"100","key2":"true","key3":"null","key4":"undefined","key5":"NaN","key6":"10.888","key7":"Infinity","key8":"test"\}

parseUrlParam(
  '?key1=100&key2=true&key3=null&key4=undefined&key5=NaN&key6=10.888&key7=Infinity&key8=test',
  true
)
// \{"key1":100,"key2":true,"key3":null,"key5":NaN,"key6":10.888,"key7":Infinity,"key8":"test"\}
```

- Types:

```ts
declare function parseUrlParam(url: string, covert?: boolean): Record<string, unknown>
```

#### spliceUrlParam

Splice URL parameters (single layer only)

- Since: `5.3.0`

- Arguments:

| Parameters        | Description                                                    | Type      | Optional       | Required | Default |
| ----------------- | -------------------------------------------------------------- | --------- | -------------- | -------- | ------- |
| params            | json object                                                    | `object`  | -              | `true`   | -       |
| covert            | Convert a null value type (null/undefined/) to an empty string | `boolean` | `true`/`false` | `false`  | `false` |
| withQuestionsMark | Splicing a question mark                                       | `boolean` | `true`/`false` | `false`  | `true`  |

- Returns: `string`

- Example:

```ts
spliceUrlParam({ key1: '100', key2: 'true', key3: 'null', key4: 'undefined', key4: '测试' })
// ?key1=100&key2=true&key3=null&key4=undefined&key5=%E6%B5%8B%E8%AF%95

spliceUrlParam({ key1: '100', key2: 'true', key3: 'null', key4: 'undefined' }, true)
// ?key1=100&key2=true&key3=&key4=

spliceUrlParam({ key1: '100', key2: 'true', key3: 'null', key4: 'undefined' }, true, false)
// key1=100&key2=true&key3=&key4=
```

- Types:

```ts
declare function spliceUrlParam(
  params: Record<string, unknown>,
  covert?: boolean,
  withQuestionsMark?: boolean
): string | null
```

#### safeParse

Secure parsing of JSON strings

> support BigInt since `v5.17.1`

- Since: `5.16.0`

- Arguments:

| Parameters | Description             | Type      | Optional       | Required | Default |
| ---------- | ----------------------- | --------- | -------------- | -------- | ------- |
| data       | JSON string             | `string`  | -              | `true`   | -       |
| covert     | Whether to convert data | `boolean` | `true`/`false` | `false`  | `true`  |

- Returns: `Object`

- Example:

```ts
safeParse('100')
// 100

safeParse('{"a":"undefined","b":"NaN","c":"Infinity","d":"9007199254740993"}')
// { b: NaN, c: Infinity, d: 9007199254740993n }
```

- Types:

```ts
declare function safeParse(data: string, covert?: boolean): any
```

#### safeStringify

Secure stringify of JSON Object

> support BigInt since `v5.17.1`

- Since: `5.16.0`

- Arguments:

| Parameters | Description             | Type      | Optional       | Required | Default |
| ---------- | ----------------------- | --------- | -------------- | -------- | ------- |
| data       | JSON Object             | `any`     | -              | `true`   | -       |
| covert     | Whether to convert data | `boolean` | `true`/`false` | `false`  | `true`  |

- Returns: `string`

- Example:

```ts
safeStringify(100)
// "100"

safeStringify(undefined)
// "undefined"

safeStringify(NaN)
// "NaN"

safeStringify(Infinity)
// "Infinity"

safeStringify({ a: undefined, b: NaN, c: Infinity, d: BigInt(Number.MAX_SAFE_INTEGER) + 2n })
// {"a":"undefined","b":"NaN","c":"Infinity","d":"9007199254740993"}
```

- Types:

```ts
declare function safeStringify(data: any, covert?: boolean): string
```

#### getDirParam

Get the URL parameter in the form of a directory

> It will be refactored and renamed getDirParams in the next major release.

- Since: `1.0.1`

- Arguments:

| Parameters | Description | Type     | Optional | Required | Default |
| ---------- | ----------- | -------- | -------- | -------- | ------- |
| url        | http url    | `object` | -        | `true`   | -       |

- Returns: `object`

- Example:

```ts
//
```

- Types:

```ts
declare interface DirParamType {
  path?: string[]
  host?: string
}

declare function getDirParam(url: string): DirParamType
```

#### getQueryParam

Get a single query parameter (behind "#")

- Since: `5.0.0`

- Arguments:

| Parameters | Description            | Type     | Optional | Required | Default         |
| ---------- | ---------------------- | -------- | -------- | -------- | --------------- |
| key        | key name               | `string` | -        | `true`   | -               |
| url        | pass in the url string | `string` | -        | `false`  | `location.href` |

- Returns: `string`

- Example:

```ts
getQueryParam('key1')
// key1 => xxx

getQueryParam('key1', 'https://test.com?key1=100#/home?key1=200')
// key1 => 200
```

- Types:

```ts
declare function getQueryParam(key: string): string | undefined

declare function getQueryParam(key: string, url: string): string | undefined
```

#### getQueryParams

Get all query parameters (behind "#"). (If covert is passed true: Scientific notation, binary, octal and hexadecimal types of data are not converted, like: 0b111, 0o13, 0xFF, 1e3, -1e-2)

- Since: `5.0.0`

- Arguments:

| Parameters | Description                                         | Type      | Optional       | Required | Default         |
| ---------- | --------------------------------------------------- | --------- | -------------- | -------- | --------------- |
| url        | pass in the url string                              | `string`  | -              | `false`  | `location.href` |
| covert     | Converts a specific string to a corresponding value | `boolean` | `true`/`false` | `false`  | `false`         |

- Returns: `object`

- Example:

```ts
getQueryParams('https://test.com?key1=100#/home?key1=200')
// \{"key1":"200"\}

getQueryParams('https://test.com?key1=100#/home?key1=200', true)
// \{"key1":200\}

getQueryParams(true)
// \{"key1":200\}
```

- Types:

```ts
declare function getQueryParams(url?: string, covert?: boolean): Record<string, unknown> | null
```

#### getUrlParam

Get a single URL parameter (from the "location.search", before "#")

- Since: `5.0.0`

- Arguments:

| Parameters | Description            | Type     | Optional | Required | Default         |
| ---------- | ---------------------- | -------- | -------- | -------- | --------------- |
| key        | key name               | `string` | -        | `true`   | -               |
| url        | pass in the url string | `string` | -        | `false`  | `location.href` |

- Returns: `string`

- Example:

```ts
getUrlParam('key1')
// key1 => xxx

getUrlParam('key1', 'https://test.com?key1=100#/home?key1=200')
// key1 => 100
```

- Types:

```ts
declare function getUrlParam(key: string): string | undefined

declare function getUrlParam(key: string, url: string): string | undefined
```

#### getUrlParams

Get all URL parameters (from the "location.search", before "#"). (If covert is passed true: Scientific notation, binary, octal and hexadecimal types of data are not converted, like: 0b111, 0o13, 0xFF, 1e3, -1e-2)

- Since: `5.0.0`

- Arguments:

| Parameters | Description                                         | Type      | Optional       | Required | Default         |
| ---------- | --------------------------------------------------- | --------- | -------------- | -------- | --------------- |
| url        | pass in the url string                              | `string`  | -              | `false`  | `location.href` |
| covert     | Converts a specific string to a corresponding value | `boolean` | `true`/`false` | `false`  | `false`         |

- Returns: `object`

- Example:

```ts
getUrlParams('https://test.com?key1=100#/home?key1=200')
// \{"key1":"100"\}

getUrlParams('https://test.com?key1=100#/home?key1=200', true)
// \{"key1":100\}

getUrlParams(true)
// \{"key1":100\}
```

- Types:

```ts
declare function getUrlParams(url?: string, covert?: boolean): Record<string, unknown> | null
```

### localStorage & sessionStorage & Cookie

#### getCache

Get the cache, if the deposited is Object, the retrieved is also Object, no need to convert again

- Since: `1.0.2`

- Arguments:

| Parameters | Description    | Type     | Optional | Required | Default |
| ---------- | -------------- | -------- | -------- | -------- | ------- |
| name       | cache key name | `string` | -        | `true`   | -       |

- Returns: `any`

- Example:

```ts
import { getCache, setCache } from 'js-cool'

const data1 = 100
const data2 = { a: 10 }
const data3 = null

setCache('data1', data1)
setCache('data2', data2)
setCache('data3', data3)

getCache('data1') // 100
getCache('data2') // {a:10}
getCache('data3') // null

getCache('data4') // null
```

- Types:

```ts
declare function getCache(name: string): any
```

#### setCache

Set the cache, if the deposited is Object, the retrieved is also Object, no need to convert again

- Since: `1.0.2`

- Arguments:

| Parameters | Description                                    | Type     | Optional | Required | Default |
| ---------- | ---------------------------------------------- | -------- | -------- | -------- | ------- |
| name       | cache key name                                 | `string` | -        | `true`   | -       |
| value      | cache data, can be passed directly into Object | `any`    | -        | `true`   | -       |
| seconds    | cache time (seconds)                           | `number` | -        | `false`  | -       |

- Returns: `void`

- Example:

```ts
import { getCache, setCache } from 'js-cool'

const data1 = 100
const data2 = { a: 10 }
const data3 = null

setCache('data1', data1)
setCache('data2', data2, 10)

getCache('data1') // 100
getCache('data2') // {a:10}

setTimeout(() => {
  getCache('data2') // null
}, 15000)
```

- Types:

```ts
declare function setCache<T = unknown>(name: string, value: T, seconds?: number | string): void
```

#### delCache

Delete localStorage

- Since: `1.0.2`

- Arguments:

| Parameters | Description    | Type     | Optional | Required | Default |
| ---------- | -------------- | -------- | -------- | -------- | ------- |
| name       | cache key name | `string` | -        | `true`   | -       |

- Returns: `void`

- Example:

```ts
delCache('data')
```

- Types:

```ts
declare function delCache(name: string): void
```

#### getSession

Get the session, if the deposited is Object, the retrieved is also Object, no need to convert again

- Since: `1.0.2`

- Arguments:

| Parameters | Description      | Type     | Optional | Required | Default |
| ---------- | ---------------- | -------- | -------- | -------- | ------- |
| name       | session key name | `string` | -        | `true`   | -       |

- Returns: `any`

- Example:

```ts
const data1 = 100
const data2 = { a: 10 }
const data3 = null

setSession('data1', data1)
setSession('data2', data2)
setSession('data3', data3)

getSession('data1') // 100
getSession('data2') // {a:10}
getSession('data3') // null

getSession('data4') // null
```

- Types:

```ts
declare function getSession(name: string): any
```

#### setSession

Set the session, if the deposited is Object, the retrieved is also Object, no need to convert again

- Since: `1.0.2`

- Arguments:

| Parameters | Description                                      | Type     | Optional | Required | Default |
| ---------- | ------------------------------------------------ | -------- | -------- | -------- | ------- |
| name       | session key name                                 | `string` | -        | `true`   | -       |
| value      | session data, can be passed directly into Object | `any`    | -        | `true`   | -       |
| seconds    | session time (seconds)                           | `number` | -        | `false`  | -       |

- Returns: `void`

- Example:

```ts
import { getSession, setSession } from 'js-cool'

const data1 = 100
const data2 = { a: 10 }
const data3 = null

setSession('data1', data1)
setSession('data2', data2, 10)

getSession('data1') // 100
getSession('data2') // {a:10}

setTimeout(() => {
  getSession('data2') // null
}, 15000)
```

- Types:

```ts
declare function setSession<T = unknown>(name: string, value: T, seconds?: number | string): void
```

#### delSession

Delete sessionStorage

- Since: `1.0.2`

- Arguments:

| Parameters | Description      | Type     | Optional | Required | Default |
| ---------- | ---------------- | -------- | -------- | -------- | ------- |
| name       | session key name | `string` | -        | `true`   | -       |

- Returns: `void`

- Example:

```ts
delSession('data')
```

- Types:

```ts
declare function delSession(name: string): void
```

#### getCookie

Get cookie by name

- Since: `1.0.2`

- Arguments:

| Parameters | Description     | Type     | Optional | Required | Default |
| ---------- | --------------- | -------- | -------- | -------- | ------- |
| name       | cookie key name | `string` | -        | `true`   | -       |

- Returns: `any`

- Example:

```ts
getCookie('data1') // 100
```

- Types:

```ts
declare function getCookie(name: string): string
```

#### getCookies

Get all cookies

- Since: `5.6.0`

- Arguments: 'none'

- Returns: `object`

- Example:

```ts
getCookies()
// { token: 'xxx', name: 'saqqdy' }
```

- Types:

```ts
declare function getCookies(): Record<string, string>
```

#### setCookie

Set cookie

- Since: `1.0.2`

- Arguments:

| Parameters | Description                                     | Type     | Optional               | Required | Default |
| ---------- | ----------------------------------------------- | -------- | ---------------------- | -------- | ------- |
| name       | cookie key name                                 | `string` | -                      | `true`   | -       |
| value      | cookie data, can be passed directly into Object | `any`    | -                      | `true`   | -       |
| seconds    | cookie time (seconds)                           | `number` | -                      | `false`  | -       |
| path       | cookie path                                     | `string` | -                      | `false`  | `/`     |
| samesite   | SameSite type                                   | `string` | `Strict`/`Lax` /`None` | `false`  | `None`  |

- Returns: `void`

- Example:

```ts
import { getCookie, setCookie } from 'js-cool'

const data1 = 100
const data2 = 200

setCookie('data1', data1)
setCookie('data2', data2, 10)

getCookie('data1') // 100
getCookie('data2') // 200

setTimeout(() => {
  getCookie('data2') // null
}, 15000)
```

- Types:

```ts
declare function setCookie<T extends string | number | boolean>(
  name: string,
  value: T,
  seconds: string | number,
  path?: string,
  samesite?: boolean
): void
```

#### delCookie

Delete cookie

- Since: `1.0.2`

- Arguments:

| Parameters | Description     | Type     | Optional | Required | Default |
| ---------- | --------------- | -------- | -------- | -------- | ------- |
| name       | cookie key name | `string` | -        | `true`   | -       |

- Returns: `void`

- Example:

```ts
delCookie('data')
```

- Types:

```ts
declare function delCookie(name: string): void
```

### Base64 & UTF8

#### encodeBase64

convert strings, numbers to base64

- Since: `1.0.1`

- Arguments:

| Parameters | Description              | Type              | Optional | Required | Default |
| ---------- | ------------------------ | ----------------- | -------- | -------- | ------- |
| input      | the string to be encoded | `string`/`number` | -        | `true`   | -       |

- Returns: `void`

- Example:

```ts
encodeBase64('data')
```

- Types:

```ts
declare function encodeBase64(name: string): string
```

#### decodeBase64

base64 decoding

- Since: `1.0.1`

- Arguments:

| Parameters | Description              | Type              | Optional | Required | Default |
| ---------- | ------------------------ | ----------------- | -------- | -------- | ------- |
| input      | the string to be decoded | `string`/`number` | -        | `true`   | -       |

- Returns: `void`

- Example:

```ts
decodeBase64('data')
```

- Types:

```ts
declare function decodeBase64(name: string): string
```

#### encodeUtf8

convert strings, numbers to utf8

- Since: `1.0.1`

- Arguments:

| Parameters | Description              | Type              | Optional | Required | Default |
| ---------- | ------------------------ | ----------------- | -------- | -------- | ------- |
| input      | the string to be encoded | `string`/`number` | -        | `true`   | -       |

- Returns: `void`

- Example:

```ts
encodeUtf8('data')
```

- Types:

```ts
declare function encodeUtf8(name: string): string
```

#### decodeUtf8

utf8 decoding

- Since: `1.0.1`

- Arguments:

| Parameters | Description              | Type              | Optional | Required | Default |
| ---------- | ------------------------ | ----------------- | -------- | -------- | ------- |
| input      | the string to be decoded | `string`/`number` | -        | `true`   | -       |

- Returns: `void`

- Example:

```ts
decodeUtf8('data')
```

- Types:

```ts
declare function decodeUtf8(name: string): string
```

### Events

#### stopBubble

stop bubbling

- Since: `1.0.2`

- Arguments:

| Parameters | Description        | Type    | Optional | Required | Default |
| ---------- | ------------------ | ------- | -------- | -------- | ------- |
| e          | dom's event object | `Event` | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
stopBubble(event)
```

- Types:

```ts
declare function stopBubble(e: Event): boolean
```

#### stopDefault

stop default events

- Since: `1.0.2`

- Arguments:

| Parameters | Description        | Type    | Optional | Required | Default |
| ---------- | ------------------ | ------- | -------- | -------- | ------- |
| e          | dom's event object | `Event` | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
stopDefault(event)
```

- Types:

```ts
declare function stopDefault(e: Event): boolean
```

#### addEvent

event delegate, support multiple delegates

- Since: `1.0.2`

- Arguments:

| Parameters | Description                              | Type          | Optional | Required | Default |
| ---------- | ---------------------------------------- | ------------- | -------- | -------- | ------- |
| element    | js dom object                            | `HTMLElement` | -        | `true`   | -       |
| type       | The type of the event. No need to add on | `string`      | -        | `true`   | -       |
| handler    | Callback method                          | `function`    | -        | `true`   | -       |

- Returns: `void`

- Example:

```ts
addEvent(document, 'click', functionName)
```

- Types:

```ts
declare function addEvent(element: AnyObject, type: string, handler: AnyFunction): void
```

#### removeEvent

removeEvent removes the event delegate created by addEvent

- Since: `1.0.2`

- Arguments:

| Parameters | Description                              | Type          | Optional | Required | Default |
| ---------- | ---------------------------------------- | ------------- | -------- | -------- | ------- |
| element    | js dom object                            | `HTMLElement` | -        | `true`   | -       |
| type       | The type of the event. No need to add on | `string`      | -        | `true`   | -       |
| handler    | Callback method                          | `function`    | -        | `true`   | -       |

- Returns: `void`

- Example:

```ts
removeEvent(document, 'click', functionName)
```

- Types:

```ts
declare function removeEvent(element: AnyObject, type: string, handler: AnyFunction): void
```

#### getScrollPosition

Get slide to top and bottom return 'top' 'bottom', recommend using limit flow

- Since: `1.0.2`

- Arguments: `none`

- Returns: 'top' | 'bottom' | undefined

- Example:

```ts
getScrollPosition() // ‘bottom’
```

- Types:

```ts
declare function getScrollPosition(): string | void
```

### Utilities

#### nextIndex

return the next zIndex value

> change mix defaults to 0

- Since: `1.0.2`

- Arguments:

| Parameters | Description   | Type     | Optional | Required | Default |
| ---------- | ------------- | -------- | -------- | -------- | ------- |
| min        | minimum value | `number` | -        | `false`  | `0`     |
| max        | maximum value | `number` | -        | `false`  | -       |

- Returns: `number`

- Example:

```ts
nextIndex() // 1

nextIndex(1000) // 1001

nextIndex(10, 100) // 100
```

- Types:

```ts
declare function nextIndex(min?: number, max?: number): number
```

#### nextVersion

return the next version, **Only version types with no more than 3 digits are supported**. (Follow the npm version rules)

- Since: `5.10.0`

- Arguments:

| Parameters | Description          | Type                                                                                    | Optional | Required | Default |
| ---------- | -------------------- | --------------------------------------------------------------------------------------- | -------- | -------- | ------- |
| version    | version(like: 1.0.0) | `string`                                                                                | -        | `true`   | -       |
| type       | version type         | `major` \| `minor` \| `patch` \| `premajor` \| `preminor` \| `prepatch` \| `prerelease` | -        | `false`  | `patch` |
| preid      | prerelease id        | `string`                                                                                | -        | `false`  | ''      |

- Returns: `string`

- Example:

```ts
nextVersion('1.2.33') // 1.2.34

nextVersion('1.2.33', 'major') // 2.0.0

nextVersion('1.2.33', 'premajor', 'alpha') // 2.0.0-alpha.1
```

- Types:

```ts
declare function nextVersion(
  version: string,
  type?: 'major' | 'minor' | 'patch' | 'premajor' | 'preminor' | 'prepatch' | 'prerelease',
  preid?: string
): string
```

#### punctualTimer

punctual setInterval

- Since: `5.18.0`

- Arguments:

| Parameters | Description                                                                                                                                                                                                                          | Type       | Optional | Required | Default |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | -------- | -------- | ------- |
| handler    | A function to be executed after the timer expires.                                                                                                                                                                                   | `function` | -        | `true`   | -       |
| delay      | The time, in milliseconds that the timer should wait before the specified function or code is executed. If this parameter is omitted, a value of 0 is used, meaning execute "immediately", or more accurately, the next event cycle. | `number`   | -        | `true`   | -       |
| ...args    | Additional arguments which are passed through to the function specified by handler.                                                                                                                                                  | `any[]`    | -        | `false`  | -       |

- Returns: `void`

- Example:

```ts
const printDate = () => console.log(new Date())
punctualTimer(printDate, 1000)
```

- Types:

```ts
declare function punctualTimer<TArgs extends any[]>(
  handler: (args: void) => void,
  delay: number,
  [...args]?: TArgs
): void
declare function punctualTimer<TArgs extends any[]>(
  handler: (...args: TArgs) => void,
  delay: number,
  [...args]?: TArgs
): void
```

#### promiseFactory

Convert an object to a promise like api

- Since: `5.10.0`

- Arguments:

| Parameters | Description       | Type       | Optional | Required | Default |
| ---------- | ----------------- | ---------- | -------- | -------- | ------- |
| original   | original object   | `object`   | -        | `true`   | -       |
| resolver   | resolver function | `Function` | -        | `true`   | -       |

- Returns: `T & PromiseLike<T>`

- Example:

```ts
import { promiseFactory, waiting } from 'js-cool'

function promise() {
  const stats = {
    value: 100
  }

  const resolver = () =>
    new Promise(resolve =>
      waiting(2000).then(() => {
        stats.value = 200
        resolve(stats)
      })
    )

  return promiseFactory(stats, resolver)
}

const res = promise()
// res => 100
const res = await promise()
// res => 200
```

- Types:

```ts
declare function promiseFactory<T extends object>(
  original: T,
  resolver: () => Promise<any>
): T & PromiseLike<T>
```

#### fixNumber

truncate a few decimal places, not 0 for shortage

- Since: `1.0.2`

- Arguments:

| Parameters | Description                          | Type              | Optional | Required | Default |
| ---------- | ------------------------------------ | ----------------- | -------- | -------- | ------- |
| number     | the number of digits to be processed | `number`/`string` | -        | `true`   | -       |
| n          | the number of decimal places to keep | `number`          | -        | `false`  | `2`     |

- Returns: `string | number`

- Example:

```ts
fixNumber('100.888')
// 100.88

fixNumber('100.8', 2)
// 100.8

fixNumber('100.8888', 3)
// 100.888
```

- Types:

```ts
declare function fixNumber(number: string | number, n?: number): number
```

#### mapTemplate

Replacing specific data in a template string, support `${xxxx}` `{{xxxx}}` and `{xxxx}`

- Since: `5.9.0`

- Arguments:

| Parameters | Description                   | Type                  | Optional | Required | Default |
| ---------- | ----------------------------- | --------------------- | -------- | -------- | ------- |
| tmp        | Template string               | `string`              | -        | `true`   | -       |
| data       | Template data of map function | `Function`\| `Object` | -        | `true`   | -       |

- Returns: `string`

- Example:

```ts
const tmp = "My name is ${name}, I'm ${age} years old."
mapTemplate(tmp, {
  name: 'saqqdy',
  age: 18
})
// My name is saqqdy, I'm 18 years old.

mapTemplate(tmp, key => ({ name: 'saqqdy', age: 28 })[key])
// My name is saqqdy, I'm 28 years old.

const tmp1 = "My name is {{name}}, I'm {{age}} years old."
mapTemplate(tmp1, {
  name: 'saqqdy',
  age: 18
})
// My name is saqqdy, I'm 18 years old.
```

- Types:

```ts
declare function mapTemplate(
  tmp: string,
  data: ((value: string) => unknown) | Record<string, unknown>
): string
```

#### extend

deep copy & merge objects

- Since: `1.0.2`

- Arguments:

| Parameters | Description                | Type                                 | Optional | Required | Default |
| ---------- | -------------------------- | ------------------------------------ | -------- | -------- | ------- |
| target     | boolean or array or object | `boolean`/`ArrayOneMore<ExtendData>` | -        | `true`   | -       |
| ...args    | array or object            | `ArrayOneMore<ExtendData>`           | -        | `true`   | -       |

- Returns: `array | object`

- Example:

```ts
extend(true, {}, {})
```

- Types:

```ts
declare function extend(
  target: ExtendObjectData,
  ...args: ArrayOneMore<ExtendObjectData>
): ExtendObjectData

declare function extend(target: boolean, ...args: ArrayOneMore<ExtendObjectData>): ExtendObjectData

declare function extend(
  target: ExtendArrayData,
  ...args: ArrayOneMore<ExtendArrayData>
): ExtendArrayData

declare function extend(target: boolean, ...args: ArrayOneMore<ExtendArrayData>): ExtendArrayData

declare type ExtendArrayData = any[]

declare type ExtendData = ExtendArrayData | ExtendObjectData

declare type ExtendObjectData = Record<string, any>
```

#### clone

deep copy (Buffer, Promise, Set, Map are not supported)

- Since: `5.15.0`

- Arguments:

| Parameters | Description   | Type  | Optional | Required | Default |
| ---------- | ------------- | ----- | -------- | -------- | ------- |
| source     | source object | `any` | -        | `true`   | -       |

- Returns: `object`

- Example:

```ts
const source = { a: 100, reg: /\d+/g, arr: [1, 2] }
const res = clone(source)
// { a: 100, reg: /\d+/g, arr: [1, 2] }
```

- Types:

```ts
declare function clone<T = any>(parent: T): T
```

#### delay

anti-dither throttling

- Since: `1.0.2`

- Arguments: `none`

- Returns: `void`

- Example:

```ts
const delay = new Delay()

delay.register('key', () => {
  //
})
```

- Types:

```ts
declare function delay(): {
  map: any
  register(id: string, fn: AnyFunction, time: number, boo: boolean): void
  destroy(id: string): void
}
```

#### getType

Get the target type

- Since: `1.0.2`

- Arguments:

| Parameters | Description | Type  | Optional | Required | Default |
| ---------- | ----------- | ----- | -------- | -------- | ------- |
| target     | any target  | `any` | -        | `true`   | -       |

- Returns: `string`

- Example:

```ts
getType({}) // object
getType([]) // array
getType(new Promise()) // promise
getType(new Date()) // date
getType(async () => {}) // function
getType(navigator) // navigator
getType(global) // global
getType(window) // window
getType(Symbol('')) // symbol
```

- Types:

```ts
declare function getType<T = any>(
  target: T
):
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'
  | 'window'
  | 'error'
  | 'promise'
  | 'math'
  | 'document'
  | 'navigator'
  | 'global'
  | 'array'
  | 'date'
  | 'regexp'
  | 'null'
```

#### getFileType

Determine file type based on link suffix

- Since: `5.11.0`

- Arguments:

| Parameters | Description | Type     | Optional | Required | Default |
| ---------- | ----------- | -------- | -------- | -------- | ------- |
| url        | file url    | `string` | -        | `true`   | -       |

- Returns: `object`

- Example:

```ts
getFileType('/name.png')
// { "suffix": "png", "type": "image" }

getFileType('/name.PDF')
// { "suffix": "pdf", "type": "pdf" }

getFileType('/name.xyz')
// { "suffix": "xyz", "type": "other" }
```

- Types:

```ts
declare function getFileType(url: string): {
  suffix: string
  type: 'audio' | 'video' | 'image' | 'other' | 'word' | 'txt' | 'excel' | 'pdf' | 'ppt' | 'zip'
}
```

#### sorter

Sorter factory function

- Since: `5.14.0`

- Arguments:

| Parameters | Description                                                      | Type                   | Optional | Required | Default |
| ---------- | ---------------------------------------------------------------- | ---------------------- | -------- | -------- | ------- |
| locales    | A string with a BCP 47 language tag, or an array of such strings | `string` `Array`       | -        | `false`  | -       |
| options    | An object adjusting the output format.                           | `Intl.CollatorOptions` | -        | `false`  | -       |

- Returns: `Function`

- Example:

```ts
const items = ['啊我', '波拉', 'abc', 0, 3, '10', ',11', 13, null, '阿吧', 'ABB', 'BDD', 'ACD', 'ä']

items.sort(
  sorter('zh-Hans-CN', {
    ignorePunctuation: true,
    sensitivity: 'variant',
    numeric: true
  })
)
// [ 0, 3, "10", ",11", 13, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]
```

- Types:

```ts
declare function sorter(
  locales?: string | string[],
  options?: Intl.CollatorOptions
): <T = string, P = string>(a: T, b: P) => number
```

#### sortPinyin

Sort Chinese by Chinese phonetic alphabet

- Since: `5.14.0`

- Arguments:

| Parameters | Description                            | Type                   | Optional | Required | Default |
| ---------- | -------------------------------------- | ---------------------- | -------- | -------- | ------- |
| a          | The first element for comparison.      | `any`                  | -        | `true`   | -       |
| b          | The second element for comparison.     | `any`                  | -        | `true`   | -       |
| options    | An object adjusting the output format. | `Intl.CollatorOptions` | -        | `false`  | -       |

- Returns: `number`

- Example:

```ts
const items = ['啊我', '波拉', 'abc', 0, 3, '10', ',11', 13, null, '阿吧', 'ABB', 'BDD', 'ACD', 'ä']

items.sort(sortPinyin)
// [ ",11", 0, "10", 13, 3, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]

items.sort((a, b) => sortPinyin(a, b, { ignorePunctuation: true, numeric: true }))
// [ 0, 3, "10", ",11", 13, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]
```

- Types:

```ts
declare function sortPinyin<T = string, P = string>(
  a: T,
  b: P,
  options?: Intl.CollatorOptions
): number
```

#### cleanData

Data cleaning methods

- Since: `1.0.2`

- Arguments:

| Parameters | Description                                                                                        | Type             | Optional | Required | Default |
| ---------- | -------------------------------------------------------------------------------------------------- | ---------------- | -------- | -------- | ------- |
| data       | the object to be cleaned                                                                           | `object`         | -        | `true`   | -       |
| map        | the data queue to be cleaned, can be passed as array or object                                     | `array`/`object` | -        | `true`   | -       |
| nullFix    | the value returned if there is no corresponding property, the default does not return the property | `any`            | -        | `false`  | -       |

- Returns: `any`

- Example:

```ts
//
```

- Types:

```ts
declare function cleanData(data: any, map: any[] | AnyObject, nullFix?: any): any
```

#### download

Several ways of file downloading:

1. For file formats that some browsers do not recognize. Enter the file URL in the address bar, window.location.href = URL, window.open(URL);
2. using a tag download attribute (or js create a tag);
3. browser-recognizable pdf, txt files, back-end compatible with handling attachment;
4. add token in the header for authenticated download, use XmlHttpRequest to want to backend to launch the request

- Since: `1.0.5`

- Arguments:

| Parameters | Description   | Type     | Optional                           | Required | Default    |
| ---------- | ------------- | -------- | ---------------------------------- | -------- | ---------- |
| url        | url link      | `string` | -                                  | `true`   | -          |
| filename   | file name     | `string` | -                                  | `true`   | -          |
| type       | download type | `string` | `href`/`open`/`download`/`request` | `false`  | `download` |

- Returns: `void`

- Example:

```ts
download('https://unpkg.com/browse/js-cool@5.2.0/dist/index.global.prod.js')
```

- Types:

```ts
declare function download(url: string, filename: string, type?: string): void
```

#### searchObject

tree object depth lookup

- Since: `5.0.0`

- Arguments:

| Parameters | Description                                          | Type             | Optional | Required | Default |
| ---------- | ---------------------------------------------------- | ---------------- | -------- | -------- | ------- |
| tree       | tree object                                          | `array`/`object` | -        | `true`   | -       |
| expression | required Query method                                | `any`            | -        | `true`   | -       |
| keySet     | optional Default subclass name, query name           | `SearchKeySet`   | -        | `true`   | -       |
| number     | optional Number of lookups, if not passed, query all | `number`         | -        | `false`  | -       |

- Returns: `any`

- Example:

```ts
//
```

- Types:

```ts
declare function searchObject(
  tree: object | any[],
  expression: any,
  keySet: SearchKeySet,
  number?: number
): any[]
```

#### openUrl

Open link in new tab (file jump download if browser can't parse)

- Since: `1.0.6`

- Arguments:

| Parameters | Description | Type     | Optional | Required | Default |
| ---------- | ----------- | -------- | -------- | -------- | ------- |
| url        | http url    | `string` | -        | `true`   | -       |

- Returns: `boolean | undefined`

- Example:

```ts
openUrl('https://www.saqqdy.com/js-cool')
```

- Types:

```ts
declare function openUrl(url: string): void
```

#### copy

copy to clipboard

- Since: `5.0.0`

- Arguments:

| Parameters | Description | Type  | Optional | Required | Default |
| ---------- | ----------- | ----- | -------- | -------- | ------- |
| value      | any value   | `any` | -        | `true`   | -       |

- Returns: `boolean | undefined`

- Example:

```ts
copy('10000')
```

- Types:

```ts
declare function copy(value: string): boolean | undefined
```

#### toThousands

Digital thousandths division

- Since: `3.0.0`

- Arguments:

| Parameters | Description | Type              | Optional | Required | Default |
| ---------- | ----------- | ----------------- | -------- | -------- | ------- |
| num        | the number  | `string`/`number` | -        | `true`   | -       |

- Returns: `string`

- Example:

```ts
toThousands(10000) // '10,000'
```

- Types:

```ts
declare function toThousands(num: string | number): string
```

#### all

return true if the provided predicate function returns true for all elements in a set, otherwise return false

- Since: `1.0.9`

- Arguments:

| Parameters | Description         | Type       | Optional | Required | Default |
| ---------- | ------------------- | ---------- | -------- | -------- | ------- |
| arr        | the target array    | `array`    | -        | `true`   | -       |
| fn         | the judgment method | `function` | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
all([4, 2, 3], x => x > 1)
// true
```

- Types:

```ts
declare const all: <T = unknown>(arr: T[], fn: AnyFunction) => boolean
```

#### any

Returns true if the provided predicate function returns true for at least one element of a set, false otherwise

- Since: `1.0.9`

- Arguments:

| Parameters | Description         | Type       | Optional | Required | Default |
| ---------- | ------------------- | ---------- | -------- | -------- | ------- |
| arr        | the target array    | `array`    | -        | `true`   | -       |
| fn         | the judgment method | `function` | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
any([0, 1, 2, 0], x => x >= 2)
// true
```

- Types:

```ts
declare const any: <T = unknown>(arr: T[], fn: AnyFunction) => boolean
```

#### uuid

generate uuid on browser side, use v4 method

- Since: `1.0.9`

- Arguments: `none`

- Returns: `string`

- Example:

```ts
uuid() // '4222fcfe-5721-4632-bede-6043885be57d'
```

- Types:

```ts
declare const uuid: () => string
```

#### CSVToArray

Converts a comma-separated string of values (CSV) to a 2D array.

- Since: `1.0.9`

- Arguments:

| Parameters   | Description                            | Type      | Optional | Required | Default |
| ------------ | -------------------------------------- | --------- | -------- | -------- | ------- |
| data         | csv data                               | `string`  | -        | `true`   | -       |
| delimiter    | delimiter                              | `string`  | -        | `false`  | ','     |
| omitFirstRow | the first row is the table header data | `boolean` | -        | `false`  | `false` |

- Returns: `string`

- Example:

```ts
CSVToArray('a,b\\nc,d') // `[['a','b'],['c','d']]`
CSVToArray('a;b\\\nc;d', ';') // `[['a','b'],['c','d']]`
CSVToArray('col1,col2\\\na,b\\\nc,d', ',', true) // `[['a','b'],['c','d']]`
```

- Types:

```ts
declare const CSVToArray: (data: string, delimiter?: string, omitFirstRow?: boolean) => string[][]
```

#### arrayToCSV

Converts a two-dimensional array to a comma-separated string of values (CSV).

- Since: `1.0.9`

- Arguments:

| Parameters | Description | Type     | Optional | Required | Default |
| ---------- | ----------- | -------- | -------- | -------- | ------- |
| arr        | json data   | `array`  | -        | `true`   | -       |
| delimiter  | delimiter   | `string` | -        | `false`  | ','     |

- Returns: `string`

- Example:

```ts
arrayToCSV([
  ['a', 'b'],
  ['c', 'd']
])
// '"a", "b" \n "c", "d"'

arrayToCSV(
  [
    ['a', 'b'],
    ['c', 'd']
  ],
  ';'
)
// '"a"; "b"\n "c"; "d"'

arrayToCSV([
  ['a', '"b" great'],
  ['c', 3.1415]
])
// '"a", """b"" great"\n "c",3.1415'
```

- Types:

```ts
declare function arrayToCSV<T extends unknown[][]>(data: T, delimiter?: string): string
```

#### CSVToJSON

Converts a comma-separated string of values (CSV) to an array of 2D objects. The first line of the string is used as the header line.

- Since: `1.0.9`

- Arguments:

| Parameters | Description | Type     | Optional | Required | Default |
| ---------- | ----------- | -------- | -------- | -------- | ------- |
| data       | csv data    | `string` | -        | `true`   | -       |
| delimiter  | delimiter   | `string` | -        | `false`  | ','     |

- Returns: `string`

- Example:

```ts
CSVToJSON('col1,col2\\na,b\\\nc,d')
// `[{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]`

CSVToJSON('col1;col2\\\na;b\\\nc;d', ';')
// `[{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]`
```

- Types:

```ts
declare function CSVToJSON(data: string, delimiter?: string): any[]
```

#### JSONToCSV

Converts an array of objects to a comma-separated value (CSV) string containing only the specified columns.

- Since: `1.0.9`

- Arguments:

| Parameters | Description           | Type     | Optional | Required | Default |
| ---------- | --------------------- | -------- | -------- | -------- | ------- |
| arr        | json data             | `array`  | -        | `true`   | -       |
| columns    | the specified columns | `array`  | -        | `true`   | -       |
| delimiter  | delimiter             | `string` | -        | `false`  | ','     |

- Returns: `string`

- Example:

```ts
JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b']) // 'a,b\n "1", "2"\n "3", "4"\n "6",""\n"", "7"'
JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';') // 'a;b\n "1"; "2"\n "3"; "4"\n "6";""\n""; "7"'
```

- Types:

```ts
declare const JSONToCSV: (arr: any[], columns: any[], delimiter?: string) => string
```

#### RGBToHex

Converts RGB component values to color codes.

- Since: `1.0.9`

- Arguments:

| Parameters | Description          | Type     | Optional | Required | Default |
| ---------- | -------------------- | -------- | -------- | -------- | ------- |
| r          | the 1st value of RGB | `number` | -        | `true`   | -       |
| g          | RGB's 2nd value      | `number` | -        | `true`   | -       |
| b          | RGB's 3nd value      | `number` | -        | `true`   | -       |

- Returns: `string`

- Example:

```ts
RGBToHex(255, 165, 1) // 'ffa501'
```

- Types:

```ts
declare const RGBToHex: (r: number, g: number, b: number) => string
```

#### intersect

Find the intersection of multiple arrays

- Since: `2.2.1`

- Arguments:

| Parameters | Description   | Type    | Optional | Required | Default |
| ---------- | ------------- | ------- | -------- | -------- | ------- |
| ...arr     | array targets | `array` | -        | `true`   | -       |

- Returns: `array`

- Example:

```ts
intersect([1, 2], [2, 3, 4], [2, 8], [2, '33']) // [2]
```

- Types:

```ts
declare function intersect<T = unknown>(...args: T[][]): T[]
```

#### union

Find the concatenation of multiple arrays

- Since: `2.2.1`

- Arguments:

| Parameters | Description   | Type    | Optional | Required | Default |
| ---------- | ------------- | ------- | -------- | -------- | ------- |
| ...arr     | array targets | `array` | -        | `true`   | -       |

- Returns: `array`

- Example:

```ts
union([1, 2], [2, '33']) // [1, 2, '33']
```

- Types:

```ts
declare function union<T = unknown>(...args: T[][]): T[]
```

#### minus

Find the set of differences of multiple arrays that belong to A but not to B/C/D... of the elements of

- Since: `2.2.1`

- Arguments:

| Parameters | Description   | Type    | Optional | Required | Default |
| ---------- | ------------- | ------- | -------- | -------- | ------- |
| ...arr     | array targets | `array` | -        | `true`   | -       |

- Returns: `array`

- Example:

```ts
minus([1, 2], [2, '33'], [2, 4]) // [1]
```

- Types:

```ts
declare function minus<T = unknown>(...args: T[][]): T[]
```

#### complement

Find the complement of multiple arrays

- Since: `2.2.1`

- Arguments:

| Parameters | Description   | Type    | Optional | Required | Default |
| ---------- | ------------- | ------- | -------- | -------- | ------- |
| ...arr     | array targets | `array` | -        | `true`   | -       |

- Returns: `array`

- Example:

```ts
complement([1, 2], [2, '33'], [2]) // [1, '33']
```

- Types:

```ts
declare function complement<T = unknown>(...args: T[][]): T[]
```

#### contains

Whether the array contains the specified element

- Since: `2.2.1`

- Arguments:

| Parameters | Description      | Type    | Optional | Required | Default |
| ---------- | ---------------- | ------- | -------- | -------- | ------- |
| arr        | array target     | `array` | -        | `true`   | -       |
| item       | any array member | `any`   | -        | `true`   | -       |

- Returns: `boolean`

- Example:

```ts
contains([1, 2], 2) // true
contains([1, 2], 3) // false
```

- Types:

```ts
declare function contains(arr: any[], item: any): boolean
```

#### unique

Array de-duplication

- Since: `2.2.1`

- Arguments:

| Parameters | Description  | Type    | Optional | Required | Default |
| ---------- | ------------ | ------- | -------- | -------- | ------- |
| arr        | array target | `array` | -        | `true`   | -       |

- Returns: `array`

- Example:

```ts
unique([1, 2, 2, '33']) // [1, 2, '33']
```

- Types:

```ts
declare function unique<T = unknown>(arr: T[]): T[]
```

#### fillIPv6

ipv6 address completion

- Since: `2.2.2`

- Arguments:

| Parameters | Description | Type     | Optional | Required | Default |
| ---------- | ----------- | -------- | -------- | -------- | ------- |
| ip         | ip address  | `string` | -        | `true`   | -       |

- Returns: `string`

- Example:

```ts
fillIPv6('2409:8005:800::2') // '2409:8005:0800:0000:0000:0000:0000:0002'
fillIPv6('2409:8005:800::1c') // '2409:8005:0800:0000:0000:0000:0000:001c'
```

- Types:

```ts
declare function fillIPv6(ip: string): string
```

#### getProperty

Get array, object property values based on path string

> v5.19.0 support defaultValue

- Since: `2.2.4`

- Arguments:

| Parameters   | Description                     | Type                | Optional | Required | Default |
| ------------ | ------------------------------- | ------------------- | -------- | -------- | ------- |
| target       | target array, object            | `array`/`object`    | -        | `true`   | -       |
| prop         | query target, can pass function | `string`/`function` | -        | `true`   | -       |
| defaultValue | default value                   | `any`               | -        | `false`  | -       |

- Returns: `any`

- Example:

```ts
const target = {
  a: 1,
  b: [
    {
      c: 2,
      d: NaN
    }
  ]
}
getProperty(target, 'a') // 1
getProperty(target, 'd', 100) // 100
getProperty(target, 'b[0].c') // 2
getProperty(target, 'b[0].d', 100) // 100
getProperty(target, () => 'a') // 1
```

- Types:

```ts
export declare function getProperty<T extends Record<string, any>>(
  target: T,
  prop:
    | string
    | {
        (): string
      },
  defaultValue?: any
): any

export declare function getProperty<T extends Array<any>>(
  target: T,
  prop:
    | string
    | {
        (): string
      },
  defaultValue?: any
): any
```

#### setProperty

Set array, object property values based on path string

- Since: `2.7.0`

- Arguments:

| Parameters | Description                                     | Type                | Optional | Required | Default |
| ---------- | ----------------------------------------------- | ------------------- | -------- | -------- | ------- |
| target     | target array, object                            | `array`/`object`    | -        | `true`   | -       |
| prop       | set target, support function, 'a' \| 'a\[1\].c' | `string`/`function` | -        | `true`   | -       |
| value      | value                                           | `any`               | -        | `true`   | -       |

- Returns: `any`

- Example:

```ts
const target = {
  a: 1,
  b: [
    {
      c: 2
    }
  ]
}
setProperty(target, 'a', 2)
setProperty(target, 'b[0].c', 3)
setProperty(target, () => 'a', 100)
```

- Types:

```ts
declare function setProperty(
  target: any,
  prop:
    | string
    | {
        (): string
      },
  value: any
): any
```

#### loadSource

load resources dynamically, support js, images, css links, css style strings

- Since: `2.8.0`

- Arguments:

| Parameters | Description                                                           | Type            | Optional | Required | Default |
| ---------- | --------------------------------------------------------------------- | --------------- | -------- | -------- | ------- |
| url        | link to the resource, type must be passed when passing in styleString | `string`        | -        | `true`   | -       |
| options    | parameters: attrs, props, force                                       | `SourceOptions` | -        | `false`  | -       |

- Returns: `boolean | imageUrl`

- Example:

```ts
loadSource('/source/url', options)
```

- Types:

```ts
import { ImageAttributes } from 'mount-image'
import { LinkAttributes } from 'mount-css'
import { ScriptAttributes } from 'mount-script'
import { StyleAttributes } from 'mount-style'

declare function loadSource(
  url: string,
  option: SourceFileType | SourceOptions
): Promise<boolean | string>

declare type SourceFileType = 'js' | 'img' | 'css' | 'style' | string

declare interface SourceOptions {
  type: SourceFileType
  attrs?: LinkAttributes | StyleAttributes | ScriptAttributes | ImageAttributes
  props?: LinkAttributes | StyleAttributes | ScriptAttributes | ImageAttributes
  force?: boolean
}
```

#### mountCss

dynamically load css link resources

- Since: `2.8.0`

- Arguments:

| Parameters | Description                     | Type         | Optional | Required | Default |
| ---------- | ------------------------------- | ------------ | -------- | -------- | ------- |
| url        | resource url                    | `string`     | -        | `true`   | -       |
| options    | parameters: attrs, props, force | `CssOptions` | -        | `false`  | -       |

- Returns: `boolean`

- Example:

```ts
mountCss('/source/url', options)
```

- Types:

```ts
declare interface CssOptions {
  attrs?: LinkAttributes
  props?: LinkAttributes
  force?: boolean
}

declare interface HTMLLinkElementEX extends HTMLLinkElement {
  onreadystatechange?: any
  readyState?: 'loaded' | 'complete'
}

declare type LinkAttributes = Pick<
  HTMLLinkElement,
  | 'as'
  | 'charset'
  | 'crossOrigin'
  | 'disabled'
  | 'href'
  | 'hreflang'
  | 'imageSizes'
  | 'imageSrcset'
  | 'integrity'
  | 'media'
  | 'referrerPolicy'
  | 'rel'
  | 'rev'
  | 'target'
  | 'type'
>

declare function mountCss(src: string, option?: CssOptions): Promise<boolean>
```

#### mountImg

load image resource dynamically

- Since: `2.8.0`

- Arguments:

| Parameters | Description                     | Type         | Optional | Required | Default |
| ---------- | ------------------------------- | ------------ | -------- | -------- | ------- |
| url        | resource url                    | `string`     | -        | `true`   | -       |
| options    | parameters: attrs, props, force | `ImgOptions` | -        | `false`  | -       |

- Returns: `boolean | imageUrl`

- Example:

```ts
mountImg('/source/url', options)
```

- Types:

```ts
declare interface HTMLImageElementEX extends HTMLImageElement {
  onreadystatechange?: any
  readyState?: 'loaded' | 'complete'
}

declare type ImageAttributes = Pick<
  HTMLImageElement,
  | 'align'
  | 'alt'
  | 'border'
  | 'crossOrigin'
  | 'decoding'
  | 'height'
  | 'hspace'
  | 'isMap'
  | 'loading'
  | 'longDesc'
  | 'lowsrc'
  | 'name'
  | 'referrerPolicy'
  | 'sizes'
  | 'src'
  | 'srcset'
  | 'useMap'
  | 'vspace'
  | 'width'
>

declare interface ImgOptions {
  attrs?: ImageAttributes
  props?: ImageAttributes
  force?: boolean
}

declare function mountImage(src: string, option?: ImgOptions): Promise<boolean | string>
```

#### mountJs

load js link resources dynamically

- Since: `2.8.0`

- Arguments:

| Parameters | Description                     | Type        | Optional | Required | Default |
| ---------- | ------------------------------- | ----------- | -------- | -------- | ------- |
| url        | resource url                    | `string`    | -        | `true`   | -       |
| options    | parameters: attrs, props, force | `JsOptions` | -        | `false`  | -       |

- Returns: `boolean`

- Example:

```ts
mountJs('/source/url', options)
```

- Types:

```ts
declare interface HTMLScriptElementEX extends HTMLScriptElement {
  onreadystatechange?: any
  readyState?: 'loaded' | 'complete'
}

declare interface JsOptions {
  attrs?: ScriptAttributes
  props?: ScriptAttributes
  force?: boolean
}

declare function mountJs(src: string, option?: JsOptions): Promise<boolean>

declare type ScriptAttributes = Pick<
  HTMLScriptElement,
  | 'async'
  | 'charset'
  | 'crossOrigin'
  | 'defer'
  | 'event'
  | 'htmlFor'
  | 'integrity'
  | 'noModule'
  | 'referrerPolicy'
  | 'src'
  | 'text'
  | 'type'
>
```

#### mountStyle

load css styles dynamically

- Since: `2.8.0`

- Arguments:

| Parameters | Description                     | Type           | Optional | Required | Default |
| ---------- | ------------------------------- | -------------- | -------- | -------- | ------- |
| url        | resource url                    | `string`       | -        | `true`   | -       |
| options    | parameters: attrs, props, force | `StyleOptions` | -        | `false`  | -       |

- Returns: `boolean`

- Example:

```ts
mountStyle('/source/url', options)
```

- Types:

```ts
declare function mountStyle(css: string, option?: StyleOptions): Promise<boolean>

declare type StyleAttributes = Pick<HTMLStyleElement, 'disabled' | 'media' | 'type'>

declare interface StyleOptions {
  attrs?: StyleAttributes
  props?: StyleAttributes
}
```

#### preloader

Image preloading

- Since: `5.5.0`

- Arguments:

| Parameters | Description | Type             | Optional | Required | Default |
| ---------- | ----------- | ---------------- | -------- | -------- | ------- |
| images     | images url  | `string` `array` | -        | `true`   | -       |

- Returns: void

- Example:

```ts
preloader('path/of/image')

preloader(['path/of/image'])
```

- Types:

```ts
declare function preloader(images: string): HTMLImageElement

declare function preloader(images: string[]): Record<string, HTMLImageElement>
```

#### waiting

> v5.8.1 Support throw on timeout

waiting for a while

- Since: `5.5.0`

- Arguments:

| Parameters     | Description                 | Type      | Optional | Required | Default |
| -------------- | --------------------------- | --------- | -------- | -------- | ------- |
| milliseconds   | waiting time (milliseconds) | `number`  | -        | `true`   | -       |
| throwOnTimeout | throw on timeout            | `boolean` | -        | `false`  | `false` |

- Returns: `Promise<void>`

- Example:

```ts
waiting(2000)

await waiting(2000, true)
// reject
```

- Types:

```ts
declare function waiting(milliseconds: number, throwOnTimeout?: boolean): Promise<void>
```

#### awaitTo

Async await wrapper for easy error handling

> v5.7.0 Extend awaitTo to support passing in multiple promises

- Since: `5.2.0`

- Arguments:

| Parameters  | Description         | Type                  | Optional | Required | Default |
| ----------- | ------------------- | --------------------- | -------- | -------- | ------- |
| promise     | promise function    | `Promise` `Promise[]` | -        | `true`   | -       |
| ...promises | Promise rest params | `Promise[]`           | -        | `false`  | -       |

- Returns: `[Error, undefined]` or `[null, data | data[]]`

- Example:

```ts
import { awaitTo as to } from 'js-cool'

// 1. simple use
const [err, data] = await to(new Promise())
if (err) {
  // handle request error
}

// 2. Pass in multiple promises
const [err, data] = await to(promise1, promise2)
// or
const [err, data] = await to([promise1, promise2])
```

- Types:

```ts
declare function awaitTo<T, E = Error>(promise: Promise<T>): Promise<[E, undefined] | [null, T]>

declare function awaitTo<P extends readonly unknown[] | [], E = Error>(
  promise: PromiseAll<P>
): Promise<[E, undefined] | [null, P]>

declare function awaitTo<T, P extends readonly unknown[] | [], E = Error>(
  promise: Promise<T>,
  ...promises: PromiseAll<P>
): Promise<[E, undefined] | [null, [T, ...P]]>

export declare type PromiseAll<P extends readonly unknown[] | []> = {
  -readonly [K in keyof P]: Promise<P[K]>
}
```

### Blob arrayBuffer base64 file blobUrl

#### arrayBufferToBase64

arrayBuffer to base64

> v5.19.1 remove default params of mime

- Since: `5.13.0`

- Arguments:

| Parameters | Description      | Type          | Optional | Required | Default |
| ---------- | ---------------- | ------------- | -------- | -------- | ------- |
| input      | arrayBuffer data | `ArrayBuffer` | -        | `true`   | -       |
| mime       | image mime       | `String`      | -        | `false`  | -       |

- Returns: `String`

- Example:

```ts
arrayBufferToBase64(arrayBuffer, 'image/png')
// data:image/png;base64,xxxxxxxxxxxx

arrayBufferToBase64(arrayBuffer)
// xxxxxxxxxxxx
```

- Types:

```ts
declare function arrayBufferToBase64(input: ArrayBuffer, mime?: string): string
```

#### arrayBufferToBlob

arrayBuffer to blob

- Since: `5.13.0`

- Arguments:

| Parameters | Description      | Type          | Optional | Required | Default     |
| ---------- | ---------------- | ------------- | -------- | -------- | ----------- |
| input      | arrayBuffer data | `ArrayBuffer` | -        | `true`   | -           |
| mime       | image mime       | `String`      | -        | `false`  | `image/png` |

- Returns: `Blob`

- Example:

```ts
arrayBufferToBlob(arrayBuffer, 'image/png')
// Blob
```

- Types:

```ts
declare function arrayBufferToBlob(input: ArrayBuffer, mime?: string): Blob
```

#### base64ToArrayBuffer

base64 to arrayBuffer

- Since: `5.13.0`

- Arguments:

| Parameters | Description   | Type     | Optional | Required | Default |
| ---------- | ------------- | -------- | -------- | -------- | ------- |
| input      | base64 string | `String` | -        | `true`   | -       |

- Returns: `ArrayBuffer`

- Example:

```ts
base64ToArrayBuffer(base64)
// ArrayBuffer
```

- Types:

```ts
declare function base64ToArrayBuffer(input: string): ArrayBuffer
```

#### base64ToBlob

base64 to blob

- Since: `5.13.0`

- Arguments:

| Parameters | Description   | Type     | Optional | Required | Default |
| ---------- | ------------- | -------- | -------- | -------- | ------- |
| input      | base64 string | `String` | -        | `true`   | -       |

- Returns: `Blob`

- Example:

```ts
base64ToBlob(base64)
// Blob
```

- Types:

```ts
declare function base64ToBlob(input: string): Blob
```

#### base64ToFile

base64 to file

- Since: `5.13.0`

- Arguments:

| Parameters | Description   | Type     | Optional | Required | Default |
| ---------- | ------------- | -------- | -------- | -------- | ------- |
| input      | base64 string | `String` | -        | `true`   | -       |
| fileName   | file name     | `String` | -        | `true`   | -       |

- Returns: `File`

- Example:

```ts
base64ToFile(base64, 'image.png')
// File
```

- Types:

```ts
declare function base64ToFile(input: string, fileName: string): File
```

#### blobToArrayBuffer

blob to arrayBuffer

- Since: `5.13.0`

- Arguments:

| Parameters | Description | Type   | Optional | Required | Default |
| ---------- | ----------- | ------ | -------- | -------- | ------- |
| input      | blob data   | `Blob` | -        | `true`   | -       |

- Returns: `ArrayBuffer`

- Example:

```ts
blobToArrayBuffer(blob).then(data => {
  // ArrayBuffer
})
```

- Types:

```ts
declare function blobToArrayBuffer(input: Blob): Promise<ArrayBuffer | null>
```

#### blobToBase64

blob to base64

- Since: `5.13.0`

- Arguments:

| Parameters | Description | Type   | Optional | Required | Default |
| ---------- | ----------- | ------ | -------- | -------- | ------- |
| input      | blob data   | `Blob` | -        | `true`   | -       |

- Returns: `String`

- Example:

```ts
blobToBase64(blob).then(data => {
  // data:image/png;base64,xxxxxxxxxxxx
})
```

- Types:

```ts
declare function blobToBase64(input: Blob): Promise<string | null>
```

#### blobToUrl

blob to url

- Since: `5.13.0`

- Arguments:

| Parameters | Description | Type   | Optional | Required | Default |
| ---------- | ----------- | ------ | -------- | -------- | ------- |
| input      | blob data   | `Blob` | -        | `true`   | -       |

- Returns: `Object`

- Example:

```ts
blobToUrl(blob)
// blob:xxxxxxx
```

- Types:

```ts
declare function blobToUrl(input: Blob): string
```

#### fileToBase64

file to base64

- Since: `5.13.0`

- Arguments:

| Parameters | Description | Type   | Optional | Required | Default |
| ---------- | ----------- | ------ | -------- | -------- | ------- |
| input      | file data   | `File` | -        | `true`   | -       |

- Returns: `String`

- Example:

```ts
fileToBase64(file).then(data => {
  // data:image/png;base64,xxxxxxxxxxxx
})
```

- Types:

```ts
declare function fileToBase64(input: File): Promise<string | null>
```

#### svgToBlob

svg to blob

- Since: `5.13.0`

- Arguments:

| Parameters | Description | Type     | Optional | Required | Default |
| ---------- | ----------- | -------- | -------- | -------- | ------- |
| input      | svg string  | `String` | -        | `true`   | -       |

- Returns: `Blob`

- Example:

```ts
svgToBlob(svg)
// Blob
```

- Types:

```ts
declare function svgToBlob(input: string): Blob
```

#### urlToBlob

url to blob

- Since: `5.13.0`

- Arguments:

| Parameters | Description | Type     | Optional | Required | Default |
| ---------- | ----------- | -------- | -------- | -------- | ------- |
| input      | url         | `String` | -        | `true`   | -       |

- Returns: `Blob`

- Example:

```ts
urlToBlob(url).then(blob => {
  // Blob
})
```

- Types:

```ts
declare function urlToBlob(input: string): Promise<Blob | null>
```

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/js-cool/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/js-cool.svg?style=flat-square
[npm-url]: https://npmjs.org/package/js-cool
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/js-cool/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/js-cool&utm_campaign=Badge_Grade
[tree-shaking-image]: https://badgen.net/bundlephobia/tree-shaking/js-cool
[tree-shaking-url]: https://bundlephobia.com/package/js-cool
[typescript-url]: https://badgen.net/badge/icon/typescript?icon=typescript&label
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/js-cool.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/js-cool?branch=master
[download-image]: https://img.shields.io/npm/dm/js-cool.svg?style=flat-square
[download-url]: https://npmjs.org/package/js-cool
[gzip-image]: http://img.badgesize.io/https://unpkg.com/js-cool/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/js-cool/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_js-cool
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_js-cool
