<div style="text-align: center;" align="center">

# js-cool

Collection of common JavaScript / TypeScript utilities

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
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

## Installation

```bash
## Install via npm
npm install --save js-cool

# Or install via yarn
yarn add js-cool

# or install via pnpm
pnpm install js-cool
```

## Use

### Introducing modules via import

```js
// Write import inside your .vue or main.js
import { osVersion, trim } from 'js-cool'
// Use
trim(somestring, type) // return the string after cleaning up the spaces
osVersion() // return the system version
// ...
```

### Ways to introduce using files

1. Introduce via require

   ```js
   // Add the following line to your main.js file
   const { osVersion } = require('js-cool')
   ```

2. html Static pages are used directly

   ```html
   <! -- Add script tags to your html code, using CDN links to bring in -->
   <script src="https://unpkg.com/js-cool@4.4.0/dist/index.global.prod.js"></script>
   ```

## Summary of all methods

```js
const functionList = {
  // global parameters
  client, // the client method returns a browser result object
  pattern, // pattern returns some common rules
  // String extensions, array methods
  trim, // removes spaces based on the passed parameters
  clearAttr, // remove all attributes of HTML tags
  clearHtml, // remove HTML tags
  getNumber, // Get the number in the string
  camel2Dash, // convert a humped string to -spaced and all lowercase dash mode
  dash2Camel, // convert -spaced all-lowercase dash pattern to camel string
  randomNumber, // Get a random integer
  randomString, // get a random string
  getCHSLength, // get the length of the string, Chinese counts as 2 characters
  cutCHSString, // get the string, Chinese count as 2 bytes
  // Get a status
  isDigitals, // whether it is a string composed of numbers
  isExitsFunction, // if the specified function exists
  isExitsVariable, // if the specified variable exists
  isWindow, // Determine if window object
  isObject, // Determine if the type is an object
  inBrowser, // Determine if it is running on the browser side
  windowSize, // windowSize to get the window size
  getAppVersion, // Get the app version number(deprecated)
  appVersion, // Get the app version number
  getOsVersion, // get the system name and version(deprecated)
  osVersion, // get the system version
  compareVersion, // compare the version number size
  parseUrlParam, // parse url params (key1=value1&key2=value2)
  getDirParam, // get the URL parameter in the form of a directory
  getQueryParam, // Get a single query parameter (behind "#")
  getQueryParams, // Get all query parameters (behind "#")
  getUrlParam, // Get a single URL parameter
  getUrlParams, // Get all URL parameters
  // cache, cookie, session
  getCache, // read localStorage
  setCache, // write to localStorage
  delCache, // delete localStorage
  getSession, // read sessionStorage
  setSession, // write to sessionStorage
  delSession, // delete sessionStorage
  getCookie, // read cookie
  setCookie, // write a cookie
  delCookie, // delete a cookie
  // Encode and decode
  encodeBase64, // convert strings, numbers to base64
  encodeUtf8, // encode Utf8
  decodeBase64, // base64 decode
  decodeUtf8, // decode Utf8
  // event delegate, other event methods
  stopBubble, // stop bubbling
  stopDefault, // stop default events
  addEvent, // event delegate, support multiple delegates
  removeEvent, // removeEvent removes the event delegate created by addEvent
  getScrollPosition, // get scroll to top and bottom return 'top' 'bottom', recommend using flow limit
  // tool class
  nextIndex, // return the next zIndex value
  fixNumber, // truncate a few decimal places, not 0 for shortage
  extend, // deep copy
  delay, // anti-dither throttling
  getType, // get the target type
  isArray, // Determine if it is an array
  cleanData, // clean data
  download, // file download
  searchObject, // find object
  openUrl, // open link in a new tab (file jump download if browser can't parse)
  copy, // copy to the clipboard
  toThousands, // Thousands division method
  all, // return true if the provided predicate function returns true for all elements in a set, otherwise return false.
  any, // Returns true if the provided predicate function returns true for at least one element of a set, false otherwise.
  uuid, // generate uuid on browser side, use v4 method
  CSVToArray, // csv to json, array conversion
  arrayToCSV, // convert csv to json, array
  CSVToJSON, // csv to json, array conversion
  JSONToCSV, // csv to json, array conversion
  RGBToHex, // Convert RGB component values to color codes.
  intersect, // find intersection of multiple arrays
  union, // find the union of multiple arrays
  minus, // find the difference of multiple arrays, which belong to A but not B/C/D... elements of
  complement, // find the complement of multiple arrays
  contains, // whether the array contains the specified element
  unique, // array de-duplication
  fillIPv6, // ipv6 address completion
  getProperty, // Get array, object property values based on path string
  setProperty, // set array, object property values based on path string
  loadSource, // load resources dynamically, support js, images, css links, css style strings
  mountCss, // dynamically load css link resources
  mountImg, // load image resource dynamically
  mountJs, // load js link resources dynamically
  mountStyle // load css styles dynamically
}
```

