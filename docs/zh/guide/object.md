# 对象工具

js-cool 提供了强大的对象处理工具。

## 克隆

### clone

深拷贝对象。

```js
import { clone } from 'js-cool'

const obj = { a: { b: 1 } }
const cloned = clone(obj)
cloned.a.b = 2
console.log(obj.a.b) // 1（原对象不变）
```

## 合并

### extend

扩展/合并对象（深合并）。

```js
import { extend } from 'js-cool'

extend({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }
extend({ a: { b: 1 } }, { a: { c: 2 } }) // { a: { b: 1, c: 2 } }
```

## 数据清洗

### cleanData

从对象中提取指定字段。

```js
import { cleanData } from 'js-cool'

const user = { name: 'John', password: '123', email: 'john@example.com' }

// 提取指定字段
cleanData(user, ['name', 'email']) // { name: 'John', email: 'john@example.com' }

// 重命名字段
cleanData(user, { userName: 'name', userEmail: 'email' })
// { userName: 'John', userEmail: 'john@example.com' }

// 为缺失字段提供默认值
cleanData(user, ['name', 'phone'], 'N/A')
// { name: 'John', phone: 'N/A' }
```

## 属性访问

### getProperty

安全获取嵌套属性值。

```js
import { getProperty } from 'js-cool'

const obj = { a: { b: { c: 1 } } }
getProperty(obj, 'a.b.c') // 1
getProperty(obj, 'a.b.d', '默认值') // '默认值'
```

### setProperty

安全设置嵌套属性值。

```js
import { setProperty } from 'js-cool'

const obj = {}
setProperty(obj, 'a.b.c', 1)
// obj = { a: { b: { c: 1 } } }
```

## 比较

### isEqual

深度比较两个值。

```js
import { isEqual } from 'js-cool'

isEqual({ a: 1 }, { a: 1 }) // true
isEqual([1, 2, 3], [1, 2, 3]) // true
isEqual(NaN, NaN) // true
```

## 类型检查

### isObject

检查是否为对象。

```js
import { isObject } from 'js-cool'

isObject({}) // true
isObject([]) // false
isObject(null) // false
```

### isPlainObject

检查是否为纯对象（由 `{}` 或 `new Object()` 创建）。

```js
import { isPlainObject } from 'js-cool'

isPlainObject({}) // true
isPlainObject(new Date()) // false
```

### isArray

检查是否为数组。

```js
import { isArray } from 'js-cool'

isArray([1, 2, 3]) // true
isArray('hello') // false
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
isRegExp('test') // false
```

### getType

获取值的类型。

```js
import { getType } from 'js-cool'

getType([1, 2, 3]) // 'array'
getType({}) // 'object'
getType(null) // 'null'
```

## JSON 工具

### safeParse

安全解析 JSON 字符串。

```js
import { safeParse } from 'js-cool'

safeParse('{"a":1}') // { a: 1 }
safeParse('invalid') // null（不抛出错误）
```

### safeStringify

安全序列化对象为 JSON。

```js
import { safeStringify } from 'js-cool'

safeStringify({ a: 1 }) // '{"a":1}'
```

## 相关

- [对象 API 参考](/zh/api/object/clone)
