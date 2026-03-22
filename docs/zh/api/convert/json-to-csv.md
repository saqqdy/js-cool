# JSONToCSV

将对象数组转换为仅包含指定列的逗号分隔值（CSV）字符串。

## 用法

```js
import { JSONToCSV } from 'js-cool'
```

## 签名

```typescript
function JSONToCSV(arr: any[], columns: any[], delimiter?: string): string
```

## 参数

| 参数        | 类型     | 描述               |
| ----------- | -------- | ------------------ |
| `arr`       | `any[]`  | 对象数组           |
| `columns`   | `any[]`  | 要包含的指定列     |
| `delimiter` | `string` | 分隔符，默认为 ',' |

## 返回值

`string` - CSV 字符串。

## 示例

```js
// 基本用法
JSONToCSV(
  [
    { a: 1, b: 2 },
    { a: 3, b: 4 },
  ],
  ['a', 'b']
)
// 'a,b\n"1","2"\n"3","4"'

// 使用自定义分隔符
JSONToCSV(
  [
    { a: 1, b: 2 },
    { a: 3, b: 4 },
  ],
  ['a', 'b'],
  ';'
)
// 'a;b\n"1";"2"\n"3";"4"'

// 缺失的值变为空字符串
JSONToCSV([{ a: 1 }, { b: 2 }], ['a', 'b'])
// 'a,b\n"1",""\n"","2"'

// 包含特殊字符
JSONToCSV([{ name: 'test', value: '"quoted"' }], ['name', 'value'])
// 'name,value\n"test","""quoted"""'
```

## 相关

- [CSVToJSON](/api/convert/csv-to-json) - 将 CSV 转换为 JSON
- [arrayToCSV](/api/array/array-to-csv) - 将数组转换为 CSV
