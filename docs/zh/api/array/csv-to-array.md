# CSVToArray

将 CSV 字符串转换为二维数组。

## 用法

```js
import { CSVToArray } from 'js-cool'
```

## 签名

```typescript
function CSVToArray(csv: string, delimiter?: string): string[][]
```

## 参数

| 参数        | 类型     | 描述                  |
| ----------- | -------- | --------------------- |
| `csv`       | `string` | 要转换的 CSV 字符串   |
| `delimiter` | `string` | 列分隔符（默认：','） |

## 返回值

`string[][]` - 二维数组。

## 示例

```js
CSVToArray('name,age\nJohn,30')
// [['name', 'age'], ['John', '30']]

CSVToArray('a;b\n1;2', ';')
// [['a', 'b'], ['1', '2']]
```

## 相关

- [arrayToCSV](/api/array/array-to-csv) - 将数组转换为 CSV
