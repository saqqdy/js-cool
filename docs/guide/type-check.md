# Type Check Utilities

js-cool provides type checking utilities for safer code.

## Basic Types

### getType

Get the type of any value.

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

Check if value is an array.

```js
import { isArray } from 'js-cool'

isArray([1, 2, 3]) // true
isArray('hello') // false
isArray({ length: 3 }) // false
```

### isObject

Check if value is an object.

```js
import { isObject } from 'js-cool'

isObject({}) // true
isObject([]) // false
isObject(null) // false
```

### isPlainObject

Check if value is a plain object.

```js
import { isPlainObject } from 'js-cool'

isPlainObject({}) // true
isPlainObject(new Date()) // false
isPlainObject([]) // false
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
isRegExp(new RegExp('test')) // true
isRegExp('test') // false
```

### isWindow

Check if value is a window object.

```js
import { isWindow } from 'js-cool'

isWindow(window) // true
isWindow({}) // false
```

### isIterable

Check if value is iterable.

```js
import { isIterable } from 'js-cool'

isIterable([1, 2, 3]) // true
isIterable('hello') // true
isIterable({}) // false
```

## Existence Checks

### isExitsFunction

Check if a function exists globally.

```js
import { isExitsFunction } from 'js-cool'

isExitsFunction('JSON.parse') // true
isExitsFunction('nonExistent') // false
```

### isExitsVariable

Check if a variable exists.

```js
import { isExitsVariable } from 'js-cool'

isExitsVariable('window') // true in browser
isExitsVariable('nonExistentVar') // false
```

## Comparison

### isEqual

Deep compare two values.

```js
import { isEqual } from 'js-cool'

// Objects
isEqual({ a: 1 }, { a: 1 }) // true
isEqual({ a: { b: 1 } }, { a: { b: 1 } }) // true

// Arrays
isEqual([1, 2, 3], [1, 2, 3]) // true
isEqual([1, 2], [2, 1]) // false

// Special values
isEqual(NaN, NaN) // true
isEqual(0, -0) // false
```

## String Checks

### isDigitals

Check if string contains only digits.

```js
import { isDigitals } from 'js-cool'

isDigitals('12345') // true
isDigitals('123.45') // false
isDigitals('abc') // false
```

## Pattern Matching

js-cool provides a pattern object with common regex patterns:

```js
import { pattern } from 'js-cool'

pattern.email // Email pattern
pattern.phone // Phone pattern
pattern.url // URL pattern
pattern.number // Number pattern
pattern.chinese // Chinese character pattern
```

## See Also

- [Type Check API Reference](/api/)
