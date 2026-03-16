# Object Utilities

js-cool provides powerful object manipulation utilities.

## Cloning

### clone

Deep clone an object.

```js
import { clone } from 'js-cool'

const obj = { a: { b: 1 } }
const cloned = clone(obj)
cloned.a.b = 2
console.log(obj.a.b) // 1 (unchanged)
```

## Merging

### extend

Extend/merge objects (deep merge).

```js
import { extend } from 'js-cool'

extend({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }
extend({ a: { b: 1 } }, { a: { c: 2 } }) // { a: { b: 1, c: 2 } }
```

## Data Cleaning

### cleanData

Extract specific keys from an object.

```js
import { cleanData } from 'js-cool'

const user = { name: 'John', password: '123', email: 'john@example.com' }

// Extract specific keys
cleanData(user, ['name', 'email']) // { name: 'John', email: 'john@example.com' }

// Rename keys
cleanData(user, { userName: 'name', userEmail: 'email' })
// { userName: 'John', userEmail: 'john@example.com' }

// With default values for missing keys
cleanData(user, ['name', 'phone'], 'N/A')
// { name: 'John', phone: 'N/A' }
```

## Property Access

### getProperty

Safely get nested property value.

```js
import { getProperty } from 'js-cool'

const obj = { a: { b: { c: 1 } } }
getProperty(obj, 'a.b.c') // 1
getProperty(obj, 'a.b.d', 'default') // 'default'
```

### setProperty

Safely set nested property value.

```js
import { setProperty } from 'js-cool'

const obj = {}
setProperty(obj, 'a.b.c', 1)
// obj = { a: { b: { c: 1 } } }
```

## Comparison

### isEqual

Deep compare two values.

```js
import { isEqual } from 'js-cool'

isEqual({ a: 1 }, { a: 1 }) // true
isEqual([1, 2, 3], [1, 2, 3]) // true
isEqual(NaN, NaN) // true
```

## Type Check

### isObject

Check if value is a plain object.

```js
import { isObject } from 'js-cool'

isObject({}) // true
isObject([]) // false
isObject(null) // false
```

### isPlainObject

Check if value is a plain object (created by `{}` or `new Object()`).

```js
import { isPlainObject } from 'js-cool'

isPlainObject({}) // true
isPlainObject(new Date()) // false
```

### isArray

Check if value is an array.

```js
import { isArray } from 'js-cool'

isArray([1, 2, 3]) // true
isArray('hello') // false
```

### isDate

Check if value is a Date object.

```js
import { isDate } from 'js-cool'

isDate(new Date()) // true
isDate('2024-01-01') // false
```

### isRegExp

Check if value is a RegExp.

```js
import { isRegExp } from 'js-cool'

isRegExp(/test/) // true
isRegExp('test') // false
```

### getType

Get the type of a value.

```js
import { getType } from 'js-cool'

getType([1, 2, 3]) // 'array'
getType({}) // 'object'
getType(null) // 'null'
```

## JSON Utilities

### safeParse

Safely parse JSON string.

```js
import { safeParse } from 'js-cool'

safeParse('{"a":1}') // { a: 1 }
safeParse('invalid') // null (no error thrown)
```

### safeStringify

Safely stringify object to JSON.

```js
import { safeStringify } from 'js-cool'

safeStringify({ a: 1 }) // '{"a":1}'
```

## See Also

- [Object API Reference](/api/object/clone)
