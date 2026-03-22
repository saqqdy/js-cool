# mapTemplate

模板字符串替换。

## 用法

```js
import { mapTemplate } from 'js-cool'
```

## 签名

```typescript
function mapTemplate(template: string, data: Record<string, any> | ((key: string) => any)): string
```

## 参数

| 参数       | 类型                              | 描述           |
| ---------- | --------------------------------- | -------------- |
| `template` | `string`                          | 模板字符串     |
| `data`     | `Record<string, any> \| Function` | 数据对象或函数 |

## 返回值

`string` - 替换后的字符串。

## 示例

```js
// 使用 ${} 语法
mapTemplate('我的名字是${name}', { name: 'John' })
// '我的名字是John'

// 使用 {{}} 语法
mapTemplate('Hello {{name}}', { name: 'World' })
// 'Hello World'

// 使用函数
mapTemplate('值: ${key}', key => key.toUpperCase())
// '值: KEY'
```
