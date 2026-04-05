# getCHSLength

获取字符串的字节长度，全角字符（中文、CJK 统一汉字、表情符号等）算 2 个字节。

## 用法

```js
import { getCHSLength } from 'js-cool'
```

## 签名

```typescript
function getCHSLength(str: string): number

function isFullWidth(char: string): boolean
```

## 参数

| 参数  | 类型     | 描述           |
| ----- | -------- | -------------- |
| `str` | `string` | 要计算的字符串 |

## 返回值

`number` - 字节长度（全角字符 = 2，半角字符 = 1）。

## 导出

- `getCHSLength` - 获取字符串字节长度
- `isFullWidth` - 判断单个字符是否为全角字符

## 示例

```js
getCHSLength('Hello世界') // 9 (5 个英文 + 2 个中文 * 2)
getCHSLength('中文') // 4 (2 个中文 * 2)
getCHSLength('abc') // 3
getCHSLength('🎉') // 2 (表情符号为全角字符)

// 使用 isFullWidth 判断单个字符
isFullWidth('中') // true
isFullWidth('a') // false
isFullWidth('🎉') // true
```

## 相关

- [cutCHSString](/api/string/cut-chs-string) - 截取中文字符串
