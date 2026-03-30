# API Reference

Welcome to the js-cool API reference documentation.

## Categories

### [String](/api/string/camel2-dash)

String manipulation utilities - 14 functions

### [Array](/api/array/unique)

Array processing utilities - 18 functions

### [Object](/api/object/clone)

Object manipulation utilities - 13 functions

### [Type Check](/api/object/get-type)

Type checking utilities - 14 functions

### [Validate](/api/validate/is-email)

Validation functions - 5 functions

### [URL & Browser](/api/url/ua)

URL parsing and browser detection - 10 functions

### [DOM](/api/dom/add-event)

DOM manipulation utilities - 13 functions

### [Storage](/api/storage/)

Browser storage utilities - uses object API

### [Convert](/api/convert/csv-to-json)

Format conversion utilities - 3 functions

### [Number](/api/number/clamp)

Number processing utilities - 5 functions

### [Date](/api/date/format-date)

Date processing utilities - 20+ functions

### [Color](/api/color/hex-to-rgb)

Color manipulation utilities - 5 functions

### [Utility](/api/utility/delay)

General utility functions - 16 functions

### [Scroll](/api/storage/)

Scroll utilities - uses object API

### [Async Flow](/api/async/debounce)

Async flow control - 3 functions

### [Encode](/api/string/encode-utf8)

Encoding and decoding utilities - 4 functions

### [Network](/api/network/fill-ipv6)

Network utilities - 1 function

## Function Index

### String

| Function                                   | Description                     |
| ------------------------------------------ | ------------------------------- |
| [camel2Dash](/api/string/camel2-dash)      | Convert camelCase to kebab-case |
| [dash2Camel](/api/string/dash2-camel)      | Convert kebab-case to camelCase |
| [upperFirst](/api/string/upper-first)      | Capitalize first letter         |
| [kebabCase](/api/string/kebab-case)        | Convert to kebab-case           |
| [snakeCase](/api/string/snake-case)        | Convert to snake_case           |
| [truncate](/api/string/truncate)           | Truncate string                 |
| [clearHtml](/api/string/clear-html)        | Remove HTML tags                |
| [clearAttr](/api/string/clear-attr)        | Remove HTML attributes          |
| [cutCHSString](/api/string/cut-chs-string) | Cut Chinese string              |
| [getCHSLength](/api/string/get-chs-length) | Get Chinese string length       |
| [mapTemplate](/api/string/map-template)    | Template string replacement     |
| [escape](/api/string/escape)               | Escape HTML                     |
| [unescape](/api/string/unescape)           | Unescape HTML                   |

### Array

| Function                                 | Description              |
| ---------------------------------------- | ------------------------ |
| [unique](/api/array/unique)              | Remove duplicates        |
| [shuffle](/api/array/shuffle)            | Random shuffle           |
| [sorter](/api/array/sorter)              | Sort by key              |
| [sortPinyin](/api/array/sort-pinyin)     | Sort by pinyin           |
| [chunk](/api/array/chunk)                | Split into chunks        |
| [flatten](/api/array/flatten)            | Flatten array            |
| [groupBy](/api/array/group-by)           | Group by key             |
| [keyBy](/api/array/key-by)               | Map by key               |
| [sample](/api/array/sample)              | Get random element       |
| [sampleSize](/api/array/sample-size)     | Get N random elements    |
| [intersect](/api/array/intersect)        | Array intersection       |
| [union](/api/array/union)                | Array union              |
| [minus](/api/array/minus)                | Array difference         |
| [complement](/api/array/complement)      | Array complement         |
| [contains](/api/array/contains)          | Check if contains        |
| [all](/api/array/all)                    | Check all pass           |
| [any](/api/array/any)                    | Check any pass           |
| [searchObject](/api/array/search-object) | Search in nested objects |

### Object

