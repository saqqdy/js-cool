# download <Badge type="info" text="since v1.1.0" />

文件下载工具，支持多种下载方式。

## 用法

```js
import { download } from 'js-cool'
```

## 签名

```typescript
function download(url: string, filename?: string, type?: DownloadType): void

type DownloadType = 'href' | 'open' | 'download' | 'request'
```

## 参数

| 参数       | 类型           | 说明                                                    |
| ---------- | -------------- | ------------------------------------------------------- |
| `url`      | `string`       | 要下载的文件 URL                                        |
| `filename` | `string`       | 可选的文件名（如未提供则从 URL 中提取）                 |
| `type`     | `DownloadType` | 下载方式：`'href'`、`'open'`、`'download'`、`'request'` |

## 下载类型

| 类型         | 说明                                     |
| ------------ | ---------------------------------------- |
| `'download'` | 使用 anchor 元素的 download 属性（默认） |
| `'href'`     | 直接导航到 URL（`window.location.href`） |
| `'open'`     | 在新标签页打开（`window.open`）          |
| `'request'`  | 使用 XMLHttpRequest（支持认证下载）      |

## 返回值

`void`

## 示例

### 基本下载

```js
// 使用 anchor 元素下载（默认）
download('https://example.com/file.pdf', 'document.pdf')

// 如果未提供文件名，则从 URL 中提取
download('https://example.com/report.pdf')
```

### 不同的下载方式

```js
// 在新标签页打开
download('https://example.com/file.pdf', 'document.pdf', 'open')

// 直接导航（适用于浏览器不识别的文件格式）
download('https://example.com/file.pdf', 'document.pdf', 'href')

// 使用 XHR 进行认证下载
download('https://api.example.com/download', 'data.json', 'request')
```

## 相关函数

### saveFile

直接将数据保存为文件。

```typescript
function saveFile(data: Blob | ArrayBuffer | string, filename: string, mimeType?: string): void
```

```js
import { saveFile } from 'js-cool'

// 保存文本
saveFile('Hello World', 'hello.txt')

// 保存 JSON
saveFile(JSON.stringify(data, null, 2), 'data.json', 'application/json')

// 保存 Blob
const blob = new Blob(['content'], { type: 'text/plain' })
saveFile(blob, 'file.txt')
```

### downloadFile

使用 anchor 元素下载文件。

```typescript
function downloadFile(url: string, filename: string): void
```

```js
import { downloadFile } from 'js-cool'

downloadFile('https://example.com/file.pdf', 'document.pdf')
```

### downloadUrlFile

通过 XMLHttpRequest 下载文件（用于认证下载）。

```typescript
function downloadUrlFile(url: string, filename: string): void
```

```js
import { downloadUrlFile } from 'js-cool'

downloadUrlFile('https://example.com/file.pdf', 'document.pdf')
```

## 注意事项

- 仅在浏览器环境中工作
- `'request'` 类型适用于需要包含认证头的场景
- `saveFile` 会自动创建 Blob URL 并触发下载
- 对于大文件，建议使用 `'request'` 类型以显示进度
