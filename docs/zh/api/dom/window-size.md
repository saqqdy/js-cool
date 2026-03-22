# windowSize <Badge type="info" text="v1.0.1" />

获取窗口尺寸。

## 用法

```js
import { windowSize } from 'js-cool'
```

## 签名

```typescript
function windowSize(): { width: number; height: number }
```

## 返回值

`{ width: number, height: number }` - 窗口尺寸对象。

## 示例

```js
windowSize()
// { width: 1920, height: 1080 }

// 响应式检查
const { width } = windowSize()
if (width < 768) {
  console.log('移动端视图')
}
```
