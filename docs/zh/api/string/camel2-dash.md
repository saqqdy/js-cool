# camel2Dash <Badge type="info" text="v1.0.1" />

将驼峰字符串转换为短横线命名（kebab-case）。

## 用法

```js
import { camel2Dash } from 'js-cool'
```

## 签名

```typescript
function camel2Dash(string: string): string
```

## 参数

| 参数     | 类型     | 描述               |
| -------- | -------- | ------------------ |
| `string` | `string` | 要转换的驼峰字符串 |

## 返回值

`string` - 转换后的短横线字符串。

## 示例

```js
camel2Dash('fontSize')
// 'font-size'

camel2Dash('backgroundColor')
// 'background-color'

camel2Dash('marginTop')
// 'margin-top'

camel2Dash('borderTopLeftRadius')
// 'border-top-left-radius'
```

## 相关

- [dash2Camel](/zh/api/string/dash2-camel) - 短横线转驼峰
