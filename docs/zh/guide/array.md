# 数组工具

js-cool 提供了实用的数组处理工具。

## 去重

### unique

数组去重。

```js
import { unique } from 'js-cool'

unique([1, 2, 2, 3, 3, 4]) // [1, 2, 3, 4]
unique(['a', 'b', 'a', 'c']) // ['a', 'b', 'c']
```

## 重排

### shuffle

随机打乱数组顺序。

```js
import { shuffle } from 'js-cool'

shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]（随机）
```

## 截取

### take

从数组开头取 N 个元素。

```js
import { take } from 'js-cool'

take([1, 2, 3, 4, 5], 3) // [1, 2, 3]
take([1, 2, 3], 0) // []
take([1, 2, 3]) // [1]（默认取 1 个）
```

### takeRight

从数组末尾取 N 个元素。

```js
import { takeRight } from 'js-cool'

takeRight([1, 2, 3, 4, 5], 3) // [3, 4, 5]
takeRight([1, 2, 3], 0) // []
takeRight([1, 2, 3]) // [3]（默认取 1 个）
```

### drop

丢弃数组开头 N 个元素。

```js
import { drop } from 'js-cool'

drop([1, 2, 3, 4, 5], 3) // [4, 5]
drop([1, 2, 3], 0) // [1, 2, 3]
drop([1, 2, 3]) // [2, 3]（默认丢弃 1 个）
```

### dropRight

丢弃数组末尾 N 个元素。

```js
import { dropRight } from 'js-cool'

dropRight([1, 2, 3, 4, 5], 3) // [1, 2]
dropRight([1, 2, 3], 0) // [1, 2, 3]
dropRight([1, 2, 3]) // [1, 2]（默认丢弃 1 个）
```

## 集合运算

### intersect

数组交集。

```js
import { intersect } from 'js-cool'

intersect([1, 2, 3], [2, 3, 4]) // [2, 3]
intersect([1, 2, 3], [2, 3, 4], [3, 4, 5]) // [3]
```

### union

数组并集。

```js
import { union } from 'js-cool'

union([1, 2, 3], [3, 4, 5]) // [1, 2, 3, 4, 5]
```

### unionBy

按条件求并集。

```js
import { unionBy } from 'js-cool'

unionBy([2.1], [1.2, 2.3], Math.floor) // [2.1, 1.2]
unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x') // [{ x: 1 }, { x: 2 }]
```

### minus

数组差集（在第一个数组但不在其他数组中）。

```js
import { minus } from 'js-cool'

minus([1, 2, 3, 4], [2, 3], [4]) // [1]
```

### differenceBy

按条件求差集。

```js
import { differenceBy } from 'js-cool'

differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor) // [1.2]
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x') // [{ x: 2 }]
```

### intersectionBy

按条件求交集。

```js
import { intersectionBy } from 'js-cool'

intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor) // [2.1]
intersectionBy([{ x: 1 }, { x: 2 }], [{ x: 1 }], 'x') // [{ x: 1 }]
```

### complement

数组补集。

```js
import { complement } from 'js-cool'

complement([1, 2, 3], [2, 3, 4]) // [1, 4]
```

### contains

检查数组是否包含元素。

```js
import { contains } from 'js-cool'

contains([1, 2, 3], 2) // true
contains([1, 2, 3], 4) // false
```

## 搜索

### findIndex

查找满足条件的第一个元素的索引。

```js
import { findIndex } from 'js-cool'

const users = [
  { user: 'barney', active: false },
  { user: 'fred', active: false },
  { user: 'pebbles', active: true }
]

findIndex(users, ({ active }) => active) // 2
findIndex(users, { user: 'fred' }) // 1
findIndex(users, ['user', 'barney']) // 0
findIndex(users, 'active') // 2
findIndex([1, 2, 3], n => n > 1) // 1
```

### findLastIndex

从后向前查找满足条件的第一个元素的索引。

```js
import { findLastIndex } from 'js-cool'

findLastIndex([1, 2, 3, 4], n => n > 2) // 3
findLastIndex([{ a: 1 }, { a: 2 }, { a: 1 }], { a: 1 }) // 2
```

### searchObject

在嵌套对象/数组中搜索。

```js
import { searchObject } from 'js-cool'

const data = [{ id: 1, name: 'John', children: [{ id: 2, name: 'Jane' }] }]
searchObject(data, 'name', 'Jane')
```

## CSV 转换

### arrayToCSV

二维数组转 CSV 字符串。

```js
import { arrayToCSV } from 'js-cool'

arrayToCSV([
  ['name', 'age'],
  ['John', 30],
])
// 'name,age\n"John",30'
```

### CSVToArray

CSV 字符串转二维数组。

```js
import { CSVToArray } from 'js-cool'

CSVToArray('name,age\nJohn,30')
// [['name', 'age'], ['John', '30']]
```

## 条件判断

### all

检查是否所有元素都满足条件。

```js
import { all } from 'js-cool'

all([1, 2, 3], x => x > 0) // true
all([1, 2, 3], x => x > 1) // false
```

### any

检查是否有任意元素满足条件。

```js
import { any } from 'js-cool'

any([1, 2, 3], x => x > 2) // true
any([1, 2, 3], x => x > 5) // false
```

## 排序

### sorter

按指定字段和顺序排序。

```js
import { sorter } from 'js-cool'

const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
]
sorter(users, 'age', 'asc') // 按年龄升序
```

## 分组

### partition

将数组分成两组。

```js
import { partition } from 'js-cool'

partition([1, 2, 3, 4], n => n % 2 === 0) // [[2, 4], [1, 3]]
partition([{ a: 1 }, { a: 2 }], { a: 1 }) // [[{ a: 1 }], [{ a: 2 }]]
```

### countBy

按条件计数分组。

```js
import { countBy } from 'js-cool'

countBy([6.1, 4.2, 6.3], Math.floor) // { '4': 1, '6': 2 }
countBy(['one', 'two', 'three'], 'length') // { '3': 2, '5': 1 }
countBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type') // { 'a': 2, 'b': 1 }
```

### groupBy

按条件分组。

```js
import { groupBy } from 'js-cool'

groupBy([6.1, 4.2, 6.3], Math.floor) // { '4': [4.2], '6': [6.1, 6.3] }
groupBy(['one', 'two', 'three'], 'length') // { '3': ['one', 'two'], '5': ['three'] }
```

## 压缩

### zip

将多个数组合并为元组数组。

```js
import { zip } from 'js-cool'

zip(['a', 'b', 'c'], [1, 2, 3]) // [['a', 1], ['b', 2], ['c', 3]]
zip(['a', 'b'], [1, 2], [true, false]) // [['a', 1, true], ['b', 2, false]]
```

### unzip

将元组数组解压为多个数组。

```js
import { unzip } from 'js-cool'

unzip([['a', 1], ['b', 2], ['c', 3]]) // [['a', 'b', 'c'], [1, 2, 3]]
```

## 随机

### randomNumbers

生成随机数数组。

```js
import { randomNumbers } from 'js-cool'

randomNumbers(5, 1, 100) // [42, 17, 83, 5, 91]（5个1-100之间的随机数）
```

## 相关

- [数组 API 参考](/zh/api/array/unique)
