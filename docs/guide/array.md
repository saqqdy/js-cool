# Array Utilities

js-cool provides useful array manipulation utilities.

## Deduplication

### unique

Remove duplicates from an array.

```js
import { unique } from 'js-cool'

unique([1, 2, 2, 3, 3, 4]) // [1, 2, 3, 4]
unique(['a', 'b', 'a', 'c']) // ['a', 'b', 'c']
```

## Reordering

### shuffle

Randomly shuffle an array.

```js
import { shuffle } from 'js-cool'

shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4] (random)
```

## Set Operations

### intersect

Get intersection of multiple arrays.

```js
import { intersect } from 'js-cool'

intersect([1, 2, 3], [2, 3, 4]) // [2, 3]
intersect([1, 2, 3], [2, 3, 4], [3, 4, 5]) // [3]
```

### union

Get union of multiple arrays.

```js
import { union } from 'js-cool'

union([1, 2, 3], [3, 4, 5]) // [1, 2, 3, 4, 5]
```

### minus

Get difference of arrays (elements in first but not in others).

```js
import { minus } from 'js-cool'

minus([1, 2, 3, 4], [2, 3], [4]) // [1]
```

### complement

Get complement of arrays.

```js
import { complement } from 'js-cool'

complement([1, 2, 3], [2, 3, 4]) // [1, 4]
```

### contains

Check if array contains an element.

```js
import { contains } from 'js-cool'

contains([1, 2, 3], 2) // true
contains([1, 2, 3], 4) // false
```

## Search

### searchObject

Search in nested objects/arrays.

```js
import { searchObject } from 'js-cool'

const data = [{ id: 1, name: 'John', children: [{ id: 2, name: 'Jane' }] }]
searchObject(data, 'name', 'Jane')
```

## CSV Conversion

### arrayToCSV

Convert 2D array to CSV string.

```js
import { arrayToCSV } from 'js-cool'

arrayToCSV([
  ['name', 'age'],
  ['John', 30],
])
// 'name,age\n"John",30'
```

### CSVToArray

Convert CSV string to 2D array.

```js
import { CSVToArray } from 'js-cool'

CSVToArray('name,age\nJohn,30')
// [['name', 'age'], ['John', '30']]
```

## Predicates

### all

Check if all elements satisfy a condition.

```js
import { all } from 'js-cool'

all([1, 2, 3], x => x > 0) // true
all([1, 2, 3], x => x > 1) // false
```

### any

Check if any element satisfies a condition.

```js
import { any } from 'js-cool'

any([1, 2, 3], x => x > 2) // true
any([1, 2, 3], x => x > 5) // false
```

## Sorting

### sorter

Sort array with custom key and order.

```js
import { sorter } from 'js-cool'

const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
]
sorter(users, 'age', 'asc') // Sort by age ascending
```

## Random

### randomNumbers

Generate array of random numbers.

```js
import { randomNumbers } from 'js-cool'

randomNumbers(5, 1, 100) // [42, 17, 83, 5, 91] (5 random numbers between 1-100)
```

## See Also

- [Array API Reference](/api/array/unique)
