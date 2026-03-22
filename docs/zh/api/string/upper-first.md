# upperFirst <Badge type="info" text="v1.0.1" />

首字母大写。

## 用法

```js
import { upperFirst } from 'js-cool'
```

## 签名

```typescript
function upperFirst(string: string): string
```

## 参数

| 参数     | 类型     | 描述           |
| -------- | -------- | -------------- |
| `string` | `string` | 要修改的字符串 |

## 返回值

`string` - 首字母大写的字符串。

## 示例

```js
upperFirst('hello') // 'Hello'
upperFirst('hello world') // 'Hello world'
upperFirst('h') // 'H'
```
