# template <Badge type="info" text="v6.0.0" />

创建模板函数，支持数据属性插值。

## 用法

```js
import { template } from 'js-cool'
```

## 签名

```typescript
function template(
  templateString: string,
  options?: TemplateOptions
): (data?: Record<string, unknown>) => string

interface TemplateSettings {
  open?: string    // 开始分隔符，默认 '{{'
  close?: string   // 结束分隔符，默认 '}}'
  escape?: boolean // 是否转义 HTML，默认 true
}

interface TemplateOptions extends TemplateSettings {
  data?: Record<string, unknown>
}
```

## 参数

| 参数              | 类型               | 描述               |
| ----------------- | ------------------ | ------------------ |
| `templateString`  | `string`           | 模板字符串         |
| `options`         | `TemplateOptions`  | 模板选项           |

## 返回值

`(data?: Record<string, unknown>) => string` - 编译后的模板函数。

## 示例

```js
// 基本用法
const compiled = template('Hello, {{ name }}!')
compiled({ name: 'World' })
// 'Hello, World!'

// HTML 转义（默认开启）
const compiled = template('{{ content }}')
compiled({ content: '<script>alert("xss")</script>' })
// '&lt;script&gt;alert("xss")&lt;/script&gt;'

// 原始输出（三重大括号）
const compiled = template('{{{ html }}}')
compiled({ html: '<strong>bold</strong>' })
// '<strong>bold</strong>'

// 自定义分隔符
const compiled = template('Hello, ${ name }!', { open: '${', close: '}' })
compiled({ name: 'World' })
// 'Hello, World!'

// 直接传入数据调用
template('Hello, {{ name }}!', { data: { name: 'World' } })
// 'Hello, World!'

// 复杂表达式（嵌套属性）
const compiled = template('{{ user.name }} is {{ user.age }} years old.')
compiled({ user: { name: 'John', age: 30 } })
// 'John is 30 years old.'
```

## 注意

- `{{ variable }}` - HTML 转义输出
- `{{{ variable }}}` - 原始输出（不转义）
- 支持嵌套属性访问（如 `user.name`）
- 可自定义分隔符
