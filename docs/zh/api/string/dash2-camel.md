# dash2Camel

将短横线命名（kebab-case）转换为驼峰命名。

## 用法

```js
import { dash2Camel } from 'js-cool'
```

## 签名

```typescript
function dash2Camel(string: string): string
```

## 参数

| 参数    | 类型     | 描述               |
| ------- | -------- | ------------------ |
| `string` | `string` | 要转换的短横线字符串 |

## 返回值

`string` - 转换后的驼峰字符串。

## 示例

```js
dash2Camel('font-size') // 'fontSize'
dash2Camel('background-color') // 'backgroundColor'
dash2Camel('margin-top') // 'marginTop'
dash2Camel('border-top-left-radius') // 'borderTopLeftRadius'
```

## 相关

- [camel2Dash](/zh/api/string/camel2-dash) - 驼峰转短横线
