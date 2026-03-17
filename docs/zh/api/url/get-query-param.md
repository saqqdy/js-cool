# getQueryParam

获取单个查询参数（在"#"后面，从 hash 获取）。

## 用法

```js
import { getQueryParam } from 'js-cool'
```

## 签名

```typescript
function getQueryParam(key: string): string | undefined
function getQueryParam(key: string, url: string): string | undefined
```

## 参数

| 参数  | 类型     | 描述                                               |
| ----- | -------- | -------------------------------------------------- |
| `key` | `string` | 参数名称                                           |
| `url` | `string` | URL 字符串（可选，未提供时使用 location.href）     |

## 返回值

`string | undefined` - 参数值或 `undefined`。

## 示例

```js
// 从当前页面 URL hash 获取
// URL: https://example.com#/page?token=abc123
getQueryParam('token')
// 'abc123'

// 使用自定义 URL
getQueryParam('key1', 'https://test.com?key1=100#/home?key1=200')
// '200'（从 hash 获取值，而不是 search）

// 参数不存在
getQueryParam('nonexistent')
// undefined

// URL 编码的值
getQueryParam('name', 'https://example.com#/page?name=John%20Doe')
// 'John Doe'
```

## 相关

- [getQueryParams](/api/url/get-query-params) - 获取所有查询参数
- [parseUrlParam](/api/url/parse-url-param) - 解析 URL 参数
