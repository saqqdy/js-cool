# arrayToCSV

将二维数组转换为 CSV 字符串。

## 用法

```js
import { arrayToCSV } from 'js-cool'
```

## 签名

```typescript
function arrayToCSV<T extends unknown[][]>(arr: T, delimiter?: string): string
```

## 参数

| 参数        | 类型     | 描述                  |
| ----------- | -------- | --------------------- |
| `arr`       | `T`      | 要转换的二维数组      |
| `delimiter` | `string` | 列分隔符（默认：','） |

## 返回值

`string` - CSV 格式的字符串。

## 示例

```js
arrayToCSV([
  ['name', 'age'],
  ['John', 30],
])
// 'name,age\n"John",30'

arrayToCSV(
  [
    ['a', 'b'],
    ['1', '2'],
  ],
  ';'
)
// 'a;b\n1;2'
```

## 相关

- [CSVToArray](/api/array/csv-to-array) - 将 CSV 转换为数组
