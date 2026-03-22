# 快速上手

## 引入方式

### 按需引入（推荐）

只引入你需要的函数，支持 Tree-shaking：

```js
import { camel2Dash, unique, clone } from 'js-cool'
```

### 全量引入

```js
import * as JsCool from 'js-cool'

JsCool.camel2Dash('fontSize')
```

### CommonJS

```js
const { camel2Dash, unique } = require('js-cool')
```

## 使用示例

### 字符串工具

```js
import { camel2Dash, dash2Camel, encodeBase64, decodeBase64 } from 'js-cool'

// 驼峰转短横线
camel2Dash('fontSize') // 'font-size'

// 短横线转驼峰
dash2Camel('font-size') // 'fontSize'

// Base64 编码
encodeBase64('Hello World') // 'SGVsbG8gV29ybGQ='

// Base64 解码
decodeBase64('SGVsbG8gV29ybGQ=') // 'Hello World'
```

### 数组工具

```js
import { unique, shuffle, arrayToCSV } from 'js-cool'

// 数组去重
unique([1, 2, 2, 3]) // [1, 2, 3]

// 数组乱序
shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]（随机）

// 数组转 CSV
arrayToCSV([
  ['name', 'age'],
  ['John', 30],
])
// "name,age\n"John",30"
```

### 对象工具

```js
import { clone, extend, cleanData } from 'js-cool'

// 深拷贝
const obj = { a: { b: 1 } }
const cloned = clone(obj)
cloned.a.b = 2
console.log(obj.a.b) // 1（原对象不变）

// 对象扩展
extend({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }

// 数据清洗 - 提取指定字段
cleanData({ name: 'John', password: '123' }, ['name'])
// { name: 'John' }
```

### URL 工具

```js
import { getUrlParams, parseUrlParam } from 'js-cool'

// 获取 URL 参数
getUrlParams('https://example.com?name=John&age=30')
// { name: 'John', age: '30' }

// 解析并转换类型
parseUrlParam('?count=100&active=true', true)
// { count: 100, active: true }
```

### DOM 工具

```js
import { copy, addEvent, removeEvent } from 'js-cool'

// 复制到剪贴板
copy('Hello World')

// 添加事件监听
const handler = e => console.log('clicked')
addEvent(document.getElementById('btn'), 'click', handler)

// 移除事件监听
removeEvent(document.getElementById('btn'), 'click', handler)
```

### 存储工具

```js
import { setCache, getCache, delCache, setCookie, getCookie } from 'js-cool'

// LocalStorage 带过期时间
setCache('user', { name: 'John' }, 3600) // 1小时后过期
getCache('user') // { name: 'John' }
delCache('user')

// Cookie 操作
setCookie('token', 'abc123', 86400)
getCookie('token') // 'abc123'
```

## 下一步

- [字符串工具](/zh/guide/string) - 了解更多字符串函数
- [数组工具](/zh/guide/array) - 了解更多数组函数
- [对象工具](/zh/guide/object) - 了解更多对象函数
- [API 参考](/zh/api/) - 完整 API 文档