| Function                                    | Description          |
| ------------------------------------------- | -------------------- |
| [clone](/api/object/clone)                  | Deep clone           |
| [extend](/api/object/extend)                | Extend object        |
| [getProperty](/api/object/get-property)     | Get property by path |
| [setProperty](/api/object/set-property)     | Set property by path |
| [omit](/api/object/omit)                    | Omit properties      |
| [pick](/api/object/pick)                    | Pick properties      |
| [cleanData](/api/object/clean-data)         | Clean data           |
| [safeParse](/api/object/safe-parse)         | Safe JSON parse      |
| [safeStringify](/api/object/safe-stringify) | Safe JSON stringify  |
| [arrayToCSV](/api/array/array-to-csv)       | Array to CSV         |
| [CSVToArray](/api/array/csv-to-array)       | CSV to array         |

### Type Check

| Function                                     | Description             |
| -------------------------------------------- | ----------------------- |
| [getType](/api/object/get-type)              | Get type                |
| [isArray](/api/object/is-array)              | Check if array          |
| [isObject](/api/object/is-object)            | Check if object         |
| [isPlainObject](/api/object/is-plain-object) | Check if plain object   |
| [isDate](/api/object/is-date)                | Check if date           |
| [isRegExp](/api/object/is-reg-exp)           | Check if regexp         |
| [isWindow](/api/object/is-window)            | Check if window         |
| [isIterable](/api/object/is-iterable)        | Check if iterable       |
| [isEqual](/api/object/is-equal)              | Check if equal          |
| [isEmpty](/api/object/is-empty)              | Check if empty          |
| [isNil](/api/object/is-nil)                  | Check if null/undefined |

### Validate

| Function                                     | Description          |
| -------------------------------------------- | -------------------- |
| [isEmail](/api/validate/is-email)            | Validate email       |
| [isPhone](/api/validate/is-phone)            | Validate phone       |
| [isURL](/api/validate/is-url)                | Validate URL         |
| [isIDCard](/api/validate/is-id-card)         | Validate ID card     |
| [isCreditCard](/api/validate/is-credit-card) | Validate credit card |

### URL & Browser

| Function                                   | Description          |
| ------------------------------------------ | -------------------- |
| [Url](/api/url/Url-class)                  | URL parsing class    |
| [url](/api/url/url)                        | URL utilities        |
| [getDirParams](/api/url/get-dir-params)    | Get directory params |
| [ua](/api/url/ua)                          | User-Agent detection |
| [appVersion](/api/url/app-version)         | App version          |
| [browserVersion](/api/url/browser-version) | Browser version      |
| [osVersion](/api/url/os-version)           | OS version           |
| [compareVersion](/api/url/compare-version) | Compare versions     |
| [nextVersion](/api/url/next-version)       | Get next version     |

### DOM

| Function                             | Description           |
| ------------------------------------ | --------------------- |
| [addEvent](/api/dom/add-event)       | Add event listener    |
| [removeEvent](/api/dom/remove-event) | Remove event listener |
| [stopBubble](/api/dom/stop-bubble)   | Stop bubbling         |
| [stopDefault](/api/dom/stop-default) | Stop default          |
| [copy](/api/dom/copy)                | Copy to clipboard     |
| [windowSize](/api/dom/window-size)   | Get window size       |
| [download](/api/dom/download)        | Download file         |
| [openUrl](/api/dom/open-url)         | Open URL              |
| [preloader](/api/dom/preloader)      | Preloader             |
| [inBrowser](/api/dom/in-browser)     | Check if in browser   |
| [inNodeJs](/api/dom/in-node-js)      | Check if in Node.js   |
| [isDarkMode](/api/dom/is-dark-mode)  | Check if dark mode    |

### Storage

Use the object API: `local`, `session`, `cookie`

```js
import { local, session, cookie } from 'js-cool'

local.set('key', 'value')
local.get('key')
session.set('key', 'value')
cookie.set('key', 'value')
```

### Convert

| Function                           | Description   |
| ---------------------------------- | ------------- |
| [CSVToJSON](/api/convert/csv-to-json) | CSV to JSON   |
| [JSONToCSV](/api/convert/json-to-csv) | JSON to CSV   |
| [RGBToHex](/api/convert/rgb-to-hex)   | RGB to Hex    |

### Number

