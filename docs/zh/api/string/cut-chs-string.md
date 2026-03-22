# cutCHSString

截取中文字符串，中文算 2 个字节。

## 用法

```js
import { cutCHSString } from 'js-cool'
```

## 签名

```typescript
function cutCHSString(str: string, len?: number, hasDot?: boolean): string
```

## 参数

| 参数     | 类型      | 描述                                |
| -------- | --------- | ----------------------------------- |
| `str`    | `string`  | 要截取的字符串                      |
| `len`    | `number`  | 最大长度（默认：字符串长度）        |
| `hasDot` | `boolean` | 截断时是否添加省略号（默认：false） |

## 返回值

`string` - 截取后的字符串。

## 示例

```js
cutCHSString('Hello世界', 7) // 'Hello世'
cutCHSString('Hello世界你好', 8, true) // 'Hello世...'
cutCHSString('中文测试字符串', 6) // '中文测试'
```
