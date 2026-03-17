# getFileType

根据链接后缀判断文件类型。

## 用法

```js
import { getFileType } from 'js-cool'
```

## 签名

```typescript
function getFileType(url: string): {
  suffix: string
  type: 'image' | 'txt' | 'excel' | 'word' | 'pdf' | 'ppt' | 'zip' | 'video' | 'audio' | 'other'
}
```

## 参数

| 参数  | 类型     | 描述               |
| ----- | -------- | ------------------ |
| `url` | `string` | 文件 URL 或文件名  |

## 返回值

`object` - 包含后缀和类型属性的对象。

| 属性     | 类型     | 描述                                                         |
| -------- | -------- | ------------------------------------------------------------ |
| `suffix` | `string` | 小写的文件扩展名                                             |
| `type`   | `string` | 文件类型分类：image、txt、excel、word、pdf、ppt、zip、video、audio、other |

## 示例

```js
// 图片类型
getFileType('/name.png')
// { suffix: 'png', type: 'image' }

getFileType('/photo.JPG')
// { suffix: 'jpg', type: 'image' }

// 文档类型
getFileType('/document.PDF')
// { suffix: 'pdf', type: 'pdf' }

getFileType('/report.docx')
// { suffix: 'docx', type: 'word' }

// 媒体类型
getFileType('/video.mp4')
// { suffix: 'mp4', type: 'video' }

getFileType('/audio.mp3')
// { suffix: 'mp3', type: 'audio' }

// 未知类型
getFileType('/file.xyz')
// { suffix: 'xyz', type: 'other' }
```

## 相关

- [fileToBase64](/api/convert/file-to-base64) - 将文件转换为 base64
