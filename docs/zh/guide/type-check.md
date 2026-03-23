# 类型检查工具

js-cool 提供了类型检查工具，让代码更安全。

## 基础类型

### getType

获取任意值的类型。

```js
import { getType } from 'js-cool'

getType([1, 2, 3]) // 'array'
getType({}) // 'object'
getType(null) // 'null'
getType(undefined) // 'undefined'
getType(123) // 'number'
getType('hello') // 'string'
getType(true) // 'boolean'
getType(() => {}) // 'function'
getType(new Date()) // 'date'
getType(/test/) // 'regexp'
```

### isArray

检查是否为数组。

```js
import { isArray } from 'js-cool'

isArray([1, 2, 3]) // true
isArray('hello') // false
isArray({ length: 3 }) // false
```

### isObject

检查是否为对象。

```js
import { isObject } from 'js-cool'

isObject({}) // true
isObject([]) // false
isObject(null) // false
```

### isPlainObject

检查是否为纯对象。

```js
import { isPlainObject } from 'js-cool'

isPlainObject({}) // true
isPlainObject(new Date()) // false
isPlainObject([]) // false
```

### isDate

检查是否为 Date 对象。

```js
import { isDate } from 'js-cool'

isDate(new Date()) // true
isDate('2024-01-01') // false
```

### isRegExp

检查是否为正则表达式。

```js
import { isRegExp } from 'js-cool'

isRegExp(/test/) // true
isRegExp(new RegExp('test')) // true
isRegExp('test') // false
```

### isWindow

检查是否为 window 对象。

```js
import { isWindow } from 'js-cool'

isWindow(window) // true
isWindow({}) // false
```

### isIterable

检查是否可迭代。

```js
import { isIterable } from 'js-cool'

isIterable([1, 2, 3]) // true
isIterable('hello') // true
isIterable({}) // false
```

## 存在性检查

### isExitsFunction

检查全局函数是否存在。

```js
import { isExitsFunction } from 'js-cool'

isExitsFunction('JSON.parse') // true
isExitsFunction('nonExistent') // false
```

### isExitsVariable

检查变量是否存在。

```js
import { isExitsVariable } from 'js-cool'

isExitsVariable('window') // 浏览器中为 true
isExitsVariable('nonExistentVar') // false
```

## 比较

### isEqual

深度比较两个值。

```js
import { isEqual } from 'js-cool'

// 对象
isEqual({ a: 1 }, { a: 1 }) // true
isEqual({ a: { b: 1 } }, { a: { b: 1 } }) // true

// 数组
isEqual([1, 2, 3], [1, 2, 3]) // true
isEqual([1, 2], [2, 1]) // false

// 特殊值
isEqual(NaN, NaN) // true
isEqual(0, -0) // false
```

## 正则模式

js-cool 提供了常用验证正则模式：

```js
import { validation } from 'js-cool'

validation.email // 邮箱正则
validation.mobile // 中国手机号正则
validation.url // URL 正则
validation.number // 数字正则
validation.chinese // 中文字符正则
validation.ipv4 // IPv4 地址正则
validation.idCard // 中国身份证正则
validation.hexColor // 十六进制颜色正则
```

详见 [patterns](/zh/api/utility/patterns) 查看所有可用模式。

## 相关

- [类型检查 API 参考](/zh/api/)
