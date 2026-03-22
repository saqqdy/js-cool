# getQueryParams <Badge type="info" text="v5.0.0" />

获取所有 URL 参数（在"#"后面，从 hash 获取）。

## 用法

```js
import { getQueryParams } from 'js-cool'
```

## 签名

```typescript
function getQueryParams(url: string): Record<string, string>
function getQueryParams(url: boolean): Record<string, unknown>
function getQueryParams(url: string, covert: boolean): Record<string, unknown>
```

## 参数

| 参数     | 类型                | 描述                               |
| -------- | ------------------- | ---------------------------------- |
| `url`    | `string \| boolean` | URL 字符串或布尔值（用于类型转换） |
| `covert` | `boolean`           | 将特定字符串转换为对应的值         |

## 返回值

`Record<string, string | unknown>` - 包含所有参数的对象。

## 示例

```js
// 从 URL 字符串获取
getQueryParams('https://test.com?key1=100#/home?key1=200')
// { key1: '200' }

// 启用类型转换
getQueryParams('https://test.com#/page?id=100&active=true', true)
// { id: 100, active: true }

// 从当前页面获取（无参数）
// URL: https://example.com#/page?token=abc&userId=123
getQueryParams()
// { token: 'abc', userId: '123' }

// 从当前页面获取并启用类型转换
getQueryParams(true)
// { token: 'abc', userId: 123 }
```

## 相关

- [getQueryParam](/api/url/get-query-param) - 获取单个查询参数
- [parseUrlParam](/api/url/parse-url-param) - 解析 URL 参数
