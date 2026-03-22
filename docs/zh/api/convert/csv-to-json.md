# CSVToJSON

将逗号分隔的值字符串（CSV）转换为二维对象数组。字符串的第一行用作标题行。

## 用法

```js
import { CSVToJSON } from 'js-cool'
```

## 签名

```typescript
function CSVToJSON(data: string, delimiter?: string): Record<string, string>[]
```

## 参数

| 参数        | 类型     | 描述               |
| ----------- | -------- | ------------------ |
| `data`      | `string` | CSV 数据字符串     |
| `delimiter` | `string` | 分隔符，默认为 ',' |

## 返回值

`Record<string, string>[]` - 键来自标题行的对象数组。

## 示例

```js
// 基本用法
CSVToJSON('col1,col2\na,b\nc,d')
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]

// 使用自定义分隔符
CSVToJSON('col1;col2\na;b\nc;d', ';')
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]

// 包含数字（作为字符串）
CSVToJSON('name,age\nJohn,30\nJane,25')
// [{'name': 'John', 'age': '30'}, {'name': 'Jane', 'age': '25'}]

// 空值
CSVToJSON('a,b\n1,\n,2')
// [{'a': '1', 'b': ''}, {'a': '', 'b': '2'}]
```

## 相关

- [JSONToCSV](/api/convert/json-to-csv) - 将 JSON 转换为 CSV
- [arrayToCSV](/api/array/array-to-csv) - 将数组转换为 CSV
