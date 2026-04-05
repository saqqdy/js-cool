# cutCHSString

截取中文字符串，中文算 2 个字节。基于 `getCHSLength` 实现。

## 用法

```js
import { cutCHSString } from 'js-cool'
```

## 签名

```typescript
function cutCHSString(str: string, len?: number, hasDot?: boolean): string
```

## 参数

| 参数     | 类型      | 描述                                  |
| -------- | --------- | ------------------------------------- |
| `str`    | `string`  | 要截取的字符串                        |
| `len`    | `number`  | 最大字节长度（默认：字符串字节长度）  |
| `hasDot` | `boolean` | 截断时是否添加省略号（默认：`false`） |

## 返回值

`string` - 截取后的字符串。

## 示例

```js
cutCHSString('Hello世界', 7) // 'Hello世' (5 + 2 = 7 字节)
cutCHSString('Hello世界你好', 8, true) // 'Hello世...' (截断后添加省略号)
cutCHSString('中文测试字符串', 6) // '中文测试' (4 个中文字符 = 8 字节，但只能截取 6 字节 = 3 个中文字符)
cutCHSString('abc', 10) // 'abc' (不截断，返回原字符串)
```

## 相关

- [getCHSLength](/api/string/get-chs-length) - 获取中文字符串字节长度
