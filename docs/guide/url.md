# URL Utilities

js-cool provides URL parsing and manipulation utilities.

## Parameter Parsing

### getUrlParams

Parse URL parameters into an object.

```js
import { getUrlParams } from 'js-cool'

getUrlParams('https://example.com?name=John&age=30')
// { name: 'John', age: '30' }

// Works with current URL
getUrlParams() // Uses window.location.search
```

### getQueryParam

Get a single URL parameter value.

```js
import { getQueryParam } from 'js-cool'

getQueryParam('https://example.com?name=John&age=30', 'name')
// 'John'
```

### getQueryParams

Get multiple URL parameter values.

```js
import { getQueryParams } from 'js-cool'

getQueryParams('https://example.com?name=John&age=30', ['name', 'age'])
// { name: 'John', age: '30' }
```

### parseUrlParam

Parse URL parameters with type conversion.

```js
import { parseUrlParam } from 'js-cool'

parseUrlParam('?count=100&active=true&price=99.99', true)
// { count: 100, active: true, price: 99.99 }
```

### getDirParam

Get directory-style URL parameters.

```js
import { getDirParam } from 'js-cool'

// URL: /api/users/123/posts/456
getDirParam('/api/users/:userId/posts/:postId')
// { userId: '123', postId: '456' }
```

## URL Building

### spliceUrlParam

Splice parameters into URL.

```js
import { spliceUrlParam } from 'js-cool'

spliceUrlParam('https://example.com', { name: 'John', age: 30 })
// 'https://example.com?name=John&age=30'

spliceUrlParam('https://example.com?name=John', { age: 30 })
// 'https://example.com?name=John&age=30'
```

## Browser Info

### client

Get browser/client information.

```js
import { client } from 'js-cool'

client()
// {
//   IE: false,
//   GECKO: true,
//   WEBKIT: false,
//   OPERA: false,
//   TRIDENT: false,
//   MOBILE: true,
//   IOS: true,
//   ANDROID: false,
//   IPHONE: true,
//   IPAD: false,
//   WEIXIN: false,
//   QQBROWSER: false
// }

// Check specific browser
client('MicroMessenger') // true if WeChat browser
```

### appVersion

Get app version from user agent.

```js
import { appVersion } from 'js-cool'

appVersion('Chrome') // '120.0.0.0'
```

### browserVersion

Get browser version.

```js
import { browserVersion } from 'js-cool'

browserVersion() // { chrome: '120.0.0.0', ... }
```

## Version Comparison

### compareVersion

Compare two version strings.

```js
import { compareVersion } from 'js-cool'

compareVersion('1.2.3', '1.2.4') // -1
compareVersion('1.2.4', '1.2.3') // 1
compareVersion('1.2.3', '1.2.3') // 0
```

### nextVersion

Get next version number.

```js
import { nextVersion } from 'js-cool'

nextVersion('1.2.3') // '1.2.4'
nextVersion('1.2.9', 'patch') // '1.2.10'
nextVersion('1.2.9', 'minor') // '1.3.0'
nextVersion('1.2.9', 'major') // '2.0.0'
```

## See Also

- [URL API Reference](/api/)
