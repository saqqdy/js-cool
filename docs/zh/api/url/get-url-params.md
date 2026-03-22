# getUrlParams

解析 URL 参数为对象。

## 用法

```js
import { getUrlParams } from 'js-cool'
```

## 签名

```typescript
function getUrlParams(url?: string): Record<string, string>
```

## 参数

| 参数  | 类型     | 描述                              |
| ----- | -------- | --------------------------------- |
| `url` | `string` | URL 字符串（默认：location.href） |

## 返回值

`Record<string, string>` - 包含参数键值对的对象。

## 示例

```js
getUrlParams('https://example.com?name=John&age=30')
// { name: 'John', age: '30' }

// 使用当前 URL
getUrlParams() // 使用 window.location.href
```

## 相关

- [parseUrlParam](/zh/api/url/parse-url-param) - 带类型转换的解析
