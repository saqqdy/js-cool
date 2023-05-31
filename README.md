<div style="text-align: center;" align="center">

# js-cool

This is a collection of js utils

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![build status][travis-image]][travis-url]
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
import { getOsVersion, trim } from 'js-cool'
// Use
trim(somestring, type) // return the string after cleaning up the spaces
getOsVersion() // return the system version
// ...
```

### Ways to introduce using files

1. Introduce via require

   ```js
   // Add the following line to your main.js file
   const { getOsVersion } = require('js-cool')
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
  getRandomNum, // Get a random integer
  getRandomStr, // get a random string
  getRandomStrWidthSpecialChar, // get a random string with special symbols
  getCHSLength, // get the length of the string, Chinese counts as 2 characters
  cutCHSString, // get the string, Chinese count as 2 bytes
  textareaInsertText, // textarea or input object to insert text at the specified cursor position
  textareaMoveToEnd, // textarea or input object to position the cursor to the end of the text
  // Get a status
  isDigitals, // whether it is a string composed of numbers
  isExitsFunction, // if the specified function exists
  isExitsVariable, // if the specified variable exists
  windowSize, // windowSize to get the window size
  getAppVersion, // Get the app version number
  getOsVersion, // get the system version of the phone
  getIsAppVersionLastest, // compare the version number size
  getDirParam, // get the URL parameter in the form of a directory
  getParameter, // Get a single URL parameter
  getUrlParam, // Get URL parameters
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
  searchTreeObject, // find object
  openUrl, // open link in a new tab (file jump download if browser can't parse)
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

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/js-cool/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/js-cool.svg?style=flat-square
[npm-url]: https://npmjs.org/package/js-cool
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/js-cool/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/js-cool&utm_campaign=Badge_Grade
[travis-image]: https://travis-ci.com/saqqdy/js-cool.svg?branch=master
[travis-url]: https://travis-ci.com/saqqdy/js-cool
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
