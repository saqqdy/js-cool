# getNumber <Badge type="info" text="v1.0.1" />

获取字符串中的数字。

## 用法

```js
import { getNumber } from 'js-cool'
```

## 签名

```typescript
function getNumber(string: string): string
```

## 参数

| 参数     | 类型     | 描述             |
| -------- | -------- | ---------------- |
| `string` | `string` | 包含数字的字符串 |

## 返回值

`string` - 纯数字字符串。

## 示例

```js
// 版本号
getNumber('Chrome123.33')
// '123.33'

// 混合字母
getNumber('234test.88')
// '234.88'

// 多个数字
getNumber('a1b2c3')
// '123'

// 带小数
getNumber('Price: $99.99')
// '99.99'

// 无数字
getNumber('hello world')
// ''
```

## 相关

- [fixNumber](/api/utility/fix-number) - 将数字保留指定小数位
- [randomNumber](/api/utility/random-number) - 生成随机数
