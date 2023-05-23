# Change logs

## 2023.05.23 v4.4.0

1. fix outputs
2. fix exports

## 2023.05.22 v4.3.0

1. fix export default
2. fix types
3. upgrade all packages

## 2023.05.21 v4.2.0

1. use `use-downloads`
2. some translate work

## 2023.05.20 v4.1.0

1. use `load-source` `mount-css` `mount-image` `mount-script` `mount-style`
2. some translate work

## 2023.05.18 v4.0.0

1. split `csv` into `arrayToCSV` `CSVToArray` `CSVToJSON` `JSONToCSV`
2. split `cache` into `setCache` `getCache` `delCache`
3. split `session`into `setSession` `getSession` `delSession`
4. split `cookie` into `setCookie` `getCookie` `delCookie`
5. drop `tslib` package
6. new build scripts & output

## 2023.04.07 v3.1.0

1. Optimize build output by removing `tslib` from the package

## 2023.04.06 v3.0.0

1. remove `imgAdapt` `imgChoose` `throttle` `debounce` `enWxJumpLink` `enWxJumpLinkOld` `deWxJumpLink` `deWxJumpLinkOld` `clearHtmlExpSN` ` clearHtmlN` `clearHtmlNS` `clearHtmlTag` `formatTime` `formatTimeStr` `getFileType` `clearBr`
2. move `arrayToCSV` `CSVToArray` `CSVToJSON` `JSONToCSV` to `csv`
3. move `setCache` `getCache` `delCache` to `cache`
4. move `setSession` `getSession` `delSession` to `session`
5. move `setCookie` `getCookie` `delCookie` to `cookie`
6. add `isPlainObject` function
7. support `const addEvent = require('js-cool/addEvent')` This introduction method
8. build product differentiate between esnext and es5, default output esnext
9. `splitThousand` => `toThousands`
10. `getWindowSize` => `windowSize`
11. new `extend` function

## 2022.12.13 v2.8.0

1. `loadSource` `mountCss` `mountImg` `mountJs` `mountStyle` new support for passing in custom properties, adjusting the input form, and improving the ts type, fixing IE compatibility issues
2. dependency package upgrade

## 2022.12.07 v2.7.1

Extend the types supported by `getType` method.

## 2022.12.04 v2.7.0

1. add `setProperty` method
2. fix getProperty bug

## 2022.12.04 v2.6.0

1. add `loadSource` `mountCss` `mountImg` `mountJs` `mountStyle` 5 methods
2. upgrade the dependency package

## 2022.09.10 v2.5.0

1. adjust exports export method, focus on supporting node esm mode
2. optimize build scripts
3. upgrade dependency packages

## 2022.08.23 v2.4.0

1. upgrade dependency packages
2. optimize the build process

## 2022.03.12 v2.3.2

1. upgrade dependency packages
2. optimize the documentation

## 2022.02.25 v2.3.1

1. fix `tslib` package issue

## 2021.11.11 v2.3.0

1. export module to keep default
2. upgrade dependency package

## 2021.10.23 v2.2.4

1. add getProperty method

## 2021.10.19 v2.2.3

1. improve fillIPv6 method

## 2021.10.18 v2.2.2

1. add fillIPv6 method

## 2021.10.15 v2.2.1

1. add methods to find the intersection, concatenation, difference and complement of multiple arrays
2. add contains method
3. add a unique method for de-duplication

## 2021.09.21 v2.1.3

1. build output banner

## 2021.09.10 v2.1.2

1. improve typescript types
2. upgrade dependency package

## 2021.09.02 v2.1.1

1. refine typescript types

## 2021.08.29 v2.1.0

1. add build es module

## 2021.08.28 v2.0.1

1. fix several issues
2. optimize code, optimize documentation

## 2021.08.26 v2.0.0

1. refactor all the code to typescript
2. rewrite method comments according to tsdoc specification

## 2021.07.26 v1.1.0

1. use webpack to build umd package

## 2021.03.03 v1.0.9

1. add all/any/RGBToHex/uuid methods
2. add CSV to object conversion methods: arrayToCSV/CSVToArray/CSVToJSON/JSONtoCSV

## 2021.03.02 v1.0.8

1. add splitThousand method

## 2021.03.01 v1.0.7

1. fix nextIndex bug

## 2021.02.18 v1.0.6

1. add openUrl method

## 2021.02.18 v1.0.5

1. add download/searchTreeObject method

## 2021.02.08 v1.0.4

1. update getCookie/setCookie methods

## 2021.02.01 v1.0.3

1. handle bugs

## 2021.01.23 v1.0.2

1. add nextIndex,fixNumber,delay,extend,getType,isArray,cleanData,getCache,setCache,delCache
2. delete getLocal,setLocal,delLocal

## 2020.12.14 v1.0.1

1. create project