| Function                        | Description       |
| ------------------------------- | ----------------- |
| [clamp](/api/number/clamp)      | Clamp number      |
| [round](/api/number/round)      | Round number      |
| [sum](/api/number/sum)          | Sum array         |
| [average](/api/number/average)  | Average array     |
| [inRange](/api/number/in-range) | Check if in range |

### Date

| Function                                        | Description          |
| ----------------------------------------------- | -------------------- |
| [formatDate](/api/date/format-date)             | Format date          |
| [dateDiff](/api/date/date-diff)                 | Date difference      |
| [relativeTime](/api/date/relative-time)         | Relative time        |
| [isToday](/api/date/is-today)                   | Check if today       |
| [isYesterday](/api/date/is-yesterday)           | Check if yesterday   |
| [isTomorrow](/api/date/is-tomorrow)             | Check if tomorrow    |
| [isWeekend](/api/date/is-weekend)               | Check if weekend     |
| [isLeapYear](/api/date/is-leap-year)            | Check if leap year   |
| [isBefore](/api/date/is-before)                 | Check if before      |
| [isAfter](/api/date/is-after)                   | Check if after       |
| [isSame](/api/date/is-same)                     | Check if same        |
| [isBetween](/api/date/is-between)               | Check if between     |
| [getDaysInMonth](/api/date/get-days-in-month)   | Get days in month    |
| [getQuarter](/api/date/get-quarter)             | Get quarter          |
| [getWeekOfYear](/api/date/get-week-of-year)     | Get week of year     |
| [getDayOfYear](/api/date/get-day-of-year)       | Get day of year      |
| [addDate](/api/date/add-date)                   | Add time             |
| [subtractDate](/api/date/subtract-date)         | Subtract time        |
| [startOf](/api/date/start-of)                   | Get start of period  |
| [endOf](/api/date/end-of)                       | Get end of period    |
| [compareDate](/api/date/compare-date)           | Compare dates        |
| [minDate](/api/date/min-date)                   | Minimum date         |
| [maxDate](/api/date/max-date)                   | Maximum date         |

### Color

| Function                              | Description   |
| ------------------------------------- | ------------- |
| [hexToRGB](/api/color/hex-to-rgb)     | Hex to RGB    |
| [rgbToHSL](/api/color/rgb-to-hsl)     | RGB to HSL    |
| [lighten](/api/color/lighten)         | Lighten color |
| [darken](/api/color/darken)           | Darken color  |
| [isLightColor](/api/color/is-light-color) | Check if light color |

### Utility

| Function                                         | Description      |
| ------------------------------------------------ | ---------------- |
| [delay](/api/utility/delay)                      | Delay execution  |
| [uuid](/api/utility/uuid)                        | Generate UUID    |
| [randomString](/api/utility/random-string)       | Random string    |
| [randomNumber](/api/utility/random-number)       | Random number    |
| [getGlobal](/api/utility/get-global)             | Get global value |
| [getNumber](/api/utility/get-number)             | Get number       |
| [fixNumber](/api/utility/fix-number)             | Fix number       |
| [nextIndex](/api/utility/next-index)             | Next index       |
| [toThousands](/api/utility/to-thousands)         | To thousands     |
| [fingerprint](/api/utility/fingerprint)          | Browser fingerprint |
| [getFileType](/api/utility/get-file-type)        | Get file type    |
| [randomColor](/api/utility/random-color)         | Random color     |
| [promiseFactory](/api/utility/promise-factory)   | Promise factory  |
| [punctualTimer](/api/utility/punctual-timer)     | Punctual timer   |
| [waiting](/api/utility/waiting)                  | Waiting utility  |
| [patterns](/api/utility/patterns)                | Regex patterns   |

### Scroll

Use the scroll object API:

```js
import { scroll, scrollTo, scrollToTop, scrollToBottom, lockScroll, unlockScroll } from 'js-cool'

scrollTo(element)
scrollToTop()
lockScroll()
```

### Async Flow

| Function                        | Description       |
| ------------------------------- | ----------------- |
| [debounce](/api/async/debounce) | Debounce function |
| [throttle](/api/async/throttle) | Throttle function |
| [retry](/api/async/retry)       | Retry function    |
