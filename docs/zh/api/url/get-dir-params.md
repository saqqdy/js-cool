# getDirParams <Badge type="tip" text="v6.0.0" />

解析 URL 路径信息，返回结构化的组成部分。

## 用法

```js
import { getDirParams } from 'js-cool'
```

## 签名

```typescript
interface DirParamsResult {
  /** 完整 origin，如 'https://example.com' */
  origin: string
  /** 主机名+端口，如 'example.com:8080' */
  host: string
  /** 主机名（不含端口），如 'example.com' */
  hostname: string
  /** 完整路径，如 '/api/v1/users' */
  pathname: string
  /** 路径段数组，如 ['api', 'v1', 'users'] */
  segments: string[]
  /** 查询字符串（不含?），如 'id=123' */
  query: string
  /** hash 值（不含#），如 'section' */
  hash: string
}

function getDirParams(url?: string): DirParamsResult
```

## 参数

| 参数  | 类型     | 描述                               |
| ----- | -------- | ---------------------------------- |
| `url` | `string` | URL 字符串，不传则使用当前页面 URL |

## 返回值

`DirParamsResult` - URL 解析结果对象。

## 示例

```js
// 完整 URL
getDirParams('https://example.com:8080/api/v1/users?id=123#section')
// {
//   origin: 'https://example.com:8080',
//   host: 'example.com:8080',
//   hostname: 'example.com',
//   pathname: '/api/v1/users',
//   segments: ['api', 'v1', 'users'],
//   query: 'id=123',
//   hash: 'section'
// }

// 简单 URL
getDirParams('https://example.com/media/video/test.mp4')
// {
//   origin: 'https://example.com',
//   host: 'example.com',
//   hostname: 'example.com',
//   pathname: '/media/video/test.mp4',
//   segments: ['media', 'video', 'test.mp4'],
//   query: '',
//   hash: ''
// }

// 当前页面 URL（浏览器环境）
getDirParams()
// 返回当前页面 URL 的解析结果
```

## 特性

- **原生 URL API** - 使用浏览器原生 URL API，性能最佳
- **IE11 兼容** - 自动降级到正则实现
- **相对路径支持** - 支持绝对路径和相对路径
- **Query 与 Hash 分离** - 正确分离查询字符串和 hash

## 从 `getDirParam` 迁移

`getDirParam` 已在 v6.0.0 中移除。请按以下方式迁移到 `getDirParams`：

### 返回值映射

| `getDirParam` (v5.x) | `getDirParams` (v6.x) | 说明                 |
| -------------------- | --------------------- | -------------------- |
| `host`               | `origin`              | 现在包含协议         |
| -                    | `host`                | 新增：主机名 + 端口  |
| -                    | `hostname`            | 新增：仅主机名       |
| -                    | `pathname`            | 新增：完整路径字符串 |
| `path`               | `segments`            | 重命名               |
| -                    | `query`               | 新增：查询字符串     |
| -                    | `hash`                | 新增：hash 值        |

### 迁移示例

```js
// v5.x（已废弃）
import { getDirParam } from 'js-cool'

const { host, path } = getDirParam('https://example.com/user/123')
// host: 'https://example.com'
// path: ['user', '123']

// v6.x
import { getDirParams } from 'js-cool'

const { origin, segments } = getDirParams('https://example.com/user/123')
// origin: 'https://example.com'
// segments: ['user', '123']
```

### 修复的问题

旧的 `getDirParam` 会错误地将 query string 混入最后一个路径段：

```js
// v5.x - Bug：query 混入路径
getDirParam('https://example.com/api/users?id=123')
// { host: 'https://example.com', path: ['api', 'users?id=123'] }

// v6.x - 已修复：query 正确分离
getDirParams('https://example.com/api/users?id=123')
// { origin: 'https://example.com', segments: ['api', 'users'], query: 'id=123', ... }
```
