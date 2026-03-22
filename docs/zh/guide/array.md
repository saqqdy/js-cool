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

### minus

数组差集（在第一个数组但不在其他数组中）。

```js
import { minus } from 'js-cool'

minus([1, 2, 3, 4], [2, 3], [4]) // [1]
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

## 随机

### randomNumbers

生成随机数数组。

```js
import { randomNumbers } from 'js-cool'

randomNumbers(5, 1, 100) // [42, 17, 83, 5, 91]（5个1-100之间的随机数）
```

## 相关

- [数组 API 参考](/zh/api/array/unique)
