# truncate

如果字符串长度超过指定的最大长度，则截断字符串。截断后的字符串末尾会用省略字符串替换。

## 用法

```js
import { truncate } from 'js-cool'
```

## 签名

```typescript
interface TruncateOptions {
  /**
   * 最大字符串长度（默认：30）
   */
  length?: number
  /**
   * 表示文本被省略的字符串（默认：'...'）
   */
  omission?: string
  /**
   * 截断的分隔符模式
   */
  separator?: string | RegExp
}

function truncate(str: string, options?: TruncateOptions): string
```

## 参数

| 参数      | 类型              | 描述             |
| --------- | ----------------- | ---------------- |
| `str`     | `string`          | 要截断的字符串   |
| `options` | `TruncateOptions` | 选项对象（可选） |

### TruncateOptions

| 属性       | 类型                | 默认值  | 描述                   |
| ---------- | ------------------- | ------- | ---------------------- |
| `length`   | `number`            | `30`    | 最大字符串长度         |
| `omission` | `string`            | `'...'` | 表示文本被省略的字符串 |
| `separator`| `string \| RegExp`  | -       | 截断的分隔符模式       |

## 返回值

`string` - 截断后的字符串。

## 示例

```js
truncate('hi-diddly-ho there, neighborino')
// => 'hi-diddly-ho there, neighbo...'

truncate('hi-diddly-ho there, neighborino', { length: 24, separator: ' ' })
// => 'hi-diddly-ho there,...'

truncate('hi-diddly-ho there, neighborino', { omission: ' [...]' })
// => 'hi-diddly-ho there, neig [...]'

truncate('hi-diddly-ho there, neighborino', { length: 24, separator: /,? +/ })
// => 'hi-diddly-ho there...'
```