## API Reference

### global parameters

client, // the client method returns a browser result object
pattern, // pattern returns some common rules

### String extensions, array methods

trim, // removes spaces based on the passed parameters
clearAttr, // remove all attributes of HTML tags
clearHtml, // remove HTML tags
getNumber, // Get the number in the string
camel2Dash, // convert a humped string to -spaced and all lowercase dash mode
dash2Camel, // convert -spaced all-lowercase dash pattern to camel string
randomNumber, // Get a random integer
randomString, // get a random string
getCHSLength, // get the length of the string, Chinese counts as 2 characters
cutCHSString, // get the string, Chinese count as 2 bytes

### Get a status

isDigitals, // whether it is a string composed of numbers
isExitsFunction, // if the specified function exists
isExitsVariable, // if the specified variable exists
isWindow, // Determine if window object
isObject, // Determine if the type is an object
inBrowser, // Determine if it is running on the browser side
windowSize, // windowSize to get the window size
getAppVersion, // Get the app version number(deprecated)

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

getOsVersion, // get the system name and version(deprecated)

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

compareVersion, // compare the version number size
parseUrlParam, // parse url params (key1=value1&key2=value2)
getDirParam, // get the URL parameter in the form of a directory
getQueryParam, // Get a single query parameter (behind "#")
getQueryParams, // Get all query parameters (behind "#")
getUrlParam, // Get a single URL parameter
getUrlParams, // Get all URL parameters

### cache, cookie, session

getCache, // read localStorage
setCache, // write to localStorage
delCache, // delete localStorage
getSession, // read sessionStorage
setSession, // write to sessionStorage
delSession, // delete sessionStorage
getCookie, // read cookie
setCookie, // write a cookie
delCookie, // delete a cookie

### Encode and decode

encodeBase64, // convert strings, numbers to base64
encodeUtf8, // encode Utf8
decodeBase64, // base64 decode
decodeUtf8, // decode Utf8

### event delegate, other event methods

stopBubble, // stop bubbling
stopDefault, // stop default events
addEvent, // event delegate, support multiple delegates
removeEvent, // removeEvent removes the event delegate created by addEvent
getScrollPosition, // get scroll to top and bottom return 'top' 'bottom', recommend using flow limit

### tool class

nextIndex, // return the next zIndex value
fixNumber, // truncate a few decimal places, not 0 for shortage
extend, // deep copy
delay, // anti-dither throttling
getType, // get the target type
isArray, // Determine if it is an array
cleanData, // clean data
download, // file download
searchObject, // find object
openUrl, // open link in a new tab (file jump download if browser can't parse)
copy, // copy to the clipboard
toThousands, // Thousands division method
all, // return true if the provided predicate function returns true for all elements in a set, otherwise return false.
any, // Returns true if the provided predicate function returns true for at least one element of a set, false otherwise.
uuid, // generate uuid on browser side, use v4 method
CSVToArray, // csv to json, array conversion
arrayToCSV, // convert csv to json, array
CSVToJSON, // csv to json, array conversion
JSONToCSV, // csv to json, array conversion
RGBToHex, // Convert RGB component values to color codes.
intersect, // find intersection of multiple arrays
union, // find the union of multiple arrays
minus, // find the difference of multiple arrays, which belong to A but not B/C/D... elements of
complement, // find the complement of multiple arrays
contains, // whether the array contains the specified element
unique, // array de-duplication
fillIPv6, // ipv6 address completion
getProperty, // Get array, object property values based on path string
setProperty, // set array, object property values based on path string
loadSource, // load resources dynamically, support js, images, css links, css style strings
mountCss, // dynamically load css link resources
mountImg, // load image resource dynamically
mountJs, // load js link resources dynamically
mountStyle // load css styles dynamically

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/js-cool/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/js-cool.svg?style=flat-square
[npm-url]: https://npmjs.org/package/js-cool
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/js-cool/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/js-cool&utm_campaign=Badge_Grade
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
