# client <Badge type="danger" text="已废弃" /> <Badge type="info" text="v1.0.1" />

::: warning 已废弃
请使用 `ua` 代替。将在 v7.0.0 中移除
:::

获取浏览器/客户端信息。

## 用法

```js
import { client } from 'js-cool'
```

## 签名

```typescript
function client(
  name?: string,
  userAgent?: string
): boolean | Record<string, boolean | RegExpMatchArray | null>
```

## 参数

| 参数        | 类型     | 描述                                   |
| ----------- | -------- | -------------------------------------- |
| `name`      | `string` | 检查特定浏览器（可选）                 |
| `userAgent` | `string` | 自定义 UA（默认：navigator.userAgent） |

## 返回值

`boolean | object` - 浏览器信息对象或匹配结果。

## 示例

```js
// 获取所有浏览器信息
client()
// {
//   IE: false,
//   GECKO: true,
//   WEBKIT: false,
//   OPERA: false,
//   TRIDENT: false,
//   MOBILE: true,
//   IOS: true,
//   ANDROID: false,
//   IPHONE: true,
//   IPAD: false,
//   WEIXIN: false,
//   QQBROWSER: false
// }

// 检查特定浏览器
client('MicroMessenger') // 是否微信浏览器
client('Chrome') // 是否 Chrome
```

## 迁移

请迁移到 [`ua`](/zh/api/url/ua) 以获得更好的 tree-shaking 和更多功能：

```js
// 旧
import { client } from 'js-cool'
const info = client()
client('MicroMessenger')

// 新
import { ua } from 'js-cool'
const info = ua.info
ua.isWeChat()
```
