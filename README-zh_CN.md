<div align="center">

# js-cool

**JavaScript / TypeScript 常用工具函数库**

[![NPM version](https://img.shields.io/npm/v/js-cool.svg?style=flat-square)](https://npmjs.org/package/js-cool)
[![npm download](https://img.shields.io/npm/dm/js-cool.svg?style=flat-square)](https://npmjs.org/package/js-cool)
[![Test coverage](https://img.shields.io/codecov/c/github/saqqdy/js-cool.svg?style=flat-square)](https://codecov.io/github/saqqdy/js-cool)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
[![tree shaking](https://badgen.net/bundlephobia/tree-shaking/js-cool)](https://bundlephobia.com/package/js-cool)
[![gzip](http://img.badgesize.io/https://unpkg.com/js-cool/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS)](http://img.badgesize.io/https://unpkg.com/js-cool/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**[文档](https://www.saqqdy.com/js-cool)** • **[更新日志](./CHANGELOG.md)** • **[English](./README.md)**

</div>

---

## 安装

```bash
# pnpm
pnpm add js-cool

# npm
npm install js-cool

# yarn
yarn add js-cool
```

## 使用

```js
// ES Module
import { osVersion, copy, randomString } from 'js-cool'

// Node.js CommonJS
const { osVersion, copy, randomString } = require('js-cool')

// CDN (浏览器)
<script src="https://unpkg.com/js-cool/dist/index.global.prod.js"></script>
<script>
  jsCool.browserVersion()
</script>

// 直接导入 (支持 tree-shaking)
import copy from 'js-cool/copy'
import { randomString } from 'js-cool'
```

---

## API 参考

### 全局

#### client

浏览器检测工具。

```js
import { client } from 'js-cool'

// 获取所有浏览器信息
client.get(['device', 'browser', 'engine', 'os'])
// { device: 'Mobile', browser: 'Chrome', os: 'Android', engine: 'Blink' }

// 获取单个信息
client.get('browser')  // { browser: 'Chrome' }
client.get('device')   // { device: 'Mobile' }
client.get('os')       // { os: 'Android' }
client.get('engine')   // { engine: 'Blink' }

// 获取多个信息
client.get(['browser', 'os'])
// { browser: 'Chrome', os: 'Android' }

// 获取语言
client.getLanguage()  // 'zh-CN'

// 获取网络信息
client.getNetwork()  // { effectiveType: '4g', downlink: 10 }

// 获取屏幕方向
client.getOrientationStatus()  // 'vertical' | 'horizontal'
```

#### pattern

常用正则表达式集合。

```js
import { pattern } from 'js-cool'

// 邮箱验证
pattern.email.test('test@example.com')     // true
pattern.email.test('invalid-email')        // false

// 中国手机号
pattern.mobile.test('13800138000')         // true
pattern.mobile.test('12345678901')         // false

// URL 验证
pattern.url.test('https://example.com')    // true
pattern.url.test('ftp://files.server')     // true

// 数字验证
pattern.number.test('12345')               // true
pattern.number.test('12.34')               // true

// 中文字符
pattern.chinese.test('中文测试')           // true
pattern.chinese.test('test123')            // false

// QQ 号
pattern.qq.test('123456789')               // true

// 固定电话
pattern.tel.test('010-12345678')           // true
pattern.tel.test('021-87654321')           // true

// 邮编
pattern.postcode.test('100000')            // true

// 用户名 (字母数字下划线, 4-16位)
pattern.username.test('user_name')         // true

// 密码 (至少6位, 包含字母和数字)
pattern.pass.test('abc123')                // true

// JSON 字符串
pattern.json.test('{"a":1}')               // true

// MAC 地址
pattern.mac.test('00:1A:2B:3C:4D:5E')      // true

// IPv4 地址
pattern.ip4.test('192.168.1.1')            // true

// 私有 IPv4
pattern.ip4_pri.test('192.168.1.1')        // true
pattern.ip4_pri.test('10.0.0.1')           // true
pattern.ip4_pri.test('172.16.0.1')         // true
```

---

### 字符串

#### trim

去除字符串首尾空格。

```js
import { trim } from 'js-cool'

trim('  hello  ')        // 'hello'
trim('\nhello\n')        // 'hello'
trim('\thello\t')        // 'hello'
trim('  hello world  ')  // 'hello world'
```

#### clearAttr

去除 HTML 标签所有属性。

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

去除 HTML 标签。

```js
import { clearHtml } from 'js-cool'

clearHtml('<div>test<br/>string</div>')  // 'teststring'
clearHtml('<p>Hello <b>World</b></p>')   // 'Hello World'
clearHtml('<a href="#">link</a>')        // 'link'
clearHtml('plain text')                  // 'plain text'
```

#### escape / unescape

转义/还原 HTML 特殊字符。

```js
import { escape, unescape } from 'js-cool'

// 转义
escape('<div>test</div>')        // '&lt;div&gt;test&lt;/div&gt;'
escape('a < b & c > d')          // 'a &lt; b &amp; c &gt; d'
escape('"hello" & \'world\'')    // '&quot;hello&quot; &amp; &#39;world&#39;'

// 还原
unescape('&lt;div&gt;test&lt;/div&gt;')  // '<div>test</div>'
unescape('&amp;lt;')                     // '&lt;'
unescape('&quot;hello&quot;')            // '"hello"'
```

#### getNumber

从字符串中提取数字。

```js
import { getNumber } from 'js-cool'

getNumber('Chrome123.45')     // '123.45'
getNumber('price: $99.99')    // '99.99'
getNumber('version 2.0.1')    // '2.0.1'
getNumber('no numbers here')  // ''
getNumber('123abc456')        // '123456'
getNumber('-12.34')           // '-12.34'
```

#### camel2Dash / dash2Camel

驼峰与 kebab-case 互转。

```js
import { camel2Dash, dash2Camel } from 'js-cool'

// 驼峰转 kebab-case
camel2Dash('jsCool')          // 'js-cool'
camel2Dash('backgroundColor') // 'background-color'
camel2Dash('marginTop')       // 'margin-top'
camel2Dash('XMLHttpRequest')  // 'x-m-l-http-request'

// kebab-case 转驼峰
dash2Camel('js-cool')         // 'jsCool'
dash2Camel('background-color')// 'backgroundColor'
dash2Camel('margin-top')      // 'marginTop'
dash2Camel('-webkit-transform') // 'WebkitTransform'
```

#### upperFirst

首字母大写。

```js
import { upperFirst } from 'js-cool'

upperFirst('hello')      // 'Hello'
upperFirst('HELLO')      // 'HELLO'
upperFirst('h')          // 'H'
upperFirst('')           // ''
```

#### randomString

生成随机字符串（多种选项）。

```js
import { randomString } from 'js-cool'

// 默认：32位，包含大小写字母和数字
randomString()  // 'aB3dE7fG9hJ2kL5mN8pQ1rS4tU6vW0xY'

// 指定长度
randomString(8)   // 'xY7mN2pQ'
randomString(16)  // 'aB3dE7fG9hJ2kL5m'

// 使用选项对象
randomString({ length: 16 })
// 'kL5mN8pQ1rS4tU6v'

// 纯数字
randomString({ length: 6, charTypes: 'number' })
// '847291'

// 纯小写字母
randomString({ length: 8, charTypes: 'lowercase' })
// 'qwertyui'

// 纯大写字母
randomString({ length: 8, charTypes: 'uppercase' })
// 'ASDFGHJK'

// 多种字符类型
randomString({ length: 16, charTypes: ['uppercase', 'number'] })
// 'A3B7C9D2E5F8G1H4'

// 包含特殊字符
randomString({ length: 16, charTypes: ['lowercase', 'number', 'special'] })
// 'a1@b2#c3$d4%e5^f6'

// 所有字符类型
randomString({ length: 20, charTypes: ['uppercase', 'lowercase', 'number', 'special'] })
// 'A1a@B2b#C3c$D4d%E5e^'

// 排除易混淆字符 (o, O, 0, l, 1, I)
randomString({ length: 16, noConfuse: true })
// 'aB3dE7fG9hJ2kL5m' (不含 o, O, 0, l, 1, I)

// 严格模式：每种字符类型至少包含一个
randomString({ length: 16, charTypes: ['uppercase', 'lowercase', 'number'], strict: true })
// 保证至少包含1个大写、1个小写、1个数字

// 旧版 API（仍支持）
randomString(16, true)  // 16位包含特殊字符
randomString(true)      // 32位包含特殊字符
```

#### getCHSLength

获取字符串长度（中文=2字符）。

```js
import { getCHSLength } from 'js-cool'

getCHSLength('hello')       // 5
getCHSLength('你好')        // 4
getCHSLength('hello世界')   // 9 (5 + 4)
getCHSLength('测试Test')    // 8 (4 + 4)
getCHSLength('')            // 0
```

#### cutCHSString

截取字符串（中文=2字节）。

```js
import { cutCHSString } from 'js-cool'

cutCHSString('hello世界', 6)        // 'hello世'
cutCHSString('hello世界', 6, true)  // 'hello世...'
cutCHSString('测试字符串', 4)        // '测试'
cutCHSString('测试字符串', 4, true)  // '测试...'
cutCHSString('abc', 10)             // 'abc'
cutCHSString('abc', 10, true)       // 'abc'
```

---

### 数组

#### shuffle

打乱数组或字符串。

```js
import { shuffle } from 'js-cool'

// 打乱数组
shuffle([1, 2, 3, 4, 5])     // [3, 1, 5, 2, 4]
shuffle(['a', 'b', 'c'])     // ['c', 'a', 'b']

// 打乱字符串
shuffle('hello')             // 'olleh'
shuffle('abcdefg')           // 'gfedcba'

// 限制数量
shuffle([1, 2, 3, 4, 5], 3)  // [4, 1, 5] (随机取3个)
shuffle('hello', 3)          // 'leh' (随机取3个字符)
```

#### unique

数组去重。

```js
import { unique } from 'js-cool'

unique([1, 2, 2, 3, 3, 3])           // [1, 2, 3]
unique(['a', 'b', 'a', 'c'])         // ['a', 'b', 'c']
unique([1, '1', 1])                  // [1, '1']
unique([true, false, true])          // [true, false]
unique([null, null, undefined])      // [null, undefined]
```

#### intersect

多个数组求交集。

```js
import { intersect } from 'js-cool'

intersect([1, 2, 3], [2, 3, 4])              // [2, 3]
intersect([1, 2, 3], [2, 3, 4], [3, 4, 5])   // [3]
intersect(['a', 'b'], ['b', 'c'])            // ['b']
intersect([1, 2], [3, 4])                    // []
```

#### union

多个数组求并集。

```js
import { union } from 'js-cool'

union([1, 2], [3, 4])                // [1, 2, 3, 4]
union([1, 2], [2, 3])                // [1, 2, 3]
union([1, 2], [2, 3], [3, 4])        // [1, 2, 3, 4]
union(['a'], ['b'], ['c'])           // ['a', 'b', 'c']
```

#### minus

多个数组求差集（第一个数组有，其他数组没有的元素）。

```js
import { minus } from 'js-cool'

minus([1, 2, 3], [2, 3, 4])          // [1]
minus([1, 2, 3, 4], [2, 3])          // [1, 4]
minus([1, 2, 3], [2], [3])           // [1]
minus(['a', 'b', 'c'], ['b'])        // ['a', 'c']
```

#### complement

多个数组求补集（不在所有数组交集中的元素）。

```js
import { complement } from 'js-cool'

complement([1, 2], [2, 3])           // [1, 3]
complement([1, 2], [3, 4])           // [1, 2, 3, 4]
complement(['a', 'b'], ['b', 'c'])   // ['a', 'c']
```

#### contains

判断数组是否包含元素。

```js
import { contains } from 'js-cool'

contains([1, 2, 3], 2)           // true
contains([1, 2, 3], 4)           // false
contains(['a', 'b'], 'a')        // true
contains([null], null)           // true
contains([NaN], NaN)             // true
```

#### all / any

判断数组元素是否满足条件。

```js
import { all, any } from 'js-cool'

// all - 所有元素都满足
all([1, 2, 3], x => x > 0)           // true
all([1, 2, 3], x => x > 1)           // false
all(['a', 'b'], x => x.length === 1) // true
all([], x => x > 0)                  // true (空数组)

// any - 任一元素满足
any([1, 2, 3], x => x > 2)           // true
any([1, 2, 3], x => x > 10)          // false
any(['hello', 'world'], x => x.includes('o'))  // true
any([], x => x > 0)                  // false (空数组)
```

---

### 对象

#### extend

深度合并对象。

```js
import { extend } from 'js-cool'

// 浅拷贝
const result1 = extend({}, { a: 1 }, { b: 2 })
// { a: 1, b: 2 }

// 深度合并
const result2 = extend(true, {}, { a: { b: 1 } }, { a: { c: 2 } })
// { a: { b: 1, c: 2 } }

// 覆盖值
const result3 = extend(true, {}, { a: 1, b: 2 }, { b: 3 })
// { a: 1, b: 3 }

// 合并数组
const result4 = extend(true, {}, { arr: [1, 2] }, { arr: [3] })
// { arr: [3, 2] }

// 多个源对象
const result5 = extend(true, {}, { a: 1 }, { b: 2 }, { c: 3 })
// { a: 1, b: 2, c: 3 }
```

#### clone

深拷贝对象。

```js
import { clone } from 'js-cool'

const obj = { a: { b: 1, c: [1, 2, 3] } }
const cloned = clone(obj)

cloned.a.b = 2
cloned.a.c.push(4)

obj.a.b      // 仍然是 1
obj.a.c      // 仍然是 [1, 2, 3]

// 克隆数组
const arr = [{ a: 1 }, { b: 2 }]
const clonedArr = clone(arr)

// 克隆日期
const date = new Date()
const clonedDate = clone(date)

// 克隆正则
const regex = /test/gi
const clonedRegex = clone(regex)
```

#### isEqual

深度比较相等。

```js
import { isEqual } from 'js-cool'

isEqual({ a: 1 }, { a: 1 })              // true
isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })  // true (顺序无关)
isEqual([1, 2, 3], [1, 2, 3])            // true
isEqual(NaN, NaN)                        // true
isEqual(null, null)                      // true
isEqual(undefined, undefined)            // true

isEqual({ a: 1 }, { a: 2 })              // false
isEqual([1, 2], [2, 1])                  // false (顺序有关)
isEqual({ a: 1 }, { a: 1, b: 2 })        // false

// 深度比较
isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })  // true
```

#### getProperty / setProperty

根据路径获取/设置属性值。

```js
import { getProperty, setProperty } from 'js-cool'

const obj = {
  a: {
    b: [{ c: 1 }, { c: 2 }],
    d: { e: 'hello' }
  }
}

// 获取属性
getProperty(obj, 'a.b.0.c')           // 1
getProperty(obj, 'a.b.1.c')           // 2
getProperty(obj, 'a.d.e')             // 'hello'
getProperty(obj, 'a.b')               // [{ c: 1 }, { c: 2 }]

// 带默认值
getProperty(obj, 'a.b.5.c', 'default')  // 'default'
getProperty(obj, 'x.y.z', null)         // null

// 设置属性
setProperty(obj, 'a.b.0.c', 100)
// obj.a.b[0].c === 100

setProperty(obj, 'a.d.e', 'world')
// obj.a.d.e === 'world'

setProperty(obj, 'a.new', 'value')
// obj.a.new === 'value'
```

#### searchObject

对象树深度查找。

```js
import { searchObject } from 'js-cool'

const tree = {
  id: 1,
  name: 'root',
  children: [
    { id: 2, name: 'child1', children: [] },
    { id: 3, name: 'child2', children: [
      { id: 4, name: 'grandchild' }
    ]}
  ]
}

// 按条件查找
searchObject(tree, item => item.id === 3, { children: 'children' })
// [{ id: 3, name: 'child2', ... }]

// 按名称查找
searchObject(tree, item => item.name.includes('child'), { children: 'children' })
// [{ id: 2, ... }, { id: 3, ... }, { id: 4, ... }]

// 自定义键配置
searchObject(tree, item => item.id > 2, {
  children: 'children',
  id: 'id'
})
```

---

### 类型判断

```js
import {
  isArray, isObject, isPlainObject, isDate, isRegExp,
  isWindow, isIterable, isDigitals
} from 'js-cool'

// isArray
isArray([1, 2, 3])           // true
isArray('array')             // false
isArray(null)                // false

// isObject
isObject({})                 // true
isObject([])                 // true (数组也是对象)
isObject(null)               // false
isObject(function(){})       // true

// isPlainObject
isPlainObject({})            // true
isPlainObject(Object.create(null))  // true
isPlainObject([])            // false
isPlainObject(new Date())    // false

// isDate
isDate(new Date())           // true
isDate('2024-01-01')         // false
isDate(1234567890000)        // false

// isRegExp
isRegExp(/test/)             // true
isRegExp(new RegExp('test')) // true
isRegExp('/test/')           // false

// isWindow
isWindow(window)             // true (浏览器中)
isWindow({})                 // false

// isIterable
isIterable([1, 2, 3])        // true
isIterable('string')         // true
isIterable(new Set())        // true
isIterable(new Map())        // true
isIterable({})               // false
isIterable(null)             // false

// isDigitals
isDigitals('12345')          // true
isDigitals('12.34')          // true
isDigitals('-123')           // true
isDigitals('12a34')          // false
```

---

### 环境检测

```js
import { inBrowser, inNodeJs, isDarkMode, windowSize } from 'js-cool'

// inBrowser - 判断是否在浏览器环境
inBrowser()  // 浏览器中返回 true，Node.js 中返回 false

// inNodeJs - 判断是否在 Node.js 环境
inNodeJs()   // Node.js 中返回 true，浏览器中返回 false

// isDarkMode - 判断是否为暗色模式
isDarkMode()  // 暗色模式返回 true

// windowSize - 获取窗口尺寸
windowSize()  // { width: 1920, height: 1080 }
windowSize()  // { width: 375, height: 667 } (移动端)
```

---

### 浏览器检测

```js
import {
  appVersion, osVersion, browserVersion,
  isNumberBrowser, fingerprint
} from 'js-cool'

// appVersion - 从 UA 获取 APP 版本
appVersion('Chrome')          // '123.0.0.0'
appVersion('Safari')          // '17.0'
appVersion('Firefox')         // '123.0'
appVersion('MicroMessenger')  // '8.0' (微信)

// 使用自定义 UA
appVersion('Chrome', 'Mozilla/5.0 Chrome/100.0.0.0')
// '100.0.0.0'

// osVersion - 获取操作系统名称和版本
osVersion()
// { name: 'Windows', version: '10.0' }
// { name: 'Mac OS', version: '10.15.7' }
// { name: 'Android', version: '13' }
// { name: 'iOS', version: '17.0' }
// { name: 'Harmony', version: '4.0' }

// browserVersion - 获取浏览器名称和版本
browserVersion()
// { name: 'Chrome', version: '123.0.0.0' }
// { name: 'Safari', version: '17.0' }
// { name: 'Firefox', version: '123.0' }
// { name: 'Edge', version: '123.0.0.0' }

// isNumberBrowser - 判断是否为 360 浏览器
isNumberBrowser()  // 360 浏览器返回 true

// fingerprint - 生成浏览器指纹
fingerprint()              // 'wc7sWJJA8'
fingerprint('example.com') // 'xK9mN2pL5' (自定义域名)
```

---

### URL & 参数

#### compareVersion

比较版本号。

```js
import { compareVersion } from 'js-cool'

compareVersion('1.2.3', '1.2.2')   // 1 (大于)
compareVersion('1.2.3', '1.2.3')   // 0 (等于)
compareVersion('1.2.3', '1.2.4')   // -1 (小于)
compareVersion('2.0.0', '1.9.9')   // 1
compareVersion('1.10.0', '1.9.0')  // 1

// 预发布标签 (优先级: rc > beta > alpha)
compareVersion('1.0.0-rc.1', '1.0.0-beta.1')   // 1
compareVersion('1.0.0-beta.1', '1.0.0-alpha.1') // 1
compareVersion('1.0.0-alpha.1', '1.0.0')        // -1

// 实际应用
const needsUpdate = compareVersion(currentVersion, minVersion) < 0
```

#### parseUrlParam

解析 URL 参数字符串。

```js
import { parseUrlParam } from 'js-cool'

// 基本解析
parseUrlParam('a=1&b=2&c=3')
// { a: '1', b: '2', c: '3' }

// 自动类型转换
parseUrlParam('a=1&b=2&c=true', true)
// { a: 1, b: 2, c: true }

// 复杂值
parseUrlParam('name=hello%20world&list=1,2,3')
// { name: 'hello world', list: '1,2,3' }

// 空字符串
parseUrlParam('')  // {}

// 特殊值 (即使传 true 也不转换)
parseUrlParam('hex=0xFF&bin=0b111&oct=0o77&exp=1e3', true)
// { hex: '0xFF', bin: '0b111', oct: '0o77', exp: '1e3' }
```

#### spliceUrlParam

构建 URL 参数字符串。

```js
import { spliceUrlParam } from 'js-cool'

spliceUrlParam({ a: 1, b: 2 })
// 'a=1&b=2'

spliceUrlParam({ name: 'hello world' })
// 'name=hello%20world'

spliceUrlParam({ a: 1, b: null, c: undefined })
// 'a=1' (null 和 undefined 被跳过)

// 带选项
spliceUrlParam({ a: 1, b: 2 }, { encode: true })
// 'a=1&b=2'

spliceUrlParam({ a: 1, b: 2 }, { encode: false })
// 'a=1&b=2'

// 复杂值
spliceUrlParam({ arr: [1, 2, 3] })
// 'arr=1,2,3'
```

#### getUrlParam / getUrlParams

获取 URL 参数 (location.search, # 之前)。

```js
import { getUrlParam, getUrlParams } from 'js-cool'

// 获取单个参数
getUrlParam('a', '?a=1&b=2')       // '1'
getUrlParam('b', '?a=1&b=2')       // '2'
getUrlParam('c', '?a=1&b=2')       // null

// 获取所有参数
getUrlParams('?a=1&b=2&c=3')
// { a: '1', b: '2', c: '3' }

// 自动类型转换
getUrlParams('?a=1&b=2', true)
// { a: 1, b: 2 }

// 从完整 URL 解析
getUrlParams('https://example.com?foo=bar')
// { foo: 'bar' }
```

#### getQueryParam / getQueryParams

获取 query 参数 (# 之后)。

```js
import { getQueryParam, getQueryParams } from 'js-cool'

// 获取单个 query 参数
getQueryParam('a', '#/?a=1&b=2')     // '1'
getQueryParam('b', 'https://example.com#/page?a=1&b=2')  // '1'

// 获取所有 query 参数
getQueryParams('#/?a=1&b=2')
// { a: '1', b: '2' }

// 自动类型转换
getQueryParams('#/?a=1&b=true', true)
// { a: 1, b: true }
```

#### getDirParam

获取目录形式 URL 参数。

```js
import { getDirParam } from 'js-cool'

getDirParam('https://example.com/a/b/c')
// { 0: 'a', 1: 'b', 2: 'c' }

getDirParam('/user/123/profile')
// { 0: 'user', 1: '123', 2: 'profile' }
```

---

### 存储

#### localStorage (getCache / setCache / delCache)

```js
import { getCache, setCache, delCache } from 'js-cool'

// 存储字符串
setCache('name', 'value')

// 存储对象 (自动 JSON 序列化)
setCache('user', { id: 1, name: 'John' })
getCache('user')  // { id: 1, name: 'John' }

// 存储数字
setCache('count', 100)
getCache('count')  // 100

// 存储布尔值
setCache('flag', true)
getCache('flag')   // true

// 设置过期时间 (秒)
setCache('session', 'data', 3600)  // 1小时后过期
setCache('token', 'abc123', 86400) // 24小时后过期

// 获取不存在的 key
getCache('nonexistent')  // null

// 删除
delCache('name')
delCache('user')
```

#### sessionStorage (getSession / setSession / delSession)

```js
import { getSession, setSession, delSession } from 'js-cool'

setSession('temp', 'data')
getSession('temp')  // 'data'

setSession('list', [1, 2, 3])
getSession('list')  // [1, 2, 3]

setSession('config', { theme: 'dark' }, 1800)  // 30分钟后过期
getSession('config')  // { theme: 'dark' }

delSession('temp')
```

#### Cookie (getCookie / getCookies / setCookie / delCookie)

```js
import { getCookie, getCookies, setCookie, delCookie } from 'js-cool'

// 设置 cookie (默认: 1天)
setCookie('name', 'value')

// 带选项设置
setCookie('name', 'value', { days: 7 })
setCookie('name', 'value', { days: 30, path: '/' })
setCookie('name', 'value', {
  days: 7,
  path: '/',
  domain: '.example.com',
  secure: true,
  sameSite: 'Strict'
})

// 获取单个 cookie
getCookie('name')      // 'value'
getCookie('nonexistent')  // null

// 获取所有 cookie
getCookies()  // { name: 'value', other: 'data' }

// 删除 cookie
delCookie('name')
delCookie('name', { path: '/', domain: '.example.com' })
```

---

### 编码

#### Base64

```js
import { encodeBase64, decodeBase64 } from 'js-cool'

// 编码
encodeBase64('hello')              // 'aGVsbG8='
encodeBase64('你好')               // '5L2g5aW9'
encodeBase64('{"a":1}')            // 'eyJhIjoxfQ=='
encodeBase64(12345)                // 'MTIzNDU='

// 解码
decodeBase64('aGVsbG8=')           // 'hello'
decodeBase64('5L2g5aW9')           // '你好'
decodeBase64('eyJhIjoxfQ==')       // '{"a":1}'
```

#### UTF-8

```js
import { encodeUtf8, decodeUtf8 } from 'js-cool'

encodeUtf8('hello')    // 编码后的字符串
encodeUtf8('你好')     // 编码后的字符串
decodeUtf8(encoded)   // 原始字符串
```

#### 安全 JSON

```js
import { safeParse, safeStringify } from 'js-cool'

// safeParse - 永不抛出错误
safeParse('{"a":1}')          // { a: 1 }
safeParse('invalid json')     // null (不报错!)
safeParse('{"a":BigInt(1)}')  // { a: BigInt(1) }
safeParse(null)               // null
safeParse(undefined)          // null

// safeStringify - 支持 BigInt、循环引用
safeStringify({ a: 1 })                    // '{"a":1}'
safeStringify({ a: BigInt(9007199254740993n) })  // 支持 BigInt
safeStringify({ a: () => {} })             // '{"a":null}'
```

---

### 事件

```js
import { stopBubble, stopDefault, addEvent, removeEvent } from 'js-cool'

// 阻止冒泡
document.getElementById('btn').addEventListener('click', (e) => {
  stopBubble(e)  // e.stopPropagation()
})

// 阻止默认行为
document.getElementById('link').addEventListener('click', (e) => {
  stopDefault(e)  // e.preventDefault()
})

// 事件委托
const handler = (e) => {
  console.log('clicked:', e.target)
}

// 添加委托事件
addEvent(document, 'click', handler)

// 移除委托事件
removeEvent(document, 'click', handler)

// 委托到特定容器
addEvent(document.getElementById('list'), 'click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('列表项被点击')
  }
})
```

---

### 工具

#### uuid

```js
import { uuid } from 'js-cool'

uuid()  // '550e8400-e29b-41d4-a716-446655440000'
uuid()  // '6ba7b810-9dad-11d1-80b4-00c04fd430c8'
uuid()  // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
```

#### copy

```js
import { copy } from 'js-cool'

// 基本用法
await copy('要复制的文本')  // true

// 在异步函数中
async function handleCopy() {
  const success = await copy('复制的文本')
  if (success) {
    console.log('复制成功!')
  } else {
    console.log('复制失败')
  }
}

// 带回退处理
const result = await copy('回退文本')
console.log(result ? '成功' : '失败')
```

#### download

```js
import { download } from 'js-cool'

// 通过 URL 下载
download('https://example.com/file.pdf')

// 带自定义文件名
download('https://example.com/file.pdf', 'document.pdf')

// 下载 data URL
download('data:text/plain,Hello World', 'hello.txt')
```

#### openUrl

```js
import { openUrl } from 'js-cool'

openUrl('https://example.com')           // 新标签页打开
openUrl('https://example.com/file.pdf')  // 无法解析时触发下载
```

#### toThousands

```js
import { toThousands } from 'js-cool'

toThousands(1234567.89)     // '1,234,567.89'
toThousands(1234567890)     // '1,234,567,890'
toThousands(1234.567)       // '1,234.567'
toThousands('1234567')      // '1,234,567'
toThousands(null)           // ''
toThousands(undefined)      // ''
```

#### randomNumber / randomNumbers

```js
import { randomNumber, randomNumbers } from 'js-cool'

// 随机整数
randomNumber()           // 1-10 之间的随机整数
randomNumber(1, 100)     // 1-100 之间的随机整数
randomNumber(0, 1)       // 0 或 1
randomNumber(-10, 10)    // -10 到 10 之间的随机整数

// 随机浮点数
randomNumber(0.1, 0.9)   // 0.1-0.9 之间的随机浮点数

// 固定总和的随机数
randomNumbers(4, 100)    // [25, 30, 20, 25] (总和 = 100)
randomNumbers(3, 10)     // [3, 4, 3] (总和 = 10)
randomNumbers(5, 1)      // [0, 0, 1, 0, 0] (总和 = 1)

// 是否允许零 (默认: true)
randomNumbers(4, 100, true)   // 不允许零
randomNumbers(4, 100, false)  // 允许零
```

#### randomColor

```js
import { randomColor } from 'js-cool'

// 随机颜色
randomColor()                    // '#bf444b'

// 较浅颜色 (更高的最小值)
randomColor(200)                 // '#d6e9d7' (所有通道 >= 200)
randomColor(128)                 // '#a1b2c3' (所有通道 >= 128)

// 所有通道范围
randomColor(200, 255)            // '#d3f9e4' (200-255)

// 单独通道范围
randomColor([0, 100, 0], [100, 255, 100])
// 红: 0-100, 绿: 100-255, 蓝: 0-100

// 暖色系 (更多红/黄)
randomColor([200, 100, 0], [255, 200, 100])

// 冷色系 (更多蓝/绿)
randomColor([0, 100, 200], [100, 200, 255])

// 深色
randomColor(0, 100)              // '#3a2b1c'

// 柔和色
randomColor(150, 230)            // '#c8e6c9'
```

#### nextIndex

```js
import { nextIndex } from 'js-cool'

nextIndex()  // 1001
nextIndex()  // 1002
nextIndex()  // 1003

// 用于模态框、提示框
modal.style.zIndex = nextIndex()
```

#### nextVersion

```js
import { nextVersion } from 'js-cool'

nextVersion('1.2.3', 'major')   // '2.0.0'
nextVersion('1.2.3', 'minor')   // '1.3.0'
nextVersion('1.2.3', 'patch')   // '1.2.4'
nextVersion('1.2.3', 'premajor')    // '2.0.0-0'
nextVersion('1.2.3', 'preminor')    // '1.3.0-0'
nextVersion('1.2.3', 'prepatch')    // '1.2.4-0'
nextVersion('1.2.3-alpha.1', 'prerelease')  // '1.2.3-alpha.2'

// 默认是 patch
nextVersion('1.2.3')  // '1.2.4'
```

#### getType

```js
import { getType } from 'js-cool'

getType([1, 2, 3])        // 'array'
getType({})               // 'object'
getType(null)             // 'null'
getType(undefined)        // 'undefined'
getType('string')         // 'string'
getType(123)              // 'number'
getType(true)             // 'boolean'
getType(() => {})         // 'function'
getType(new Date())       // 'date'
getType(/regex/)          // 'regexp'
getType(new Error())      // 'error'
getType(new Map())        // 'map'
getType(new Set())        // 'set'
getType(Symbol())         // 'symbol'
getType(BigInt(1))        // 'bigint'
```

#### getFileType

```js
import { getFileType } from 'js-cool'

getFileType('document.pdf')        // 'pdf'
getFileType('image.png')           // 'image'
getFileType('video.mp4')           // 'video'
getFileType('audio.mp3')           // 'audio'
getFileType('archive.zip')         // 'archive'
getFileType('code.js')             // 'code'
getFileType('https://example.com/file.pdf')  // 'pdf'
```

#### fixNumber

```js
import { fixNumber } from 'js-cool'

fixNumber(3.14159)       // '3.14' (默认2位小数)
fixNumber(3.14159, 2)    // '3.14'
fixNumber(3.14159, 4)    // '3.1416'
fixNumber(3.1, 4)        // '3.1' (不补零)
fixNumber(100, 2)        // '100'
```

#### delay

```js
import { delay } from 'js-cool'

const d = delay()

// 防抖模式 (第一次触发立即执行)
d.register('search', () => console.log('search'), 300, true)

// 节流模式 (延迟执行)
d.register('scroll', () => console.log('scroll'), 300, false)

// 销毁特定处理器
d.destroy('search')

// delay 对象存储所有注册的处理器
```

#### waiting

```js
import { waiting } from 'js-cool'

// 基本等待
await waiting(1000)  // 等待1秒

// 带超时抛出
await waiting(5000, true)  // 5秒后抛出错误

// 在异步函数中
async function example() {
  console.log('开始')
  await waiting(1000)
  console.log('1秒后')
}

// 实际应用
async function poll() {
  while (true) {
    const result = await checkStatus()
    if (result.done) break
    await waiting(1000)  // 下次轮询前等待
  }
}
```

#### mapTemplate

```js
import { mapTemplate } from 'js-cool'

// ${xxx} 风格
mapTemplate('Hello, ${name}!', { name: 'World' })
// 'Hello, World!'

// {{xxx}} 风格
mapTemplate('Hello, {{name}}!', { name: 'World' })
// 'Hello, World!'

// {xxx} 风格
mapTemplate('Hello, {name}!', { name: 'World' })
// 'Hello, World!'

// 多个变量
mapTemplate('${greeting}, ${name}! You have ${count} messages.', {
  greeting: 'Hello',
  name: 'John',
  count: 5
})
// 'Hello, John! You have 5 messages.'

// 嵌套对象
mapTemplate('User: ${user.name}', { user: { name: 'John' } })
// 'User: John'
```

#### sorter

```js
import { sorter } from 'js-cool'

const users = [
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Charlie', age: 35 }
]

// 按字符串字段排序
users.sort(sorter('name', 'asc'))
// [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }, ...]

users.sort(sorter('name', 'desc'))
// [{ name: 'Charlie', age: 35 }, { name: 'Bob', age: 30 }, ...]

// 按数字字段排序
users.sort(sorter('age', 'asc'))
// [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }, ...]

// 带转换函数
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

// 创建定时器
const timer = punctualTimer(() => {
  console.log('Tick at:', new Date())
}, 1000)

// 停止定时器
timer.stop()

// 重启定时器
timer.start()

// 检查是否运行中
timer.isRunning  // true/false
```

#### awaitTo

```js
import { awaitTo } from 'js-cool'

// 基本用法
const [err, data] = await awaitTo(fetch('/api/data'))
if (err) {
  console.error('Error:', err)
  return
}
console.log('Data:', data)

// 在异步函数中
async function getUser(id) {
  const [err, user] = await awaitTo(fetch(`/api/users/${id}`))
  if (err) return null
  return user.json()
}

// 多个 Promise
const [err, results] = await awaitTo(
  Promise.all([
    fetch('/api/users'),
    fetch('/api/posts')
  ])
)
```

---

### 资源加载

```js
import {
  loadSource, mountJs, mountCss,
  mountStyle, mountImg, preloader
} from 'js-cool'

// 加载 JS 文件
await mountJs('https://example.com/script.js')
await mountJs('https://example.com/script.js', { async: true })

// 加载 CSS 文件
await mountCss('https://example.com/styles.css')

// 注入 CSS 样式
mountStyle('.modal { display: none; }')
mountStyle(`
  .container { max-width: 1200px; }
  .header { height: 60px; }
`)

// 加载图片
await mountImg('https://example.com/image.png')
const img = await mountImg('https://example.com/image.png', { crossOrigin: 'anonymous' })

// 通用资源加载器
await loadSource({ type: 'js', url: 'https://example.com/script.js' })
await loadSource({ type: 'css', url: 'https://example.com/styles.css' })
await loadSource({ type: 'img', url: 'https://example.com/image.png' })

// 预加载图片
await preloader([
  'image1.jpg',
  'image2.jpg',
  'image3.jpg'
])
```

---

### 二进制转换

```js
import {
  arrayBufferToBase64, arrayBufferToBlob,
  base64ToArrayBuffer, base64ToBlob, base64ToFile,
  blobToArrayBuffer, blobToBase64, blobToUrl,
  fileToBase64, svgToBlob, urlToBlob
} from 'js-cool'

// ArrayBuffer 转换
const buffer = new ArrayBuffer(10)
const base64 = arrayBufferToBase64(buffer)
const base64WithMime = arrayBufferToBase64(buffer, 'image/png')
const blob = arrayBufferToBlob(buffer, 'image/png')

// Base64 转换
const buffer = base64ToArrayBuffer('aGVsbG8=')
const blob = base64ToBlob('data:image/png;base64,...')
const file = base64ToFile('data:image/png;base64,...', 'image.png', 'image/png')

// Blob 转换
const buffer = await blobToArrayBuffer(blob)
const base64 = await blobToBase64(blob)
const url = blobToUrl(blob)  // 'blob:origin/uuid'

// File 转换
const base64 = await fileToBase64(file)  // 'data:image/png;base64,...'

// SVG 转换
const blob = svgToBlob('<svg viewBox="0 0 100 100">...</svg>')
// Blob with type 'image/svg+xml'

// URL 转 Blob
const blob = await urlToBlob('https://example.com/image.png')
```

---

### CSV 转换

```js
import { CSVToArray, arrayToCSV, CSVToJSON, JSONToCSV } from 'js-cool'

const csv = 'name,age,city\nJohn,30,NYC\nJane,25,LA'

// CSV 转二维数组
CSVToArray(csv)
// [['name', 'age', 'city'], ['John', '30', 'NYC'], ['Jane', '25', 'LA']]

// 二维数组转 CSV
arrayToCSV([['name', 'age'], ['John', 30], ['Jane', 25]])
// 'name,age\nJohn,30\nJane,25'

// CSV 转 JSON
CSVToJSON(csv)
// [
//   { name: 'John', age: '30', city: 'NYC' },
//   { name: 'Jane', age: '25', city: 'LA' }
// ]

// JSON 转 CSV
JSONToCSV(
  [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }],
  ['name', 'age']
)
// 'name,age\nJohn,30\nJane,25'
```

---

### 颜色

#### RGBToHex

```js
import { RGBToHex } from 'js-cool'

RGBToHex(255, 0, 0)      // '#ff0000'
RGBToHex(0, 255, 0)      // '#00ff00'
RGBToHex(0, 0, 255)      // '#0000ff'
RGBToHex(255, 255, 255)  // '#ffffff'
RGBToHex(0, 0, 0)        // '#000000'
```

---

## 问题和支持

请提交 issue [这里](https://github.com/saqqdy/js-cool/issues)。

## 许可证

[MIT](LICENSE)
