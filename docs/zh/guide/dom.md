# DOM 工具

js-cool 提供了 DOM 操作工具。

## 事件

### addEvent

添加事件监听器（跨浏览器兼容）。

```js
import { addEvent } from 'js-cool'

const btn = document.getElementById('btn')
addEvent(btn, 'click', e => {
  console.log('按钮被点击了！')
})
```

### removeEvent

移除事件监听器。

```js
import { removeEvent } from 'js-cool'

const btn = document.getElementById('btn')
const handler = e => console.log('clicked')
addEvent(btn, 'click', handler)
// 之后...
removeEvent(btn, 'click', handler)
```

## 事件控制

### stopDefault

阻止默认事件行为。

```js
import { stopDefault } from 'js-cool'

document.querySelector('form').addEventListener('submit', e => {
  stopDefault(e)
  console.log('表单提交已阻止')
})
```

### stopBubble

阻止事件冒泡。

```js
import { stopBubble } from 'js-cool'

document.getElementById('child').addEventListener('click', e => {
  stopBubble(e)
  console.log('事件不会冒泡到父元素')
})
```

## 剪贴板

### copy

复制文本到剪贴板。

```js
import { copy } from 'js-cool'

// 复制文本
copy('Hello World') // 成功返回 true

// 在按钮点击中复制
document.getElementById('copyBtn').addEventListener('click', () => {
  const text = document.getElementById('content').textContent
  if (copy(text)) {
    alert('复制成功！')
  }
})
```

## 文件下载

### download

使用多种方式下载文件。支持多种下载类型：锚点下载、新标签页打开、直接导航或 XHR 请求。

```js
import { download } from 'js-cool'

// 基本下载（锚点元素）
download('https://example.com/file.pdf', 'document.pdf')

// 在新标签页打开
download('https://example.com/file.pdf', 'document.pdf', 'open')

// 直接导航
download('https://example.com/file.pdf', 'document.pdf', 'href')

// 使用 XHR 进行认证下载
download('https://api.example.com/download', 'data.json', 'request')

// 文件名可选 - 从 URL 中提取
download('https://example.com/report.pdf')
```

### saveFile

直接将数据保存为文件。支持字符串、Blob 和 ArrayBuffer。

```js
import { saveFile } from 'js-cool'

// 保存文本
saveFile('Hello World', 'hello.txt')

// 保存 JSON
saveFile(JSON.stringify(data), 'data.json')

// 保存 Blob
const blob = new Blob(['content'], { type: 'text/plain' })
saveFile(blob, 'file.txt')

// 保存 ArrayBuffer
const buffer = new ArrayBuffer(10)
saveFile(buffer, 'data.bin')
```

### downloadFile

使用锚点元素下载文件。

```js
import { downloadFile } from 'js-cool'

downloadFile('https://example.com/file.pdf', 'document.pdf')
```

### downloadUrlFile

通过 XMLHttpRequest 从 URL 下载文件（适用于需要认证的下载）。

```js
import { downloadUrlFile } from 'js-cool'

downloadUrlFile('https://api.example.com/download', 'data.json')
```

## 滚动

### getScrollPosition

获取当前滚动位置。

```js
import { getScrollPosition } from 'js-cool'

getScrollPosition()
// { x: 0, y: 100 }
```

## 窗口

### windowSize

获取窗口尺寸。

```js
import { windowSize } from 'js-cool'

windowSize()
// { width: 1920, height: 1080 }
```

## 暗黑模式

### isDarkMode

检查是否启用了暗黑模式。

```js
import { isDarkMode } from 'js-cool'

isDarkMode() // true 或 false
```

## 浏览器检测

### inBrowser

检查是否在浏览器环境中运行。

```js
import { inBrowser } from 'js-cool'

inBrowser // true 或 false
```

### inNodeJs

检查是否在 Node.js 环境中运行。

```js
import { inNodeJs } from 'js-cool'

inNodeJs // true 或 false
```

## 元素信息

### isWindow

检查值是否为 window 对象。

```js
import { isWindow } from 'js-cool'

isWindow(window) // true
isWindow(document) // false
```

## 加载

### preloader

预加载资源（图片、脚本等）。

```js
import { preloader } from 'js-cool'

preloader(['image1.jpg', 'image2.jpg', 'script.js'])
```

## 相关

- [DOM API 参考](/zh/api/)
