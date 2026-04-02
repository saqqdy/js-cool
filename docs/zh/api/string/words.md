# words <Badge type="info" text="v6.0.0" />

将字符串拆分为单词数组。

## 用法

```js
import { words } from 'js-cool'
```

## 签名

```typescript
function words(string: string, pattern?: RegExp | string): string[]
```

## 参数

| 参数      | 类型               | 描述               |
| --------- | ------------------ | ------------------ |
| `string`  | `string`           | 要拆分的字符串     |
| `pattern` | `RegExp \| string` | 匹配单词的模式（可选） |

## 返回值

`string[]` - 单词数组。

## 示例

```js
// 基本用法
words('fred, barney, & pebbles')
// ['fred', 'barney', 'pebbles']

// 驼峰命名拆分
words('camelCaseHTML')
// ['camel', 'Case', 'HTML']

// 使用自定义正则
words('camelCaseHTML', /[A-Z]{2,}/g)
// ['HTML']

words('hello world', /\w+/g)
// ['hello', 'world']

// 空字符串
words('')
// []
```

## 注意

- 默认支持 camelCase、PascalCase、snake_case、kebab-case 等命名风格
- 连续大写字母会被识别为单词（如 HTML）
- 可传入自定义正则表达式匹配特定模式
