# URL 工具

js-cool 提供了 URL 解析和处理工具。

## 参数解析

### getUrlParams

将 URL 参数解析为对象。

```js
import { getUrlParams } from 'js-cool'

getUrlParams('https://example.com?name=John&age=30')
// { name: 'John', age: '30' }

// 使用当前 URL
getUrlParams() // 使用 window.location.search
```

### getQueryParam

获取单个 URL 参数值。

```js
import { getQueryParam } from 'js-cool'

getQueryParam('https://example.com?name=John&age=30', 'name')
// 'John'
```

### getQueryParams

获取多个 URL 参数值。

```js
import { getQueryParams } from 'js-cool'

getQueryParams('https://example.com?name=John&age=30', ['name', 'age'])
// { name: 'John', age: '30' }
```

### parseUrlParam

解析 URL 参数并转换类型。

```js
import { parseUrlParam } from 'js-cool'

parseUrlParam('?count=100&active=true&price=99.99', true)
// { count: 100, active: true, price: 99.99 }
```

### getDirParam

获取目录风格的 URL 参数。

```js
import { getDirParam } from 'js-cool'

// URL: /api/users/123/posts/456
getDirParam('/api/users/:userId/posts/:postId')
// { userId: '123', postId: '456' }
```

## URL 构建

### spliceUrlParam

拼接参数到 URL。

```js
import { spliceUrlParam } from 'js-cool'

spliceUrlParam('https://example.com', { name: 'John', age: 30 })
// 'https://example.com?name=John&age=30'

spliceUrlParam('https://example.com?name=John', { age: 30 })
// 'https://example.com?name=John&age=30'
```

## 浏览器信息

### client

获取浏览器/客户端信息。

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

// 检查特定浏览器
client('MicroMessenger') // 微信浏览器返回 true
```

### appVersion

从 UserAgent 获取应用版本。

```js
import { appVersion } from 'js-cool'

appVersion('Chrome') // '120.0.0.0'
```

### browserVersion

获取浏览器版本。

```js
import { browserVersion } from 'js-cool'

browserVersion() // { chrome: '120.0.0.0', ... }
```

## 版本比较

### compareVersion

比较两个版本号。

```js
import { compareVersion } from 'js-cool'

compareVersion('1.2.3', '1.2.4') // -1
compareVersion('1.2.4', '1.2.3') // 1
compareVersion('1.2.3', '1.2.3') // 0
```

### nextVersion

获取下一个版本号。

```js
import { nextVersion } from 'js-cool'

nextVersion('1.2.3') // '1.2.4'
nextVersion('1.2.9', 'patch') // '1.2.10'
nextVersion('1.2.9', 'minor') // '1.3.0'
nextVersion('1.2.9', 'major') // '2.0.0'
```

## 相关

- [URL API 参考](/zh/api/)
