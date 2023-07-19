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

- [js-cool](#js-cool)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Es6 module](#es6-module)
    - [Node.js require](#nodejs-require)
    - [Using unpkg CDN](#using-unpkg-cdn)
  - [API Reference](#api-reference)
    - [Global Parameters](#global-parameters)
      - [client](#client)
      - [pattern](#pattern)
    - [Extras for String & Array & Object & Function](#extras-for-string--array--object--function)
      - [trim](#trim)
      - [clearAttr](#clearattr)
      - [clearHtml](#clearhtml)
      - [getNumber](#getnumber)
      - [camel2Dash](#camel2dash)
      - [dash2Camel](#dash2camel)
      - [randomNumber](#randomnumber)
      - [randomString](#randomstring)
      - [fingerprint](#fingerprint)
      - [getCHSLength](#getchslength)
      - [cutCHSString](#cutchsstring)
    - [Determine](#determine)
      - [isDigitals](#isdigitals)
      - [isExitsFunction](#isexitsfunction)
      - [isExitsVariable](#isexitsvariable)
      - [isWindow](#iswindow)
      - [isObject](#isobject)
      - [isArray](#isarray)
      - [inBrowser](#inbrowser)
      - [windowSize](#windowsize)
      - [getAppVersion](#getappversion)
      - [appVersion](#appversion)
      - [getOsVersion](#getosversion)
      - [osVersion](#osversion)
      - [browserVersion](#browserversion)
      - [compareVersion](#compareversion)
      - [parseUrlParam](#parseurlparam)
      - [spliceUrlParam](#spliceurlparam)
      - [getDirParam](#getdirparam)
      - [getQueryParam](#getqueryparam)
      - [getQueryParams](#getqueryparams)
      - [getUrlParam](#geturlparam)
      - [getUrlParams](#geturlparams)
    - [localStorage & sessionStorage & Cookie](#localstorage--sessionstorage--cookie)
      - [getCache](#getcache)
      - [setCache](#setcache)
      - [delCache](#delcache)
      - [getSession](#getsession)
      - [setSession](#setsession)
      - [delSession](#delsession)
      - [getCookie](#getcookie)
      - [setCookie](#setcookie)
      - [delCookie](#delcookie)
    - [Base64 & UTF8](#base64--utf8)
      - [encodeBase64](#encodebase64)
      - [encodeUtf8](#encodeutf8)
      - [decodeBase64](#decodebase64)
      - [decodeUtf8](#decodeutf8)
    - [Events](#events)
      - [stopBubble](#stopbubble)
      - [stopDefault](#stopdefault)
      - [addEvent](#addevent)
      - [removeEvent](#removeevent)
      - [getScrollPosition](#getscrollposition)
    - [Utilities](#utilities)
      - [nextIndex](#nextindex)
      - [fixNumber](#fixnumber)
      - [extend](#extend)
      - [delay](#delay)
      - [getType](#gettype)
      - [cleanData](#cleandata)
      - [download](#download)
      - [searchObject](#searchobject)
      - [openUrl](#openurl)
      - [copy](#copy)
      - [toThousands](#tothousands)
      - [all](#all)
      - [any](#any)
      - [uuid](#uuid)
      - [CSVToArray](#csvtoarray)
      - [arrayToCSV](#arraytocsv)
      - [CSVToJSON](#csvtojson)
      - [JSONToCSV](#jsontocsv)
      - [RGBToHex](#rgbtohex)
      - [intersect](#intersect)
      - [union](#union)
      - [minus](#minus)
      - [complement](#complement)
      - [contains](#contains)
      - [unique](#unique)
      - [fillIPv6](#fillipv6)
      - [getProperty](#getproperty)
      - [setProperty](#setproperty)
      - [loadSource](#loadsource)
      - [mountCss](#mountcss)
      - [mountImg](#mountimg)
      - [mountJs](#mountjs)
      - [mountStyle](#mountstyle)
      - [awaitTo](#awaitto)
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
<script src="https://unpkg.com/js-cool@4.4.0/dist/index.global.prod.js"></script>
<script>
  jsCool.browserVersion()
</script>
```

## API Reference

### Global Parameters

#### client

the client method returns a browser result object

- Since: `5.2.0`

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

pattern returns some common rules

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
| string     | string with html tags | `string` | -        | true     | -       |

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
| string     | string with html tags | `string` | -        | true     | -       |

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

#### getNumber

Get the number in the string

- Since: `1.0.1`

- Arguments:

| Parameters | Description                    | Type     | Optional | Required | Default |
| ---------- | ------------------------------ | -------- | -------- | -------- | ------- |
| string     | pass in a string with a number | `string` | -        | true     | -       |

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
| string     | the string to be converted | `string` | -        | true     | -       |

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
| string     | the string to be converted | `string` | -        | true     | -       |

- Returns: `string`

- Example:

```ts
dash2Camel('js-cool') // jsCool
```

- Types:

```ts
declare function dash2Camel(string: string): string
```

#### randomNumber

Get a random number

- Since: `5.0.0`

- Arguments:

| Parameters | Description                            | Type     | Optional | Required | Default |
| ---------- | -------------------------------------- | -------- | -------- | -------- | ------- |
| min        | the minimum value of the random number | `number` | -        | false    | 1       |
| max        | the maximum value of the random number | `number` | -        | false    | 10      |

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

#### randomString

Get a random string

- Since: `5.0.0`

- Arguments:

| Parameters       | Description                                               | Type     | Optional | Required | Default |
| ---------------- | --------------------------------------------------------- | -------- | -------- | -------- | ------- |
| len              | the length of the random string that needs to be obtained | `string` | -        | false    | 32      |
| widthSpecialChar | generate a string with special characters                 | `string` | -        | false    | `false` |

- Returns: `string`

- Example:

```ts
randomString(8) // wc7sW66A
randomString(8, true) // lc7sji6A
```

- Types:

```ts
declare function randomString(len?: number, widthSpecialChar?: boolean): string
```

#### fingerprint

Generating Browser Fingerprints

- Since: `5.2.0`

- Arguments:

| Parameters | Description | Type     | Optional | Required | Default       |
| ---------- | ----------- | -------- | -------- | -------- | ------------- |
| domain     | key string  | `string` | -        | false    | location.host |

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
| str        | input string | `string` | -        | true     | -       |

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
| str        | the string to be intercepted | `string`  | -        | true     | -       |
| len        | length                       | `number`  | -        | false    | -       |
| hasDot     | output with dot              | `boolean` | -        | false    | `false` |

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

### Determine

#### isDigitals

Determine if a string is a number

- Since: `1.0.1`

- Arguments:

| Parameters | Description             | Type     | Optional | Required | Default |
| ---------- | ----------------------- | -------- | -------- | -------- | ------- |
| str        | the string to be tested | `string` | -        | true     | -       |

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
| funcName   | function name | `string` | -        | true     | -       |

- Returns: `boolean`

- Example:

```ts
isExitsFunction('test') // false
isExitsFunction('console.log') // true
```

- Types:

```ts
declare function isExitsFunction(funcName: string): boolean
```

#### isExitsVariable

Determine if a variable is defined

- Since: `1.0.1`

- Arguments:

| Parameters   | Description   | Type     | Optional | Required | Default |
| ------------ | ------------- | -------- | -------- | -------- | ------- |
| variableName | variable name | `string` | -        | true     | -       |

- Returns: `boolean`

- Example:

```ts
isExitsVariable('test') // false
isExitsVariable('window') // true
```

- Types:

```ts
declare function isExitsVariable(variableName: string): boolean
```

#### isWindow

Determine if window object

- Since: `5.0.0`

- Arguments:

| Parameters | Description | Type  | Optional | Required | Default |
| ---------- | ----------- | ----- | -------- | -------- | ------- |
| target     | any target  | `any` | -        | true     | -       |

- Returns: `boolean`

- Example:

```ts
isWindow({}) // false
isWindow(window) // true
```

- Types:

```ts
declare function isWindow(target: any): target is Window
```

#### isObject

Determine if target is an object

- Since: `5.0.0`

- Arguments:

| Parameters | Description | Type  | Optional | Required | Default |
| ---------- | ----------- | ----- | -------- | -------- | ------- |
| target     | any target  | `any` | -        | true     | -       |

- Returns: `boolean`

- Example:

```ts
isObject({}) // true
```

- Types:

```ts
declare function isObject(target: any): target is Object
```

#### isArray

Determine if it is an array

- Since: `1.0.2`

- Arguments:

| Parameters | Description | Type  | Optional | Required | Default |
| ---------- | ----------- | ----- | -------- | -------- | ------- |
| target     | any target  | `any` | -        | true     | -       |

- Returns: `boolean`

- Example:

```ts
isArray([]) // true
```

- Types:

```ts
declare function isArray(arr: any): arr is any[]
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
| appName    | app name                                    | `string`  | -        | true     | -                     |
| withApp    | whether to bring the name                   | `boolean` | -        | false    | -                     |
| userAgent  | ua or any ua like string, may not be passed | `string`  | -        | false    | `navigator.userAgent` |

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

| Parameters | Description                                 | Type      | Optional   | Required | Default             |
| ---------- | ------------------------------------------- | --------- | ---------- | -------- | ------------------- |
| appName    | app name                                    | `string`  | -          | true     | -                   |
| ua         | ua or any ua like string, may not be passed | `string`  | -          | false    | navigator.userAgent |
| ignoreCase | whether to ignore case                      | `boolean` | true/false | false    | true                |

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
| osName     | system type string Android, iPod, iWatch or iPhone | `string` | -        | true     | -                     |
| withOS     | whether to bring the name                          | `string` | -        | false    | -                     |
| userAgent  | ua or any ua like string, may not be passed        | `string` | -        | false    | `navigator.userAgent` |

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
| ua         | ua or any ua like string, may not be passed | `string` | -        | false    | navigator.userAgent |

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
| ua         | ua or any ua like string, may not be passed | `string` | -        | false    | navigator.userAgent |

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

Version number size comparison

- Since: `4.7.0`

- Arguments:

| Parameters | Description     | Type     | Optional | Required | Default |
| ---------- | --------------- | -------- | -------- | -------- | ------- |
| input      | input version   | `string` | -        | true     | -       |
| compare    | compare version | `string` | -        | true     | -       |

- Returns: `0 | 1 | -1`

- Example:

```ts
compareVersion('1.11.0', '1.9.9')
// => 1 // 1=Version 1.11.0 is newer than 1.9.9

compareVersion('1.11.0', '1.11.0')
// => 0 // 0=Versions 1.11.0 and 1.11.0 are the same

compareVersion('1.11.0', '1.99.0')
// => -1 // -1=Version 1.11.0 is older than 1.99.0
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
| url        | url string (like: ?key1=value1&key2=value2)         | `string`  | -              | true     | -       |
| covert     | Converts a specific string to a corresponding value | `boolean` | `true`/`false` | false    | `false` |

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
| params            | json object                                                    | `object`  | -              | true     | -       |
| covert            | Convert a null value type (null/undefined/) to an empty string | `boolean` | `true`/`false` | false    | `false` |
| withQuestionsMark | Splicing a question mark                                       | `boolean` | `true`/`false` | false    | `true`  |

- Returns: `string`

- Example:

```ts
spliceUrlParam({ key1: '100', key2: 'true', key3: 'null', key4: 'undefined', key4: '测试' }) // ?key1=100&key2=true&key3=null&key4=undefined&key5=%E6%B5%8B%E8%AF%95
spliceUrlParam({ key1: '100', key2: 'true', key3: 'null', key4: 'undefined' }, true) // ?key1=100&key2=true&key3=&key4=
spliceUrlParam({ key1: '100', key2: 'true', key3: 'null', key4: 'undefined' }, true, false) // key1=100&key2=true&key3=&key4=
```

- Types:

```ts
declare function spliceUrlParam(
  params: Record<string, unknown>,
  covert?: boolean,
  withQuestionsMark?: boolean
): string | null
```

#### getDirParam

Get the URL parameter in the form of a directory

> It will be refactored and renamed getDirParams in the next major release.

- Since: `1.0.1`

- Arguments:

| Parameters | Description | Type     | Optional | Required | Default |
| ---------- | ----------- | -------- | -------- | -------- | ------- |
| url        | http url    | `object` | -        | true     | -       |

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
| key        | key name               | `string` | -        | true     | -               |
| url        | pass in the url string | `string` | -        | false    | `location.href` |

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

#### getQueryParam

Get all query parameters (behind "#"). (If covert is passed true: Scientific notation, binary, octal and hexadecimal types of data are not converted, like: 0b111, 0o13, 0xFF, 1e3, -1e-2)

- Since: `5.0.0`

- Arguments:

| Parameters | Description                                         | Type      | Optional       | Required | Default         |
| ---------- | --------------------------------------------------- | --------- | -------------- | -------- | --------------- |
| url        | pass in the url string                              | `string`  | -              | false    | `location.href` |
| covert     | Converts a specific string to a corresponding value | `boolean` | `true`/`false` | false    | `false`         |

- Returns: `object`

- Example:

```ts
getQueryParams('https://test.com?key1=100#/home?key1=200')
// \{"key1":"200"\}

getQueryParams('https://test.com?key1=100#/home?key1=200', true)
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
| key        | key name               | `string` | -        | true     | -               |
| url        | pass in the url string | `string` | -        | false    | `location.href` |

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
| url        | pass in the url string                              | `string`  | -              | false    | `location.href` |
| covert     | Converts a specific string to a corresponding value | `boolean` | `true`/`false` | false    | `false`         |

- Returns: `object`

- Example:

```ts
getUrlParams('https://test.com?key1=100#/home?key1=200')
// \{"key1":"100"\}

getUrlParams('https://test.com?key1=100#/home?key1=200', true)
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
| name       | cache key name | `string` | -        | true     | -       |

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
| name       | cache key name                                 | `string` | -        | true     | -       |
| value      | cache data, can be passed directly into Object | `any`    | -        | true     | -       |
| seconds    | cache time (seconds)                           | `number` | -        | false    | -       |

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
declare function setCache(name: string, value: any, seconds?: number): void
```

#### delCache

Delete localStorage

- Since: `1.0.2`

- Arguments:

| Parameters | Description    | Type     | Optional | Required | Default |
| ---------- | -------------- | -------- | -------- | -------- | ------- |
| name       | cache key name | `string` | -        | true     | -       |

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
| name       | session key name | `string` | -        | true     | -       |

- Returns: `any`

- Example:

```ts
import { getSession, setSession } from 'js-cool'

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
| name       | session key name                                 | `string` | -        | true     | -       |
| value      | session data, can be passed directly into Object | `any`    | -        | true     | -       |
| seconds    | session time (seconds)                           | `number` | -        | false    | -       |

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
declare function setSession(name: string, value: any, seconds?: number): void
```

#### delSession

Delete sessionStorage

- Since: `1.0.2`

- Arguments:

| Parameters | Description      | Type     | Optional | Required | Default |
| ---------- | ---------------- | -------- | -------- | -------- | ------- |
| name       | session key name | `string` | -        | true     | -       |

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
| name       | cookie key name | `string` | -        | true     | -       |

- Returns: `any`

- Example:

```ts
getCookie('data1') // 100
```

- Types:

```ts
declare function getCookie(name: string): string
```

#### setCookie

Set cookie

- Since: `1.0.2`

- Arguments:

| Parameters | Description                                     | Type     | Optional               | Required | Default |
| ---------- | ----------------------------------------------- | -------- | ---------------------- | -------- | ------- |
| name       | cookie key name                                 | `string` | -                      | true     | -       |
| value      | cookie data, can be passed directly into Object | `any`    | -                      | true     | -       |
| seconds    | cookie time (seconds)                           | `number` | -                      | false    | -       |
| path       | cookie path                                     | `string` | -                      | false    | `/`     |
| samesite   | SameSite type                                   | `string` | `Strict`/`Lax` /`None` | false    | `None`  |

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
declare function setCookie(
  name: string,
  value: any,
  seconds?: number,
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
| name       | cookie key name | `string` | -        | true     | -       |

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
| input      | the string to be encoded | `string`/`number` | -        | true     | -       |

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
| input      | the string to be decoded | `string`/`number` | -        | true     | -       |

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
| input      | the string to be encoded | `string`/`number` | -        | true     | -       |

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
| input      | the string to be decoded | `string`/`number` | -        | true     | -       |

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
| e          | dom's event object | `Event` | -        | true     | -       |

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
| e          | dom's event object | `Event` | -        | true     | -       |

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
| element    | js dom object                            | `HTMLElement` | -        | true     | -       |
| type       | The type of the event. No need to add on | `string`      | -        | true     | -       |
| handler    | Callback method                          | `function`    | -        | true     | -       |

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
| element    | js dom object                            | `HTMLElement` | -        | true     | -       |
| type       | The type of the event. No need to add on | `string`      | -        | true     | -       |
| handler    | Callback method                          | `function`    | -        | true     | -       |

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

- Since: `1.0.2`

- Arguments:

| Parameters | Description   | Type     | Optional | Required | Default |
| ---------- | ------------- | -------- | -------- | -------- | ------- |
| min        | minimum value | `number` | -        | false    | `5000`  |
| max        | maximum value | `number` | -        | false    | `10000` |

- Returns: `string | number`

- Example:

```ts
nextIndex() // 5001
```

- Types:

```ts
declare function nextIndex(min?: number, max?: number): number
```

#### fixNumber

truncate a few decimal places, not 0 for shortage

- Since: `1.0.2`

- Arguments:

| Parameters | Description                          | Type              | Optional | Required | Default |
| ---------- | ------------------------------------ | ----------------- | -------- | -------- | ------- |
| number     | the number of digits to be processed | `number`/`string` | -        | true     | -       |
| n          | the number of decimal places to keep | `number`          | -        | false    | `2`     |

- Returns: `string | number`

- Example:

```ts
fixNumber('100.888') // 100.88
fixNumber('100.8', 2) // 100.8
fixNumber('100.8888', 3) // 100.888
```

- Types:

```ts
declare function fixNumber(number: string | number, n?: number): string | number
```

#### extend

deep copy

- Since: `1.0.2`

- Arguments:

| Parameters | Description                | Type                                 | Optional | Required | Default |
| ---------- | -------------------------- | ------------------------------------ | -------- | -------- | ------- |
| target     | boolean or array or object | `boolean`/`ArrayOneMore<ExtendData>` | -        | true     | -       |
| ...args    | array or object            | `ArrayOneMore<ExtendData>`           | -        | true     | -       |

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
| target     | any target  | `any` | -        | true     | -       |

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
declare function getType(target: any): string
```

#### cleanData

Data cleaning methods

- Since: `1.0.2`

- Arguments:

| Parameters | Description                                                                                        | Type             | Optional | Required | Default |
| ---------- | -------------------------------------------------------------------------------------------------- | ---------------- | -------- | -------- | ------- |
| data       | the object to be cleaned                                                                           | `object`         | -        | true     | -       |
| map        | the data queue to be cleaned, can be passed as array or object                                     | `array`/`object` | -        | true     | -       |
| nullFix    | the value returned if there is no corresponding property, the default does not return the property | `any`            | -        | false    | -       |

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
| url        | url link      | `string` | -                                  | true     | -          |
| filename   | file name     | `string` | -                                  | true     | -          |
| type       | download type | `string` | `href`/`open`/`download`/`request` | false    | `download` |

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
| tree       | tree object                                          | `array`/`object` | -        | true     | -       |
| expression | required Query method                                | `any`            | -        | true     | -       |
| keySet     | optional Default subclass name, query name           | `SearchKeySet`   | -        | true     | -       |
| number     | optional Number of lookups, if not passed, query all | `number`         | -        | false    | -       |

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
| url        | http url    | `string` | -        | true     | -       |

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
| value      | any value   | `any` | -        | true     | -       |

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
| num        | the number  | `string`/`number` | -        | true     | -       |

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
| arr        | the target array    | `array`    | -        | true     | -       |
| fn         | the judgment method | `function` | -        | true     | -       |

- Returns: `boolean`

- Example:

```ts
all([4, 2, 3], x => x > 1) // true
```

- Types:

```ts
declare const all: (arr: any[], fn: AnyFunction) => boolean
```

#### any

Returns true if the provided predicate function returns true for at least one element of a set, false otherwise

- Since: `1.0.9`

- Arguments:

| Parameters | Description         | Type       | Optional | Required | Default |
| ---------- | ------------------- | ---------- | -------- | -------- | ------- |
| arr        | the target array    | `array`    | -        | true     | -       |
| fn         | the judgment method | `function` | -        | true     | -       |

- Returns: `boolean`

- Example:

```ts
any([0, 1, 2, 0], x => x >= 2) // true
```

- Types:

```ts
declare const any: (arr: any[], fn: AnyFunction) => boolean
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
| data         | csv data                               | `string`  | -        | true     | -       |
| delimiter    | delimiter                              | `string`  | -        | false    | ','     |
| omitFirstRow | the first row is the table header data | `boolean` | -        | false    | `false` |

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
| arr        | json data   | `array`  | -        | true     | -       |
| delimiter  | delimiter   | `string` | -        | false    | ','     |

- Returns: `string`

- Example:

```ts
arrayToCSV([
  ['a', 'b'],
  ['c', 'd']
]) // '"a", "b" \n "c", "d"'
arrayToCSV(
  [
    ['a', 'b'],
    ['c', 'd']
  ],
  ';'
) // '"a"; "b"\n "c"; "d"'
arrayToCSV([
  ['a', '"b" great'],
  ['c', 3.1415]
]) // '"a", """b"" great"\n "c",3.1415'
```

- Types:

```ts
declare function arrayToCSV(data: string, delimiter?: string): any[]
```

#### CSVToJSON

Converts a comma-separated string of values (CSV) to an array of 2D objects. The first line of the string is used as the header line.

- Since: `1.0.9`

- Arguments:

| Parameters | Description | Type     | Optional | Required | Default |
| ---------- | ----------- | -------- | -------- | -------- | ------- |
| data       | csv data    | `string` | -        | true     | -       |
| delimiter  | delimiter   | `string` | -        | false    | ','     |

- Returns: `string`

- Example:

```ts
CSVToJSON('col1,col2\\na,b\\\nc,d') // `[{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]`
CSVToJSON('col1;col2\\\na;b\\\nc;d', ';') // `[{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]`
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
| arr        | json data             | `array`  | -        | true     | -       |
| columns    | the specified columns | `array`  | -        | true     | -       |
| delimiter  | delimiter             | `string` | -        | false    | ','     |

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
| r          | the 1st value of RGB | `number` | -        | true     | -       |
| g          | RGB's 2nd value      | `number` | -        | true     | -       |
| b          | RGB's 3nd value      | `number` | -        | true     | -       |

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
| ...arr     | array targets | `array` | -        | true     | -       |

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
| ...arr     | array targets | `array` | -        | true     | -       |

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
| ...arr     | array targets | `array` | -        | true     | -       |

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
| ...arr     | array targets | `array` | -        | true     | -       |

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
| arr        | array target     | `array` | -        | true     | -       |
| item       | any array member | `any`   | -        | true     | -       |

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
| arr        | array target | `array` | -        | true     | -       |

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
| ip         | ip address  | `string` | -        | true     | -       |

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

- Since: `2.2.4`

- Arguments:

| Parameters | Description                     | Type                | Optional | Required | Default |
| ---------- | ------------------------------- | ------------------- | -------- | -------- | ------- |
| target     | target array, object            | `array`/`object`    | -        | true     | -       |
| prop       | query target, can pass function | `string`/`function` | -        | true     | -       |

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
getProperty(target, 'a') // 1
getProperty(target, 'b[0].c') // 2
getProperty(target, () => 'a') // 1
```

- Types:

```ts
declare function getProperty(
  target: any,
  prop:
    | string
    | {
        (): string
      }
): any
```

#### setProperty

Set array, object property values based on path string

- Since: `2.7.0`

- Arguments:

| Parameters | Description                                      | Type                | Optional | Required | Default |
| ---------- | ------------------------------------------------ | ------------------- | -------- | -------- | ------- |
| target     | target array, object                             | `array`/`object`    | -        | true     | -       |
| prop       | set target, can pass function, 'a' \| 'a\[1\].c' | `string`/`function` | -        | true     | -       |
| value      | value                                            | `any`               | -        | true     | -       |

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
setProperty(target, 'a') // 1
setProperty(target, 'b[0].c') // 2
setProperty(target, () => 'a') // 1
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
| url        | link to the resource, type must be passed when passing in styleString | `string`        | -        | true     | -       |
| options    | parameters: attrs, props, force                                       | `SourceOptions` | -        | false    | -       |

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
| url        | resource url                    | `string`     | -        | true     | -       |
| options    | parameters: attrs, props, force | `CssOptions` | -        | false    | -       |

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
| url        | resource url                    | `string`     | -        | true     | -       |
| options    | parameters: attrs, props, force | `ImgOptions` | -        | false    | -       |

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
| url        | resource url                    | `string`    | -        | true     | -       |
| options    | parameters: attrs, props, force | `JsOptions` | -        | false    | -       |

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
| url        | resource url                    | `string`       | -        | true     | -       |
| options    | parameters: attrs, props, force | `StyleOptions` | -        | false    | -       |

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

#### awaitTo

Async await wrapper for easy error handling

- Since: `5.2.0`

- Arguments:

| Parameters | Description      | Type      | Optional | Required | Default |
| ---------- | ---------------- | --------- | -------- | -------- | ------- |
| promise    | promise function | `Promise` | -        | true     | -       |

- Returns: `[Error, undefined]` or `[null, data]`

- Example:

```ts
import { awaitTo as to } from 'js-cool'

const [err, data] = await to(
  axios({
    /* ... */
  })
)
if (err) {
  // handle request error
}
```

- Types:

```ts
declare function awaitTo<T, E = Error>(promise: Promise<T>): Promise<[E, undefined] | [null, T]>
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
